# Valde Skate Store

Tienda online migrada desde HTML/CSS a React con Vite para la Evaluación Parcial 2 de DSY1104.

## Funcionalidades

- Catálogo de productos con búsqueda, categorías y ofertas.
- Carrito persistente en `localStorage`, cantidades y eliminación.
- Checkout con validación de datos, tipo de entrega y confirmación de compra.
- Panel administrativo con CRUD sobre una fuente de datos JavaScript persistida en `localStorage`.
- Login general por correo con perfiles de administrador, empleado y cliente.
- Panel de empleado para revisar y actualizar el estado de pedidos.
- Historial de compras para clientes.

## Estructura principal

```text
public/img/
├── branding/    # Ojo 3D y fotografía de Virgil Abloh
├── carousel/    # Imágenes del carrusel urbano
└── productos/   # Imágenes del catálogo

src/
├── components/  # Componentes y vistas reutilizables
├── data/        # Productos, pedidos y persistencia local
├── test/        # Pruebas unitarias
└── utils/       # Utilidades compartidas
```

La versión anterior en HTML fue retirada; la aplicación actual se ejecuta exclusivamente con React y Vite.
- Diseño responsive para móvil, tablet y escritorio.
- 33 pruebas unitarias con Vitest y Testing Library, con 91,17% de cobertura de statements.

## Comandos

```bash
npm install
npm run dev
npm test
npm run coverage
npm run build
```

## Accesos demo

- Correo: `admin@valdeskate.cl`
- Perfil: administrador
- Correo: `empleado@valdeskate.cl`
- Perfil: empleado
- Correo: `cliente@valdeskate.cl`
- Perfil: cliente
- Contraseña: `Valde2026!`
