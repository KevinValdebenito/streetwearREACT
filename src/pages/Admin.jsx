import { Link } from 'react-router-dom'
import { Admin } from '../components/Admin'

export function AdminPage(props) {
  return (
    <>
      {props.token && <div className="page-section"><Link className="button-link" to="/admin/mensajes">Mensajes de contacto</Link></div>}
      <Admin {...props} />
    </>
  )
}
