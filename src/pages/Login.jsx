import { Login } from '../components/Login'
import { useNavigate } from 'react-router-dom'

export function LoginPage({ onLogin }) {
  const navigate = useNavigate()

  return <Login onLogin={onLogin} onBack={() => navigate('/')} />
}
