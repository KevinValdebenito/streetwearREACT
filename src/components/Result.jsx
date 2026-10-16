import { formatPrice } from '../utils/format'

export function Result({ order, onContinue }) {
  return (
    <section className="result-page">
      <span className="result-icon">✓</span><span>05 / ORDEN CONFIRMADA</span>
      <h1>¡Compra exitosa!</h1>
      <p>Gracias, {order.name}. Tu pedido será enviado a {order.address}.</p>
      <strong className="result-total">{formatPrice(order.total)}</strong>
      <button onClick={onContinue}>Seguir comprando</button>
    </section>
  )
}
