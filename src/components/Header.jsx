export function Header({ cartCount, onNavigate, user }) {
  return (
    <header className="site-header">
      <button className="brand" onClick={() => onNavigate('home')} aria-label="Ir al inicio">
        <img
          className="brand-logo"
          src="/img/branding/eye-3d.png"
          alt="Ojo 3D de Valde Skate"
        />
        <span className="brand-copy">
          <strong>يسير ببطء ولكن بثبات.</strong>
          <small>Explora nuestro universo de skate y streetwear</small>
        </span>
      </button>
      <nav aria-label="Navegación principal">
        <button onClick={() => onNavigate('home')}>Inicio</button>
        <button onClick={() => onNavigate('products')}>Productos</button>
        <button onClick={() => onNavigate('categories')}>Categorías</button>
        <button onClick={() => onNavigate('offers')}>Ofertas</button>
        <button onClick={() => onNavigate(user ? user.role : 'login')}>{user ? (user.role === 'admin' ? 'Administración' : user.role === 'employee' ? 'Pedidos' : 'Mi cuenta') : 'Ingresar'}</button>
      </nav>
      <button className="cart-button" onClick={() => onNavigate('cart')} aria-label="Abrir carrito">
        Carrito <span>{cartCount}</span>
      </button>
    </header>
  )
}
