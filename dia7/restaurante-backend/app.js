// app.js — solo configuración y conexión
const express = require('express');
const menuRouter = require('./routes/menu.routes');
const authRouter = require('./routes/auth.routes');
const logger = require('./middlewares/logger');
const conectarDB = require('./database/connection');
const { port } = require('./config');

// Conectar a MongoDB antes de levantar el servidor
conectarDB();

const app = express();


// Middlewares globales
app.use(express.json());
app.use(logger); // se ejecuta en TODAS las peticiones

// Rutas
app.use('/auth', authRouter);
app.use('/menu', menuRouter);

// Ruta de bienvenida
app.get('/', (req, res) => {
    res.status(200).json({
        mensaje: 'Restaurante Node API',
        version: '2.0.0',
        rutas: ['/menu']
    });
});

// Exportar app para que los tests puedan usarla
module.exports = app;

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Restaurante corriendo en http://localhost:${port}`);
    });
}
