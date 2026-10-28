
import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { Header } from './components/Header'
import { getProducts, updateProduct } from './data/products'
import { getOrders, ORDERS_KEY, saveOrders, updateOrderStatus } from './data/orders'
import { readStorage, removeStorage, writeStorage } from './data/storage'
import { AdminPage } from './pages/Admin'
import { CartPage } from './pages/Cart'
import { Catalog } from './pages/Catalog'
import { CheckoutPage } from './pages/Checkout'
import { CustomerOrdersPage } from './pages/CustomerOrders'
import { EmployeePage } from './pages/Employee'
import { Home } from './pages/Home'
import { LoginPage } from './pages/Login'
import { ResultPage } from './pages/Result'
import { NotFoundPage } from './pages/NotFound'
import { ProductDetailPage } from './pages/ProductDetail'
import { ProtectedRoute } from './routes/ProtectedRoute'

const cartKey = 'CAOS-cart'

export default function App() {
  const [products, setProducts] = useState(getProducts)
  const [cart, setCart] = useState(() => readStorage(cartKey, []))
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Todas')
  const [order, setOrder] = useState(null)
  const [user, setUser] = useState(() => readStorage('CAOS-user', null))
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

  const logout = () => {
    setUser(null)
    removeStorage('CAOS-user')
  }

  const changeOrderStatus = (id, status) => {
    setOrders((current) => updateOrderStatus(current, id, status))
  }

  const completeOrder = (newOrder) => {
    if (cart.length === 0) {
      alert('Tu carrito está vacío.')
      return false
    }

    const currentProducts = getProducts()

    for (const item of cart) {
      const product = currentProducts.find((p) => p.id === item.id)

      if (!product || item.quantity < 1 || product.stock < item.quantity) {
        alert('No hay suficiente stock de ' + item.name)
        setProducts(currentProducts)
        return false
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
    return true
  }

  return (
    <BrowserRouter>
      <StoreRoutes
        products={products}
        categories={categories}
        category={category}
        search={search}
        cart={cart}
        user={user}
        orders={orders}
        order={order}
        cartCount={cartCount}
        setSearch={setSearch}
        selectCategory={selectCategory}
        addToCart={addToCart}
        changeQuantity={changeQuantity}
        setProducts={setProducts}
        setUser={setUser}
        saveUser={(nextUser) => writeStorage('CAOS-user', nextUser)}
        logout={logout}
        changeOrderStatus={changeOrderStatus}
        completeOrder={completeOrder}
      />
    </BrowserRouter>
  )
}

function StoreRoutes({
  products,
  categories,
  category,
  search,
  cart,
  user,
  orders,
  order,
  cartCount,
  setSearch,
  selectCategory,
  addToCart,
  changeQuantity,
  setProducts,
  setUser,
  saveUser,
  logout,
  changeOrderStatus,
  completeOrder
}) {
  const navigate = useNavigate()

  const handleLogin = (nextUser) => {
    setUser(nextUser)
    saveUser(nextUser)
    navigate(nextUser.role === 'admin' ? '/admin' : nextUser.role === 'employee' ? '/pedidos' : '/mi-cuenta')
  }

  const catalogProps = {
    products,
    categories,
    category,
    search,
    onSearch: setSearch,
    onCategory: (nextCategory) => {
      selectCategory(nextCategory)
      navigate('/productos')
    },
    onAdd: addToCart
  }

  return (
    <>
      <Header cartCount={cartCount} user={user} />
      <main>
        <Routes>
          <Route path="/" element={<Home products={products} onAdd={addToCart} />} />
          <Route path="/productos" element={<Catalog {...catalogProps} mode="products" />} />
          <Route path="/categorias" element={<Catalog {...catalogProps} mode="categories" />} />
          <Route path="/ofertas" element={<Catalog {...catalogProps} mode="offers" />} />
          <Route path="/productos/:id" element={<ProductDetailPage products={products} onAdd={addToCart} />} />
          <Route path="/carrito" element={<CartPage items={cart} onChangeQuantity={changeQuantity} onRemove={(id) => changeQuantity(id, 0)} />} />
          <Route path="/checkout" element={<CheckoutPage items={cart} initialEmail={user?.email} onComplete={completeOrder} />} />
          <Route path="/resultado" element={<ResultPage order={order} />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/admin" element={<ProtectedRoute user={user} role="admin"><AdminPage products={products} onProductsChange={setProducts} onLogout={logout} /></ProtectedRoute>} />
          <Route path="/pedidos" element={<ProtectedRoute user={user} role="employee"><EmployeePage orders={orders} onUpdateStatus={changeOrderStatus} onLogout={logout} /></ProtectedRoute>} />
          <Route path="/mi-cuenta" element={<ProtectedRoute user={user} role="customer"><CustomerOrdersPage orders={orders} email={user?.email} onLogout={logout} /></ProtectedRoute>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <footer>
        <span>CAOS SKATE CO.</span>
        <span>Hecho para rodar.</span>
        <span>© 2026</span>
      </footer>
    </>
  )
}
