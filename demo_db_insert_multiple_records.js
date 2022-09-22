const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'studentmanagement'
});

const values = [
    ['Son', 59],
    ['Chien', 57]
]
conn.query('INSERT INTO students (hovaten, tuoi) VALUES ?', [values], (err, result) => {
    if (err) throw err;
    console.log('Number of records inserted ' + result.affectedRows);
});