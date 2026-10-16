import { useState } from 'react'
import { createProduct, deleteProduct, updateProduct } from '../data/products'
import { formatPrice } from '../utils/format'

const empty = { name: '', category: 'Ropa', price: 0, stock: 1, image: '/img/branding/eye-3d.png', featured: false }

export function Admin({ products, onProductsChange, onLogout }) {
  const [form, setForm] = useState(empty)
  const save = (event) => {
    event.preventDefault()
    if (!form.name || form.price <= 0) return
    onProductsChange(createProduct({ ...form, price: Number(form.price), stock: Number(form.stock) }))
    setForm(empty)
  }
  return <section className="admin-page"><div className="admin-header"><div><span>06 / GESTIÓN</span><h1>Administración</h1></div><button className="admin-logout" onClick={onLogout}>Cerrar sesión</button></div>
    <div className="admin-layout"><form className="admin-form" onSubmit={save}><h2>Nuevo producto</h2><label>Nombre<input placeholder="Ej: Polera Valde" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label><label>Categoría<select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}><option>Ropa</option><option>Tablas</option><option>Accesorios</option></select></label><label>Precio<input type="number" min="1" placeholder="Precio" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} /></label><label>Stock inicial<input type="number" min="0" placeholder="Stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} /></label><button>Crear producto</button></form>
      <div className="admin-list"><h2>Productos existentes <span>({products.length})</span></h2>{products.map((product) => <div className="admin-row" key={product.id}><span className="admin-product-name">{product.name}</span><span>{formatPrice(product.price)} · stock {product.stock}</span><button onClick={() => onProductsChange(updateProduct(product.id, { stock: product.stock + 1 }))}>+ stock</button><button className="remove-button" onClick={() => onProductsChange(deleteProduct(product.id))}>Eliminar</button></div>)}</div></div>
  </section>
}
