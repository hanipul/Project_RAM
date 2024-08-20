const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../frontend')));

// Connect to database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'project_ram'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

// Create Account Routing
app.post('/createaccount', (req, res) => {
    const { nik, nama, nomor, email, telegram, unit, witel } = req.body;

    const sql = 'INSERT INTO accounts (nik, nama, nomor, email, telegram, unit, witel) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [nik, nama, nomor, email, telegram, unit, witel], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Server error, please try again later.');
            return;
        }
        res.redirect('/login.html');
    });
});

// Create User Routing
app.post('/createuser', (req, res) => {
    const { email, password } = req.body;

    const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
    db.query(sql, [email, password], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Server error, please try again later.');
            return;
        }
        res.redirect('/login.html');
    });
});

// Run the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
