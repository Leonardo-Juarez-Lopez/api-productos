DROP TABLE IF EXISTS productos;


CREATE TABLE productos (
    id          SERIAL PRIMARY KEY,           
    nombre      VARCHAR(150) NOT NULL,       
    descripcion TEXT,                         
    precio      NUMERIC(10, 2) NOT NULL       
                  CHECK (precio > 0),
    stock       INTEGER NOT NULL DEFAULT 0    
                  CHECK (stock >= 0),
    categoria   VARCHAR(100),                 
    creado_en   TIMESTAMP DEFAULT NOW()       
);

CREATE INDEX idx_productos_categoria ON productos(categoria);



INSERT INTO productos (nombre, descripcion, precio, stock, categoria) VALUES
(
    'Laptop HP 15"',
    'Procesador Intel Core i5 de 11a generación, 8GB RAM DDR4, 512GB SSD NVMe, pantalla Full HD',
    12999.99,
    25,
    'Electrónica'
),
(
    'Mouse Logitech MX Master 3',
    'Mouse inalámbrico ergonómico con sensor de 4000 DPI, conexión Bluetooth y USB, batería de larga duración',
    1499.00,
    50,
    'Periféricos'
),
(
    'Teclado Mecánico RGB',
    'Teclado mecánico con switches Blue, retroiluminación RGB personalizable, cable USB-C desmontable',
    999.99,
    30,
    'Periféricos'
),
(
    'Monitor LG 24" Full HD',
    'Monitor IPS 24 pulgadas, resolución 1920x1080, 75Hz, tiempo de respuesta 5ms, puerto HDMI y VGA',
    4599.00,
    15,
    'Electrónica'
),
(
    'Silla Ergonómica de Oficina',
    'Silla con soporte lumbar ajustable, reposabrazos en 4D, respaldo de malla transpirable, altura ajustable',
    3200.00,
    10,
    'Mobiliario'
),
(
    'Disco Duro Externo 1TB',
    'Disco duro portátil USB 3.0, velocidad de transferencia hasta 120MB/s, compatible con Windows y Mac',
    799.00,
    40,
    'Almacenamiento'
),
(
    'Audífonos Sony WH-1000XM4',
    'Audífonos inalámbricos con cancelación de ruido líder en su clase, 30 horas de batería, audio de alta resolución',
    5499.00,
    20,
    'Audio'
),
(
    'Webcam Logitech C920',
    'Cámara web Full HD 1080p a 30fps, micrófonos estéreo integrados, compatible con Zoom, Teams y OBS',
    1299.00,
    35,
    'Periféricos'
),
(
    'Hub USB-C 7 en 1',
    'Concentrador multiport: HDMI 4K, 3x USB-A, USB-C carga, SD y microSD, compatible con MacBook y laptops',
    599.00,
    60,
    'Accesorios'
),
(
    'Mochila para Laptop 15.6"',
    'Mochila resistente al agua con compartimento acolchado para laptop, puerto USB de carga, capacidad 30L',
    449.00,
    45,
    'Accesorios'
);



SELECT id, nombre, precio, stock, categoria
FROM productos
ORDER BY id;

SELECT COUNT(*) AS total_productos FROM productos;
