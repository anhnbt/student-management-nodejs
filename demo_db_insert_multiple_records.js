const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'studentmanagement'
});

const values = [
    ['Tuấn Anh', 27],
    ['Khoai Tây', 3]
]
conn.query('INSERT INTO sinhvien (hovaten, tuoi) VALUES ?', [values], (err, result) => {
    if (err) throw err;
    console.log('Number of records inserted ' + result.affectedRows);
});