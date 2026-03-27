// middlewares/logger.js
const logger = (req, res, next) => {
    const ahora = new Date().toLocaleTimeString();
    console.log(`[${ahora}] ${req.method} ${req.url}`);
    next(); // SIN next() LA PETICIÓN SE DETIENE AQUÍ
};

module.exports = logger;
