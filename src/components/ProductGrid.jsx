import { ProductCard } from './ProductCard'

export function ProductGrid({ products, onAdd }) {
  if (!products.length) return <p className="empty-state">No encontramos productos con esos filtros.</p>
  return <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} onAdd={onAdd} />)}</div>
}
