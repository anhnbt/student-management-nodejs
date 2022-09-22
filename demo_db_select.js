const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'studentmanagement'
});

conn.connect(err => {
    if (err) throw err;
    console.log('Connected');
});

conn.query('SELECT * FROM students', (err, result) => {
    if (err) throw err;
    console.log(result);
});