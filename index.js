const http = require('http');
const myEmitter = require('./logEvents');
const getActors = require('./Services/actors.dal');
const port = 3030;
global.DEBUG = true;

const server = http.createServer(async (req, res) => {
    if (req.url === '/favicon.ico') {
        res.writeHead(204, { 'Content-Type': 'image/x-icon' });
        res.end();
        return;
    }
    if (DEBUG) console.log('Request received');
    switch (req.url) {
        case '/':
            myEmitter.emit('event',request.url, 'INFO', 'Server started');
            res.statusCode = 200;
            res.writeHead(statusCode, 'Content-Type', 'text/plain');
            res.end('Introduction to Data Access Layers in Node.js');
            break;
        case '/actors/':
            let theActors = await getActors();
            myEmitter.emit('event', 'INFO', 'Server started');
            res.statusCode = 200;
            res.writeHead(statusCode, 'Content-Type', 'application/json');
            res.write(JSON.stringify(theActors));
            res.end();
            break;
        default:
            let message = `404 - Page not found ${req.url}`;
            if(DEBUG) console.log(message);
            myEmitter.emit('event', 'ERROR', message);
            res.statusCode = 404;
            res.writeHead(statusCode, 'Content-Type', 'text/plain');
            res.end(message);
            break;
    }
    
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});