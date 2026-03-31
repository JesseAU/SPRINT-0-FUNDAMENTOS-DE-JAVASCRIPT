// controllers/menu.controller.js
const platoService = require('../services/plato.service');

// obtenerTodos
exports.obtenerMenu = async (req, res) => {
    try {
        const platos = await platoService.obtenerTodos();
        res.status(200).json(platos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// buscarPorId
exports.buscarPlato = async (req, res) => {
    try {
        const { id } = req.params;
        const plato = await platoService.buscarPorId(id);
        if (!plato) {
            return res.status(404).json({ error: 'Plato no encontrado' });
        }
        res.status(200).json(plato);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// agregarPlato (POST)
exports.agregarPlato = async (req, res) => {
    try {
        const { nombre, precio, stock, categoria } = req.body;
        if (!nombre || !precio) {
            return res.status(400).json({ error: 'nombre y precio son obligatorios' });
        }
        
        const nuevo = await platoService.crear(req.body);
        res.status(201).json({ mensaje: 'Plato creado', plato: nuevo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// actualizarPlato (PUT)
exports.actualizarPlato = async (req, res) => {
    try {
        const { id } = req.params;
        const plato = await platoService.actualizar(id, req.body);
        if (!plato) {
            return res.status(404).json({ error: 'Plato no encontrado' });
        }
        res.status(200).json({ mensaje: 'Plato actualizado', plato });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// eliminarPlato (DELETE)
exports.eliminarPlato = async (req, res) => {
    try {
        const { id } = req.params;
        const plato = await platoService.eliminar(id);
        if (!plato) {
            return res.status(404).json({ error: 'Plato no encontrado' });
        }
        res.status(200).json({ mensaje: 'Plato eliminado', plato });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// buscarPorNombre (GET /menu/buscar?nombre=...)
exports.buscarPorNombre = async (req, res) => {
    try {
        const { nombre } = req.query;
        if (!nombre) {
            return res.status(400).json({ error: 'El parámetro nombre es obligatorio' });
        }
        const platos = await platoService.buscarPorNombre(nombre);
        res.status(200).json(platos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// filtrarPorCategoria (GET /menu/categoria/:categoria)
exports.filtrarPorCategoria = async (req, res) => {
    try {
        const { categoria } = req.params;
        const platos = await platoService.buscarPorCategoria(categoria);
        res.status(200).json(platos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
