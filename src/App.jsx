
import { useEffect, useState } from 'react'
import { Admin } from './components/Admin'
import { Cart } from './components/Cart'
import { Checkout } from './components/Checkout'
import { Header } from './components/Header'
import { Login } from './components/Login'
import { Employee } from './components/Employee'
import { CustomerOrders } from './components/CustomerOrders'
import { Result } from './components/Result'
import { getProducts, updateProduct } from './data/products'
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

  const addToCart = (product) => {
    const available = products.find((item) => item.id === product.id)
    const existing = cart.find((item) => item.id === product.id)

    if (!available || (existing ? existing.quantity : 0) >= available.stock) {
      alert('No hay más stock disponible de este producto.')
      return
    }

    if (existing) {
      setCart(cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, { ...available, quantity: 1 }])
    }
  }

  const changeQuantity = (id, quantity) => {
    if (quantity < 1) {
      setCart(cart.filter((item) => item.id !== id))
      return
    }

    const product = products.find((item) => item.id === id)

    if (!product || quantity > product.stock) {
      alert('No hay suficiente stock disponible.')
      return
    }

    setCart(cart.map((item) =>
      item.id === id ? { ...item, quantity } : item
    ))
  }

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

  const changeOrderStatus = (id, status) => {
    setOrders((current) => updateOrderStatus(current, id, status))
  }

  const completeOrder = (newOrder) => {
    if (cart.length === 0) {
      alert('Tu carrito está vacío.')
      setView('cart')
      return
    }

    const currentProducts = getProducts()

    for (const item of cart) {
      const product = currentProducts.find((p) => p.id === item.id)

      if (!product || item.quantity < 1 || product.stock < item.quantity) {
        alert('No hay suficiente stock de ' + item.name)
        setProducts(currentProducts)
        setView('cart')
        return
      }
    }

    for (const item of cart) {
      const product = currentProducts.find((p) => p.id === item.id)

      updateProduct(item.id, {
        stock: product.stock - item.quantity
      })
    }

    setProducts(getProducts())

    const savedOrder = {
      ...newOrder,
      id: `V${Date.now().toString().slice(-6)}`,
      items: cart,
      createdAt: new Date().toISOString(),
      status: 'Pendiente'
    }

    setOrders((current) => saveOrders([...current, savedOrder]))
    setOrder(savedOrder)
    setCart([])
    setView('result')
  }

  const catalogProps = {
    products,
    categories,
    category,
    search,
    onSearch: setSearch,
    onCategory: selectCategory,
    onAdd: addToCart
  }

  let content

  if (view === 'home') {
    content = <Home products={products} onAdd={addToCart} onNavigate={navigate} />
  } else if (view === 'products') {
    content = <Catalog {...catalogProps} mode="products" />
  } else if (view === 'categories') {
    content = <Catalog {...catalogProps} mode="categories" onSearch={setSearch} />
  } else if (view === 'offers') {
    content = <Catalog {...catalogProps} mode="offers" />
  } else if (view === 'cart') {
    content = <Cart items={cart} onChangeQuantity={changeQuantity} onRemove={(id) => changeQuantity(id, 0)} onCheckout={() => setView('checkout')} />
  } else if (view === 'checkout') {
    content = <Checkout items={cart} initialEmail={user?.email} onBack={() => setView('cart')} onComplete={completeOrder} />
  } else if (view === 'result') {
    content = <Result order={order} onContinue={() => setView('products')} />
  } else if (view === 'login') {
    content = <Login onLogin={handleLogin} onBack={() => setView('home')} />
  } else if (view === 'admin') {
    content = <Admin products={products} onProductsChange={setProducts} onLogout={logout} />
  } else if (view === 'employee') {
    content = <Employee orders={orders} onUpdateStatus={changeOrderStatus} onLogout={logout} />
  } else {
    content = <CustomerOrders orders={orders} email={user?.email} onLogout={logout} />
  }

  return (
    <>
      <Header cartCount={cartCount} onNavigate={navigate} user={user} />
      <main>{content}</main>
      <footer>
        <span>STREETWEAR SKATE CO.</span>
        <span>Hecho para rodar.</span>
        <span>© 2026</span>
      </footer>
    </>
  )
}
