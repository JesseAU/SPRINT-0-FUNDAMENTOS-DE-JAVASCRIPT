// Restaurante Simplificado (Sin condicionales)
// Este archivo solo realiza cálculos directos usando matemáticas básicas

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
    console.log(`${unCliente.nombre} intenta comprar ${unPlato.nombre}.`);

    // Restamos dinero y hambre directamente
    unCliente.dinero = unCliente.dinero - unPlato.precio;

    // Usamos Math.max para evitar que el hambre sea menor a 0 sin usar un IF
    unCliente.hambre = Math.max(0, unCliente.hambre - unPlato.nivelDeSaciedad);
}

function mostrarEstado(unCliente) {
    console.log(`Estado de ${unCliente.nombre}: Hambre: ${unCliente.hambre}, Dinero: S/ ${unCliente.dinero}.`);
}

console.log("--- INICIO ---");
mostrarEstado(cliente);

ordenarComida(cliente, plato);

console.log("--- RESULTADO ---");
mostrarEstado(cliente);
