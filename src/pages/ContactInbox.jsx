import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listContactMessages } from '../data/storeApi'

export function ContactInboxPage({ token }) {
  const [messages, setMessages] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!token) return
    const controller = new AbortController()
    listContactMessages(token, controller.signal)
      .then(setMessages)
      .catch(() => {
        if (!controller.signal.aborted) setError(true)
      })
    return () => controller.abort()
  }, [token])

  return (
    <section className="admin-page contact-inbox">
      <div className="admin-header">
        <h1>Mensajes de contacto</h1>
        <Link className="button-link" to="/admin">Volver a administración</Link>
      </div>
      {!token && <p>Conéctate a la API para consultar los mensajes.</p>}
      {error && <p role="alert">No pudimos cargar los mensajes. Recarga la página para reintentar.</p>}
      {token && !error && messages === null && <p role="status">Cargando mensajes…</p>}
      {messages?.length === 0 && <p>Aún no hay mensajes de contacto.</p>}
      {messages?.map((message) => (
        <article key={message.id} className="contact-message">
          <h2>{message.name}</h2>
          <p>{message.email} · <time dateTime={message.createdAt}>
            {new Date(message.createdAt).toLocaleString('es-CL')}
          </time></p>
          <p className="contact-message-body">{message.message}</p>
        </article>
      ))}
    </section>
  )
}
