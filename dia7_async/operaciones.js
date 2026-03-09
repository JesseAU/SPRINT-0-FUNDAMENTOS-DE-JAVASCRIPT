import { menu } from "./menu.js";

// Buscar plato por nombre usando .find() (Day 4/6)
export function buscarPlatoPorNombre(nombre) {
    return menu.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());
}

// Filtrar platos con poco stock usando .filter() (Day 4/6)
export function filtrarStockBajo(limite = 3) {
    return menu.filter(p => p.stock <= limite);
}

// Resumen rápido del menú usando .map() (Day 4/6)
export function obtenerResumenMenu() {
    return menu.map(p => {
        let clase = "normal";
        if (p.stock === 0) clase = "agotado";
        else if (p.stock <= 3) clase = "bajo";

        return `<span class="${clase}">${p.nombre} — S/ ${p.precio}</span>`;
    });
}

// Lógica de venta con validación estricta de stock (Day 5/6)
export function venderPlato(nombre) {
    const plato = buscarPlatoPorNombre(nombre);

    if (!plato) {
        return { ok: false, mensaje: "El plato no existe en el menú." };
    }

    if (plato.stock === 0) {
        return { ok: false, mensaje: `No disponible. ${plato.nombre} está agotado.` };
    }

    if (plato.stock > 0) {
        plato.stock--;
        return { ok: true, mensaje: `¡Venta realizada! Ahora quedan ${plato.stock} de ${plato.nombre}.` };
    }
}

// Retorna el estado visual de un plato según su stock (Day 6)
export function calcularEstadoPlato(plato) {
    if (plato.stock === 0) return "agotado";
    if (plato.stock <= 3) return "bajo";
    return "normal";
}

// Bucle formal obligatorio para verificar el estado general (Day 5/6)
export function verificarEstadoGeneral() {
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
        return `Riesgo: Hay ${agotados} platos completamente agotados.`;
    } else if (bajos > 0) {
        return `Advertencia: Hay ${bajos} platos con stock bajo.`;
    } else {
        return "Todo disponible. El menú está en estado óptimo.";
    }
}
