import { createContext, useContext, useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import { clearSensitiveStorage, isDoctorRole, isPatientRole } from '../utils/security'
import { useSessionTimeout } from '../hooks/useSessionTimeout'

type User = { id: string; name: string; email: string; role: 'patient' | 'doctor' }

type AuthContextType = {
  user: User | null
  login: (email: string, password: string, role: 'patient' | 'doctor') => Promise<boolean>
  register: (name: string, email: string, password: string, role: 'patient' | 'doctor') => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
  isDoctor: boolean
  isPatient: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const logout = useCallback(() => {
    setUser(null)
    clearSensitiveStorage()
  }, [])

  useSessionTimeout(logout, !!user)

  const login = useCallback(async (email: string, _password: string, role: 'patient' | 'doctor') => {
    if (role !== 'patient' && role !== 'doctor') return false
    setUser({ id: '1', name: role === 'doctor' ? 'Dr. Demo' : 'Demo User', email, role })
    return true
  }, [])

  const register = useCallback(async (name: string, email: string, _password: string, role: 'patient' | 'doctor') => {
    if (role !== 'patient' && role !== 'doctor') return false
    setUser({ id: '1', name, email, role })
    return true
  }, [])

  const isDoctor = isDoctorRole(user?.role)
  const isPatient = isPatientRole(user?.role)

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user, isDoctor, isPatient }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
