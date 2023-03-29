//const express = require('express')
//const app = express();
const { connectionPool } = require('./utils/database');

console.log('should work')

connectionPool.execute('SELECT * FROM TAX_RATES').then((results) => {
    console.log(results[0]);
    return connectionPool.end();
}).then(() => {
    console.log('connection ended');
}).catch((err) => {
    console.log('err:' + err);
});



// app.use((req, res, next) => {
//     res.send('Działa');
// });

// app.listen(4580);
