import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="page-section empty-state">
      <div className="section-heading">
        <span>404 / ERROR</span>
        <h1>Página no encontrada</h1>
      </div>
      <p>La dirección que ingresaste no existe.</p>
      <Link className="button-link" to="/">Volver al inicio</Link>
    </section>
  )
}
