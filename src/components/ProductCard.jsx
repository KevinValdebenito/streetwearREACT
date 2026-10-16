import { formatPrice } from '../utils/format'

export function ProductCard({ product, onAdd }) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img src={product.image} alt={product.name} />
        {product.stock < 6 && <span className="tag">Últimas unidades</span>}
      </div>
      <div className="product-info">
        <small>{product.category}</small>
        <h3>{product.name}</h3>
        <strong>{formatPrice(product.price)}</strong>
        <button onClick={() => onAdd(product)} disabled={product.stock === 0}>
          {product.stock === 0 ? 'Agotado' : 'Agregar al carrito'}
        </button>
      </div>
    </article>
  )
}
