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

        // Reglas de Estado del Día 5
        let clase = "normal";
        let textoExtra = "";

        if (plato.stock === 0) {
            clase = "agotado";
            textoExtra = " - AGOTADO";
        } else if (plato.stock <= 3) {
            clase = "bajo";
            textoExtra = " - Stock bajo";
        }

        html += `<li class="${clase}">${plato.nombre} — S/ ${plato.precio} — Stock: ${plato.stock}${textoExtra}</li>`;
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

// Resumen rápido del menú usando .map() (Day 4/5)
function obtenerResumenMenu() {
    const resumen = menu.map(plato => {
        let clase = "normal";
        if (plato.stock === 0) clase = "agotado";
        else if (plato.stock <= 3) clase = "bajo";

        return `<span class="${clase}">${plato.nombre} — S/ ${plato.precio}</span>`;
    });
    renderLista("Resumen del Menú", resumen);
}

// Lógica de venta con validación estricta de stock (Day 5)
function venderPlato(nombre) {
    const plato = menu.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());

    if (!plato) {
        alert("El plato no existe en el menú.");
        return;
    }

    // Día 5: Regla de no vender si está agotado
    if (plato.stock === 0) {
        alert(`No disponible. ${plato.nombre} está agotado.`);
        return;
    }

    if (plato.stock > 0) {
        plato.stock--;
        alert(`¡Venta realizada! Ahora quedan ${plato.stock} de ${plato.nombre}.`);
        renderMenu(); // Esto actualiza automáticamente las clases de color (Day 5)
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

// Botón temporal/invisible solo para verificar desde consola fácilmente si no se añade al UI
window.verificarEstadoGeneral = verificarEstadoGeneral;

// Día 5: Bucle formal obligatorio para verificar el estado general
function verificarEstadoGeneral() {
    let agotados = 0;
    let bajos = 0;

    for (let i = 0; i < menu.length; i++) {
        if (menu[i].stock === 0) {
            agotados++;
        } else if (menu[i].stock <= 3) {
            bajos++;
        }
    }

    if (agotados > 0) {
        alert(`Riesgo: Hay ${agotados} platos completamente agotados.`);
    } else if (bajos > 0) {
        alert(`Advertencia: Hay ${bajos} platos con stock bajo.`);
    } else {
        alert("Todo disponible. El menú está en estado óptimo.");
    }
}
