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

conn.query('CREATE TABLE sinhvien (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, ma VARCHAR(20) NOT NULL, hovaten VARCHAR(100) NOT NULL, image_url VARCHAR(255) NULL, tuoi TINYINT NULL, gioitinh TINYINT NULL, diachi VARCHAR(255) NULL, email VARCHAR(100) NULL, phone VARCHAR(20) NULL, username VARCHAR(30) NOT NULL, password VARCHAR(50) NOT NULL)', (err, result) => {
    if (err) throw err;
    console.log('Table created', result);
})