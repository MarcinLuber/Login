// server.js

const express = require('express');
const bcrypt = require('bcrypt');
const collection = require('./config');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('login', { message: null });
});

app.get('/signup', (req, res) => {
    res.render('signup', { message: null });
});

app.get('/logout', (req, res) => {
    res.redirect('/');
});





app.post('/signup', async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    }

    const userCheck = await collection.findOne({ name: data.name });

    if (userCheck) {
        res.render('signup', { message: 'Użytkownik już istnieje. Proszę wybrać inną nazwę użytkownika.' });
    } else {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        data.password = hashedPassword;

        const userdata = await collection.insertMany(data);
        console.log(userdata);
        res.render('login', { message: 'Pomyślnie zarejestrowano. Możesz teraz się zalogować.' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username });

        if (!check) {
            res.render('login', { message: 'Nazwa użytkownika nie znaleziona' });
        } else {
            const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);

            if (isPasswordMatch) {
                res.render('home');
            } else {
                res.render('login', { message: 'Nieprawidłowe hasło' });
            }
        }
    } catch {
        res.render('login', { message: 'Wystąpił błąd' });
    }
});


const port = 5000;
app.listen(port, () => {
    console.log(`Server running on: http://localhost:${port}`);
});
