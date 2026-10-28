import { Link, useParams } from 'react-router-dom'
import { formatPrice } from '../utils/format'

export function ProductDetailPage({ products, onAdd }) {
  const { id } = useParams()
  const product = products.find((item) => item.id === Number(id))

  if (!product) {
    return (
      <section className="page-section empty-state">
        <h1>Producto no encontrado</h1>
        <Link className="button-link" to="/productos">Volver a productos</Link>
      </section>
    )
  }

  return (
    <section className="page-section">
      <Link className="back-link" to="/productos">
        <span aria-hidden="true">←</span> Volver
      </Link>
      <div className="product-detail">
        <img src={product.image} alt={product.name} />
        <div className="product-detail-info">
          <small>{product.category}</small>
          <h1>{product.name}</h1>
          <strong>{formatPrice(product.price)}</strong>
          <p>{product.description || 'Producto seleccionado de la colección CAOS.'}</p>
          <button className="detail-add-button" onClick={() => onAdd(product)} disabled={product.stock === 0}>
            {product.stock === 0 ? 'Agotado' : 'Agregar al carrito'}
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>
  )
}
