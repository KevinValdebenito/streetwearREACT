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

Últimos resultados validados:

- **33/33 pruebas exitosas**.
- **82,19 % de statements**.
- **83,13 % de branches**.
- **73,75 % de funciones**.
- **82,19 % de líneas**.

## Análisis

Los componentes (`src/components`) tienen 94,69 % de cobertura de statements. La lógica de datos (`src/data`) alcanza 100 % de statements y 95,83 % de branches. Las páginas (`src/pages`) y utilidades (`src/utils`) presentan 100 % en las cuatro métricas.

El archivo `src/App.jsx` alcanza 63,35 % de statements, mientras que `src/main.jsx`, `vite.config.js` y el archivo generado dentro de `dist/assets` aparecen con 0 % porque no fueron ejecutados durante las pruebas.

Estos archivos con cobertura de 0 % afectan el promedio global. En particular, `dist/assets` contiene código generado por Vite que debería excluirse de una medición enfocada en el código fuente.

Las pruebas permiten verificar funcionalidades principales como autenticación, catálogo, administración, carrito, compras y persistencia de datos.

## Capturas

Guardar las imágenes en `docs/capturas/` y mantener estas referencias:

Ejecución de pruebas (`npm test`) con 33/33 aprobadas:

![Pruebas](docs/capturas/01-npm-test.png)

Salida de cobertura en consola (`npm run coverage`):

![Cobertura consola](docs/capturas/02-coverage-consola.png)

Reporte HTML (`coverage/index.html`):

![Cobertura HTML](docs/capturas/03-coverage-html.png)

Ejecutar `npm install`, `npm test` y `npm run coverage` para generar el reporte HTML en `coverage/`.