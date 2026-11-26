export function AdminForm({ form, editingId, error, onChange, onSubmit, onCancel }) {
  return (
    <form className="admin-form" onSubmit={onSubmit}>
      <h2>{editingId !== null ? 'Editar producto' : 'Nuevo producto'}</h2>
      {error && <p className="error-message" role="alert">{error}</p>}

      <label>
        Nombre
        <input placeholder="Ej: Polera CAOS" value={form.name} onChange={(e) => onChange({ ...form, name: e.target.value })} />
      </label>
      <label>
        Categoría
        <select value={form.category} onChange={(e) => onChange({ ...form, category: e.target.value })}>
          <option>Ropa</option>
          <option>Tablas</option>
          <option>Accesorios</option>
          <option>Calzado</option>
        </select>
      </label>
      <label>
        Precio
        <input type="number" min="1" placeholder="Precio" value={form.price} onChange={(e) => onChange({ ...form, price: e.target.value })} />
      </label>
      <label>
        Stock
        <input type="number" min="0" placeholder="Stock" value={form.stock} onChange={(e) => onChange({ ...form, stock: e.target.value })} />
      </label>
      <label>
        Imagen (ruta)
        <input placeholder="/img/productos/imagen.webp" value={form.image} onChange={(e) => onChange({ ...form, image: e.target.value })} />
      </label>
      <label>
        <input type="checkbox" checked={form.featured} onChange={(e) => onChange({ ...form, featured: e.target.checked })} />
        Mostrar en ofertas y destacados
      </label>
      <button type="submit">{editingId !== null ? 'Guardar cambios' : 'Crear producto'}</button>
      {editingId !== null && <button type="button" onClick={onCancel}>Cancelar edición</button>}
    </form>
  )
}
