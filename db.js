const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',     
    database: 'aidatabase'
});

module.exports = pool;
