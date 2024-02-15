global.DEBUG = false;
const dal = require('./pdb.js');

var getAllActorsInAllFilms = function () {
    if(DEBUG) console.log('Getting all actors in all films');
    return new Promise(function (resolve, reject) {

        const sql1 = `SELECT actor.first_name,
        actor.last_name,
        actor.last_name,
        film.release_year,
        film.title
        film.rating
        FROM film
        JOIN film_actor
        USING (film_id)
        JOIN actor
        USING (actor_id)
        ORDER BY actor.last_name, ASC LIMIT 25;`;

        const sql2 = "SELECT film_id, title, first_name, last_name FROM film \
        JOIN film_actor USING (film_id) \
        JOIN actor USING (actor_id) \
        ORDER BY film_id, first_name, last_name;";

        const sql3 = `SELECT * FROM film_actor
        ORDER BY last_name ASC LIMIT 25;`;

        dal.query(sql2, [], (err, result) => {
            if (err) {
                if(DEBUG) console.log('Error getting actors');
                reject(err);
            } else {
                if(DEBUG) console.log('Got actors');
                if(DEBUG) console.log(result.rows);
                resolve(result.rows);
            }
        });
    });
}

var getFilms = function () {
    if(DEBUG) console.log('Getting films');
    return new Promise(function (resolve, reject) {

        const sql = "SELECT film_id, title, release_year FROM film \
        ORDER BY film_id DESC;";

        dal.query(sql, [], (err, result) => {
            if (err) {
                if(DEBUG) console.log('Error getting films');
                reject(err);
            } else {
                if(DEBUG) console.log('Got films');
                if(DEBUG) console.log(result.rows);
                resolve(result.rows);
            }
        });
    });

}

var getFilmById = function (id) {
    if(DEBUG) console.log('Getting film');
    return new Promise(function (resolve, reject) {

        const sql = "SELECT film_id, title, release_year FROM film \
        WHERE film_id = $1;";

        dal.query(sql, [id], (err, result) => {
            if (err) {
                if(DEBUG) console.log('Error getting film');
                reject(err);
            } else {
                if(DEBUG) console.log('Got film');
                if(DEBUG) console.log(result.rows);
                resolve(result.rows);
            }
        });
    });

}

module.exports = {
    getAllActorsInAllFilms,
    getFilmById,
    getFilms
}