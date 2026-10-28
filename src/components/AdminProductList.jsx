import { deleteProduct, updateProduct } from '../data/products'
import { formatPrice } from '../utils/format'

export function AdminProductList({ products, onProductsChange, onEdit }) {
  return (
    <div className="admin-list">
      <h2>Productos existentes <span>({products.length})</span></h2>
      {products.map((product) => (
        <div className="admin-row" key={product.id}>
          <span className="admin-product-name">{product.name}</span>
          <span>{formatPrice(product.price)} · stock {product.stock}</span>
          <button type="button" onClick={() => onEdit(product)}>Editar</button>
          <button type="button" onClick={() => onProductsChange(updateProduct(product.id, { stock: product.stock + 1 }))}>+ stock</button>
          <button
            type="button"
            className="remove-button"
            onClick={() => {
              if (window.confirm(`¿Eliminar ${product.name}?`)) {
                onProductsChange(deleteProduct(product.id))
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
