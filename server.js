const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/todos', (req, res) => {
    fs.readFile('todos.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading file');
            return;
        };
        let todos = JSON.parse(data);
        res.status(200).json(todos);
    });
});

app.post('/todos', (req, res) => {
    let todo = req.body;
    fs.readFile('todos.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading file');
            return;
        };
        let todos = JSON.parse(data);
        todos.push(todo);
        fs.writeFile('todos.json', JSON.stringify(todos), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error writing file');
                return;
            };
            res.status(200).json(todos);
        });
    });
});

app.delete('/todos', (req, res) => {
    let todo = req.body;
    fs.readFile('todos.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading file');
            return;
        };
        let todos = JSON.parse(data);
        todos = todos.filter(t => t.id !== todo.id);
        fs.writeFile('todos.json', JSON.stringify(todos), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error writing file');
                return;
            };
            res.status(200).json(todos);
        });
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});