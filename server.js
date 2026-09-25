const express = require('express');
const app = express();

let todos = [
    {
        id: 1,
        task: 'hello',
        completed: false
    },
    {
        id: 2,
        task: 'world',
        completed: false
    },
    {
        id: 3,
        task: '!',
        completed: false
    }
]

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/todos', (req, res) => {
    res.status(200).json(todos);
});

app.post('/todos', (req, res) => {
    let body = req.body;

    todos.push(JSON.parse(body));
    res.status(200).json(todos);
});

app.delete('/todos', (req, res) => {
    let body = req.body;
    todos = todos.filter(todo => todo.id !== JSON.parse(body).id);
    res.status(200).json(todos);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});