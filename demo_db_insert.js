const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'studentmanagement'
});

conn.query('INSERT INTO students (hovaten, tuoi) VALUES (\'LAMNBT\', 3)', (err, result) => {
    if (err) throw err;
    console.log('1 record inserted, ID = ' + result.insertId);
});