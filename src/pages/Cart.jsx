import { Cart } from '../components/Cart'
import { useNavigate } from 'react-router-dom'

export function CartPage({ items, onChangeQuantity, onRemove }) {
  const navigate = useNavigate()

  return (
    <Cart
      items={items}
      onChangeQuantity={onChangeQuantity}
      onRemove={onRemove}
      onCheckout={() => navigate('/checkout')}
    />
  )
}
