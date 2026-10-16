import { readStorage, writeStorage } from './storage'

export const ORDERS_KEY = 'valde-orders'

export function getOrders() {
  return readStorage(ORDERS_KEY, [])
}

export function saveOrders(orders) {
  return writeStorage(ORDERS_KEY, orders)
}

export function updateOrderStatus(orders, id, status) {
  return saveOrders(orders.map((order) => (
    order.id === id ? { ...order, status } : order
  )))
}
