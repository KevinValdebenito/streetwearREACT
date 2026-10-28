import { formatPrice } from '../utils/format'

export function CartItem({ item, onChangeQuantity, onRemove }) {
  return (
    <article className="cart-item">
      <img src={item.image} alt="" />
      <div><h3>{item.name}</h3><p>{formatPrice(item.price)} por unidad</p></div>
      <div className="quantity">
        <button onClick={() => onChangeQuantity(item.id, item.quantity - 1)} aria-label={`Quitar una unidad de ${item.name}`}>−</button>
        <span>{item.quantity}</span>
        <button onClick={() => onChangeQuantity(item.id, item.quantity + 1)} aria-label={`Agregar una unidad de ${item.name}`}>+</button>
      </div>
      <strong>{formatPrice(item.price * item.quantity)}</strong>
      <button
        className="remove-button"
        onClick={() => {
          if (window.confirm(`¿Eliminar ${item.name} del carrito?`)) {
            onRemove(item.id)
          }
        }}
      >
        Eliminar
      </button>
    </article>
  )
}
