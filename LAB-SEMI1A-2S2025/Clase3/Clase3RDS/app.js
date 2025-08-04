const express = require('express');
const mysql = require('mysql2'); 
const bodyParser = require('body-parser');
const credenciales = require('./credenciales');

const app = express();
const port = 9000; 

// Middleware para parsear JSON y URL-encoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Crear el pool de conexiones a la base de datos
const pool = mysql.createPool(credenciales);

// Verificar la conexión a la base de datos
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err);
        return;
    }
    if (connection) connection.release();
    console.log('Conexión a la base de datos exitosa');
});

// Ruta para obtener todos los estudiantes
app.get('/estudiantes', (req, res) => {
    pool.query('SELECT * FROM estudiantes', (err, results) => {
        if (err) {
            console.error('Error al obtener los estudiantes:', err);
            return res.status(500).send({ message: 'Error en la base de datos' });
        }
        res.json(results); 
    });
});

// Ruta para insertar un nuevo estudiante
app.post('/estudiantes', (req, res) => {
    const { nombre, apellido, edad, correo, fecha_inscripcion } = req.body;

    const query = 'INSERT INTO estudiantes (nombre, apellido, edad, correo, fecha_inscripcion) VALUES (?, ?, ?, ?, ?)';
    const values = [nombre, apellido, edad, correo, fecha_inscripcion];

    pool.query(query, values, (err, result) => {
        if (err) {
            console.error('Error al insertar el estudiante:', err);
            return res.status(500).send({ message: 'Error al insertar datos en la base de datos' });
        }
        res.send({ message: 'Estudiante insertado exitosamente', result });
    });
});

// Arrancar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
