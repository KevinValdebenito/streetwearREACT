import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterAll, beforeEach, expect, test, vi } from 'vitest'
import App from '../App'

const { get } = vi.hoisted(() => {
  vi.stubEnv('VITE_CATALOG_API_URL', '/caos-api')
  return { get: vi.fn() }
})

vi.mock('axios', () => ({ default: { create: () => ({ get }) } }))

beforeEach(() => {
  get.mockReset()
  window.history.replaceState({}, '', '/productos')
})

afterAll(() => vi.unstubAllEnvs())

test('muestra el estado de catálogo vacío cuando la API responde con una lista vacía', async () => {
  get.mockResolvedValue({ data: [] })
  render(<App />)

  expect(await screen.findByText('El catálogo aún no tiene productos.')).toBeVisible()
  expect(screen.queryByRole('alert')).toBeNull()
})

test('muestra el error de conexión y vuelve a consultar al reintentar', async () => {
  get.mockRejectedValueOnce(new Error('Error de conexión'))
  get.mockResolvedValueOnce({ data: [] })
  render(<App />)

  expect(await screen.findByRole('alert')).toHaveTextContent('No pudimos conectar con el catálogo.')
  await userEvent.click(screen.getByRole('button', { name: 'Reintentar' }))

  expect(await screen.findByText('El catálogo aún no tiene productos.')).toBeVisible()
  expect(get).toHaveBeenCalledTimes(2)
})
