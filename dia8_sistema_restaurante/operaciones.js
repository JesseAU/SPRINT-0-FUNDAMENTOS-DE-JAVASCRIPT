import { menu } from "./menu.js";

export class ErrorNegocio extends Error {
    constructor(mensaje) {
        super(mensaje);
        this.name = "ErrorNegocio";
    }
}

export function buscarPlatoPorNombre(nombre) {
    return menu.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());
}

export function filtrarStockBajo(limite = 3) {
    return menu.filter(p => p.stock <= limite);
}

export function obtenerResumenMenu() {
    return menu.map(p => `${p.nombre} — S/ ${p.precio}`);
}

export function calcularEstadoPlato(plato) {
    if (plato.stock === 0) return "agotado";
    if (plato.stock <= 3) return "bajo";
    return "normal";
}

export function verificarEstadoGeneral() {
    let agotados = 0;
    let bajos = 0;

    for (let i = 0; i < menu.length; i++) {
        if (menu[i].stock === 0) agotados++;
        else if (menu[i].stock <= 3) bajos++;
    }

    if (agotados > 0) return "Hay platos agotados";
    if (bajos > 0) return "Hay platos con stock bajo";
    return "Todo disponible";
}

// SIMULACIÓN DE SERVIDOR
export function simularRespuestaServidor(resultado) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const falla = Math.random() < 0.3; // 30% probabilidad de fallo
            if (falla) {
                reject(new Error("Error del servidor simulado."));
            } else {
                resolve(resultado);
            }
        }, 2000);
    });
}

// VENTA ASINCRÓNICA CON MANEJO DE ERRORES - DÍA 8
export async function venderPlatoAsync(nombre, cantidad) {
    if (!nombre || nombre.trim() === "") {
        throw new ErrorNegocio("El nombre del plato no puede estar vacío.");
    }
    if (isNaN(cantidad) || cantidad <= 0) {
        throw new ErrorNegocio("La cantidad debe ser un número mayor a 0.");
    }

    const plato = buscarPlatoPorNombre(nombre);

    if (!plato) {
        throw new ErrorNegocio("Plato no encontrado: " + nombre);
    }
    if (plato.stock === 0) {
        throw new ErrorNegocio("Plato agotado: " + plato.nombre);
    }
    if (plato.stock < cantidad) {
        throw new ErrorNegocio(`Stock insuficiente. Disponible: ${plato.stock}`);
    }

    // No modificamos el stock aún, simulamos la respuesta primero
    const mensajeVenta = `Venta exitosa: ${plato.nombre} x${cantidad}`;
    
    // Esperamos la respuesta del "servidor"
    await simularRespuestaServidor(mensajeVenta);

    // Solo si el servidor no falla, descontamos stock
    plato.stock -= cantidad;
    return mensajeVenta;
}