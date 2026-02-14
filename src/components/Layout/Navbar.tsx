import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  X,
  Stethoscope,
  Activity,
  Pill,
  Video,
  LayoutDashboard,
  Cpu,
  User,
  LogOut,
} from 'lucide-react'

type NavLink = { to: string; label: string; icon?: typeof Activity; doctorOnly?: boolean; patientOnly?: boolean }
import { useAuth } from '../../context/AuthContext'
import { sanitizeForDisplay } from '../../utils/security'
import './Navbar.css'

const navLinks: NavLink[] = [
  { to: '/symptom-checker', label: 'Symptom Checker', icon: Activity, patientOnly: true },
  { to: '/medications', label: 'Medications', icon: Pill },
  { to: '/telemedicine', label: 'Telemedicine', icon: Video },
  { to: '/dashboard', label: 'Health Dashboard', icon: LayoutDashboard, patientOnly: true },
  { to: '/devices', label: 'Devices', icon: Cpu },
  { to: '/appointments', label: 'Appointments' },
  { to: '/health-records', label: 'Health Records' },
  { to: '/predictions', label: 'AI Predictions' },
  { to: '/emergency', label: 'Emergency' },
  { to: '/community', label: 'Community' },
  { to: '/diet-exercise', label: 'Diet & Exercise' },
  { to: '/analytics', label: 'Analytics' },
  { to: '/doctor', label: 'Doctor Dashboard', icon: Stethoscope, doctorOnly: true },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [userMenu, setUserMenu] = useState(false)
  const location = useLocation()
  const { user, logout, isAuthenticated, isDoctor } = useAuth()

  return (
    <nav className="navbar glass-panel">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <Stethoscope className="w-8 h-8 text-cyan" />
          <span>Nexora</span>
        </Link>

        <div className="nav-links-desktop">
          {isAuthenticated ? (
            <>
              {!isDoctor && (
                <Link to="/symptom-checker" className={location.pathname === '/symptom-checker' ? 'active' : ''}>Symptom Checker</Link>
              )}
              <Link to="/medications" className={location.pathname === '/medications' ? 'active' : ''}>Medications</Link>
              <Link to="/telemedicine" className={location.pathname === '/telemedicine' ? 'active' : ''}>Telemedicine</Link>
              {!isDoctor && (
                <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>Dashboard</Link>
              )}
              <Link to="/appointments" className={location.pathname === '/appointments' ? 'active' : ''}>Appointments</Link>
              {isDoctor && (
                <Link to="/doctor" className={location.pathname === '/doctor' ? 'active' : ''}>Doctor Dashboard</Link>
              )}
            </>
          ) : null}
        </div>

        <div className="navbar-actions">
          {isAuthenticated ? (
            <div className="user-menu-wrap">
              <button className="user-btn glass-panel" onClick={() => setUserMenu(!userMenu)}>
                <User className="w-5 h-5" />
                <span>{user?.name ? sanitizeForDisplay(user.name.split(' ')[0] ?? '') : ''}</span>
              </button>
              <AnimatePresence>
                {userMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="user-dropdown glass-panel"
                  >
                    {!isDoctor && (
                      <Link to="/dashboard" onClick={() => setUserMenu(false)}>Dashboard</Link>
                    )}
                    {isDoctor && (
                      <Link to="/doctor" onClick={() => setUserMenu(false)}>Doctor Dashboard</Link>
                    )}
                    <button onClick={() => { logout(); setUserMenu(false); }}>
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn-ghost">Login</Link>
              <Link to="/register" className="btn-cyan">Get Started</Link>
            </>
          )}
          <button className="nav-mobile-toggle" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="nav-mobile glass-panel"
          >
            {isAuthenticated ? (
              <>
                {navLinks.map((link) => {
                  if (link.doctorOnly && !isDoctor) return null
                  if (link.patientOnly && isDoctor) return null
                  return (
                    <Link key={link.to} to={link.to} onClick={() => setOpen(false)} className={location.pathname === link.to ? 'active' : ''}>
                      {link.icon && <link.icon className="w-5 h-5" />}
                      {link.label}
                    </Link>
                  )
                })}
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className={location.pathname === '/login' ? 'active' : ''}>Login</Link>
                <Link to="/register" onClick={() => setOpen(false)} className={location.pathname === '/register' ? 'active' : ''}>Get Started</Link>
              </>
            )}
            {isAuthenticated ? (
              <button onClick={() => { logout(); setOpen(false); }}><LogOut className="w-5 h-5" /> Logout</button>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
