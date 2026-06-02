// src/config/database.js
// Configuración de conexión a PostgreSQL usando el paquete 'pg'

const { Pool } = require('pg');
require('dotenv').config();

// Railway y Render proveen la variable DATABASE_URL automáticamente.
// En local usamos las variables individuales del .env
const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        // SSL requerido en plataformas cloud (Railway, Render)
        ssl: process.env.NODE_ENV === 'production'
          ? { rejectUnauthorized: false }
          : false,
      }
    : {
        host:     process.env.DB_HOST     || 'localhost',
        port:     parseInt(process.env.DB_PORT) || 5432,
        database: process.env.DB_NAME     || 'api_productos',
        user:     process.env.DB_USER     || 'postgres',
        password: process.env.DB_PASSWORD || '',
      }
);

// Prueba la conexión al iniciar
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Error al conectar con la base de datos:', err.message);
    return;
  }
  release();
  console.log('✅ Conexión a PostgreSQL establecida correctamente');
});

module.exports = pool;
