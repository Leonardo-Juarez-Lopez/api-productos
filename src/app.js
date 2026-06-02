// src/app.js
// Punto de entrada principal del servidor Express

require('dotenv').config(); // Carga el archivo .env antes de todo

const express      = require('express');
const cors         = require('cors');
const setupSwagger = require('./config/swagger');
const productosRoutes = require('./routes/productos');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app  = express();
const PORT = process.env.PORT || 3000;

// ─── Middlewares globales ──────────────────────────────────────
// CORS: permite peticiones desde cualquier origen
app.use(cors());

// Parsea el body de las peticiones como JSON
app.use(express.json());

// Parsea formularios URL-encoded (por si acaso)
app.use(express.urlencoded({ extended: true }));

// ─── Ruta de salud / bienvenida ────────────────────────────────
// Útil para verificar que la API está activa (health check de Railway/Render)
app.get('/', (req, res) => {
  res.status(200).json({
    mensaje: '¡API de Productos funcionando correctamente!',
    documentacion: '/doc',
    version: '1.0.0',
    endpoints: {
      obtenerTodos:  'GET    /api/productos',
      obtenerPorId:  'GET    /api/productos/:id',
      crear:         'POST   /api/productos',
      actualizar:    'PUT    /api/productos/:id',
      eliminar:      'DELETE /api/productos/:id',
    },
  });
});

// ─── Rutas de la API ───────────────────────────────────────────
app.use('/api/productos', productosRoutes);

// ─── Documentación Swagger (ruta /doc) ────────────────────────
setupSwagger(app);

// ─── Manejo de rutas no encontradas (404) ─────────────────────
// Va DESPUÉS de todas las rutas
app.use(notFound);

// ─── Manejo global de errores ──────────────────────────────────
// Va SIEMPRE al último (recibe 4 parámetros)
app.use(errorHandler);

// ─── Inicio del servidor ───────────────────────────────────────
app.listen(PORT, () => {
  console.log(`
  ╔══════════════════════════════════════════════╗
  ║        API de Productos — Iniciada           ║
  ╠══════════════════════════════════════════════╣
  ║  Servidor:      http://localhost:${PORT}        ║
  ║  Documentación: http://localhost:${PORT}/doc    ║
  ║  Entorno:       ${(process.env.NODE_ENV || 'development').padEnd(29)}║
  ╚══════════════════════════════════════════════╝
  `);
});

module.exports = app;
