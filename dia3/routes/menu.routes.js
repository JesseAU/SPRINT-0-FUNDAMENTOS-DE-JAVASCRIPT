const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menu.controller');

// Middleware de validación para el POST (Día 3 simple)
const verificarDatosPlato = (req, res, next) => {
    const { nombre, precio } = req.body;
    if (!nombre || !precio) {
        return res.status(400).json({ mensaje: 'Nombre y precio son obligatorios' });
    }
    next();
};

// Rutas del menú
router.get('/', menuController.obtenerMenu);
router.get('/:id', menuController.buscarPlato);
router.post('/', verificarDatosPlato, menuController.agregarPlato);
router.delete('/:id', menuController.eliminarPlato);
router.put('/:id', menuController.actualizarPlato);

module.exports = router;
