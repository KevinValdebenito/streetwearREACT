import { formatPrice } from '../utils/format'

export function CustomerOrders({ orders, email, onLogout }) {
  const customerOrders = orders.filter((order) => order.email === email)
  return (
    <section className="admin-page">
      <div className="admin-header"><div><span>07 / MI CUENTA</span><h1>Mis pedidos</h1></div><button className="admin-logout" onClick={onLogout}>Cerrar sesión</button></div>
      <div className="orders-panel">
        <h2>Historial de compras <span>({customerOrders.length})</span></h2>
        {!customerOrders.length && <p className="empty-state">Aún no tienes compras. Cuando realices una, aparecerá aquí.</p>}
        {customerOrders.map((order) => (
          <article className="order-row customer-order" key={order.id}>
            <div><strong>Pedido #{order.id}</strong><small>{new Date(order.createdAt).toLocaleDateString('es-CL')} · {order.delivery}</small></div>
            <div><span>{order.items.map((item) => `${item.name} x${item.quantity}`).join(', ')}</span><strong>{formatPrice(order.total)}</strong></div>
            <b>{order.status}</b>
          </article>
        ))}
      </div>
    </section>
  )
}
