import { CartItem } from './CartItem'
import { CartSummary } from './CartSummary'

export function Cart({ items, onChangeQuantity, onRemove, onCheckout }) {
  return (
    <section className="page-section">
      <div className="section-heading"><span>03 / TU COMPRA</span><h1>Carrito</h1></div>
      {!items.length ? <p className="empty-state">Tu carrito está vacío. Agrega productos para comenzar.</p> : (
        <div className="cart-layout">
          <div className="cart-items">
            {items.map((item) => <CartItem key={item.id} item={item} onChangeQuantity={onChangeQuantity} onRemove={onRemove} />)}
          </div>
          <CartSummary items={items} onCheckout={onCheckout} />
        </div>
      )}
    </section>
  )
}
