import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { Header } from '../components/Header'
import { NotFoundPage } from '../pages/NotFound'
import { ProductDetailPage } from '../pages/ProductDetail'
import { ResultPage } from '../pages/Result'
import { ProtectedRoute } from '../routes/ProtectedRoute'

const product = {
  id: 1,
  name: 'Tabla de prueba',
  category: 'Tablas',
  price: 10000,
  stock: 3,
  image: '/test.png'
}

describe('React Router', () => {
  it('marca el enlace activo del Header', () => {
    render(
      <MemoryRouter initialEntries={['/productos']}>
        <Header cartCount={0} user={null} />
      </MemoryRouter>
    )
    expect(screen.getByRole('link', { name: 'Productos' })).toHaveClass('active')
  })

  it('muestra el detalle del producto según el parámetro id', () => {
    render(
      <MemoryRouter initialEntries={['/productos/1']}>
        <Routes>
          <Route path="/productos/:id" element={<ProductDetailPage products={[product]} onAdd={() => {}} />} />
        </Routes>
      </MemoryRouter>
    )
    expect(screen.getByRole('heading', { level: 1, name: 'Tabla de prueba' })).toBeInTheDocument()
  })

  it('muestra una alternativa cuando el producto no existe', () => {
    render(
      <MemoryRouter initialEntries={['/productos/999']}>
        <Routes>
          <Route path="/productos/:id" element={<ProductDetailPage products={[product]} onAdd={() => {}} />} />
        </Routes>
      </MemoryRouter>
    )
    expect(screen.getByRole('heading', { name: /producto no encontrado/i })).toBeInTheDocument()
  })

  it('protege rutas privadas y redirige al login', () => {
    render(
      <MemoryRouter initialEntries={['/admin']}>
        <Routes>
          <Route path="/admin" element={<ProtectedRoute user={null} role="admin"><h1>Administración</h1></ProtectedRoute>} />
          <Route path="/login" element={<h1>Login</h1>} />
        </Routes>
      </MemoryRouter>
    )
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument()
  })

  it('renderiza la página 404 para una ruta desconocida', () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MemoryRouter>
    )
    expect(screen.getByRole('heading', { name: /página no encontrada/i })).toBeInTheDocument()
  })

  it('redirecciona el resultado sin pedido al catálogo', () => {
    render(
      <MemoryRouter initialEntries={['/resultado']}>
        <Routes>
          <Route path="/resultado" element={<ResultPage order={null} />} />
          <Route path="/productos" element={<h1>Productos</h1>} />
        </Routes>
      </MemoryRouter>
    )
    expect(screen.getByRole('heading', { name: 'Productos' })).toBeInTheDocument()
  })
})
