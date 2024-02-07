global.DEBUG = true;
const dal = require('./pdb');

var getActors = function () {
    if(DEBUG) console.log('Getting actors');
    return new Promise(function (resolve, reject) {
        const sql = "SELECT actor_id, first_name, last_name FROM actor \
        ORDER BY actor_id DESC LIMIT 10;";
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

module.exports = {
    getActors,
}