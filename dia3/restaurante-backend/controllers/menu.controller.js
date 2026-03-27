let menu = [
    { id: 1, nombre: 'Pizza Margarita', precio: 10, stock: 5, categoria: 'Italiana' },
    { id: 2, nombre: 'Spaghetti Carbonara', precio: 12, stock: 3, categoria: 'Italiana' },
    { id: 3, nombre: 'Tacos al Pastor', precio: 8, stock: 10, categoria: 'Mexicana' }
];

// Operaciones CRUD sobre el arreglo local
exports.obtenerMenu = (req, res) => {
    res.json(menu);
};

exports.buscarPlato = (req, res) => {
    const id = parseInt(req.params.id);
    const plato = menu.find(p => p.id === id);
    
    if (plato) {
        res.json(plato);
    } else {
        res.status(404).json({ mensaje: 'Plato no encontrado' });
    }
};

exports.agregarPlato = (req, res) => {
    const { nombre, precio, stock, categoria } = req.body;
    
    const nuevoPlato = {
        id: menu.length > 0 ? Math.max(...menu.map(p => p.id)) + 1 : 1,
        nombre,
        precio,
        stock,
        categoria
    };
    
    menu.push(nuevoPlato);
    res.status(201).json({ mensaje: 'Plato agregado', plato: nuevoPlato });
};

exports.eliminarPlato = (req, res) => {
    const id = parseInt(req.params.id);
    const index = menu.findIndex(p => p.id === id);
    
    if (index !== -1) {
        menu.splice(index, 1);
        res.json({ mensaje: 'Plato eliminado' });
    } else {
        res.status(404).json({ mensaje: 'Plato no encontrado' });
    }
};

exports.actualizarPlato = (req, res) => {
    const id = parseInt(req.params.id);
    const index = menu.findIndex(p => p.id === id);
    
    if (index !== -1) {
        menu[index] = { ...menu[index], ...req.body, id };
        res.json({ mensaje: 'Plato actualizado', plato: menu[index] });
    } else {
        res.status(404).json({ mensaje: 'Plato no encontrado' });
    }
};
