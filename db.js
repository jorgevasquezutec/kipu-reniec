const mysql = require('mysql2');
const config = require('./config');

const connection = mysql.createConnection({
    host: config.DB_HOST,
    user: config.DB_USERNAME,
    database: config.DB_DATABASE,
    password: config.DB_PASSWORD,
    port: config.DB_PORT
});

module.exports= {
    connection : connection
}