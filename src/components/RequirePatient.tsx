import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

type Props = { children: React.ReactNode }

/** Patient-only route. Doctors are redirected to doctor dashboard. */
export function RequirePatient({ children }: Props) {
  const { user, isDoctor } = useAuth()
  const authenticated = !!user

  if (!authenticated) {
    return <Navigate to="/" replace />
  }

  if (isDoctor) {
    return <Navigate to="/doctor" replace />
  }

  return <>{children}</>
}
