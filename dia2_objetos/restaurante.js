// Simulador de Restaurante
// Versión: Solo Variables, Funciones, Objetos y Condiciones básicas
// SIN: Arrays, SIN: Signo de dólar ($)

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
        console.log(unCliente.nombre + " ha ordenado " + unPlato.nombre + ".");
        unCliente.dinero = unCliente.dinero - unPlato.precio;
        unCliente.hambre = unCliente.hambre - unPlato.nivelDeSaciedad;

        // Evitamos hambre negativa con un condicional básico
        if (unCliente.hambre < 0) {
            unCliente.hambre = 0;
        }
    } else {
        console.log(unCliente.nombre + " no tiene suficiente dinero para " + unPlato.nombre + ".");
    }
}

function pagar(unCliente) {
    console.log("Gracias por su visita, " + unCliente.nombre + ". Le quedan S/ " + unCliente.dinero + ".");
}

function mostrarEstado(unCliente) {
    console.log("Estado de " + unCliente.nombre + ": Hambre: " + unCliente.hambre + ", Dinero: S/ " + unCliente.dinero + ".");
}

console.log("--- BIENVENIDO AL RESTAURANTE ---");
mostrarEstado(cliente);
ordenarComida(cliente, plato);
mostrarEstado(cliente);
pagar(cliente);
