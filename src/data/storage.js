export function readStorage(key, fallback) {
  const saved = localStorage.getItem(key)

  if (!saved) return fallback

  try {
    return JSON.parse(saved)
  } catch {
    localStorage.removeItem(key)
    return fallback
  }
}

export function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
  return value
}

export function removeStorage(key) {
  localStorage.removeItem(key)
}
