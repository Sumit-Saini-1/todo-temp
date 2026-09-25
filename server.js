const http = require('http');

let todos = [
    { id: 1, task: 'hello', completed: false },
    { id: 2, task: 'world', completed: false },
    { id: 3, task: '!', completed: false }
]

const server = http.createServer((req, res) => {
    if (req.url === '/todos' && req.method === 'GET') {
        res.end(JSON.stringify(todos));
    }
    else if (req.url === '/todos' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            todos.push(JSON.parse(body));
            res.end(JSON.stringify(todos));
        });
    }
    else if (req.url === '/todos' && req.method === 'DELETE') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            todos = todos.filter(todo => todo.id !== JSON.parse(body).id);
            res.end(JSON.stringify(todos));
        });
    }
})

server.listen(3000, () => {
    console.log('listening on port 3000');
});