import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Shield, Fingerprint, UserCircle, Stethoscope } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'patient' | 'doctor'>('patient')
  const [mfaCode, setMfaCode] = useState('')
  const [showMfa, setShowMfa] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const roleToUse = role
    try {
      const ok = await login(email, password, roleToUse)
      if (ok) {
        setPassword('')
        setMfaCode('')
        if (showMfa && mfaCode) {
          navigate(roleToUse === 'doctor' ? '/doctor' : '/dashboard', { replace: true })
        } else if (!showMfa) {
          setShowMfa(true)
        } else {
          navigate(roleToUse === 'doctor' ? '/doctor' : '/dashboard', { replace: true })
        }
      }
    } catch {
      setError('Invalid credentials. Try again.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="glass-panel p-8 rounded-2xl border border-white/10">
          <div className="flex items-center gap-2 text-cyan mb-2">
            <Shield className="w-6 h-6" />
            <span className="font-semibold">Secure Login</span>
          </div>
          <p className="text-zinc-400 text-sm mb-6">JWT • HIPAA compliant • Encrypted</p>
          <h1 className="text-2xl font-bold text-white mb-6">Sign in to Nexora</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 outline-none transition"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 outline-none transition"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Sign in as</label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setRole('patient')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border transition ${
                    role === 'patient'
                      ? 'border-cyan-500 bg-cyan-500/10 text-cyan'
                      : 'border-white/10 bg-white/5 text-zinc-400 hover:border-white/20'
                  }`}
                >
                  <UserCircle className="w-5 h-5" /> Patient
                </button>
                <button
                  type="button"
                  onClick={() => setRole('doctor')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border transition ${
                    role === 'doctor'
                      ? 'border-cyan-500 bg-cyan-500/10 text-cyan'
                      : 'border-white/10 bg-white/5 text-zinc-400 hover:border-white/20'
                  }`}
                >
                  <Stethoscope className="w-5 h-5" /> Doctor
                </button>
              </div>
            </div>
            {showMfa && (
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Two-factor code</label>
                <div className="relative">
                  <Fingerprint className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input
                    type="text"
                    value={mfaCode}
                    onChange={(e) => setMfaCode(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:border-cyan-500/50 outline-none transition"
                    placeholder="000000"
                    maxLength={6}
                  />
                </div>
              </div>
            )}
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 text-black font-semibold hover:shadow-[0_0_24px_rgba(0,212,255,0.4)] transition-all disabled:opacity-50"
            >
              {loading ? 'Signing in...' : showMfa && !mfaCode ? 'Verify' : 'Sign in'}
            </button>
          </form>

          <p className="mt-6 text-center text-zinc-400 text-sm">
            Don't have an account? <Link to="/register" className="text-cyan hover:underline">Create account</Link>
          </p>
          <p className="mt-3 text-center text-zinc-500 text-sm">
            <Link to="/" className="text-zinc-400 hover:text-cyan transition-colors">← Back to home</Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
