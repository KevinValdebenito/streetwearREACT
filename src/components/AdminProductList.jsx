import { formatPrice } from '../utils/format'

export function AdminProductList({ products, busy, onEdit, onStock, onDelete }) {
  return (
    <div className="admin-list">
      <h2>Productos existentes <span>({products.length})</span></h2>
      {products.map((product) => (
        <div className="admin-row" key={product.id}>
          <span className="admin-product-name">{product.name}</span>
          <span>{formatPrice(product.price)} · stock {product.stock}</span>
          <button type="button" disabled={busy} onClick={() => onEdit(product)}>Editar</button>
          <button type="button" disabled={busy} onClick={() => onStock(product)}>+ stock</button>
          <button
            type="button"
            className="remove-button"
            disabled={busy}
            onClick={() => {
              if (window.confirm(`¿Eliminar ${product.name}?`)) {
                onDelete(product.id)
              }
            }}
          >
            Eliminar
          </button>
        </div>
      ))}
    </div>
  )
}
