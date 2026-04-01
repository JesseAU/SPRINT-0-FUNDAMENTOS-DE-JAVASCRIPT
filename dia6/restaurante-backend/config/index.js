// config/index.js
require('dotenv').config();

const config = {
    port:      process.env.PORT      || 3000,
    mongoUri:  process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET
};

// Validación para el video: si falta una variable, el servidor se detiene.
if (!config.mongoUri || !config.jwtSecret) {
    console.error('\n❌ ERROR CRÍTICO: Faltan variables esenciales en el archivo .env');
    console.error('Asegúrate de tener MONGO_URI y JWT_SECRET configurados.\n');
    process.exit(1);
}

module.exports = config;
