import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

type Props = { children: React.ReactNode }

/** Protects routes: only logged-in users. Redirect with replace to avoid leaking referrer in history. */
export function RequireAuth({ children }: Props) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  const from = location.pathname && location.pathname !== '/' && location.pathname !== '/login' ? location.pathname : '/dashboard'

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from }} replace />
  }

  return <>{children}</>
}
