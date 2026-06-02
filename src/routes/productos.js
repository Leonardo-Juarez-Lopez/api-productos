// src/routes/productos.js
// Rutas del recurso Producto con documentación OpenAPI (Swagger)

const express    = require('express');
const router     = express.Router();
const controller = require('../controllers/productosController');

// ═══════════════════════════════════════════════════════════════
// GET /api/productos
// ═══════════════════════════════════════════════════════════════
/**
 * @swagger
 * /api/productos:
 *   get:
 *     summary: Obtiene todos los productos
 *     description: |
 *       Devuelve un arreglo con todos los productos registrados en la base de datos.
 *       Opcionalmente se puede filtrar por categoría usando el parámetro query **categoria**.
 *
 *       **Ejemplo con curl:**
 *       ```bash
 *       curl -X GET https://tu-app.railway.app/api/productos
 *       curl -X GET https://tu-app.railway.app/api/productos?categoria=Electrónica
 *       ```
 *
 *       **Ejemplo con JavaScript (fetch):**
 *       ```javascript
 *       const res = await fetch('/api/productos');
 *       const productos = await res.json();
 *       console.log(productos);
 *       ```
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: query
 *         name: categoria
 *         required: false
 *         schema:
 *           type: string
 *           example: Electrónica
 *         description: Filtra los productos por categoría
 *     responses:
 *       200:
 *         description: Lista de productos obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Producto'
 *             example:
 *               - id: 1
 *                 nombre: "Laptop HP 15\""
 *                 descripcion: "Intel Core i5, 8GB RAM, 512GB SSD"
 *                 precio: 12999.99
 *                 stock: 25
 *                 categoria: "Electrónica"
 *                 creado_en: "2024-01-15T10:30:00.000Z"
 *               - id: 2
 *                 nombre: "Mouse Logitech MX Master 3"
 *                 descripcion: "Mouse inalámbrico ergonómico"
 *                 precio: 1499.00
 *                 stock: 50
 *                 categoria: "Periféricos"
 *                 creado_en: "2024-01-16T08:00:00.000Z"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Error interno del servidor"
 */
router.get('/', controller.obtenerTodos);

// ═══════════════════════════════════════════════════════════════
// GET /api/productos/:id
// ═══════════════════════════════════════════════════════════════
/**
 * @swagger
 * /api/productos/{id}:
 *   get:
 *     summary: Obtiene un producto por su ID
 *     description: |
 *       Busca y devuelve un único producto usando su identificador numérico.
 *
 *       **Ejemplo con curl:**
 *       ```bash
 *       curl -X GET https://tu-app.railway.app/api/productos/1
 *       ```
 *
 *       **Ejemplo con JavaScript (fetch):**
 *       ```javascript
 *       const res = await fetch('/api/productos/1');
 *       if (res.ok) {
 *         const producto = await res.json();
 *         console.log(producto);
 *       }
 *       ```
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 1
 *         description: Identificador numérico del producto
 *     responses:
 *       200:
 *         description: Producto encontrado y devuelto correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 *             example:
 *               id: 1
 *               nombre: "Laptop HP 15\""
 *               descripcion: "Intel Core i5, 8GB RAM, 512GB SSD"
 *               precio: 12999.99
 *               stock: 25
 *               categoria: "Electrónica"
 *               creado_en: "2024-01-15T10:30:00.000Z"
 *       400:
 *         description: El id proporcionado no es un número entero positivo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "El id debe ser un número entero positivo"
 *       404:
 *         description: No existe un producto con ese ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Producto no encontrado"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', controller.obtenerPorId);

// ═══════════════════════════════════════════════════════════════
// POST /api/productos
// ═══════════════════════════════════════════════════════════════
/**
 * @swagger
 * /api/productos:
 *   post:
 *     summary: Crea un nuevo producto
 *     description: |
 *       Inserta un nuevo producto en la base de datos. Los campos **nombre**, **precio**
 *       y **stock** son obligatorios.
 *
 *       **Ejemplo con curl:**
 *       ```bash
 *       curl -X POST https://tu-app.railway.app/api/productos \
 *         -H "Content-Type: application/json" \
 *         -d '{"nombre":"Teclado Mecánico","precio":999.99,"stock":15,"categoria":"Periféricos"}'
 *       ```
 *
 *       **Ejemplo con JavaScript (fetch):**
 *       ```javascript
 *       const res = await fetch('/api/productos', {
 *         method: 'POST',
 *         headers: { 'Content-Type': 'application/json' },
 *         body: JSON.stringify({
 *           nombre: 'Teclado Mecánico',
 *           precio: 999.99,
 *           stock: 15,
 *           categoria: 'Periféricos'
 *         })
 *       });
 *       const nuevo = await res.json();
 *       console.log(nuevo); // incluye el id asignado
 *       ```
 *     tags:
 *       - Productos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductoInput'
 *           example:
 *             nombre: "Teclado Mecánico RGB"
 *             descripcion: "Teclado mecánico con switches Blue y retroiluminación RGB"
 *             precio: 999.99
 *             stock: 15
 *             categoria: "Periféricos"
 *     responses:
 *       201:
 *         description: Producto creado exitosamente. Devuelve el producto con su id asignado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 *             example:
 *               id: 3
 *               nombre: "Teclado Mecánico RGB"
 *               descripcion: "Teclado mecánico con switches Blue y retroiluminación RGB"
 *               precio: 999.99
 *               stock: 15
 *               categoria: "Periféricos"
 *               creado_en: "2024-01-20T14:00:00.000Z"
 *       400:
 *         description: Datos de entrada inválidos o campos requeridos faltantes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "El campo nombre es requerido"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', controller.crear);

// ═══════════════════════════════════════════════════════════════
// PUT /api/productos/:id
// ═══════════════════════════════════════════════════════════════
/**
 * @swagger
 * /api/productos/{id}:
 *   put:
 *     summary: Actualiza un producto completo
 *     description: |
 *       Reemplaza todos los campos de un producto existente con los nuevos valores
 *       proporcionados en el cuerpo de la petición. Los campos **nombre**, **precio**
 *       y **stock** son obligatorios.
 *
 *       **Ejemplo con curl:**
 *       ```bash
 *       curl -X PUT https://tu-app.railway.app/api/productos/1 \
 *         -H "Content-Type: application/json" \
 *         -d '{"nombre":"Laptop HP Actualizada","precio":13999.99,"stock":20,"categoria":"Electrónica"}'
 *       ```
 *
 *       **Ejemplo con JavaScript (fetch):**
 *       ```javascript
 *       const res = await fetch('/api/productos/1', {
 *         method: 'PUT',
 *         headers: { 'Content-Type': 'application/json' },
 *         body: JSON.stringify({
 *           nombre: 'Laptop HP Actualizada',
 *           precio: 13999.99,
 *           stock: 20,
 *           categoria: 'Electrónica'
 *         })
 *       });
 *       const actualizado = await res.json();
 *       ```
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 1
 *         description: Identificador numérico del producto a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductoInput'
 *           example:
 *             nombre: "Laptop HP Actualizada"
 *             descripcion: "Intel Core i7, 16GB RAM, 1TB SSD — versión actualizada"
 *             precio: 13999.99
 *             stock: 20
 *             categoria: "Electrónica"
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente. Devuelve el producto con los nuevos valores.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 *             example:
 *               id: 1
 *               nombre: "Laptop HP Actualizada"
 *               descripcion: "Intel Core i7, 16GB RAM, 1TB SSD — versión actualizada"
 *               precio: 13999.99
 *               stock: 20
 *               categoria: "Electrónica"
 *               creado_en: "2024-01-15T10:30:00.000Z"
 *       400:
 *         description: Datos de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "El precio debe ser un número mayor a 0"
 *       404:
 *         description: No existe un producto con ese ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Producto no encontrado"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', controller.actualizar);

// ═══════════════════════════════════════════════════════════════
// DELETE /api/productos/:id
// ═══════════════════════════════════════════════════════════════
/**
 * @swagger
 * /api/productos/{id}:
 *   delete:
 *     summary: Elimina un producto
 *     description: |
 *       Elimina permanentemente un producto de la base de datos usando su ID.
 *       Esta operación **no se puede deshacer**.
 *
 *       **Ejemplo con curl:**
 *       ```bash
 *       curl -X DELETE https://tu-app.railway.app/api/productos/1
 *       ```
 *
 *       **Ejemplo con JavaScript (fetch):**
 *       ```javascript
 *       const res = await fetch('/api/productos/1', { method: 'DELETE' });
 *       const resultado = await res.json();
 *       console.log(resultado.mensaje);
 *       ```
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 1
 *         description: Identificador numérico del producto a eliminar
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mensaje'
 *             example:
 *               mensaje: "Producto con id 1 eliminado correctamente"
 *       400:
 *         description: El id proporcionado no es un número entero positivo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "El id debe ser un número entero positivo"
 *       404:
 *         description: No existe un producto con ese ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Producto no encontrado"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', controller.eliminar);

module.exports = router;
