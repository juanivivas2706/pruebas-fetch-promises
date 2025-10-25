require('dotenv').config();
const mysql = require('mysql2');
const express = require('express');
const { randomizePatente, getRandomInt } = require('./functions');
const { get } = require('http');

const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

app.get('/', (req, res) => {
    res.status(200).send('Server is running');
    next();
});

app.get('/usuarios', (req, res) => {
    console.log("gola");
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) { return res.status(500).send('Database query error'); }

        return res.status(200).send("Resultados: " + JSON.stringify(results));
    });
});

app.get('/autos', (req, res) => {
    db.query('SELECT * FROM autos', (err, results) => {
        if (err) { return res.status(500).send('Database query error'); }

        return res.status(200).send("Resultados: " + JSON.stringify(results));
    });
});

app.get('/addUsuario', (req, res) => {
    db.query("INSERT INTO usuarios (nombre, apellido) VALUES ('Rodri', 'Galati')", (err, results) => {
        if (err) { return res.status(500).send('Database query error'); }

        return res.status(200).send("Usuario agregado");
    });
});

app.get('/addAuto', (req, res) => {
    db.query("INSERT INTO autos (idUser, patente) VALUES (?, ?)", [getRandomInt(1, 3), randomizePatente()], (err, results) => {
        if (err) { return res.status(500).send('Database query error'); }

        return res.status(200).send("Auto agregado");
    });
});

app.get('/deleteUser/:id', (req, res) => {
    const userId = req.params.id;
    console.log("Deleting user with ID:", userId);

    db.query("DELETE FROM usuarios WHERE id = ?", [userId], (err, results) => {
        if (err) { return res.status(500).send('Database query error'); }

        return res.status(200).send("Usuario eliminado");
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port http://localhost:${process.env.PORT}`);
});