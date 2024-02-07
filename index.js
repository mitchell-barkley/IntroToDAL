const http = require('http');
const myEmitter = require('./logEvents');
const {getActors} = require('./Services/actors.dal.js');
const {getAllActorsInAllFilms} = require('./Services/films.dal.js');
const port = 5000;
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
            myEmitter.emit('event', req.url, 'INFO', 'Server started');
            res.writeHead(200, 'Content-Type', 'text/plain');
            res.end('Introduction to Data Access Layers in Node.js');
            break;
        case '/actors/':
            let theActors = await getActors();
            res.writeHead(200, 'Content-Type', 'application/json');
            res.write(JSON.stringify(theActors));
            res.end();
            break;
        case '/films/':
            let theFilms = await getAllActorsInAllFilms();
            res.writeHead(200, 'Content-Type', 'text/plain');
            res.write(JSON.stringify(theFilms));
            res.end('Films');
            break;
        default:
            let message = `404 - Page not found ${req.url}`;
            if(DEBUG) console.log(message);
            myEmitter.emit('event', 'ERROR', message);
            res.writeHead(404, 'Content-Type', 'text/plain');
            res.end(message);
            break;
    }
    
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});