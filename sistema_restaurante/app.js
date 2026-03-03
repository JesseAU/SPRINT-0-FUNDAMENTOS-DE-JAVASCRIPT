// Gestión del menú del restaurante
let menu = [
    { nombre: "Arroz con pollo", precio: 12, stock: 5 },
    { nombre: "Lomo saltado", precio: 18, stock: 3 },
    { nombre: "Sopa", precio: 8, stock: 10 },
    { nombre: "Ceviche Mixto", precio: 25, stock: 7 },
    { nombre: "Ají de Gallina", precio: 15, stock: 4 }
];

// Muestra el menú completo en la página
function renderMenu() {
    const output = document.getElementById("output");
    output.innerHTML = "";

    let html = "<ul>";
    for (let i = 0; i < menu.length; i++) {
        const plato = menu[i];
        html += `<li>${plato.nombre} — S/ ${plato.precio} — Stock: ${plato.stock}</li>`;
    }
    html += "</ul>";

    html += `<p><strong>${contarPlatos()}</strong></p>`;
    output.innerHTML = html;
}

// Función reutilizable para mostrar cualquier lista de textos (Day 4)
function renderLista(titulo, listaDeTextos) {
    const output = document.getElementById("output");
    output.innerHTML = `<h3>${titulo}</h3>`;

    if (listaDeTextos.length === 0) {
        output.innerHTML += "<p>No se encontraron resultados.</p>";
        return;
    }

    let html = "<ul>";
    listaDeTextos.forEach(texto => {
        html += `<li>${texto}</li>`;
    });
    html += "</ul>";
    output.innerHTML += html;
}

// Buscar plato por nombre usando .find() (Day 4)
function buscarPlatoPorNombre(nombre) {
    const encontrado = menu.find(plato => plato.nombre.toLowerCase() === nombre.toLowerCase());
    if (encontrado) {
        renderLista("Resultado de búsqueda", [`${encontrado.nombre} — S/ ${encontrado.precio} (Stock: ${encontrado.stock})`]);
    } else {
        document.getElementById("output").innerHTML = "<h3>No encontrado</h3>";
    }
}

// Filtrar platos con poco stock usando .filter() (Day 4)
function filtrarStockBajo() {
    const bajos = menu.filter(plato => plato.stock <= 3);
    const textos = bajos.map(plato => `${plato.nombre} — Stock: ${plato.stock}`);
    renderLista("Platos con Stock Bajo", textos);
}

// Resumen rápido del menú usando .map() (Day 4)
function obtenerResumenMenu() {
    const resumen = menu.map(plato => `${plato.nombre} — S/ ${plato.precio}`);
    renderLista("Resumen del Menú", resumen);
}

// Lógica de venta con validación de stock (Day 4)
function venderPlato(nombre) {
    const plato = menu.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());

    if (!plato) {
        alert("El plato no existe en el menú.");
        return;
    }

    if (plato.stock > 0) {
        plato.stock--;
        alert(`¡Venta realizada! Ahora quedan ${plato.stock} de ${plato.nombre}.`);
        renderMenu();
    } else {
        alert("¡Stock insuficiente!");
    }
}

function agregarPlatoDemo() {
    const nuevoPlato = {
        nombre: "Tacu Tacu con Sábana",
        precio: 22,
        stock: 6
    };
    menu.push(nuevoPlato);
    renderMenu();
}

function contarPlatos() {
    return `Tenemos ${menu.length} platos disponibles hoy.`;
}

// Eventos de los botones
document.getElementById("btnMostrar").addEventListener("click", () => renderMenu());
document.getElementById("btnAgregar").addEventListener("click", () => agregarPlatoDemo());

document.getElementById("btnBuscar").addEventListener("click", () => {
    const nombre = document.getElementById("inputBuscar").value;
    buscarPlatoPorNombre(nombre);
});

document.getElementById("btnStockBajo").addEventListener("click", () => filtrarStockBajo());
document.getElementById("btnResumen").addEventListener("click", () => obtenerResumenMenu());
