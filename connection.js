const mysql = require('mysql');
const config = require('./config');

const connection = mysql.createConnection({
    host: config.db_host,
    user: config.db_user,
    password: config.db_password,
    database: config.db
});

connection.connect((err) => {
    if(err){
        return console.log(err.message);
    }
    console.log("Connected to mysql server");
});

module.exports = {connection};