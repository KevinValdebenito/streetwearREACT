const seedProducts = [
  { id: 1, name: 'Polera Thrasher Black', category: 'Ropa', price: 24990, stock: 10, image: '/img/productos/polera-thrasher.webp', featured: true },
  { id: 2, name: 'Gorra Lakers Floral', category: 'Accesorios', price: 29990, stock: 8, image: '/img/productos/gorra-lakers.webp', featured: true },
  { id: 3, name: 'Gorra Golfer Delfino', category: 'Accesorios', price: 27990, stock: 7, image: '/img/productos/gorra-golfer.webp', featured: false },
  { id: 4, name: 'Skate Completo Santa Cruz', category: 'Tablas', price: 89990, stock: 5, image: '/img/productos/skate-completo-santa-cruz.webp', featured: true },
  { id: 5, name: 'Tabla Toy Machine Welcome To Hell', category: 'Tablas', price: 54990, stock: 6, image: '/img/productos/tabla-toy-machine-hell.webp', featured: true },
  { id: 6, name: 'Tabla Toy Machine Eye', category: 'Tablas', price: 52990, stock: 4, image: '/img/productos/tabla-toy-machine-eye.jpg', featured: false },
  { id: 7, name: 'Hoodie Thrasher Flame', category: 'Ropa', price: 49990, stock: 6, image: '/img/productos/hoodie-thrasher.webp', featured: true },
  { id: 8, name: 'Hoodie Bape Camouflage', category: 'Ropa', price: 69990, stock: 3, image: '/img/productos/hoodie-bape-camouflage.webp', featured: false },
  { id: 9, name: 'Polera Ripndip Masked Jerm', category: 'Ropa', price: 34990, stock: 8, image: '/img/productos/polera-ripndip.png', featured: false },
  { id: 10, name: 'Vans Skate Negro y Rosa', category: 'Calzado', price: 64990, stock: 6, image: '/img/productos/zapatillas-vans-negro-rosa.webp', featured: true },
  { id: 11, name: 'Vans Skate Blancas y Celestes', category: 'Calzado', price: 67990, stock: 5, image: '/img/productos/zapatillas-vans-blancas-celestes.webp', featured: true }
]

const STORAGE_KEY = 'valde-products-v2'


export function getProducts() {
  const products = readStorage(STORAGE_KEY, null)
  if (!products) {
    return seedProducts
  }
  return products
}

function saveProducts(products) {
  return writeStorage(STORAGE_KEY, products)
}

export function createProduct(product) {
  const products = getProducts()
  const nextId = Math.max(0, ...products.map(({ id }) => id)) + 1
  return saveProducts([...products, { ...product, id: nextId }])
}

export function updateProduct(id, changes) {
  return saveProducts(getProducts().map((product) => (
    product.id === id ? { ...product, ...changes } : product
  )))
}

export function deleteProduct(id) {
  return saveProducts(getProducts().filter((product) => product.id !== id))
}

export function resetProducts() {
  removeStorage(STORAGE_KEY)
  return seedProducts
}
import { readStorage, removeStorage, writeStorage } from './storage'
