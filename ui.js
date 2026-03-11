import { menu, agregarPlato } from "./menu.js";
import {
    buscarPlatoPorNombre,
    filtrarStockBajo,
    obtenerResumenMenu,
    calcularEstadoPlato,
    verificarEstadoGeneral,
    ErrorNegocio,
    venderPlatoSeguro
} from "./operaciones.js";

export function renderMenu() {
    const output = document.getElementById("output");
    let html = "<h3>Menú</h3><ul>";

    for (let i = 0; i < menu.length; i++) {
        const plato = menu[i];
        const estado = calcularEstadoPlato(plato);
        html += `<li class="${estado}">
      ${plato.nombre} — S/ ${plato.precio} — Stock: ${plato.stock}
    </li>`;
    }

    html += "</ul>";
    html += `<p>${verificarEstadoGeneral()}</p>`;
    output.innerHTML = html;
}

export function renderLista(titulo, listaTextos) {
    const output = document.getElementById("output");
    let html = `<h3>${titulo}</h3><ul>`;
    for (let i = 0; i < listaTextos.length; i++) {
        html += `<li>${listaTextos[i]}</li>`;
    }
    html += "</ul>";
    output.innerHTML = html;
}

export function mostrarMensaje(texto, tipo = "") {
    const output = document.getElementById("output");
    output.innerHTML = `<p class="mensaje-${tipo}">${texto}</p>`;
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

    if (btnMostrar) btnMostrar.addEventListener("click", () => {
        renderMenu();
    });

    if (btnAgregar) btnAgregar.addEventListener("click", () => {
        agregarPlato({ nombre: "Pollo a la brasa", precio: 20, stock: 4 });
        renderMenu();
    });

    if (btnBuscar) btnBuscar.addEventListener("click", () => {
        const nombre = inputBuscar.value.trim();
        if (!nombre) return mostrarMensaje("Escribe un nombre para buscar.", "negocio");

        const plato = buscarPlatoPorNombre(nombre);
        if (!plato) return mostrarMensaje("No encontrado.", "negocio");

        renderLista("Resultado búsqueda", [
            `${plato.nombre} — S/ ${plato.precio} — Stock: ${plato.stock}`
        ]);
    });

    if (btnStockBajo) btnStockBajo.addEventListener("click", () => {
        const lista = filtrarStockBajo(3).map(p => `${p.nombre} — Stock: ${p.stock}`);
        renderLista("Stock bajo (<=3)", lista.length ? lista : ["Sin resultados"]);
    });

    if (btnResumen) btnResumen.addEventListener("click", () => {
        const lista = obtenerResumenMenu();
        renderLista("Resumen del menú", lista);
    });

    // VENDER CON TRY/CATCH - DÍA 8
    if (btnVender) btnVender.addEventListener("click", () => {
        const nombre = inputVenderNombre.value.trim();
        const cantidad = Number(inputVenderCantidad.value);

        try {
            const resultado = venderPlatoSeguro(nombre, cantidad);
            mostrarMensaje(resultado, "exito");
            renderMenu();
        } catch (error) {
            if (error.name === "ErrorNegocio") {
                mostrarMensaje("⚠️ " + error.message, "negocio");
            } else {
                mostrarMensaje("❌ Error del sistema: " + error.message, "sistema");
            }
        }
    });
}