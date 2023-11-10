require('dotenv').config()
const mongoose = require('mongoose');



const dbUser = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

const connect = mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@login.idiope7.mongodb.net/`);


// local db
// const connect = mongoose.connect('mongodb://127.0.0.1:27017/Login');


//check connection to database

connect.then(() => {
    console.log('database connected on')
})
    .catch(() => {
        console.log('database cannot be connected')
    })

const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


const collection = new mongoose.model('users', LoginSchema);

module.exports = collection;
