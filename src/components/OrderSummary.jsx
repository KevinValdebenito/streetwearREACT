import { formatPrice } from '../utils/format'

export function OrderSummary({ total }) {
  return (
    <div className="checkout-total">
      <span>Total a pagar</span>
      <strong>{formatPrice(total)}</strong>
    </div>
  )
}
