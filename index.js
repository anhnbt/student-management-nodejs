const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const port = 3000;

const upload = multer({dest : 'files/'});

app.use('/files', express.static(path.join(__dirname, 'files')))
app.use(express.json());
app.use(cors({
    origin: '*'
}));

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
    res.send('Welcome to api!');
});

app.get('/api/sinhvien', (req, res) => {
    console.log(req.query);
    let sql = 'SELECT * FROM sinhvien';
    const query = req.query.query;
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
    conn.query(`INSERT INTO sinhvien (ma, hovaten, image_url, email, phone, username, password) VALUES ('${sinhvien.ma}', '${sinhvien.hovaten}', '${sinhvien.image_url}', '${sinhvien.email}', '${sinhvien.phone}', '${sinhvien.username}', '${sinhvien.password}')`, (err, result) => {
        if (err) {
            res.status(500).send('Internal Server Error ' + err.message);
        } else {
            sinhvien.id = result.insertId;
            res.status(201).send(sinhvien);
        }
    });
});

app.put('/api/sinhvien/:id', (req, res) => {
    const id = req.params.id;
    const sinhvien = req.body;
    conn.query(`UPDATE sinhvien SET hovaten = '${sinhvien.hovaten}', image_url = '${sinhvien.image_url}', tuoi = ${sinhvien.tuoi}, gioitinh = ${sinhvien.gioitinh}, diachi = '${sinhvien.diachi}', email = '${sinhvien.email}', phone = '${sinhvien.phone}' WHERE id = ${id}`, (err, result) => {
        if (err) {
            res.status(500).send('Internal Server Error ' + err.message);
        } else {
            console.log(result);
            if (result.affectedRows > 0) {
                res.status(200).send(sinhvien);
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

app.post('/photo/upload', upload.single('avatar'), (req, res) => {
    console.log(req.file, req.body);
    res.status(200).send(req.file);
});

const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);