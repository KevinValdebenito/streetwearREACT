
import { useState } from 'react'
import { createProduct, deleteProduct, updateProduct } from '../data/products'
import { deleteApiProduct, saveApiProduct } from '../data/storeApi'
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

export function Admin({ products, onProductsChange, onLogout, token, onApiChange }) {
  const [form, setForm] = useState(empty)
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const changeProduct = async (apiAction, localAction) => {
    setError('')
    if (!token) {
      onProductsChange(localAction())
      return true
    }
    setBusy(true)
    try {
      await apiAction()
      onApiChange()
      return true
    } catch (failure) {
      if (failure.response?.status === 401) onLogout()
      setError('No pudimos guardar el cambio en el catálogo.')
      return false
    } finally {
      setBusy(false)
    }
  }

  const save = async (event) => {
    event.preventDefault()
    if (busy) return

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

    if (await changeProduct(
      () => saveApiProduct(token, editingId, productData),
      () => editingId === null ? createProduct(productData) : updateProduct(editingId, productData)
    )) cancelEdit()
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
          busy={busy}
          onChange={setForm}
          onSubmit={save}
          onCancel={cancelEdit}
        />
        <AdminProductList products={products} busy={busy} onEdit={editProduct}
          onStock={(product) => changeProduct(
            () => saveApiProduct(token, product.id, {
              name: product.name, category: product.category, price: product.price,
              stock: product.stock + 1, image: product.image, featured: product.featured
            }),
            () => updateProduct(product.id, { stock: product.stock + 1 })
          )}
          onDelete={async (id) => {
            const deleted = await changeProduct(() => deleteApiProduct(token, id), () => deleteProduct(id))
            if (deleted && editingId === id) cancelEdit()
          }} />
      </div>
    </section>
  )
}
