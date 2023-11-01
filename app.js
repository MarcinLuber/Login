const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

// Połączenie z bazą danych MongoDB
mongoose.connect('mongodb://localhost:27017/myDatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// Model danych
const User = mongoose.model('User', { username: String, password: String });

// Obsługa zapytań GET na stronie głównej
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Obsługa zapytań POST do dodawania nowego użytkownika
app.post('/addUser', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const newUser = new User({ username, password });
    newUser.save()
        .then(() => {
            res.send('Użytkownik dodany do bazy danych.');
        })
        .catch(err => {
            res.status(400).send('Nie udało się dodać użytkownika.');
        });
});

app.listen(3000, () => {
    console.log('Aplikacja jest dostępna na porcie 3000!');
});
