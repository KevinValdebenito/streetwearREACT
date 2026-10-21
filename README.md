# CAOS Skate Store

https://streetwearreact.vercel.app/
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

## La versión anterior en HTML fue retirada; la aplicación actual se ejecuta exclusivamente con React y Vite.

## Calidad

Diseño responsive para móvil, tablet y escritorio.
33 pruebas con Vitest y Testing Library, todas aprobadas.
Cobertura real: 86,04 % statements, 83,43 % branches, 74,68 % funciones, 86,04 % líneas. Detalle en DOCUMENTO-COBERTURA-TESTING.md.
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

Publicado en Vercel con el preset Vite (comando de build npm run build, directorio de salida dist).

## Accesos demo

- Correo: `admin@Streetwearskate.cl`
- Perfil: administrador
- Correo: `empleado@Streetwearskate.cl`
- Perfil: empleado
- Correo: `cliente@Streetwearskate.cl`
- Perfil: cliente
- Contraseña: `Streetwear2026!`
