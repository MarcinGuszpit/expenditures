const mysql = require('mysql2');
const {dataBaseURL, dataBaseUser, dataBasePassword, dataBaseName} = require("../settings/settings");
const pool = mysql.createPool({
    host: dataBaseURL,
    user: dataBaseUser,
    password: dataBasePassword,
    database: dataBaseName,
});

module.exports = {
    connectionPool: pool.promise()
}