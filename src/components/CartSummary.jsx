import { formatPrice } from '../utils/format'

export function CartSummary({ items, onCheckout }) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <aside className="summary">
      <h2>Resumen</h2>
      <p>Total <strong>{formatPrice(total)}</strong></p>
      <button onClick={onCheckout}>Continuar al pago</button>
    </aside>
  )
}
