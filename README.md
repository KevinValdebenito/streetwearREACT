# CAOS Skate Store

## Funcionalidades

- Catálogo de productos con búsqueda, categorías y ofertas.
- Carrito persistente en `localStorage`, cantidades y eliminación.
- Checkout con validación de datos, tipo de entrega y confirmación de compra.
- Panel administrativo con CRUD sobre una fuente de datos JavaScript persistida en `localStorage`.
- Login general por correo con perfiles de administrador, empleado y cliente.
- Panel de empleado para revisar y actualizar el estado de pedidos.
- Historial de compras para clientes.
- Navegación con rutas mediante React Router.
- Enlaces activos con `NavLink`, página 404 y detalle dinámico en `/productos/:id`.
- Rutas privadas centralizadas mediante `ProtectedRoute`.
- Pantallas grandes divididas en subcomponentes reutilizables (`AdminForm`, `AdminProductList`, `CartItem`, `CartSummary`, `CheckoutForm` y `OrderSummary`).
- Confirmación antes de eliminar artículos o productos.

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

## La versión anterior en HTML fue retirada; la aplicación actual se ejecuta exclusivamente con React y Vite.

## Calidad

Diseño responsive para móvil, tablet y escritorio.
43 pruebas con Vitest y Testing Library, todas aprobadas.
Cobertura real: 90,79 % statements, 84,26 % branches, 75 % funciones, 90,79 % líneas. Detalle en DOCUMENTO-COBERTURA-TESTING.md.
Requisitos y arquitectura en ERS-V2.md.

## Comandos

```bash
npm install
npm run dev
npm test
npm run coverage
npm run build
```

## Despliegue

La aplicación está publicada en Vercel:

https://streetwear-react.vercel.app


## Accesos demo

Correo: admin@caos.cl
Perfil: administrador
Correo: empleado@caos.cl
Perfil: empleado
Correo: cliente@caos.cl
Perfil: cliente
Contraseña: CAOS2026!
