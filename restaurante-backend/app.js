// app.js — solo configuración y conexión
const express = require('express');
const menuRouter = require('./routes/menu.routes');
const logger = require('./middlewares/logger');
const conectarDB = require('./database/connection');

// Conectar a MongoDB antes de levantar el servidor
conectarDB();

const app = express();
const PORT = 3000;


// Middlewares globales
app.use(express.json());
app.use(logger); // se ejecuta en TODAS las peticiones

// Conectar el router del menú
app.use('/menu', menuRouter);

// Ruta de bienvenida
app.get('/', (req, res) => {
    res.status(200).json({
        mensaje: 'Restaurante Node API',
        version: '2.0.0',
        rutas: ['/menu']
    });
});

app.listen(PORT, () => {
    console.log(`Restaurante corriendo en http://localhost:${PORT}`);
});
