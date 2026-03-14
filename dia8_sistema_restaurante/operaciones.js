import { menu } from "./menu.js";

// Parte A — Crear clase de error personalizada
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

// Parte B — Modificar venderPlatoAsync (Refactorizado con throw)
export async function venderPlatoAsync(nombre, cantidad) {
    const plato = buscarPlatoPorNombre(nombre);

    if (!plato) {
        throw new ErrorNegocio("El plato no existe en el menú: " + nombre);
    }
    if (plato.stock === 0) {
        throw new ErrorNegocio("El plato está agotado: " + plato.nombre);
    }
    if (cantidad <= 0) {
        throw new ErrorNegocio("La cantidad debe ser mayor a 0.");
    }
    if (plato.stock < cantidad) {
        throw new ErrorNegocio(`Stock insuficiente. Disponible: ${plato.stock}`);
    }

    // Parte E — Estado consistente: el stock solo baja si la simulación es exitosa (o según requisito del día)
    // El syllabus dice "No debe modificarse el stock si ocurre error".
    // Esperamos la respuesta del servidor antes de descontar.
    const mensajeVenta = `Venta realizada: ${plato.nombre} x${cantidad}`;
    const respuesta = await simularRespuestaServidor(mensajeVenta);
    
    plato.stock -= cantidad; 
    return respuesta;
}