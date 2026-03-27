# Resumen — Día 1: Introducción a Node.js

## Conceptos Clave Aprendidos
- **Entorno de Ejecución:** Node.js no es un lenguaje, sino un entorno que permite ejecutar JavaScript fuera del navegador usando el motor **V8** de Chrome.
- **Node REPL:** Herramienta interactiva para probar código rápidamente desde la terminal.
- **NPM (Node Package Manager):** El gestor de paquetes más grande del mundo, esencial para manejar dependencias.
- **Nodemon:** Herramienta de desarrollo que reinicia la aplicación automáticamente cada vez que detecta cambios en el código.

## Aplicación Creada: `restaurante-backend`
Hemos desarrollado nuestro primer servidor básico en el archivo `app.js`:
- Definición de variables globales del sistema.
- Uso de **Arrays de Objetos** para el menú.
- Implementación de **Funciones** para lógica de negocio y visualización en consola.
- Uso de `forEach` para iterar sobre los platos.

## Configuración del Entorno
1. **Inicialización:** `npm init -y` para crear el `package.json`.
2. **Dependencias:** Instalación de `nodemon` como dependencia de desarrollo (`--save-dev`).
3. **Scripts de Automatización:** 
   - `npm start`: Para ejecución normal.
   - `npm run dev`: Para desarrollo ágil con reinicio automático.

## Próximos Pasos
- Explorar módulos nativos de Node.js (`fs`, `http`, `path`).
- Crear nuestro primer servidor web real.
- Aprender sobre el sistema de módulos de Node (CommonJS vs ES Modules).
