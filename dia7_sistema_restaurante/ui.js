
import {
    buscarPlatoPorNombre,
    filtrarStockBajo,
    obtenerResumenMenu,
    venderPlato,
    venderPlatoAsync,
    calcularEstadoPlato,
    verificarEstadoGeneral
} from "./operaciones.js";
import { menu, agregarPlato } from "./menu.js";

export function renderMenu() {
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

export function renderLista(titulo, listaTextos) {
    const output = document.getElementById("output");
    let html = `<h3>${titulo}</h3><ul>`;
    for (let i = 0; i < listaTextos.length; i++) {
        html += `<li>${listaTextos[i]}</li>`;
    }
    html += "</ul>";
    output.innerHTML = html;
}

export function mostrarMensaje(texto) {
    const output = document.getElementById("output");
    output.innerHTML = `<p>${texto}</p>`;
}

export function mostrarMensajeEstado(texto, clase) {
    const output = document.getElementById("output");
    output.innerHTML = `<p class="${clase}">${texto}</p>`;
}

export function conectarEventos() {
    const btnMostrar = document.getElementById("btnMostrar");
    const btnAgregar = document.getElementById("btnAgregar");
    const btnBuscar = document.getElementById("btnBuscar");
    const btnStockBajo = document.getElementById("btnStockBajo");
    const btnResumen = document.getElementById("btnResumen");
    const inputBuscar = document.getElementById("inputBuscar");

    if (btnMostrar) btnMostrar.addEventListener("click", () => renderMenu());

    if (btnAgregar) btnAgregar.addEventListener("click", () => {
        // Plato demo (lo pueden cambiar)
        // Para agregar plato real deben usar agregarPlato en menu.js (si lo tienen implementado)
        // Aquí solo re-renderizamos por simplicidad:
        // Si ya tienen agregarPlato(plato), pueden importarlo y usarlo aquí.
        agregarPlato({ nombre: "Pollo a la brasa", precio: 20, stock: 4 });
        renderMenu();

        mostrarMensaje("Agrega plato demo (si tienes agregarPlato, úsalo aquí) y luego renderiza.");
    });

    if (btnBuscar) btnBuscar.addEventListener("click", () => {
        const nombre = inputBuscar.value.trim();
        if (!nombre) return mostrarMensaje("Escribe un nombre para buscar.");

        const plato = buscarPlatoPorNombre(nombre);
        if (!plato) return mostrarMensaje("No encontrado.");

        renderLista("Resultado búsqueda", [`${plato.nombre} — S/ ${plato.precio} — Stock: ${plato.stock}`]);
    });

    if (btnStockBajo) btnStockBajo.addEventListener("click", () => {
        const lista = filtrarStockBajo(3).map(p => `${p.nombre} — Stock: ${p.stock}`);
        renderLista("Stock bajo (<=3)", lista.length ? lista : ["Sin resultados"]);
    });

    if (btnResumen) btnResumen.addEventListener("click", () => {
        const lista = obtenerResumenMenu();
        renderLista("Resumen del menú", lista);
    });

    // VENDER ASYNC (Día 7)
    const btnVender = document.getElementById("btnVender");
    const inputVenderNombre = document.getElementById("inputVenderNombre");
    const inputVenderCantidad = document.getElementById("inputVenderCantidad");

    if (btnVender) {
        btnVender.addEventListener("click", async () => {
            const nombre = inputVenderNombre.value.trim();
            const cantidad = parseInt(inputVenderCantidad.value);

            if (!nombre || isNaN(cantidad)) {
                return mostrarMensajeEstado("Nombre y cantidad requeridos.", "error");
            }

            try {
                mostrarMensajeEstado("Procesando pedido...", "procesando");

                // Llamada asincrónica
                const mensaje = await venderPlatoAsync(nombre, cantidad);

                mostrarMensajeEstado(mensaje, "exito");
                // Podríamos esperar un poco antes de re-renderizar o hacerlo de inmediato
                renderMenu();
            } catch (error) {
                mostrarMensajeEstado(error.message, "error");
            }
        });
    }
}
