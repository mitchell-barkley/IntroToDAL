global.DEBUG = true;
const dal = require('./pdb.js');

var getAllActorsInAllFilms = function () {
    if(DEBUG) console.log('Getting all actors in all films');
    return new Promise(function (resolve, reject) {

        const sql = "SELECT film_id, title, first_name, last_name FROM film \
        JOIN film_actor USING (film_id) \
        JOIN actor USING (actor_id) \
        ORDER BY film_id, first_name, last_name;";

        dal.query(sql, [], (err, result) => {
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
}