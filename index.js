const http = require('http');
const myEmitter = require('./logEvents');
const port = 3030;
global.DEBUG = true;
const server = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') {
        res.writeHead(200, { 'Content-Type': 'image/x-icon' });
        res.end();
        return;
    }
    if (global.DEBUG) {
        switch (req.url) {
            case '/':
                myEmitter.emit('event', 'INFO', 'Server started');
                res.statusCode = 200;
                res.writeHead(statusCode, 'Content-Type', 'text/plain');
                res.end('Introduction to Data Access Layers in Node.js');
                break;
            case '/actors/':
                myEmitter.emit('event', 'INFO', 'Server started');
                res.statusCode = 200;
                res.writeHead(statusCode, 'Content-Type', 'text/plain');
                res.end('Actors List');
                break;
            default:
                res.statusCode = 404;
                res.writeHead(statusCode, 'Content-Type', 'text/plain');
                res.end('Page not found');
                break;
        }
    }
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});