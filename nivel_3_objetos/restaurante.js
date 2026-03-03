// Simulación rápida de un cliente en el restaurante
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
    if (unCliente.dinero >= unPlato.precio) {
        console.log(`${unCliente.nombre} ha ordenado ${unPlato.nombre}.`);
        unCliente.dinero -= unPlato.precio;
        unCliente.hambre -= unPlato.nivelDeSaciedad;
        if (unCliente.hambre < 0) unCliente.hambre = 0;
    } else {
        console.log(`${unCliente.nombre} no tiene suficiente dinero.`);
    }
}

function pagar(unCliente) {
    console.log(`¡Gracias por venir, ${unCliente.nombre}! Cambio: S/ ${unCliente.dinero}.`);
}

function mostrarEstado(unCliente) {
    console.log(`Estado actual -> Hambre: ${unCliente.hambre}, Billetera: S/ ${unCliente.dinero}.`);
}

console.log("--- BIENVENIDO AL RESTAURANTE ---");
mostrarEstado(cliente);
ordenarComida(cliente, plato);
mostrarEstado(cliente);
pagar(cliente);
