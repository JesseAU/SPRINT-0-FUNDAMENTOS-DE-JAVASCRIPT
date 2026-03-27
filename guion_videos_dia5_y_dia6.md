# 🎬 Guion y Estructura para Videos de Loom (Días 5 y 6)

Ambos videos deben durar exactamente entre **4 y 5 minutos**. Estudiante A y Estudiante B deben presentarse y tener roles definidos de antemano. No hay necesidad de memorizar todo, pero sí deben decirlo de forma fluida y natural (en sus propias palabras).

---

## 🔒 DÍA 5: Autenticación con JWT (JSON Web Tokens)

**Objetivo del video:** Demostrar cómo se registra un admin, cómo se obtiene un token seguro, y cómo el token protege las rutas importantes (crear platos paralizando a intrusos).

### ⏱️ Minuto 1: Contexto Teórico (Habla Estudiante A)
* **Acción:** Estudiante A habla directamente a la cámara.
* **Guion sugerido:** 
> "¡Hola! En este Día 5 implementamos Autenticación en nuestro restaurante. Antes, cualquier persona podía modificar los platos, lo cual era un peligro. 
> Para solucionarlo, primero registramos al administrador usando `bcrypt` para encriptar su contraseña y que nunca quede guardada como texto plano en la base de datos.
> Después, cuando este admin hace login, nuestro sistema le entrega un 'Token' usando Json Web Tokens (JWT). Este token sirve como su pase de entrada para rutas protegidas durante las próximas 24 horas."

### ⏱️ Minutos 2–3: Demostración Técnica (Habla y comparte pantalla Estudiante B)
* **Acción 1 (El fracaso sin token):** Abre Thunder Client/Postman. Ve a la ruta `POST /menu` e intenta agregar un "Lomo Saltado". 
  * "Aquí intento agregar un plato sin estar autenticado. Vemos que recibo un Error 401: Token vacío o inexistente."
* **Acción 2 (El Login exitoso):** Ve a `POST /auth/login`, pon el correo y contraseña del administrador. Ejecútalo. 
  * "Ahora voy a la ruta de Login, ingreso mis credenciales válidas y recibo este bloque largo, el famoso JWT." (Copia el token completo).
* **Acción 3 (El éxito con token):** Vuelve a la ruta de `POST /menu`, ve a los Headers (Auth -> Bearer), pega el token, y dale Enviar.
  * "Si pego mi JWT acá en el Authorization Header e intento crear el plato de nuevo, ahora recibo un 201 Created. La ruta está protegida exitosamente."

### ⏱️ Minuto 4: Pregunta Teórica (Ambos)
* **Acción:** Estudiante B deja de compartir.
* **Estudiante A pregunta:** "Compañero/a, si el token JWT dura 24 horas y le damos ese token a alguien y se loguea. ¿Qué pasaría si roban ese token de la computadora del usuario? ¿Pudieran usarlo?"
* **Estudiante B responde:** "Sí. Quien posea el token posee la llave al restaurante. Por eso es vital que el token viaje bajo conexiones seguras (como HTTPS HTTPS en producción) y que tenga un tiempo de expiración corto (24h) para mitigar si cae en manos equivocadas."

*(Corte de grabación. Se pega en loom.txt del restaurante-backend)*

---

## 🛠️ DÍA 6: Variables de Entorno y Configuración Profesional

**Objetivo del video:** Mostrar que `JWT_SECRET`, la `MONGO_URI` real, y el puerto, ya no están escritos a fuego ("hardcodeados") en el código. Y certificar públicamente que GitHub **NO** recibió dicha información delicada.

### ⏱️ Minuto 1: Contexto Teórico (Habla Estudiante A)
* **Acción:** Hablando a cámara.
* **Guion sugerido:** 
> "En el Día 6 solucionamos finalmente un hueco enorme de seguridad. Teníamos la cadena de conexión de MongoDB y las claves de nuestros Tokens directamente quemadas en el código fuente (`app.js` y `auth.service.js`). 
> Las variables de entorno (`.env`) resuelven esto. Nos permiten guardar esa información confidencial afuera del código para que, cuando el código se suba a repositorios públicos como GitHub, nuestros secretos no queden expuestos al mundo, evitando robos de bases de datos o falsificaciones de firmas JWT."

### ⏱️ Minutos 2–3: La demostración en código (Comparte pantalla Estudiante B)
* **Acción 1:** Estudiante B muestra VS Code y abre el archivo `.env`. (La variable de JWT_SECRET se ve en pantalla).
  * "Aquí vemos nuestro archivo `.env` en local, con nuestras llaves."
* **Acción 2:** Estudiante B corta o borra temporalmente la línea `JWT_SECRET` del archivo, lo guarda y verifica el servidor.
  * "Si nosotros simulamos quitar el secreto guardando el `.env` vacío o defectuoso, nuestro sistema en la terminal crashea o nos lanza un error claro advirtiendo la falta de credencial de JWT_SECRET." (Opcionalmente levanta el error vía nodemon).
* **Acción 3:** Regresa el string, guarda y muestra que carga exitosamente `MongoDB Conectado / Restaurante corriendo puerto 3000`.

### ⏱️ Minuto 4 y Escena Obligatoria (Ambos)
* **Acción de Git (OBLIGATORIO):** Estudiante B navega al navegador web y abre el repositorio real en GitHub. 
  * "Y la prueba de fuego: Vemos nuestro repositorio público en la ruta del día de hoy. Observamos que ahí hay un `.env.example` y un archivo `.gitignore`, pero nuestro adorado archivo oculto `.env` **NO** lo tiene GitHub. La información está resguardada."
* **Pregunta final (Estudiante A):** "¿Por qué entonces subimos `.env.example` al repositorio si el `.env` real no debe subir jamás?"
* **Estudiante B responde:** "Porque el `.env.example` no tiene la contraseña. Tiene el esqueleto, la receta. Le sirve a cualquier otro programador del equipo como guía ('plantilla') para saber que cuando clone el proyecto, él mismo debe crearse un `.env` personal para que su servidor encienda, sabiendo cuáles variables necesita sin ver las nuestras."

*(Corte de grabación. Se pega en loom.txt de dia6/restaurante-backend)*
