import { useEffect, useState } from 'react'
import { Admin } from './components/Admin'
import { Cart } from './components/Cart'
import { Checkout } from './components/Checkout'
import { Header } from './components/Header'
import { Login } from './components/Login'
import { Employee } from './components/Employee'
import { CustomerOrders } from './components/CustomerOrders'
import { Result } from './components/Result'
import { getProducts } from './data/products'
import { getOrders, ORDERS_KEY, saveOrders, updateOrderStatus } from './data/orders'
import { readStorage, removeStorage, writeStorage } from './data/storage'
import { Catalog } from './pages/Catalog'
import { Home } from './pages/Home'

const cartKey = 'valde-cart'

export default function App() {
  const [products, setProducts] = useState(getProducts)
  const [cart, setCart] = useState(() => readStorage(cartKey, []))
  const [view, setView] = useState('home')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Todas')
  const [order, setOrder] = useState(null)
  const [user, setUser] = useState(() => readStorage('valde-user', null))
  const [orders, setOrders] = useState(getOrders)

  useEffect(() => {
    writeStorage(cartKey, cart)
  }, [cart])
  useEffect(() => {
    writeStorage(ORDERS_KEY, orders)
  }, [orders])
  const categories = ['Todas', ...new Set(products.map((product) => product.category))]
  const selectCategory = (nextCategory) => {
    setCategory(nextCategory)
    setView('products')
  }
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const addToCart = (product) => setCart((current) => {
    const existing = current.find((item) => item.id === product.id)
    return existing ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { ...product, quantity: 1 }]
  })
  const changeQuantity = (id, quantity) => setCart((current) => quantity < 1 ? current.filter((item) => item.id !== id) : current.map((item) => item.id === id ? { ...item, quantity } : item))
  const navigate = (nextView) => {
    if (nextView === 'admin' && (!user || user.role !== 'admin')) {
      setView('login')
      return
    }
    if (nextView === 'employee' && (!user || user.role !== 'employee')) {
      setView('login')
      return
    }
    if (nextView === 'customer' && (!user || user.role !== 'customer')) {
      setView('login')
      return
    }
    setView(nextView)
  }
  const handleLogin = (nextUser) => {
    setUser(nextUser)
    writeStorage('valde-user', nextUser)
    setView(nextUser.role)
  }
  const logout = () => {
    setUser(null)
    removeStorage('valde-user')
    setView('home')
  }
  const changeOrderStatus = (id, status) => setOrders((current) => updateOrderStatus(current, id, status))

  const catalogProps = { products, categories, category, search, onSearch: setSearch, onCategory: selectCategory, onAdd: addToCart }
  let content = view === 'home' ? <Home products={products} onAdd={addToCart} onNavigate={navigate} /> : view === 'products' ? <Catalog {...catalogProps} mode="products" /> : view === 'categories' ? <Catalog {...catalogProps} mode="categories" onSearch={setSearch} /> : view === 'offers' ? <Catalog {...catalogProps} mode="offers" /> : view === 'cart' ? <Cart items={cart} onChangeQuantity={changeQuantity} onRemove={(id) => changeQuantity(id, 0)} onCheckout={() => setView('checkout')} /> : view === 'checkout' ? <Checkout items={cart} initialEmail={user?.email} onBack={() => setView('cart')} onComplete={(newOrder) => { const savedOrder = { ...newOrder, id: `V${Date.now().toString().slice(-6)}`, items: cart, createdAt: new Date().toISOString(), status: 'Pendiente' }; setOrders((current) => saveOrders([...current, savedOrder])); setOrder(savedOrder); setCart([]); setView('result') }} /> : view === 'result' ? <Result order={order} onContinue={() => setView('products')} /> : view === 'login' ? <Login onLogin={handleLogin} onBack={() => setView('home')} /> : view === 'admin' ? <Admin products={products} onProductsChange={setProducts} onLogout={logout} /> : view === 'employee' ? <Employee orders={orders} onUpdateStatus={changeOrderStatus} onLogout={logout} /> : <CustomerOrders orders={orders} email={user?.email} onLogout={logout} />

  return <><Header cartCount={cartCount} onNavigate={navigate} user={user} /><main>{content}</main><footer><span>VALDE SKATE CO.</span><span>Hecho para rodar.</span><span>© 2026</span></footer></>
}
