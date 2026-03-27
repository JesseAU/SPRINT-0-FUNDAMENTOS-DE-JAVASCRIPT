const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menu.controller');
const verifyToken = require('../middlewares/verifyToken');

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

// POST /menu (Ruta protegida)
router.post('/', verifyToken, verificarDatosPlato, menuController.agregarPlato);

// DELETE /menu/:id (Ruta protegida)
router.delete('/:id', verifyToken, menuController.eliminarPlato);

// PUT /menu/:id (Ruta protegida)
router.put('/:id', verifyToken, menuController.actualizarPlato);

module.exports = router;
