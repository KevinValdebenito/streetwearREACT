# Documento de cobertura de testing

## Herramientas

El proyecto utiliza Vitest como runner, `jsdom` para simular el navegador y React Testing Library para validar el DOM desde la perspectiva del usuario. `vi.fn()` se utiliza como mock para verificar callbacks recibidos por props.

## Alcance

La suite contiene 33 pruebas distribuidas en tres archivos:

| Área | Casos cubiertos |
| --- | --- |
| Componentes | Productos, carrito, checkout, resultado, encabezado y carrusel |
| Autenticación | Credenciales inválidas y detección de perfiles administrador, empleado y cliente |
| Administración | Crear, actualizar stock y eliminar productos |
| Operación | Actualización de estados de pedidos desde el panel de empleado |
| Cliente | Historial filtrado por correo y estado vacío |
| Catálogo | Búsqueda, categorías, ofertas y navegación desde la portada |
| Persistencia | Lectura, escritura y eliminación de `localStorage`, productos y pedidos |
| Flujo de compra | Agregar productos, modificar cantidades, validar checkout y confirmar compra |

Archivos de prueba:

- `src/test/app.test.jsx`: flujos principales de la tienda.
- `src/test/components.test.jsx`: componentes, roles y vistas.
- `src/test/data.test.js`: persistencia y operaciones de productos/pedidos.

Última ejecución validada:

- **33/33 pruebas exitosas**.
- **91,17% de statements**.
- **88,12% de branches**.
- **78,66% de funciones**.
- **91,17% de líneas**.

Ejecutar `npm run coverage` para generar el reporte HTML en `coverage/`.
