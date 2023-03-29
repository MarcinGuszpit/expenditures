const mysql = require('mysql2');
const pool = mysql.createPool({
    host: '192.168.1.151',
    user: 'expend_user',
    password: 'cp2BqlM0bggvraRBEpN2',
    database: 'Expenditures',
});

module.exports = {
    connectionPool: pool.promise()
}