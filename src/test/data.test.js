import { beforeEach, describe, expect, it } from 'vitest'
import { createProduct, deleteProduct, getProducts, resetProducts, updateProduct } from '../data/products'
import { getOrders, saveOrders, updateOrderStatus } from '../data/orders'
import { readStorage, removeStorage, writeStorage } from '../data/storage'

beforeEach(() => localStorage.clear())

describe('persistencia local', () => {
  it('guarda, lee y elimina valores', () => {
    writeStorage('test-key', { active: true })
    expect(readStorage('test-key', null)).toEqual({ active: true })
    removeStorage('test-key')
    expect(readStorage('test-key', 'fallback')).toBe('fallback')
  })

  it('recupera el valor alternativo si el JSON está corrupto', () => {
    localStorage.setItem('corrupt-key', '{invalid')
    expect(readStorage('corrupt-key', 'fallback')).toBe('fallback')
    expect(localStorage.getItem('corrupt-key')).toBeNull()
  })
})

describe('catálogo de productos', () => {
  it('crea, actualiza y elimina productos', () => {
    const created = createProduct({ name: 'Producto nuevo', category: 'Ropa', price: 20000, stock: 2, image: '/new.png' })
    expect(created.at(-1)).toMatchObject({ name: 'Producto nuevo', id: 12 })
    expect(updateProduct(12, { stock: 5 }).at(-1).stock).toBe(5)
    expect(deleteProduct(12).some((product) => product.id === 12)).toBe(false)
  })

  it('recupera el catálogo guardado y puede reiniciarlo', () => {
    const products = getProducts()
    expect(products).toHaveLength(11)
    expect(resetProducts()).toHaveLength(11)
  })
})

describe('persistencia de pedidos', () => {
  it('guarda pedidos y actualiza su estado', () => {
    const orders = [{ id: 'V1', status: 'Pendiente' }]
    saveOrders(orders)
    expect(getOrders()).toEqual(orders)
    expect(updateOrderStatus(orders, 'V1', 'Entregado')).toEqual([{ id: 'V1', status: 'Entregado' }])
  })
})
