import { menu, agregarPlato } from "./menu.js";
import {
    buscarPlatoPorNombre,
    filtrarStockBajo,
    obtenerResumenMenu,
    venderPlato,
    calcularEstadoPlato,
    verificarEstadoGeneral
} from "./operaciones.js";

// Muestra el menú completo en la página
export function renderMenu() {
    const output = document.getElementById("output");
    output.innerHTML = "";

    let html = "<ul>";
    for (let i = 0; i < menu.length; i++) {
        const plato = menu[i];

        // Uso de las reglas modulares
        let clase = calcularEstadoPlato(plato);
        let textoExtra = "";

        if (clase === "agotado") {
            textoExtra = " - AGOTADO";
        } else if (clase === "bajo") {
            textoExtra = " - Stock bajo";
        }

        html += `<li class="${clase}">${plato.nombre} — S/ ${plato.precio} — Stock: ${plato.stock}${textoExtra}</li>`;
    }
    html += "</ul>";

    html += `<p><strong>Tenemos ${menu.length} platos disponibles hoy.</strong></p>`;
    output.innerHTML = html;
}

// Función reutilizable para mostrar cualquier lista de textos
export function renderLista(titulo, listaDeTextos) {
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

export function mostrarMensaje(texto) {
    const output = document.getElementById("output");
    output.innerHTML = `<p>${texto}</p>`;
}

// Eventos de los botones
export function conectarEventos() {
    const btnMostrar = document.getElementById("btnMostrar");
    const btnAgregar = document.getElementById("btnAgregar");
    const btnBuscar = document.getElementById("btnBuscar");
    const btnStockBajo = document.getElementById("btnStockBajo");
    const btnResumen = document.getElementById("btnResumen");
    const inputBuscar = document.getElementById("inputBuscar");

    if (btnMostrar) btnMostrar.addEventListener("click", () => renderMenu());

    if (btnAgregar) btnAgregar.addEventListener("click", () => {
        const nuevoPlato = {
            nombre: "Tacu Tacu con Sábana",
            precio: 22,
            stock: 6
        };
        agregarPlato(nuevoPlato);
        renderMenu();
    });

    if (btnBuscar) btnBuscar.addEventListener("click", () => {
        const nombre = inputBuscar.value.trim();
        if (!nombre) {
            mostrarMensaje("Por favor, ingresa un nombre para buscar.");
            return;
        }

        const plato = buscarPlatoPorNombre(nombre);
        if (plato) {
            renderLista("Resultado de búsqueda", [`${plato.nombre} — S/ ${plato.precio} (Stock: ${plato.stock})`]);
        } else {
            mostrarMensaje("<h3>No encontrado</h3>");
        }
    });

    if (btnStockBajo) btnStockBajo.addEventListener("click", () => {
        const bajos = filtrarStockBajo(3);
        const textos = bajos.map(plato => `${plato.nombre} — Stock: ${plato.stock}`);
        renderLista("Platos con Stock Bajo", textos);
    });

    if (btnResumen) btnResumen.addEventListener("click", () => {
        const resumen = obtenerResumenMenu();
        renderLista("Resumen del Menú", resumen);
    });

    // Validar estado general usando la consola
    window.verificarEstadoGeneral = () => {
        const mensaje = verificarEstadoGeneral();
        alert(mensaje);
    };

    window.venderPlato = (nombre) => {
        const resultado = venderPlato(nombre);
        alert(resultado.mensaje);
        if (resultado.ok) {
            renderMenu();
        }
    };
}
