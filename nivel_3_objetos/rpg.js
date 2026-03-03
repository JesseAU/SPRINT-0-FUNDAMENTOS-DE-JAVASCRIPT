// Mini RPG para probar objetos
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
    jugador.fuerza += 10;
    jugador.nivel += 1;
    console.log(`${jugador.nombre} entrenó duro. Nivel: ${jugador.nivel}.`);
}

function recibirDaño(jugador, daño) {
    jugador.vida -= daño;
    if (jugador.vida < 0) jugador.vida = 0;
    console.log(`${jugador.nombre} recibió un golpe! Vida: ${jugador.vida}.`);
}

function curar(jugador) {
    jugador.vida += 20;
    if (jugador.vida > 100) jugador.vida = 100;
    console.log(`${jugador.nombre} se siente mejor. Vida: ${jugador.vida}.`);
}

console.log("--- RPG MODE ---");
entrenar(jugador1);
recibirDaño(jugador2, jugador1.fuerza);
curar(jugador2);
