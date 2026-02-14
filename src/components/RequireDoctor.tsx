import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { isDoctorRole } from '../utils/security'

type Props = { children: React.ReactNode }

/** Doctor-only route. No patient data leak: patients are redirected to dashboard. */
export function RequireDoctor({ children }: Props) {
  const { user } = useAuth()
  const authenticated = !!user
  const doctor = authenticated && isDoctorRole(user?.role)

  if (!authenticated) {
    return <Navigate to="/login" replace />
  }

  if (!doctor) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}
