import { formatPrice } from '../utils/format'

export function Employee({ orders, onUpdateStatus, onLogout }) {
  return (
    <section className="admin-page">
      <div className="admin-header"><div><span>07 / OPERACIONES</span><h1>Pedidos</h1></div><button className="admin-logout" onClick={onLogout}>Cerrar sesión</button></div>
      <div className="orders-panel">
        <h2>Compras recibidas <span>({orders.length})</span></h2>
        {!orders.length && <p className="empty-state">Todavía no hay compras registradas.</p>}
        {orders.map((order) => (
          <article className="order-row" key={order.id}>
            <div><strong>#{order.id}</strong><h3>{order.name}</h3><small>{order.email} · {order.address}</small></div>
            <div><span>{order.items.length} producto(s)</span><strong>{formatPrice(order.total)}</strong></div>
            <select value={order.status} onChange={(event) => onUpdateStatus(order.id, event.target.value)} aria-label={`Estado del pedido ${order.id}`}>
              <option>Pendiente</option><option>Preparando</option><option>Enviado</option><option>Entregado</option>
            </select>
          </article>
        ))}
      </div>
    </section>
  )
}
