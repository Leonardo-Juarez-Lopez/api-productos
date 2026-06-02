// src/middleware/errorHandler.js
// Middleware centralizado de manejo de errores

/**
 * Middleware para rutas no encontradas (404)
 * Debe ir DESPUÉS de todas las rutas
 */
function notFound(req, res, next) {
  res.status(404).json({
    error: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
  });
}

/**
 * Middleware global de errores
 * Recibe 4 parámetros — Express lo reconoce como manejador de errores
 */
function errorHandler(err, req, res, next) {
  console.error('💥 Error no controlado:', err.stack);

  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Error interno del servidor';

  res.status(status).json({ error: message });
}

module.exports = { notFound, errorHandler };
