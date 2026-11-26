# ERS V2 — CAOS Skate Store

## Propósito

Migrar la tienda original HTML/CSS a una aplicación frontend moderna con React y Vite, manteniendo la identidad visual streetwear y agregando un flujo de compra demostrable.

## Alcance

Aplicación web de una sola página (SPA) sin backend. Los datos viven en un catálogo JavaScript y en localStorage del navegador. La autenticación es de demostración.

## Perfiles de usuario

Perfil	Correo demo	Acceso
Visitante	    ->      Catálogo, carrito y checkout
Cliente	        ->      cliente@caos.cl	    Historial de sus compras
Empleado	    ->      empleado@caos.cl	    Panel de pedidos
Administrador	->      admin@caos.cl     CRUD de productos

Contraseña demo para todos: CAOS2026!. El perfil se detecta por el correo.

## Requisitos funcionales

1. El visitante puede navegar por productos, categorías y ofertas.
2. El visitante puede buscar productos y agregarlos al carrito.
3. El carrito permite modificar cantidades, eliminar productos y revisar el total.
4. El checkout solicita nombre, correo, dirección y tipo de entrega.
5. El sistema valida campos obligatorios y muestra confirmación de compra.
6. El administrador puede crear, actualizar stock y eliminar productos.
7. Los productos y el carrito persisten mediante `localStorage`.
8. El administrador puede marcar productos como destacados para controlar las ofertas.

## Requisitos no funcionales

- Aplicación construida con React y Vite.
- Componentes reutilizables con props y estado local.
- Diseño responsive con CSS para móvil, tablet y escritorio.
- Pruebas unitarias con Vitest, incluyendo renderizado, props, estado y eventos.
- Código organizado en componentes, datos y utilidades.

## Arquitectura

`App` coordina el estado global del carrito y React Router define las rutas de la aplicación. Las entradas de `src/pages` representan vistas completas y utilizan componentes de `src/components` para la interfaz reutilizable. `src/data/products.js` implementa CRUD sobre la fuente de datos simulada.

## Cambios respecto de la versión anterior

Se agregó login por correo con tres perfiles y control de acceso por rol.
Se agregó panel de empleado para actualizar estados de pedidos.
Se agregó historial de compras para clientes.
La compra descuenta stock y genera un pedido persistente.
Se agregó carrusel urbano y logo animado en el encabezado.
Se agregó validación visible en el formulario administrativo y recuperación ante datos corruptos de `localStorage`.
Se ampliaron las ofertas para utilizar la propiedad `featured` de cada producto.
Se agregó confirmación antes de eliminar artículos del carrito y productos del panel administrativo.
Se incorporó React Router para navegar mediante rutas reales.
Se ampliaron las vistas completas dentro de `src/pages` y la suite de pruebas a 37 casos.
La versión HTML fue retirada; la aplicación se ejecuta solo con React y Vite.

## Limitaciones conocidas

Sin backend ni base de datos: los datos son locales a cada navegador.
La autenticación es de demostración (contraseña fija, sin cifrado).
No hay integración con pasarela de pago real.
