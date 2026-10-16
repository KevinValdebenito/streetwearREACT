export function readStorage(key, fallback) {
  const saved = localStorage.getItem(key)
  return saved ? JSON.parse(saved) : fallback
}

export function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
  return value
}

export function removeStorage(key) {
  localStorage.removeItem(key)
}
