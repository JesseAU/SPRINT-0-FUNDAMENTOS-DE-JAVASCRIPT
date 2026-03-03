// Videojuego Mini RPG
// Versión: Solo Variables, Funciones, Objetos y Condiciones básicas
// SIN: Arrays, SIN: Signo de dólar ($)

let jugador1 = {
    nombre: "Guerrero Feroz",
    vida: 100,
    fuerza: 25,
    nivel: 1
};

let jugador2 = {
    nombre: "Mago Arcano",
    vida: 80,
    fuerza: 35,
    nivel: 1
};

function entrenar(jugador) {
    jugador.fuerza = jugador.fuerza + 10;
    jugador.nivel = jugador.nivel + 1;
    console.log(jugador.nombre + " ha entrenado. Ahora es nivel " + jugador.nivel + " con fuerza " + jugador.fuerza + ".");
}

function recibirDaño(jugador, daño) {
    jugador.vida = jugador.vida - daño;

    if (jugador.vida < 0) {
        jugador.vida = 0;
    }

    console.log(jugador.nombre + " recibió " + daño + " de daño. Vida restante: " + jugador.vida + ".");
}

function curar(jugador) {
    jugador.vida = jugador.vida + 20;

    if (jugador.vida > 100) {
        jugador.vida = 100;
    }

    console.log(jugador.nombre + " se ha curado. Vida actual: " + jugador.vida + ".");
}

console.log("--- INICIO DEL MINI RPG ---");
console.log(jugador1);
console.log(jugador2);

entrenar(jugador1);
recibirDaño(jugador2, jugador1.fuerza);
curar(jugador2);

console.log("--- ESTADO ACTUALIZADO ---");
console.log(jugador1);
console.log(jugador2);
