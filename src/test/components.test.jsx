
import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Admin } from '../components/Admin'
import { Cart } from '../components/Cart'
import { CustomerOrders } from '../components/CustomerOrders'
import { Employee } from '../components/Employee'
import { Header } from '../components/Header'
import { Login } from '../components/Login'
import { Result } from '../components/Result'
import { Catalog } from '../pages/Catalog'
import { Home } from '../pages/Home'

const product = {
  id: 1,
  name: 'Tabla de prueba',
  category: 'Tablas',
  price: 10000,
  stock: 3,
  image: '/test.png',
  featured: true,
}

describe('autenticación y roles', () => {
  it('muestra error con credenciales inválidas', async () => {
    const onLogin = vi.fn()
    render(<Login onLogin={onLogin} onBack={vi.fn()} />)
    await userEvent.type(screen.getByLabelText(/correo/i), 'alguien@test.cl')
    await userEvent.type(screen.getByLabelText(/contraseña/i), 'incorrecta')
    await userEvent.click(screen.getByRole('button', { name: 'Ingresar' }))
    expect(screen.getByRole('alert')).toHaveTextContent(/no son correctos/i)
    expect(onLogin).not.toHaveBeenCalled()
  })

  it.each([
    ['admin@caos.cl', 'admin'],
    ['empleado@caos.cl', 'employee'],
    ['cliente@caos.cl', 'customer'],
  ])('identifica el rol de %s', async (email, role) => {
    const onLogin = vi.fn()
    render(<Login onLogin={onLogin} onBack={vi.fn()} />)
    await userEvent.type(screen.getByLabelText(/correo/i), email)
    await userEvent.type(screen.getByLabelText(/contraseña/i), 'CAOS2026!')
    await userEvent.click(screen.getByRole('button', { name: 'Ingresar' }))
    expect(onLogin).toHaveBeenCalledWith({ email, role })
  })
})

describe('panel de administración', () => {
  it('crea un producto válido y reinicia el formulario', async () => {
    const onProductsChange = vi.fn()
    render(<Admin products={[product]} onProductsChange={onProductsChange} onLogout={vi.fn()} />)
    await userEvent.type(screen.getByPlaceholderText('Ej: Polera CAOS'), 'Polera nueva')
    await userEvent.clear(screen.getByPlaceholderText('Precio'))
    await userEvent.type(screen.getByPlaceholderText('Precio'), '25000')
    await userEvent.click(screen.getByRole('button', { name: 'Crear producto' }))
    expect(onProductsChange).toHaveBeenCalled()
    expect(screen.getByPlaceholderText('Ej: Polera CAOS')).toHaveValue('')
  })

  it('muestra un error cuando el producto no tiene nombre', async () => {
    const onProductsChange = vi.fn()
    render(<Admin products={[product]} onProductsChange={onProductsChange} onLogout={vi.fn()} />)
    await userEvent.clear(screen.getByPlaceholderText('Precio'))
    await userEvent.type(screen.getByPlaceholderText('Precio'), '25000')
    await userEvent.click(screen.getByRole('button', { name: 'Crear producto' }))
    expect(screen.getByRole('alert')).toHaveTextContent(/nombre es obligatorio/i)
    expect(onProductsChange).not.toHaveBeenCalled()
  })

  it('permite marcar un producto como destacado', async () => {
    const onProductsChange = vi.fn()
    render(<Admin products={[product]} onProductsChange={onProductsChange} onLogout={vi.fn()} />)
    await userEvent.type(screen.getByPlaceholderText('Ej: Polera CAOS'), 'Polera nueva')
    await userEvent.clear(screen.getByPlaceholderText('Precio'))
    await userEvent.type(screen.getByPlaceholderText('Precio'), '25000')
    await userEvent.click(screen.getByLabelText(/ofertas y destacados/i))
    await userEvent.click(screen.getByRole('button', { name: 'Crear producto' }))
    expect(onProductsChange).toHaveBeenCalledWith(expect.arrayContaining([
      expect.objectContaining({ featured: true })
    ]))
  })

  it('permite aumentar stock y eliminar un producto', async () => {
    const onProductsChange = vi.fn()
    render(<Admin products={[product]} onProductsChange={onProductsChange} onLogout={vi.fn()} />)
    await userEvent.click(screen.getByRole('button', { name: '+ stock' }))
    await userEvent.click(screen.getByRole('button', { name: 'Eliminar' }))
    expect(onProductsChange).toHaveBeenCalledTimes(2)
  })
})

describe('operación y cuenta', () => {
  it('actualiza el estado de un pedido desde el panel de empleado', async () => {
    const onUpdateStatus = vi.fn()
    const order = { id: 'V123', name: 'Ana', email: 'ana@test.cl', address: 'Calle 1', items: [product], total: 10000, status: 'Pendiente' }
    render(<Employee orders={[order]} onUpdateStatus={onUpdateStatus} onLogout={vi.fn()} />)
    fireEvent.change(screen.getByLabelText('Estado del pedido V123'), { target: { value: 'Enviado' } })
    expect(onUpdateStatus).toHaveBeenCalledWith('V123', 'Enviado')
  })

  it('muestra solo los pedidos del cliente autenticado', () => {
    const orders = [
      { id: 'V123', email: 'ana@test.cl', createdAt: '2026-01-01T00:00:00Z', delivery: 'normal', items: [product], total: 10000, status: 'Enviado' },
      { id: 'V456', email: 'otro@test.cl', createdAt: '2026-01-01T00:00:00Z', delivery: 'express', items: [product], total: 10000, status: 'Pendiente' },
    ]
    render(<CustomerOrders orders={orders} email="ana@test.cl" onLogout={vi.fn()} />)
    expect(screen.getByText('Pedido #V123')).toBeInTheDocument()
    expect(screen.queryByText('Pedido #V456')).not.toBeInTheDocument()
  })

  it('muestra estado vacío si el cliente no tiene pedidos', () => {
    render(<CustomerOrders orders={[]} email="ana@test.cl" onLogout={vi.fn()} />)
    expect(screen.getByText(/aún no tienes compras/i)).toBeInTheDocument()
  })
})

describe('vistas y componentes de navegación', () => {
  it('cambia desde categorías al catálogo filtrado', async () => {
    const onCategory = vi.fn()
    const onSearch = vi.fn()
    render(<Catalog mode="categories" products={[product]} categories={['Todas', 'Tablas']} category="Todas" search="" onCategory={onCategory} onSearch={onSearch} onAdd={vi.fn()} />)
    await userEvent.click(screen.getByRole('button', { name: /tablas/i }))
    expect(onCategory).toHaveBeenCalledWith('Tablas')
    expect(onSearch).toHaveBeenCalledWith('')
  })

  it('muestra solo productos destacados en ofertas', () => {
    const expensive = { ...product, id: 4, name: 'Hoodie caro', price: 50000, featured: false }
    render(<Catalog mode="offers" products={[product, expensive]} categories={['Todas', 'Tablas']} category="Todas" search="" onSearch={vi.fn()} onCategory={vi.fn()} onAdd={vi.fn()} />)
    expect(screen.getByText('Tabla de prueba')).toBeInTheDocument()
    expect(screen.queryByText('Hoodie caro')).not.toBeInTheDocument()
  })

  it('permite volver al inicio desde el encabezado', async () => {
    const onNavigate = vi.fn()
    render(<Header cartCount={2} onNavigate={onNavigate} user={null} />)
    await userEvent.click(screen.getByRole('button', { name: 'Ir al inicio' }))
    await userEvent.click(screen.getByRole('button', { name: 'Ingresar' }))
    expect(onNavigate).toHaveBeenNthCalledWith(1, 'home')
    expect(onNavigate).toHaveBeenNthCalledWith(2, 'login')
    expect(screen.getByLabelText(/abrir carrito/i)).toHaveTextContent('2')
  })

  it('navega a productos desde la portada', async () => {
    const onNavigate = vi.fn()
    render(<Home products={[product]} onAdd={vi.fn()} onNavigate={onNavigate} />)
    await userEvent.click(screen.getByRole('button', { name: /explorar productos/i }))
    expect(onNavigate).toHaveBeenCalledWith('products')
  })
})

describe('carrito y resultado', () => {
  it('cambia cantidades, elimina artículos y continúa al pago', async () => {
    const onChangeQuantity = vi.fn()
    const onRemove = vi.fn()
    const onCheckout = vi.fn()
    render(<Cart items={[{ ...product, quantity: 2 }]} onChangeQuantity={onChangeQuantity} onRemove={onRemove} onCheckout={onCheckout} />)
    await userEvent.click(screen.getByRole('button', { name: /agregar una unidad/i }))
    await userEvent.click(screen.getByRole('button', { name: /quitar una unidad/i }))
    await userEvent.click(screen.getByRole('button', { name: 'Eliminar' }))
    await userEvent.click(screen.getByRole('button', { name: /continuar al pago/i }))
    expect(onChangeQuantity).toHaveBeenCalledWith(1, 3)
    expect(onChangeQuantity).toHaveBeenCalledWith(1, 1)
    expect(onRemove).toHaveBeenCalledWith(1)
    expect(onCheckout).toHaveBeenCalled()
  })

  it('muestra los datos de una compra confirmada', () => {
    render(<Result order={{ name: 'Ana', address: 'Calle 1', total: 10000 }} onContinue={vi.fn()} />)
    expect(screen.getByText(/gracias, ana/i)).toBeInTheDocument()
    expect(screen.getByText('$10.000')).toBeInTheDocument()
  })
})
