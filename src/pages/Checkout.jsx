import { Checkout } from '../components/Checkout'
import { useNavigate } from 'react-router-dom'

export function CheckoutPage({ items, initialEmail, onComplete }) {
  const navigate = useNavigate()

  return (
    <Checkout
      items={items}
      initialEmail={initialEmail}
      onComplete={(order) => {
        if (onComplete(order)) {
          navigate('/resultado')
        }
      }}
      onBack={() => navigate('/carrito')}
    />
  )
}
