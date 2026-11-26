
import { useState } from 'react'
import { CheckoutForm } from './CheckoutForm'
import { OrderSummary } from './OrderSummary'

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

      <CheckoutForm form={form} onChange={setForm} onSubmit={submit} error={error} />
      <OrderSummary total={total} />
    </section>
  )
}
