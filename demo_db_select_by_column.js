const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'studentmanagement'
});

// conn.query('SELECT hovaten, tuoi FROM students', (err, result) => {
//     if (err) throw err;
//     console.log(result);
// });

conn.query('SELECT hovaten, tuoi FROM students', (err, result, fields) => {
    if (err) throw err;
    console.log(fields);
    console.log(fields[1].name);
})