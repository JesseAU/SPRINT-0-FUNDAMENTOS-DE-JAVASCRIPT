// app.js — Servidor HTTP del Restaurante (Día 2 Nativo)
const http = require('http');
const { URL } = require('url');

// Los mismos datos del Sprint 0, ahora en el servidor
let menu = [
    { id: 1, nombre: 'Lomo saltado', categoria: 'segundos', precio: 18, stock: 3, disponible: true },
    { id: 2, nombre: 'Arroz con pollo', categoria: 'segundos', precio: 12, stock: 5, disponible: true },
    { id: 3, nombre: 'Sopa', categoria: 'entradas', precio: 8, stock: 10, disponible: true }
];

const PORT = 5000;
const HOST = 'localhost';

const server = http.createServer((req, res) => {
    try {
        // --- GET / (Ruta de inicio) ---
        if (req.url === '/' && req.method === 'GET') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
                mensaje: 'Bienvenido al Restaurante Node',
                version: '1.0.0',
                rutas: ['/menu', '/menu?nombre=Sopa']
            }));
            return;
        }

        // --- GET /menu (Obtener menú o buscar) ---
        if (req.url.startsWith('/menu') && req.method === 'GET') {
            const parsedUrl = new URL(req.url, `http://${HOST}:${PORT}`);
            const nombre = parsedUrl.searchParams.get('nombre');

            if (nombre) {
                const plato = menu.find(
                    p => p.nombre.toLowerCase().includes(nombre.toLowerCase())
                );

                if (!plato) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: `Plato '${nombre}' no encontrado` }));
                    return;
                }

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(plato));
                return;
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(menu));
            return;
        }

        // --- POST /menu (Agregar nuevo plato) ---
        if (req.url === '/menu' && req.method === 'POST') {
            let body = '';

            // El body llega en partes — se va juntando
            req.on('data', chunk => {
                body += chunk;
            });

            // Cuando terminaron de llegar todos los datos
            req.on('end', () => {
                try {
                    const nuevoPlato = JSON.parse(body);

                    // Validar que tenga los campos necesarios
                    if (!nuevoPlato.nombre || !nuevoPlato.precio) {
                        res.statusCode = 400;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ error: 'Se requieren nombre y precio' }));
                        return;
                    }

                    // Agregar el plato al menú
                    const plato = {
                        id: menu.length + 1,
                        nombre: nuevoPlato.nombre,
                        categoria: nuevoPlato.categoria || 'sin categoría',
                        precio: nuevoPlato.precio,
                        stock: nuevoPlato.stock || 0,
                        disponible: (nuevoPlato.stock || 0) > 0
                    };

                    menu.push(plato);

                    // 201 Created
                    res.statusCode = 201;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({
                        mensaje: 'Plato agregado correctamente',
                        plato: plato
                    }));

                } catch (parseError) {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: 'JSON inválido' }));
                }
            });
            return;
        }

        // --- 404 — Ruta no encontrada ---
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Ruta no encontrada' }));

    } catch (error) {
        // --- 500 — Error interno del servidor ---
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Error interno del servidor' }));
        console.error('Error:', error.message);
    }
});

server.listen(PORT, HOST, () => {
    console.log(`Restaurante corriendo en http://${HOST}:${PORT}`);
});
