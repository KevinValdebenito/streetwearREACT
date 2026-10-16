import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { ProductCard } from '../components/ProductCard'
import { ProductGrid } from '../components/ProductGrid'

const product = { id: 1, name: 'Tabla de prueba', category: 'Tablas', price: 10000, stock: 3, image: '/test.png' }

beforeEach(() => localStorage.clear())

describe('componentes de productos', () => {
  it('renderiza el nombre y precio mediante props', () => { render(<ProductCard product={product} onAdd={vi.fn()} />); expect(screen.getByText('Tabla de prueba')).toBeInTheDocument(); expect(screen.getByText('$10.000')).toBeInTheDocument() })
  it('renderiza todos los productos de una lista', () => { render(<ProductGrid products={[product, { ...product, id: 2, name: 'Polera' }]} onAdd={vi.fn()} />); expect(screen.getByText('Tabla de prueba')).toBeInTheDocument(); expect(screen.getByText('Polera')).toBeInTheDocument() })
  it('muestra estado vacío cuando no hay productos', () => { render(<ProductGrid products={[]} onAdd={vi.fn()} />); expect(screen.getByText(/no encontramos/i)).toBeInTheDocument() })
  it('deshabilita agregar si no hay stock', () => { render(<ProductCard product={{ ...product, stock: 0 }} onAdd={vi.fn()} />); expect(screen.getByRole('button', { name: /agotado/i })).toBeDisabled() })
  it('ejecuta onAdd al hacer clic', async () => { const onAdd = vi.fn(); render(<ProductCard product={product} onAdd={onAdd} />); await userEvent.click(screen.getByRole('button', { name: /agregar/i })); expect(onAdd).toHaveBeenCalledWith(product) })
})

describe('flujos de la tienda', () => {
  it('muestra productos al navegar al catálogo', async () => { render(<App />); await userEvent.click(screen.getByRole('button', { name: 'Productos' })); expect(screen.getByRole('heading', { name: 'Productos' })).toBeInTheDocument() })
  it('agrega un producto y actualiza el contador del carrito', async () => { render(<App />); await userEvent.click(screen.getAllByRole('button', { name: /agregar al carrito/i })[0]); expect(screen.getByLabelText(/abrir carrito/i)).toHaveTextContent('1') })
  it('muestra el carrito vacío inicialmente', async () => { render(<App />); await userEvent.click(screen.getByRole('button', { name: /abrir carrito/i })); expect(screen.getByText(/carrito está vacío/i)).toBeInTheDocument() })
  it('filtra productos por texto', async () => { render(<App />); await userEvent.click(screen.getByRole('button', { name: 'Productos' })); await userEvent.type(screen.getByPlaceholderText(/buscar/i), 'hoodie'); expect(screen.getByText('Hoodie Thrasher Flame')).toBeInTheDocument(); expect(screen.queryByText('Polera Thrasher Black')).not.toBeInTheDocument() })
  it('cambia de categoría', async () => { render(<App />); await userEvent.click(screen.getByRole('button', { name: 'Productos' })); await userEvent.click(screen.getByRole('button', { name: 'Tablas' })); expect(screen.getByText('Tabla Toy Machine Welcome To Hell')).toBeInTheDocument(); expect(screen.queryByText('Polera Thrasher Black')).not.toBeInTheDocument() })
  it('muestra error si checkout está incompleto', async () => { render(<App />); await userEvent.click(screen.getAllByRole('button', { name: /agregar al carrito/i })[0]); await userEvent.click(screen.getByRole('button', { name: /abrir carrito/i })); await userEvent.click(screen.getByRole('button', { name: /continuar al pago/i })); await userEvent.click(screen.getByRole('button', { name: /pagar/i })); expect(screen.getByRole('alert')).toHaveTextContent(/completa/i) })
  it('actualiza el estado del formulario', async () => { render(<App />); await userEvent.click(screen.getAllByRole('button', { name: /agregar al carrito/i })[0]); await userEvent.click(screen.getByRole('button', { name: /abrir carrito/i })); await userEvent.click(screen.getByRole('button', { name: /continuar al pago/i })); const input = screen.getByLabelText(/nombre completo/i); await userEvent.type(input, 'Ana'); expect(input).toHaveValue('Ana') })
  it('completa una compra y muestra el resultado', async () => { render(<App />); await userEvent.click(screen.getAllByRole('button', { name: /agregar al carrito/i })[0]); await userEvent.click(screen.getByRole('button', { name: /abrir carrito/i })); await userEvent.click(screen.getByRole('button', { name: /continuar al pago/i })); await userEvent.type(screen.getByLabelText(/nombre completo/i), 'Ana'); await userEvent.type(screen.getByLabelText(/correo/i), 'ana@test.cl'); await userEvent.type(screen.getByLabelText(/dirección/i), 'Calle 1'); await userEvent.click(screen.getByRole('button', { name: /pagar/i })); expect(screen.getByText(/compra exitosa/i)).toBeInTheDocument() })
  it('permite volver del checkout al carrito', async () => { render(<App />); await userEvent.click(screen.getAllByRole('button', { name: /agregar al carrito/i })[0]); await userEvent.click(screen.getByRole('button', { name: /abrir carrito/i })); await userEvent.click(screen.getByRole('button', { name: /continuar al pago/i })); fireEvent.click(screen.getByRole('button', { name: /volver al carrito/i })); expect(screen.getByRole('heading', { name: 'Carrito' })).toBeInTheDocument() })
})
