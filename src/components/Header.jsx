
import { NavLink } from 'react-router-dom'

export function Header({ cartCount, user }) {
  const accountPath = user
    ? user.role === 'admin'
      ? '/admin'
      : user.role === 'employee'
        ? '/pedidos'
        : '/mi-cuenta'
    : '/login'

  return (
    <header className="site-header">
      <NavLink className="brand" to="/" aria-label="Ir al inicio">
      <video
        className="brand-logo"
        src="/img/branding/logo-CAOS-transparente.webm"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
        <span className="brand-copy">
          <strong>يسير ببطء ولكن بثبات.</strong>
          <small>Explora nuestro universo de skate y streetwear</small>
        </span>
      </NavLink>
      <nav aria-label="Navegación principal">
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/productos">Productos</NavLink>
        <NavLink to="/categorias">Categorías</NavLink>
        <NavLink to="/ofertas">Ofertas</NavLink>
        <NavLink to={accountPath}>
          {user ? (user.role === 'admin' ? 'Administración' : user.role === 'employee' ? 'Pedidos' : 'Mi cuenta') : 'Ingresar'}
        </NavLink>
      </nav>
      <NavLink className="cart-button" to="/carrito" aria-label="Abrir carrito">
        Carrito <span>{cartCount}</span>
      </NavLink>
    </header>
  )
}
