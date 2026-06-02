require('dotenv').config(); 
const express      = require('express');
const cors         = require('cors');
const setupSwagger = require('./config/swagger');
const productosRoutes = require('./routes/productos');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app  = express();
const PORT = process.env.PORT || 3000;


app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

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

app.use('/api/productos', productosRoutes);

setupSwagger(app);

app.use(notFound);
app.use(errorHandler);
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
