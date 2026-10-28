
import { useState } from 'react'
import { createProduct, updateProduct } from '../data/products'
import { AdminForm } from './AdminForm'
import { AdminProductList } from './AdminProductList'

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
  const [error, setError] = useState('')


  const save = (event) => {
    event.preventDefault()

    if (!form.name.trim()) {
      setError('El nombre es obligatorio.')
      return
    }

    if (Number(form.price) <= 0) {
      setError('El precio debe ser mayor que cero.')
      return
    }

    if (Number(form.stock) < 0) {
      setError('El stock no puede ser negativo.')
      return
    }

    setError('')

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
        <AdminForm
          form={form}
          editingId={editingId}
          error={error}
          onChange={setForm}
          onSubmit={save}
          onCancel={cancelEdit}
        />
        <AdminProductList products={products} onProductsChange={onProductsChange} onEdit={editProduct} />
      </div>
    </section>
  )
}
