import { useRef, useState } from 'react'
import { apiCatalogEnabled } from '../data/catalogApi'
import { sendContactMessage } from '../data/storeApi'

export function ContactPage() {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const confirmation = useRef(null)

  const send = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const fields = new FormData(form)
    const message = {
      name: fields.get('name').trim(),
      email: fields.get('email').trim(),
      message: fields.get('message').trim()
    }

    if (!message.name || !message.message) {
      setError('Completa tu nombre y el mensaje.')
      return
    }

    setBusy(true)
    setError('')
    try {
      await sendContactMessage(message)
      form.reset()
      confirmation.current?.showModal()
    } catch {
      setError('No pudimos enviar el mensaje. Inténtalo de nuevo.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="page-section">
      <h1>Contacto</h1>
      {!apiCatalogEnabled && <p>El envío está deshabilitado porque la tienda se inició sin conexión a la API.</p>}
      <form className="checkout-form contact-form" onSubmit={send}>
        <label>Nombre<input name="name" autoComplete="name" required maxLength={80} /></label>
        <label>Correo<input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
        <label>Mensaje<textarea name="message" required maxLength={2000} rows={5} /></label>
        <button type="submit" disabled={busy || !apiCatalogEnabled}>
          {busy ? 'Enviando…' : 'Enviar mensaje'}
        </button>
        {error && <p role="alert">{error}</p>}
      </form>
      <dialog ref={confirmation} className="contact-confirmation" aria-labelledby="contact-confirmation-title">
        <h2 id="contact-confirmation-title">Mensaje<br />enviado</h2>
        <form method="dialog">
          <button className="button-link" type="submit">Volver al formulario</button>
        </form>
      </dialog>
    </section>
  )
}
