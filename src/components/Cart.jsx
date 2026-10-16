import { formatPrice } from '../utils/format'

export function Cart({ items, onChangeQuantity, onRemove, onCheckout }) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  return (
    <section className="page-section">
      <div className="section-heading"><span>03 / TU COMPRA</span><h1>Carrito</h1></div>
      {!items.length ? <p className="empty-state">Tu carrito está vacío. Agrega productos para comenzar.</p> : (
        <div className="cart-layout">
          <div className="cart-items">
            {items.map((item) => (
              <article className="cart-item" key={item.id}>
                <img src={item.image} alt="" />
                <div><h3>{item.name}</h3><p>{formatPrice(item.price)} por unidad</p></div>
                <div className="quantity">
                  <button onClick={() => onChangeQuantity(item.id, item.quantity - 1)} aria-label={`Quitar una unidad de ${item.name}`}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onChangeQuantity(item.id, item.quantity + 1)} aria-label={`Agregar una unidad de ${item.name}`}>+</button>
                </div>
                <strong>{formatPrice(item.price * item.quantity)}</strong>
                <button className="remove-button" onClick={() => onRemove(item.id)}>Eliminar</button>
              </article>
            ))}
          </div>
          <aside className="summary"><h2>Resumen</h2><p>Total <strong>{formatPrice(total)}</strong></p><button onClick={onCheckout}>Continuar al pago</button></aside>
        </div>
      )}
    </section>
  )
}
