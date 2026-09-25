require("dotenv").config();
const express = require('express');
const app = express();
const mysql = require('mysql');
const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/todos', (req, res) => {
    db.query('SELECT * FROM todos', (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading from database');
            return;
        };
        res.status(200).json(result);
    })
});

app.post('/todos', (req, res) => {
    let todo = req.body;
    db.query('INSERT INTO todos (title, description) VALUES (?, ?)', [todo.title, todo.description], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error writing to database');
            return;
        };
        res.status(200).json(result);
    })
});

app.delete('/todos', (req, res) => {
    let todo = req.body;
    db.query('DELETE FROM todos WHERE id = ?', [todo.id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error writing to database');
            return;
        };
        res.status(200).json(result);
    })
});


db.connect((err) => {
    if (err) {
        console.error(err);
        return;
    };
    console.log('Connected to database');
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
})