import { menu, agregarPlato } from "./menu.js";
import {
    buscarPlatoPorNombre,
    filtrarStockBajo,
    obtenerResumenMenu,
    calcularEstadoPlato,
    verificarEstadoGeneral,
    venderPlatoAsync,
    ErrorNegocio
} from "./operaciones.js";

function renderMenu() {
    const output = document.getElementById("output");
    let html = "<h3>Menú</h3><ul>";

    for (let i = 0; i < menu.length; i++) {
        const plato = menu[i];
        const estado = calcularEstadoPlato(plato);
        html += `<li class="${estado}">${plato.nombre} — S/ ${plato.precio} — Stock: ${plato.stock}</li>`;
    }

    html += "</ul>";
    html += `<p>${verificarEstadoGeneral()}</p>`;
    output.innerHTML = html;
}

function renderLista(titulo, listaTextos) {
    const output = document.getElementById("output");
    let html = `<h3>${titulo}</h3><ul>`;
    for (let i = 0; i < listaTextos.length; i++) {
        html += `<li>${listaTextos[i]}</li>`;
    }
    html += "</ul>";
    output.innerHTML = html;
}

function mostrarMensaje(texto, clase = "") {
    const output = document.getElementById("output");
    const p = document.createElement("p");
    if (clase) p.className = clase;
    p.textContent = texto;
    output.innerHTML = ""; // Limpiar antes
    output.appendChild(p);
}

export function conectarEventos() {
    const btnMostrar = document.getElementById("btnMostrar");
    const btnAgregar = document.getElementById("btnAgregar");
    const btnBuscar = document.getElementById("btnBuscar");
    const btnStockBajo = document.getElementById("btnStockBajo");
    const btnResumen = document.getElementById("btnResumen");
    const btnVender = document.getElementById("btnVender");
    
    const inputBuscar = document.getElementById("inputBuscar");
    const inputVenderNombre = document.getElementById("inputVenderNombre");
    const inputVenderCantidad = document.getElementById("inputVenderCantidad");

    if (btnMostrar) btnMostrar.addEventListener("click", () => renderMenu());

    if (btnAgregar) btnAgregar.addEventListener("click", () => {
        agregarPlato({ nombre: "Pollo a la brasa", precio: 20, stock: 4 });
        renderMenu();
        mostrarMensaje("Plato demo agregado.", "mensaje-exito");
    });

    if (btnBuscar) btnBuscar.addEventListener("click", () => {
        const nombre = inputBuscar.value.trim();
        if (!nombre) return mostrarMensaje("Escribe un nombre.", "mensaje-negocio");

        const plato = buscarPlatoPorNombre(nombre);
        if (!plato) return mostrarMensaje("No encontrado.", "mensaje-negocio");

        renderLista("Búsqueda", [`${plato.nombre} — Stock: ${plato.stock}`]);
    });

    if (btnStockBajo) btnStockBajo.addEventListener("click", () => {
        const lista = filtrarStockBajo(3).map(p => `${p.nombre} — Stock: ${p.stock}`);
        renderLista("Stock bajo (<=3)", lista.length ? lista : ["Sin resultados"]);
    });

    if (btnResumen) btnResumen.addEventListener("click", () => {
        const lista = obtenerResumenMenu();
        renderLista("Resumen", lista);
    });

    // Parte C y D — Manejo diferenciado y Validaciones robustas
    if (btnVender) {
        btnVender.addEventListener("click", async () => {
            const nombre = inputVenderNombre.value.trim();
            const cantidadRaw = inputVenderCantidad.value.trim();

            // Parte D — Validaciones preventivas obligatorias
            if (nombre === "") {
                return mostrarMensaje("Advertencia: El nombre no puede estar vacío.", "mensaje-negocio");
            }
            if (cantidadRaw === "" || isNaN(cantidadRaw)) {
                return mostrarMensaje("Advertencia: La cantidad debe ser un número.", "mensaje-negocio");
            }
            const cantidad = parseInt(cantidadRaw);
            if (cantidad <= 0) {
                return mostrarMensaje("Advertencia: La cantidad debe ser mayor a 0.", "mensaje-negocio");
            }

            try {
                mostrarMensaje("Procesando pedido...", "mensaje-proceso");
                
                // Llamada a operaciones
                const mensaje = await venderPlatoAsync(nombre, cantidad);

                mostrarMensaje(mensaje, "mensaje-exito");
                renderMenu();
            } catch (error) {
                // Parte C — Manejo diferenciado
                if (error.name === "ErrorNegocio") {
                    mostrarMensaje("Advertencia: " + error.message, "mensaje-negocio");
                } else {
                    mostrarMensaje("Error del sistema: " + error.message, "mensaje-sistema");
                }
            }
        });
    }
}

export { renderMenu };