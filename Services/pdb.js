const Pool = require('pg').Pool
const pool = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'dvdrental',
    password: 'password',
    port: 5434,
});
module.exports = pool;