// src/config/swagger.js
// Configuración de swagger-jsdoc y swagger-ui-express

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi    = require('swagger-ui-express');

// -------------------------------------------------------
// Objeto de definición OpenAPI (el "swagger" del profesor)
// -------------------------------------------------------
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Productos',
      version: '1.0.0',
      description: `
## API REST — Gestión de Productos

API construida con **Node.js + Express** y base de datos **PostgreSQL**.

### Operaciones disponibles
| Método | Ruta                  | Descripción                        |
|--------|-----------------------|------------------------------------|
| GET    | /api/productos        | Obtiene todos los productos        |
| GET    | /api/productos/:id    | Obtiene un producto por su ID      |
| POST   | /api/productos        | Crea un nuevo producto             |
| PUT    | /api/productos/:id    | Actualiza un producto completo     |
| DELETE | /api/productos/:id    | Elimina un producto                |

### Códigos de respuesta utilizados
- \`200\` — Operación exitosa
- \`201\` — Recurso creado correctamente
- \`400\` — Datos de entrada inválidos
- \`404\` — Producto no encontrado
- \`500\` — Error interno del servidor
      `,
      contact: {
        name: 'Soporte API',
        email: 'estudiante@ejemplo.com',
      },
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production'
          ? 'https://tu-app.railway.app'   // <-- cambia por tu URL real al desplegar
          : `http://localhost:${process.env.PORT || 3000}`,
        description: process.env.NODE_ENV === 'production'
          ? 'Servidor en producción (Railway)'
          : 'Servidor local de desarrollo',
      },
    ],
    // Componentes reutilizables (esquemas)
    components: {
      schemas: {
        // Esquema de un Producto completo (respuesta)
        Producto: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Identificador único del producto',
              example: 1,
            },
            nombre: {
              type: 'string',
              description: 'Nombre del producto',
              example: 'Laptop HP 15"',
            },
            descripcion: {
              type: 'string',
              description: 'Descripción detallada del producto',
              example: 'Laptop con procesador Intel Core i5, 8GB RAM',
            },
            precio: {
              type: 'number',
              format: 'float',
              description: 'Precio en pesos mexicanos',
              example: 12999.99,
            },
            stock: {
              type: 'integer',
              description: 'Cantidad disponible en inventario',
              example: 25,
            },
            categoria: {
              type: 'string',
              description: 'Categoría del producto',
              example: 'Electrónica',
            },
            creado_en: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha y hora de creación',
              example: '2024-01-15T10:30:00.000Z',
            },
          },
        },

        // Esquema para crear/actualizar (sin id ni creado_en)
        ProductoInput: {
          type: 'object',
          required: ['nombre', 'precio', 'stock'],
          properties: {
            nombre: {
              type: 'string',
              description: 'Nombre del producto',
              example: 'Laptop HP 15"',
            },
            descripcion: {
              type: 'string',
              description: 'Descripción detallada del producto',
              example: 'Laptop con procesador Intel Core i5, 8GB RAM',
            },
            precio: {
              type: 'number',
              format: 'float',
              description: 'Precio en pesos mexicanos (mayor a 0)',
              example: 12999.99,
            },
            stock: {
              type: 'integer',
              description: 'Cantidad disponible en inventario (mayor o igual a 0)',
              example: 25,
            },
            categoria: {
              type: 'string',
              description: 'Categoría del producto',
              example: 'Electrónica',
            },
          },
        },

        // Esquema de error estándar
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Mensaje descriptivo del error',
              example: 'Producto no encontrado',
            },
          },
        },

        // Esquema de mensaje de éxito
        Mensaje: {
          type: 'object',
          properties: {
            mensaje: {
              type: 'string',
              description: 'Mensaje de confirmación',
              example: 'Operación realizada correctamente',
            },
          },
        },
      },
    },
  },
  // Archivos donde swagger-jsdoc buscará los bloques @swagger
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);

/**
 * Registra la ruta /doc en la aplicación Express
 * @param {import('express').Application} app
 */
function setupSwagger(app) {
  // Sirve la interfaz visual de Swagger UI en /doc
  app.use(
    '/doc',
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      explorer: true,
      customSiteTitle: 'API Productos — Documentación',
    })
  );

  // Endpoint adicional que devuelve el JSON de la especificación
  // Útil para herramientas externas
  app.get('/doc.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });

  console.log('📄 Documentación Swagger disponible en /doc');
}

module.exports = setupSwagger;
