const http = require('http');
const myEmitter = require('./logEvents');
const port = 3030;
global.DEBUG = true;
const server = http.createServer((req, res) => {
    myEmitter.emit('event', 'INFO', 'Server started');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});