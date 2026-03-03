// Restaurante Ultra-Simplificado
// SIN condicionales (if/else)
// SIN arrays ([])
// Solo: Variables, Objetos y Funciones

let cliente = {
    nombre: "Carlos",
    dinero: 100,
    hambre: 80
};

let plato = {
    nombre: "Lomo Saltado",
    precio: 30,
    nivelDeSaciedad: 50
};

function ordenarComida(unCliente, unPlato) {
    console.log(`${unCliente.nombre} compra ${unPlato.nombre}.`);

    // Operación directa de dinero
    unCliente.dinero = unCliente.dinero - unPlato.precio;

    // Operación de hambre usando Math.max para no bajar de cero
    unCliente.hambre = Math.max(0, unCliente.hambre - unPlato.nivelDeSaciedad);
}

function mostrarEstado(unCliente) {
    console.log(`Cliente: ${unCliente.nombre}`);
    console.log(`Dinero restante: S/ ${unCliente.dinero}`);
    console.log(`Nivel de hambre: ${unCliente.hambre}`);
}

console.log("=== ESTADO INICIAL ===");
mostrarEstado(cliente);

ordenarComida(cliente, plato);

console.log("=== ESTADO FINAL ===");
mostrarEstado(cliente);
