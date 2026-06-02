// src/controllers/productosController.js
// Controladores del recurso Producto — lógica de negocio separada de las rutas

const pool = require('../config/database');

// ─────────────────────────────────────────────
// GET /api/productos
// Devuelve todos los productos.
// Query param opcional: ?categoria=Electrónica
// ─────────────────────────────────────────────
async function obtenerTodos(req, res, next) {
  try {
    const { categoria } = req.query;

    let query  = 'SELECT * FROM productos ORDER BY id ASC';
    let params = [];

    // Filtro opcional por categoría
    if (categoria) {
      query  = 'SELECT * FROM productos WHERE categoria = $1 ORDER BY id ASC';
      params = [categoria];
    }

    const resultado = await pool.query(query, params);

    // Siempre devuelve 200, aunque el arreglo esté vacío
    res.status(200).json(resultado.rows);
  } catch (err) {
    next(err); // pasa el error al middleware de errores
  }
}

// ─────────────────────────────────────────────
// GET /api/productos/:id
// Devuelve un único producto por su ID
// ─────────────────────────────────────────────
async function obtenerPorId(req, res, next) {
  try {
    const { id } = req.params;

    // Validar que id sea un número entero positivo
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      return res.status(400).json({ error: 'El id debe ser un número entero positivo' });
    }

    const resultado = await pool.query(
      'SELECT * FROM productos WHERE id = $1',
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.status(200).json(resultado.rows[0]);
  } catch (err) {
    next(err);
  }
}

// ─────────────────────────────────────────────
// POST /api/productos
// Crea un nuevo producto
// ─────────────────────────────────────────────
async function crear(req, res, next) {
  try {
    const { nombre, descripcion, precio, stock, categoria } = req.body;

    // Validaciones de campos requeridos
    if (!nombre || nombre.trim() === '') {
      return res.status(400).json({ error: 'El campo nombre es requerido' });
    }
    if (precio === undefined || precio === null) {
      return res.status(400).json({ error: 'El campo precio es requerido' });
    }
    if (isNaN(precio) || Number(precio) <= 0) {
      return res.status(400).json({ error: 'El precio debe ser un número mayor a 0' });
    }
    if (stock === undefined || stock === null) {
      return res.status(400).json({ error: 'El campo stock es requerido' });
    }
    if (!Number.isInteger(Number(stock)) || Number(stock) < 0) {
      return res.status(400).json({ error: 'El stock debe ser un número entero mayor o igual a 0' });
    }

    const resultado = await pool.query(
      `INSERT INTO productos (nombre, descripcion, precio, stock, categoria)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        nombre.trim(),
        descripcion ? descripcion.trim() : null,
        Number(precio),
        Number(stock),
        categoria ? categoria.trim() : null,
      ]
    );

    // 201 Created — recurso creado exitosamente
    res.status(201).json(resultado.rows[0]);
  } catch (err) {
    next(err);
  }
}

// ─────────────────────────────────────────────
// PUT /api/productos/:id
// Actualiza TODOS los campos de un producto
// ─────────────────────────────────────────────
async function actualizar(req, res, next) {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock, categoria } = req.body;

    // Validar id
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      return res.status(400).json({ error: 'El id debe ser un número entero positivo' });
    }

    // Verificar que el producto existe
    const existe = await pool.query('SELECT id FROM productos WHERE id = $1', [id]);
    if (existe.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Validaciones de campos requeridos
    if (!nombre || nombre.trim() === '') {
      return res.status(400).json({ error: 'El campo nombre es requerido' });
    }
    if (precio === undefined || precio === null) {
      return res.status(400).json({ error: 'El campo precio es requerido' });
    }
    if (isNaN(precio) || Number(precio) <= 0) {
      return res.status(400).json({ error: 'El precio debe ser un número mayor a 0' });
    }
    if (stock === undefined || stock === null) {
      return res.status(400).json({ error: 'El campo stock es requerido' });
    }
    if (!Number.isInteger(Number(stock)) || Number(stock) < 0) {
      return res.status(400).json({ error: 'El stock debe ser un número entero mayor o igual a 0' });
    }

    const resultado = await pool.query(
      `UPDATE productos
       SET nombre = $1, descripcion = $2, precio = $3, stock = $4, categoria = $5
       WHERE id = $6
       RETURNING *`,
      [
        nombre.trim(),
        descripcion ? descripcion.trim() : null,
        Number(precio),
        Number(stock),
        categoria ? categoria.trim() : null,
        id,
      ]
    );

    res.status(200).json(resultado.rows[0]);
  } catch (err) {
    next(err);
  }
}

// ─────────────────────────────────────────────
// DELETE /api/productos/:id
// Elimina un producto por su ID
// ─────────────────────────────────────────────
async function eliminar(req, res, next) {
  try {
    const { id } = req.params;

    // Validar id
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      return res.status(400).json({ error: 'El id debe ser un número entero positivo' });
    }

    const resultado = await pool.query(
      'DELETE FROM productos WHERE id = $1 RETURNING *',
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.status(200).json({ mensaje: `Producto con id ${id} eliminado correctamente` });
  } catch (err) {
    next(err);
  }
}

module.exports = { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };
