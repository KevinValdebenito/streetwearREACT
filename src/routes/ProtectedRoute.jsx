import { Navigate } from 'react-router-dom'

export function ProtectedRoute({ user, role, children }) {
  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (user.role !== role) {
    return <Navigate to="/" replace />
  }

  return children
}
