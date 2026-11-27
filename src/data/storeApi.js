import { api } from './catalogApi'

function bearer(token) {
  return { headers: { Authorization: `Bearer ${token}` } }
}

export async function loadSession(token, signal) {
  const { data } = await api.get('/api/users/me', { ...bearer(token), signal })
  return { ...data, token }
}

export async function login(credentials) {
  const { data } = await api.post('/api/auth/login', credentials)
  return loadSession(data.token)
}

export function saveApiProduct(token, id, product) {
  return id === null
    ? api.post('/products', product, bearer(token))
    : api.put(`/products/${id}`, product, bearer(token))
}

export function deleteApiProduct(token, id) {
  return api.delete(`/products/${id}`, bearer(token))
}

export function sendContactMessage(message) {
  return api.post('/api/contact', message)
}

export async function listContactMessages(token, signal) {
  const { data } = await api.get('/api/contact', { ...bearer(token), signal })
  return data
}
