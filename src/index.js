const express = require('express');
const bcrypt = require('bcrypt');
const collection = require('./config')


const app = express();
//convert data to json format
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

//use EJS as the view engine
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('login');
});

app.get('/signup', (req, res) => {
    res.render('signup')
})

app.get('/logout', (req, res) => {
    res.redirect('/');
});

//register new user
app.post('/signup', async (req, res) => {

    const data = {
        name: req.body.username,
        password: req.body.password
    }
    //check users name double
    const userCheck = await collection.findOne({ name: data.name })

    if (userCheck) {
        // res.render('home');
        app.get('/');
        // next();
        res.send(`<a href="/signup"a>Powróc na strone główną</>
        <p>User already exist. Plase choose a different username</p>`)
    } else {
        //hash pasword with bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword;

        const userdata = await collection.insertMany(data);
        console.log(userdata);
    }
});

//login user

app.post('/login', async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username });
        if (!check) {
            res.send('user name cannot found')
        }
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (isPasswordMatch) {
            res.render('home')
        } else {
            req.send('wrong password')
        }
    } catch {
        res.send('wrong details')
    }
})





const port = 5000;
app.listen(port, () => {
    console.log(`server runing on: ${port}`);
})