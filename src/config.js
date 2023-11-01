const mongoose = require('mongoose');
const connect = mongoose.connect('mongodb://127.0.0.1:27017/Login');


//check connection to database

connect.then(() => {
    console.log('database connected!!!')
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
