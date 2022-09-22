const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

app.use(express.json());

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'studentmanagement'
});

conn.connect((err) => {
    if (err) throw err;
    console.log('Connected');
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/sinhvien', (req, res) => {
    console.log(req.query);
    let sql = 'SELECT * FROM sinhvien';
    const query = req.query.q;
    if (query) {
        sql += ' WHERE LOWER(hovaten) LIKE \'%' + query.toLowerCase() + '%\' OR phone LIKE \'%' + query.toLowerCase() + '%\'';
    }
    conn.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get('/api/sinhvien/:id', (req, res) => {
    const id = req.params.id;
    conn.query('SELECT * FROM sinhvien WHERE id = ?', [id], (err, result) => {
        if (err) {
            res.status(500).send('Internal Server Error ' + err.message);
        } else {
            res.status(200).send(result);
        }
    });
});

app.post('/api/sinhvien', (req, res) => {
    const sinhvien = req.body;
    conn.query(`INSERT INTO sinhvien (ma, hovaten, email, username, password) VALUES ('${sinhvien.ma}', '${sinhvien.hovaten}', '${sinhvien.email}', '${sinhvien.username}', '${sinhvien.password}')`, (err, result) => {
        if (err) {
            res.status(500).send('Internal Server Error ' + err.message);
        } else {
            res.status(201).send(sinhvien);
        }
    });
});

app.put('/api/sinhvien/:id', (req, res) => {
    const id = req.params.id;
    const sinhvien = req.body;
    conn.query(`UPDATE sinhvien SET hovaten = '${sinhvien.hovaten}', tuoi = ${sinhvien.tuoi}, gioitinh = ${sinhvien.gioitinh}, diachi = '${sinhvien.diachi}', phone = '${sinhvien.phone}' WHERE id = ${id}`, (err, result) => {
        if (err) {
            res.status(500).send('Internal Server Error ' + err.message);
        } else {
            console.log(result);
            if (result.affectedRows > 0) {
                res.status(200).send('OK');
            } else {
                res.status(200).send('Internal Server Error');
            }
        }
    });
});

app.delete('/api/sinhvien/:id', (req, res) => {
    const id = req.params.id;
    console.log('id', id);
    conn.query('DELETE FROM sinhvien WHERE id = ?', [id], (err, result) => {
        console.log(result);
        if (err) {
            res.status(500).send('Internal Server Error ' + err.message);
        } else {
            if (result.affectedRows > 0) {
                res.status(200).send('OK');
            } else {
                res.status(200).send('Internal Server Error');
            }
        }
    })
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});