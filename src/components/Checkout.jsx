
import { useState } from 'react'
import { formatPrice } from '../utils/format'

export function Checkout({ items, onComplete, onBack, initialEmail = '' }) {
  const [form, setForm] = useState({
    name: '',
    email: initialEmail,
    address: '',
    delivery: 'normal'
  })

  const [error, setError] = useState('')
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const submit = (event) => {
    event.preventDefault()

    const name = form.name.trim()
    const email = form.email.trim()
    const address = form.address.trim()

    if (!name || !email || !address) {
      setError('Completa todos los datos obligatorios.')
      return
    }

    if (!email.includes('@') || !email.includes('.')) {
      setError('Ingresa un correo válido.')
      return
    }

    if (items.length === 0) {
      setError('No tienes productos en el carrito.')
      return
    }

    setError('')

    onComplete({
      ...form,
      name,
      email,
      address,
      total
    })
  }

  return (
    <section className="page-section narrow-page">
      <button className="back-link" onClick={onBack}>
        ← Volver al carrito
      </button>

      <div className="section-heading">
        <span>04 / CHECKOUT</span>
        <h1>Finalizar compra</h1>
      </div>

      {error && <p className="error-message" role="alert">{error}</p>}

      <form className="checkout-form" onSubmit={submit}>
        <label>
          Nombre completo
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </label>

        <label>
          Correo electrónico
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </label>

        <label>
          Dirección de envío
          <textarea
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </label>

        <label>
          Tipo de entrega
          <select
            value={form.delivery}
            onChange={(e) => setForm({ ...form, delivery: e.target.value })}
          >
            <option value="normal">Envío normal (3-5 días)</option>
            <option value="express">Envío express (24 horas)</option>
          </select>
        </label>

        <div className="checkout-total">
          <span>Total a pagar</span>
          <strong>{formatPrice(total)}</strong>
        </div>

        <button type="submit">
          Pagar y confirmar compra
        </button>
      </form>
    </section>
  )
}
