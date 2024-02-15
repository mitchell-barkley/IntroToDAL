const express = require('express');
const app = express();
const {getActors, getActorById} = require('./Services/actors.dal.js');
const {getFilms, getFilmById} = require('./Services/films.dal.js');
const { get } = require('http');

const PORT = 4000;
global.DEBUG = false;

// app.get();
// app.post();
// app.put();
// app.patch();
// app.delete();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    console.log('Request received for home page.');
    res.send('Introduction to Data Access Layers in Node.js');
});

app.get('/about', (req, res) => {
    console.log('Request received for about page.');
    res.send('About page');
});

app.get('/page', (req, res) => {
    console.log('Render a webpage at route /page.');
    res.render('page.ejs');

});

app.get('/actors', async (req, res) => {
    console.log('Request received for actors page.');
    let actors = await getActors();
    res.writeHead(200, 'Content-Type', 'application/json');
    res.write(JSON.stringify(actors));
    res.end();
    // res.send('Actors page');
});

app.get('/actors/:id', async (req, res) => {
    console.log('Request received for actors page.');
    // res.send(`Actor ID: ${req.params.id}`);
    let actor = await getActorById(req.params.id);
    res.writeHead(200, 'Content-Type', 'application/json');
    res.write(JSON.stringify(actor));
    res.end();
    // getActorById(req.params.id)
});

app.get('/films', async (req, res) => {
    console.log('Request received for films page.');
    let films = await getFilms();
    res.writeHead(200, 'Content-Type', 'application/json');
    res.write(JSON.stringify(films));
    res.end();
    // res.send('Films page');
});

app.get('/films/:id', async (req, res) => {
    console.log('Request received for films page.');
    // res.send(`Film ID: ${req.params.id}`);
    let film = await getFilmById(req.params.id);
    res.writeHead(200, 'Content-Type', 'application/json');
    res.write(JSON.stringify(film));
    res.end();
    // getFilmById(req.params.id)
});

app.use((req, res) => {
    console.log('404 - Page not found');
    res.status(404).send('404 - Page not found');
    res.end();
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});