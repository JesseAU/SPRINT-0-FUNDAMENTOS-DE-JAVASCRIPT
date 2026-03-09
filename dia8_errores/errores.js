/**
 * Módulo de Errores Estructurados (Día 8)
 * Permite tipificar las fallas del sistema para dar una respuesta
 * específica al usuario en lugar de errores genéricos.
 */

// Error base para el restaurante
export class RestauranteError extends Error {
    constructor(mensaje) {
        super(mensaje);
        this.name = "RestauranteError";
    }
}

// Error cuando el plato no cumple reglas de negocio (sin stock, no existe)
export class ValidationError extends RestauranteError {
    constructor(mensaje) {
        super(mensaje);
        this.name = "ValidationError";
    }
}

// Error cuando falla la simulación de red o el servidor
export class NetworkError extends RestauranteError {
    constructor(mensaje) {
        super(mensaje);
        this.name = "NetworkError";
        this.retryable = true; // Indica que el usuario puede intentar de nuevo
    }
}

// Error específico de stock agotado
export class StockError extends ValidationError {
    constructor(mensaje) {
        super(mensaje);
        this.name = "StockError";
    }
}
