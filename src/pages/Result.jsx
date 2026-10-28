import { Result } from '../components/Result'
import { Navigate, useNavigate } from 'react-router-dom'

export function ResultPage({ order }) {
  const navigate = useNavigate()

  if (!order) {
    return <Navigate to="/productos" replace />
  }

  return <Result order={order} onContinue={() => navigate('/productos')} />
}
