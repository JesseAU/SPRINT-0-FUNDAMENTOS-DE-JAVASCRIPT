# 🎬 Guion y Estructura para el Video de Loom (Día 7)

**Objetivo:** Demostrar cómo los tests capturan errores automáticamente cuando alguien "mete mano" al código. El video debe durar entre **4 y 5 minutos**.

---

## ⏱️ Minuto 1: Introducción Teórica (Habla Estudiante A)
* **Acción:** Estudiante A a cámara.
* **Guion sugerido:** 
> "¡Hola! En este Día 7 implementamos nuestra primera suite de pruebas automáticas (Testing). Hasta ahora, cada vez que hacíamos un cambio, teníamos que ir a Thunder Client y probar ruta por ruta manualmente. 
> Con los tests que escribimos hoy usando `node:test` y `supertest`, el mismo Node.js se encarga de verificar que nuestras rutas de Menú y Autenticación respondan exactamente lo que esperamos (Status 200, 401, etc.). Esto nos da la seguridad de que, si agregamos código nuevo mañana, no romperemos lo que ya funciona hoy."

---

## ⏱️ Minutos 2–3: Demostración Práctica (Habla Estudiante B - Comparte Pantalla)
* **Acción 1: Éxito inicial.** Abre la terminal en `dia7/restaurante-backend` y corre `npm test`.
  * **Guion:** *"Aquí pueden ver cómo corre nuestra suite completa. Tenemos 7 tests que verifican desde el GET del menú hasta la protección de rutas. Como ven, todos están en verde (Pass)."*
* **Acción 2: Escena obligatoria (El error intencional).** Ve a `controllers/menu.controller.js`, busca el método `obtenerMenu` y cambia temporalmente el `res.status(200)` por un `res.status(201)`. Guarda el archivo.
* **Acción 3: El test detecta la falla.** Vuelve a la terminal y corre `npm test` de nuevo.
  * **Guion:** *"Ahora voy a simular un error humano. Si alguien del equipo cambia accidentalmente el status 200 por un 201 en el controlador, al correr `npm test`, el test de 'Rutas del menú' falla inmediatamente indicando que esperaba 200 pero recibió 201. ¡El sistema nos acaba de salvar el pellejo!"*
* **Acción 4: Corrección.** Regresa a `menu.controller.js`, pon el `200` de nuevo, guarda y corre `npm test` por última vez.
  * **Guion:** *"Corregimos el error, corremos los tests otra vez, y volvemos a tener todo en verde. El restaurante vuelve a ser seguro."*

---

## ⏱️ Minuto 4: Pregunta Teórica (Ambos)
* **Acción:** Estudiante B deja de compartir.
* **Estudiante A pregunta:** "Oye, compañero/a, ¿qué diferencia hay entre `assert.equal` y `assert.strictEqual` de los que usamos hoy?"
* **Estudiante B responde:** "`assert.equal` es como el `==` en JavaScript: ignora el tipo de dato. `assert.strictEqual` es como el `===`: compara valor y tipo. Usamos el estricto porque es mucho más seguro para evitar bugs donde, por ejemplo, recibimos un string '200' en lugar del número 200 real."
* **Cierre:** Ambos se despiden.

---

*(Pega el enlace final en dia7/restaurante-backend/loom.txt)*
