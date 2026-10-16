import { useState } from 'react'

const DEMO_PASSWORD = 'Valde2026!'

function getRole(email) {
  if (email === 'admin@valdeskate.cl') return 'admin'
  if (email === 'empleado@valdeskate.cl') return 'employee'
  if (email === 'cliente@valdeskate.cl') return 'customer'
  return null
}

const roleNames = { admin: 'Administrador', employee: 'Empleado', customer: 'Cliente' }

export function Login({ onLogin, onBack }) {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const role = getRole(credentials.email.trim().toLowerCase())

  const submit = (event) => {
    event.preventDefault()
    if (!role || credentials.password !== DEMO_PASSWORD) {
      setError('El correo o la contraseña no son correctos.')
      return
    }
    setError('')
    onLogin({ role, email: credentials.email.trim().toLowerCase() })
  }

  return (
    <section className="login-page">
      <div className="login-card">
        <span>06 / ACCESO GENERAL</span>
        <h1>Tu cuenta<br /><em>Valde.</em></h1>
        <p>El correo identifica si eres administrador, empleado o cliente.</p>
        {role && <p className="role-preview">Perfil detectado: <strong>{roleNames[role]}</strong></p>}
        {error && <p className="error-message" role="alert">{error}</p>}
        <form className="login-form" onSubmit={submit}>
          <label>Correo electrónico<input type="email" autoComplete="username" value={credentials.email} onChange={(event) => setCredentials({ ...credentials, email: event.target.value })} /></label>
          <label>Contraseña<input type="password" autoComplete="current-password" value={credentials.password} onChange={(event) => setCredentials({ ...credentials, password: event.target.value })} /></label>
          <button type="submit">Ingresar</button>
        </form>
        <button className="back-link" onClick={onBack}>← Volver a la tienda</button>
        <small className="demo-credentials">Admin: admin@valdeskate.cl · Empleado: empleado@valdeskate.cl · Cliente: cliente@valdeskate.cl<br />Contraseña demo: Valde2026!</small>
      </div>
    </section>
  )
}
