import axios from 'axios'
import { useEffect, useState } from 'react'

const baseURL = import.meta.env.VITE_CATALOG_API_URL
export const apiCatalogEnabled = Boolean(baseURL)
const api = axios.create({ baseURL, timeout: 8000 })

export function useApiCatalog() {
  const [catalog, setCatalog] = useState({
    status: apiCatalogEnabled ? 'loading' : 'local',
    products: []
  })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    if (!apiCatalogEnabled) return

    const controller = new AbortController()

    async function load() {
      try {
        const { data } = await api.get('/products', { signal: controller.signal })
        if (!Array.isArray(data)) throw new Error('La API no devolvió una lista')
        if (!controller.signal.aborted) setCatalog({ status: 'ready', products: data })
      } catch {
        if (!controller.signal.aborted) setCatalog({ status: 'error', products: [] })
      }
    }

    load()
    return () => controller.abort()
  }, [attempt])

  return {
    ...catalog,
    retry() {
      setCatalog({ status: 'loading', products: [] })
      setAttempt((current) => current + 1)
    }
  }
}