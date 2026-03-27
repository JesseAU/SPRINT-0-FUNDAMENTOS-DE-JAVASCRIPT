// routes/menu.routes.js
const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menu.controller');

// Middleware de validación para el POST
const verificarDatosPlato = (req, res, next) => {
    const { nombre, precio } = req.body;
    if (!nombre || !precio) {
        return res.status(400).json({
            error: 'Middleware: nombre y precio son obligatorios'
        });
    }

    if (precio <= 0) {
        return res.status(400).json({
            error: 'Middleware: el precio debe ser mayor a cero'
        });
    }

    next(); // Datos válidos -> continuar al controlador
};

// GET /menu
router.get('/', menuController.obtenerMenu);

// GET /menu/:id
router.get('/:id', menuController.buscarPlato);

// POST /menu
router.post('/', verificarDatosPlato, menuController.agregarPlato);

// DELETE /menu/:id
router.delete('/:id', menuController.eliminarPlato);

// PUT /menu/:id
router.put('/:id', menuController.actualizarPlato);

module.exports = router;
