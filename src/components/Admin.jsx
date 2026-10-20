
import { useState } from 'react'
import { createProduct, deleteProduct, updateProduct } from '../data/products'
import { formatPrice } from '../utils/format'

const empty = {
  name: '',
  category: 'Ropa',
  price: 0,
  stock: 1,
  image: '/img/branding/eye-3d.png',
  featured: false
}

export function Admin({ products, onProductsChange, onLogout }) {
  const [form, setForm] = useState(empty)
  const [editingId, setEditingId] = useState(null)


const save = (event) => {
  event.preventDefault()

  if (!form.name.trim() || Number(form.price) <= 0 || Number(form.stock) < 0) return

  const productData = {
    ...form,
    name: form.name.trim(),
    price: Number(form.price),
    stock: Number(form.stock)
  }

  if (editingId !== null) {
    onProductsChange(updateProduct(editingId, productData))
  } else {
    onProductsChange(createProduct(productData))
  }

  setForm(empty)
  setEditingId(null)
}


  const editProduct = (product) => {
    setEditingId(product.id)

    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      image: product.image,
      featured: product.featured
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setForm(empty)
  }

  return (
    <section className="admin-page">
      <div className="admin-header">
        <div>
          <span>06 / GESTIÓN</span>
          <h1>Administración</h1>
        </div>
        <button className="admin-logout" onClick={onLogout}>
          Cerrar sesión
        </button>
      </div>

      <div className="admin-layout">
        <form className="admin-form" onSubmit={save}>
          <h2>{editingId !== null ? 'Editar producto' : 'Nuevo producto'}</h2>

          <label>
            Nombre
            <input
              placeholder="Ej: Polera Valde"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>

          <label>
            Categoría
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option>Ropa</option>
              <option>Tablas</option>
              <option>Accesorios</option>
              <option>Calzado</option>
            </select>
          </label>

          <label>
            Precio
            <input
              type="number"
              min="1"
              placeholder="Precio"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </label>

          <label>
            Stock
            <input
              type="number"
              min="0"
              placeholder="Stock"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
            />
          </label>

          <label>
            Imagen (ruta)
            <input
              placeholder="/img/productos/imagen.webp"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />
          </label>

          <button type="submit">
            {editingId !== null ? 'Guardar cambios' : 'Crear producto'}
          </button>

          {editingId !== null && (
            <button type="button" onClick={cancelEdit}>
              Cancelar edición
            </button>
          )}
        </form>

        <div className="admin-list">
          <h2>Productos existentes <span>({products.length})</span></h2>

          {products.map((product) => (
            <div className="admin-row" key={product.id}>
              <span className="admin-product-name">{product.name}</span>

              <span>
                {formatPrice(product.price)} · stock {product.stock}
              </span>

              <button
                type="button"
                onClick={() => editProduct(product)}
              >
                Editar
              </button>

              <button
                type="button"
                onClick={() => onProductsChange(
                  updateProduct(product.id, { stock: product.stock + 1 })
                )}
              >
                + stock
              </button>

              <button
                type="button"
                className="remove-button"
                onClick={() => onProductsChange(deleteProduct(product.id))}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
