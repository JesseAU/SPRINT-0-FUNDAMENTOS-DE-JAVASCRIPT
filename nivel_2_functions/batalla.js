// Batalla de Superhéroes
// Colaboración: Estudiante A y Estudiante B

let heroe1 = { nombre: "Batman", energia: 60 };
let heroe2 = { nombre: "Spider-Man", energia: 95 };

// Función de Estudiante A: ataque()
function ataque(atacante, defensor) {
    let daño = 20;
    defensor.energia -= daño;
    console.log(`${atacante.nombre} ataca a ${defensor.nombre} quitándole ${daño} de energía.`);
}

// Función de Estudiante B: defender()
function defender(heroe) {
    console.log(`${heroe.nombre} se pone en posición defensiva.`);
}

// Función de Estudiante B: recargarEnergia()
function recargarEnergia(heroe) {
    let recarga = 15;
    heroe.energia += recarga;
    console.log(`${heroe.nombre} descansa y recobra ${recarga} de energía.`);
}

// Simulación de Batalla
console.log("--- INICIA LA BATALLA ---");
ataque(heroe2, heroe1);
defender(heroe1);
recargarEnergia(heroe1);
ataque(heroe1, heroe2);

console.log(`Estado final: ${heroe1.nombre} (${heroe1.energia}) vs ${heroe2.nombre} (${heroe2.energia})`);

// --- Ejercicio individual integrado ---

// Función especial de Estudiante A: superAtaque()
function superAtaque(atacante, defensor) {
    let dañoSuper = 40;
    defensor.energia -= dañoSuper;
    console.log(`¡MOVIMIENTO ESPECIAL! ${atacante.nombre} usa SUPER ATAQUE contra ${defensor.nombre} causando ${dañoSuper} de daño!`);
}

// Función especial de Estudiante B: escudoMagico()
function escudoMagico(heroe) {
    console.log(`${heroe.nombre} activa un ESCUDO MÁGICO, ¡el próximo ataque fallará!`);
}

console.log("--- TURNO DE MOVIMIENTOS ESPECIALES ---");
escudoMagico(heroe1);
superAtaque(heroe2, heroe1); // Aunque tiene escudo, la lógica simple de hoy solo muestra mensajes.
console.log(`Estado final tras especiales: ${heroe1.nombre} (${heroe1.energia}) vs ${heroe2.nombre} (${heroe2.energia})`);
