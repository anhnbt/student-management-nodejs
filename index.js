var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'studentmanagement'
});

con.connect(function(err) {
    if (err) throw err;
    console.log('Connected!');
    
    // con.query("CREATE DATABASE stu_db", function(err, result) {
    //     if (err) throw err;
    //     console.log('Database created');
    // });

    // con.query("DROP DATABASE stu_db", function(err, result) {
    //     if (err) throw err;
    //     console.log('Database drop!');
    // });

    // var sql = "CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))";
    // con.query(sql, function(err, result) {
    //     if (err) throw err;
    //     console.log('Table created');
    // });

    // var sqlCreate = "CREATE TABLE students (ma VARCHAR(255), hovaten VARCHAR(255), image_url VARCHAR(255), tuoi INT(11), gioitinh INT(1), diachi VARCHAR(255), email VARCHAR(255), phone VARCHAR(255), username VARCHAR(255), password VARCHAR(255))";
    // con.query(sqlCreate, function(err, result) {
    //     if (err) throw err;
    //     console.log('Table created');
    // });

    // var sqlAlterStudent = "ALTER TABLE students ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY";
    // con.query(sqlAlterStudent, function(err, result) {
    //     if (err) throw err;
    //     console.log('Table altered');
    // });

    // var sqlInsert = "INSERT INTO students (hovaten, tuoi) VALUES ('AnhNBT', 27)";
    // con.query(sqlInsert, function(err, result) {
    //     if (err) throw err;
    //     console.log('1 record inserted, ID: ' + result.insertId);
    // });

    // var sqlInsertMultipleRecords = 'INSERT INTO students (hovaten, tuoi) VALUES ?';
    // var values = [
    //     ['Rose', 27],
    //     ['Khoai Tay', 3],
    //     ['Tung Lam', 3],
    //     ['Hong Nguyen', 27]
    // ];
    // con.query(sqlInsertMultipleRecords, [values], function(err, result) {
    //     if (err) throw err;
    //     console.log('Number of records inserted ' + result.affectedRows);
    // });

    con.query('SELECT * FROM students', function(err, result) {
        if (err) throw err;
        console.log(result);
    });
});