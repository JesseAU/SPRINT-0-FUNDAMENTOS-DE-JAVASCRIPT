// 1) VARIABLES + OBJETOS + ARRAYS
let menu = [
    { nombre: "Arroz con pollo", precio: 12, stock: 5 },
    { nombre: "Lomo saltado", precio: 18, stock: 3 },
    { nombre: "Sopa", precio: 8, stock: 10 },
    { nombre: "Ceviche Mixto", precio: 25, stock: 7 }, // Plato real 1 (Estudiante A)
    { nombre: "Ají de Gallina", precio: 15, stock: 4 }  // Plato real 2 (Estudiante A)
];

// 2) FUNCIÓN: renderizar (mostrar) el menú en pantalla
function renderMenu() {
    const output = document.getElementById("output");
    output.innerHTML = ""; // limpiar

    // crear una lista HTML simple
    let html = "<ul>";

    for (let i = 0; i < menu.length; i++) {
        const plato = menu[i];
        html += `<li>${plato.nombre} — S/ ${plato.precio} — Stock: ${plato.stock}</li>`;
    }

    html += "</ul>";

    // Tarea 3: Función extra obligatoria integrada en renderMenu o llamada aparte
    html += `<p><strong>${contarPlatos()}</strong></p>`;

    output.innerHTML = html;
}

// 3) FUNCIÓN: agregar un plato demo al menú
// Tarea 2: Modificar para que agregue un plato distinto (Estudiante B)
function agregarPlatoDemo() {
    const nuevoPlato = {
        nombre: "Tacu Tacu con Sábana",
        precio: 22,
        stock: 6
    };
    menu.push(nuevoPlato);
}

// Tarea 3: Función contarPlatos (Estudiante A)
function contarPlatos() {
    return `Total de platos en el menú: ${menu.length}`;
}

// 4) EVENTOS: conectar botones con funciones (Estudiante B)
document.getElementById("btnMostrar").addEventListener("click", () => {
    renderMenu();
});

document.getElementById("btnAgregar").addEventListener("click", () => {
    agregarPlatoDemo();
    renderMenu();
});
