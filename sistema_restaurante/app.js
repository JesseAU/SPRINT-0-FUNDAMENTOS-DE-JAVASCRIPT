// Gestión del menú del restaurante
let menu = [
    { nombre: "Arroz con pollo", precio: 12, stock: 5 },
    { nombre: "Lomo saltado", precio: 18, stock: 3 },
    { nombre: "Sopa", precio: 8, stock: 10 },
    { nombre: "Ceviche Mixto", precio: 25, stock: 7 },
    { nombre: "Ají de Gallina", precio: 15, stock: 4 }
];

// Muestra el menú en la página
function renderMenu() {
    const output = document.getElementById("output");
    output.innerHTML = ""; // Limpiamos antes de mostrar

    let html = "<ul>";
    for (let i = 0; i < menu.length; i++) {
        const plato = menu[i];
        html += `<li>${plato.nombre} — S/ ${plato.precio} — Stock: ${plato.stock}</li>`;
    }
    html += "</ul>";

    // Agregamos el contador total al final
    html += `<p><strong>${contarPlatos()}</strong></p>`;
    output.innerHTML = html;
}

// Agregamos un plato extra para probar el sistema
function agregarPlatoDemo() {
    const nuevoPlato = {
        nombre: "Tacu Tacu con Sábana",
        precio: 22,
        stock: 6
    };
    menu.push(nuevoPlato);
}

function contarPlatos() {
    return `Tenemos ${menu.length} platos disponibles hoy.`;
}

// Conexión con los botones del HTML
document.getElementById("btnMostrar").addEventListener("click", () => {
    renderMenu();
});

document.getElementById("btnAgregar").addEventListener("click", () => {
    agregarPlatoDemo();
    renderMenu();
});
