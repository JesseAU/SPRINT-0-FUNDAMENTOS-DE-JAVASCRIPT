# Exámenes de Repaso: Sprint 0 JavaScript (Días 1-4)

Este documento contiene una serie de retos para validar la comprensión de cada fase. **No subir al repositorio.**

---

## 🗓️ DÍA 1: Variables y Funciones

### Reto 1: Fase de Variables
Explica la diferencia entre declarar una variable con `let` y usar un valor directamente. 
**Ejercicio:** Crea una variable `clima` y `temperatura`. Muestra un mensaje que diga: "Hoy el clima está [clima] y la temperatura es de [temperatura] grados".

### Reto 2: Fase de Funciones
**Ejercicio:** Crea una función llamada `saludarHeroe(nombre, ciudad)`. 
- Debe recibir el nombre de un superhéroe y su ciudad.
- Debe retornar (o mostrar) el texto: "¡Cuidado malvados! [nombre] ha llegado para proteger [ciudad]".

---

## 🗓️ DÍA 2: Objetos

### Reto 3: Propiedades y Métodos
**Ejercicio:** Crea un objeto llamado `mascota` con las propiedades: `nombre`, `especie` y `hambre` (valor de 0 a 100).
- Crea una función `alimentar(mascota)` que reste 20 al nivel de hambre.
- Crea una función `estado(mascota)` que diga si la mascota tiene hambre (si el valor es mayor a 50).

---

## 🗓️ DÍA 3: Arrays y Renderizado Real

### Reto 4: Listas de Objetos
**Ejercicio:** Si tienes un array `inventario = [{item: "Espada", stock: 2}, {item: "Escudo", stock: 5}]`:
- ¿Cómo accederías al nombre del segundo item?
- Escribe el código necesario para agregar un nuevo objeto `{item: "Poción", stock: 10}` al final del array.

---

## 🗓️ DÍA 4: Métodos de Arrays (find, filter, map)

### Reto 5: Operaciones Avanzadas
Dado el siguiente array:
```javascript
const productos = [
  { nombre: "Pizza", precio: 20 },
  { nombre: "Pasta", precio: 15 },
  { nombre: "Ensalada", precio: 10 }
];
```
1. **Find**: Escribe el código para encontrar el objeto cuyo nombre es "Pasta".
2. **Filter**: Crea un nuevo array con los productos que cuesten más de 12.
3. **Map**: Crea un nuevo array que solo contenga los nombres de los productos en mayúsculas.

---

## 💡 Pregunta Final de Comprensión (Pair Programming)
Si tu compañero escribe una función y tú no la entiendes, pero el código funciona perfectamente y pasa los tests:
a) Lo dejas pasar porque el código funciona.
b) Le pides que borre todo y lo haga de nuevo.
c) Detienes el trabajo y pides una explicación paso a paso hasta que ambos lo entiendan.

*(Pista: La respuesta correcta es la C según las reglas estrictas del Sprint 0).*
