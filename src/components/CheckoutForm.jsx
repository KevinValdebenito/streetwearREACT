export function CheckoutForm({ form, onChange, onSubmit, error }) {
  return (
    <>
      {error && <p className="error-message" role="alert">{error}</p>}
      <form className="checkout-form" onSubmit={onSubmit}>
        <label>
          Nombre completo
          <input value={form.name} onChange={(e) => onChange({ ...form, name: e.target.value })} />
        </label>
        <label>
          Correo electrónico
          <input type="email" value={form.email} onChange={(e) => onChange({ ...form, email: e.target.value })} />
        </label>
        <label>
          Dirección de envío
          <textarea value={form.address} onChange={(e) => onChange({ ...form, address: e.target.value })} />
        </label>
        <label>
          Tipo de entrega
          <select value={form.delivery} onChange={(e) => onChange({ ...form, delivery: e.target.value })}>
            <option value="normal">Envío normal (3-5 días)</option>
            <option value="express">Envío express (24 horas)</option>
          </select>
        </label>
        <button type="submit">Pagar y confirmar compra</button>
      </form>
    </>
  )
}
