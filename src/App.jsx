
import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { Header } from './components/Header'
import { getProducts, updateProduct } from './data/products'
import { apiCatalogEnabled, useApiCatalog } from './data/catalogApi'
import { loadSession } from './data/storeApi'
import { getOrders, ORDERS_KEY, saveOrders, updateOrderStatus } from './data/orders'
import { readStorage, removeStorage, writeStorage } from './data/storage'
import { AdminPage } from './pages/Admin'
import { CartPage } from './pages/Cart'
import { Catalog } from './pages/Catalog'
import { CheckoutPage } from './pages/Checkout'
import { ContactPage } from './pages/Contact'
import { ContactInboxPage } from './pages/ContactInbox'
import { CustomerOrdersPage } from './pages/CustomerOrders'
import { EmployeePage } from './pages/Employee'
import { Home } from './pages/Home'
import { LoginPage } from './pages/Login'
import { ResultPage } from './pages/Result'
import { NotFoundPage } from './pages/NotFound'
import { ProductDetailPage } from './pages/ProductDetail'
import { ProtectedRoute } from './routes/ProtectedRoute'

const cartKey = apiCatalogEnabled ? 'CAOS-api-cart' : 'CAOS-cart'
const userKey = apiCatalogEnabled ? 'CAOS-api-token' : 'CAOS-user'

export default function App() {
  const [localProducts, setProducts] = useState(getProducts)
  const catalog = useApiCatalog()
  const products = apiCatalogEnabled ? catalog.products : localProducts
  const [cart, setCart] = useState(() => readStorage(cartKey, []))
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Todas')
  const [order, setOrder] = useState(null)
  const [restoreToken] = useState(() => apiCatalogEnabled ? readStorage(userKey, null) : null)
  const [restoringSession, setRestoringSession] = useState(Boolean(restoreToken))
  const [user, setUser] = useState(() => apiCatalogEnabled ? null : readStorage(userKey, null))
  const [orders, setOrders] = useState(getOrders)

  useEffect(() => {
    if (!restoreToken) return
    const controller = new AbortController()
    loadSession(restoreToken, controller.signal)
      .then((session) => {
        if (!controller.signal.aborted) setUser(session)
      })
      .catch((error) => {
        if (!controller.signal.aborted && error.response?.status === 401) removeStorage(userKey)
      })
      .finally(() => {
        if (!controller.signal.aborted) setRestoringSession(false)
      })
    return () => controller.abort()
  }, [restoreToken])

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
    removeStorage(userKey)
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
      {restoringSession ? <p role="status">Restaurando sesión…</p> :
      <StoreRoutes
        products={products}
        localProducts={localProducts}
        catalog={catalog}
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
        saveUser={(nextUser) => writeStorage(userKey, apiCatalogEnabled ? nextUser.token : nextUser)}
        logout={logout}
        changeOrderStatus={changeOrderStatus}
        completeOrder={completeOrder}
      />}
    </BrowserRouter>
  )
}

function CatalogState({ catalog, children, showEmpty = true }) {
  if (catalog.status === 'loading') {
    return <p className="page-section empty-state" role="status">Cargando productos…</p>
  }

  if (catalog.status === 'error') {
    return (
      <section className="page-section empty-state">
        <p role="alert">No pudimos conectar con el catálogo.</p>
        <button className="button-link" type="button" onClick={catalog.retry}>Reintentar</button>
      </section>
    )
  }

  if (showEmpty && apiCatalogEnabled && catalog.products.length === 0) {
    return <p className="page-section empty-state">El catálogo aún no tiene productos.</p>
  }

  return children
}

function StoreRoutes({
  localProducts,
  catalog,
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
          <Route path="/" element={<Home products={products} onAdd={addToCart} renderFeatured={(grid) => <CatalogState catalog={catalog}>{grid}</CatalogState>} />} />
          <Route path="/productos" element={<CatalogState catalog={catalog}><Catalog {...catalogProps} mode="products" /></CatalogState>} />
          <Route path="/categorias" element={<CatalogState catalog={catalog}><Catalog {...catalogProps} mode="categories" /></CatalogState>} />
          <Route path="/ofertas" element={<CatalogState catalog={catalog}><Catalog {...catalogProps} mode="offers" /></CatalogState>} />
          <Route path="/productos/:id" element={<CatalogState catalog={catalog} showEmpty={false}><ProductDetailPage products={products} onAdd={addToCart} /></CatalogState>} />
          <Route path="/carrito" element={<CartPage items={cart} onChangeQuantity={changeQuantity} onRemove={(id) => changeQuantity(id, 0)} />} />
          <Route path="/checkout" element={apiCatalogEnabled
            ? <p className="page-section empty-state">La compra con el catálogo conectado estará disponible al integrar pedidos.</p>
            : <CheckoutPage items={cart} initialEmail={user?.email} onComplete={completeOrder} />} />
          <Route path="/resultado" element={<ResultPage order={order} />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/admin/mensajes" element={<ProtectedRoute user={user} role="admin">
            <ContactInboxPage token={user?.token} />
          </ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute user={user} role="admin">
            <AdminPage products={apiCatalogEnabled ? products : localProducts}
              onProductsChange={setProducts} token={user?.token} onApiChange={catalog.retry} onLogout={logout} />
          </ProtectedRoute>} />
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
