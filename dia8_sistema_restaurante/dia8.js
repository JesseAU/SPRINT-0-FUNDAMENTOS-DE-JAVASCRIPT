// SIMULACION DIA 8 - try/catch + ErrorNegocio

let menu = [
    { nombre: "Arroz con pollo", precio: 12, stock: 5 },
    { nombre: "Lomo saltado", precio: 18, stock: 3 },
    { nombre: "Sopa", precio: 8, stock: 0 },
    { nombre: "Pollo a la brasa", precio: 20, stock: 4 }
];

// CLASE ERROR PERSONALIZADA
class ErrorNegocio extends Error {
    constructor(mensaje) {
        super(mensaje);
        this.name = "ErrorNegocio";
    }
}

// FUNCION VENDER CON VALIDACIONES
function venderPlatoSeguro(nombre, cantidad) {
    if (!nombre || nombre.trim() === "") {
        throw new ErrorNegocio("El nombre no puede estar vacío");
    }
    if (isNaN(cantidad) || cantidad <= 0) {
        throw new ErrorNegocio("La cantidad debe ser mayor a 0");
    }

    const plato = menu.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());

    if (!plato) {
        throw new ErrorNegocio("Plato no encontrado: " + nombre);
    }
    if (plato.stock === 0) {
        throw new ErrorNegocio("Plato agotado: " + plato.nombre);
    }
    if (plato.stock < cantidad) {
        throw new ErrorNegocio(`Stock insuficiente. Disponible: ${plato.stock}`);
    }

    plato.stock -= cantidad;
    return `Venta exitosa: ${plato.nombre} x${cantidad}`;
}

// FUNCION QUE DIFERENCIA TIPO DE ERROR
function procesarVenta(nombre, cantidad) {
    try {
        const resultado = venderPlatoSeguro(nombre, cantidad);
        console.log("✅", resultado);
    } catch (error) {
        if (error.name === "ErrorNegocio") {
            console.log("⚠️  Advertencia de negocio:", error.message);
        } else {
            console.log("❌ Error del sistema:", error.message);
        }
    }
}

// PRUEBAS
console.log("--- Prueba 1: venta exitosa ---");
procesarVenta("Arroz con pollo", 2);

console.log("--- Prueba 2: plato agotado ---");
procesarVenta("Sopa", 1);

console.log("--- Prueba 3: plato no existe ---");
procesarVenta("Pizza", 1);

console.log("--- Prueba 4: stock insuficiente ---");
procesarVenta("Lomo saltado", 10);

console.log("--- Prueba 5: nombre vacío ---");
procesarVenta("", 1);

console.log("--- Prueba 6: cantidad inválida ---");
procesarVenta("Arroz con pollo", -5);

console.log("--- Menú final ---");
for (let i = 0; i < menu.length; i++) {
    console.log(`${menu[i].nombre} - Stock: ${menu[i].stock}`);
}
