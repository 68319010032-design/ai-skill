const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: process.env.MYSQLHOST || 'localhost',
    user: process.env.MYSQLUSER || 'root',
    password: process.env.MYSQLPASSWORD || '1234',
    database: process.env.MYSQLDATABASE || 'aidatabase',
    port: process.env.MYSQLPORT || 3306
});

module.exports = pool;
