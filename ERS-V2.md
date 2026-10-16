# ERS V2 — Valde Skate Store

## Propósito

Migrar la tienda original HTML/CSS a una aplicación frontend moderna con React y Vite, manteniendo la identidad visual streetwear y agregando un flujo de compra demostrable.

## Requisitos funcionales

1. El visitante puede navegar por productos, categorías y ofertas.
2. El visitante puede buscar productos y agregarlos al carrito.
3. El carrito permite modificar cantidades, eliminar productos y revisar el total.
4. El checkout solicita nombre, correo, dirección y tipo de entrega.
5. El sistema valida campos obligatorios y muestra confirmación de compra.
6. El administrador puede crear, actualizar stock y eliminar productos.
7. Los productos y el carrito persisten mediante `localStorage`.

## Requisitos no funcionales

- Aplicación construida con React y Vite.
- Componentes reutilizables con props y estado local.
- Diseño responsive con CSS para móvil, tablet y escritorio.
- Pruebas unitarias con Vitest, incluyendo renderizado, props, estado y eventos.
- Código organizado en componentes, datos y utilidades.

## Arquitectura

`App` coordina navegación y estado global del carrito. `ProductCard`, `ProductGrid`, `Cart`, `Checkout`, `Result` y `Admin` encapsulan las vistas. `src/data/products.js` implementa CRUD sobre la fuente de datos simulada.
