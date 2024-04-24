const dotenv = require('dotenv');
dotenv.config();

module.exports= {
    RENIEC_URL: process.env.RENIEC_URL,
    RENIEC_TOKEN: process.env.RENIEC_TOKEN,
    DB_CONNECTION : process.env.DB_CONNECTION,
    DB_HOST : process.env.DB_HOST,
    DB_USERNAME : process.env.DB_USERNAME,
    DB_PASSWORD : process.env.DB_PASSWORD,
    DB_DATABASE : process.env.DB_DATABASE,
    DB_PORT : process.env.DB_PORT,
    DNI_PATH: process.env.DNI_PATH
}