# ERS V2 — StreetWear Skate Store

## Propósito

Migrar la tienda original HTML/CSS a una aplicación frontend moderna con React y Vite, manteniendo la identidad visual streetwear y agregando un flujo de compra demostrable.

## Alcance

Aplicación web de una sola página (SPA) sin backend. Los datos viven en un catálogo JavaScript y en localStorage del navegador. La autenticación es de demostración.

## Perfiles de usuario

Perfil	Correo demo	Acceso
Visitante	    ->      Catálogo, carrito y checkout
Cliente	        ->      cliente@valdeskate.cl	    Historial de sus compras
Empleado	    ->      empleado@valdeskate.cl	    Panel de pedidos
Administrador	->      admin@valdeskate.cl	        CRUD de productos

Contraseña demo para todos: Valde2026!. El perfil se detecta por el correo.

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

## Cambios respecto de la versión anterior

Se agregó login por correo con tres perfiles y control de acceso por rol.
Se agregó panel de empleado para actualizar estados de pedidos.
Se agregó historial de compras para clientes.
La compra descuenta stock y genera un pedido persistente.
Se agregó carrusel urbano y logo animado en el encabezado.
Se amplió la suite de pruebas a 33 casos y se midió la cobertura real.
La versión HTML fue retirada; la aplicación se ejecuta solo con React y Vite.

## Limitaciones conocidas

Sin backend ni base de datos: los datos son locales a cada navegador.
La autenticación es de demostración (contraseña fija, sin cifrado).
No hay integración con pasarela de pago real.
