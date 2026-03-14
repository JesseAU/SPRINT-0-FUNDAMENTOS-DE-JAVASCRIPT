export let menu = [
    { nombre: "Arroz con pollo", precio: 12, stock: 5 },
    { nombre: "Lomo saltado", precio: 18, stock: 3 },
    { nombre: "Sopa", precio: 8, stock: 0 },
    { nombre: "Pollo a la brasa", precio: 20, stock: 4 }
];

export function agregarPlato(plato) {
    menu.push(plato);
}