const express = require('express');
const app = express();
const menuRouter = require('./routes/menu.routes');
const logger = require('./middlewares/logger');

// Middlewares globales
app.use(express.json());
app.use(logger);

// Rutas
app.use('/menu', menuRouter);

// Ruta de bienvenida
app.get('/', (req, res) => {
    res.json({ mensaje: 'Bienvenido a la API del Restaurante - Día 3 (Express, Arreglos)' });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor de Día 3 corriendo en http://localhost:${PORT}`);
});
