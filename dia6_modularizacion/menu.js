// Importa funciones que modifican datos
export let menu = [
    { nombre: "Arroz con pollo", precio: 12, stock: 5 },
    { nombre: "Lomo saltado", precio: 18, stock: 3 },
    { nombre: "Sopa", precio: 8, stock: 10 },
    { nombre: "Ceviche Mixto", precio: 25, stock: 7 },
    { nombre: "Ají de Gallina", precio: 15, stock: 4 },
    { nombre: "Papa a la Huancaína", precio: 10, stock: 2 }, // Demo Stock Bajo (Naranja)
    { nombre: "Pachamanca", precio: 30, stock: 0 }           // Demo Agotado (Rojo)
];

// Agrega un nuevo plato al menú
export function agregarPlato(plato) {
    menu.push(plato);
}

// Actualiza el stock de un plato existente
export function actualizarStock(nombre, nuevoStock) {
    for (let i = 0; i < menu.length; i++) {
        if (menu[i].nombre.toLowerCase() === nombre.toLowerCase()) {
            menu[i].stock = nuevoStock;
            return true;
        }
    }
    return false;
}
