import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Activity,
  Pill,
  Video,
  LayoutDashboard,
  Cpu,
  Shield,
  BookOpen,
  Stethoscope,
  TrendingUp,
  AlertTriangle,
  Calendar,
  FileText,
  Users,
  Apple,
  BarChart3,
  ArrowRight,
  Sparkles,
  LogIn,
  UserPlus,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const fadeIn = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }
const stagger = { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }

const featuresPatient = [
  { icon: Activity, title: 'AI Symptom Checker', desc: 'Enter symptoms for instant AI-driven analysis and risk prediction.', to: '/symptom-checker', color: 'from-cyan-500/20 to-cyan-600/5' },
  { icon: Pill, title: 'Medication Management', desc: 'Track medications, doses, adherence, refill reminders.', to: '/medications', color: 'from-emerald-500/20 to-emerald-600/5' },
  { icon: Video, title: 'Telemedicine Hub', desc: 'Video & chat with certified doctors. Digital prescriptions.', to: '/telemedicine', color: 'from-violet-500/20 to-violet-600/5' },
  { icon: LayoutDashboard, title: 'Personal Health Dashboard', desc: 'Real-time vitals, progress charts, gamified health score.', to: '/dashboard', color: 'from-amber-500/20 to-amber-600/5' },
  { icon: Cpu, title: 'Device & Wearable Integration', desc: 'Sync smartwatches, BP monitors, glucometers. AI alerts.', to: '/devices', color: 'from-rose-500/20 to-rose-600/5' },
  { icon: BookOpen, title: 'Patient Engagement & Education', desc: 'Health tips, videos, articles. AI recommendations.', to: '/community', color: 'from-blue-500/20 to-blue-600/5' },
  { icon: TrendingUp, title: 'AI Health Predictions', desc: 'Predict future risks from history and vitals.', to: '/predictions', color: 'from-cyan-500/20 to-cyan-600/5' },
  { icon: AlertTriangle, title: 'Emergency Alert System', desc: 'Auto-alerts to doctors/family on abnormal readings.', to: '/emergency', color: 'from-cyan-500/20 to-cyan-600/5' },
  { icon: Calendar, title: 'Appointment Scheduling', desc: 'Book, reschedule, cancel. Automated reminders.', to: '/appointments', color: 'from-cyan-500/20 to-cyan-600/5' },
  { icon: FileText, title: 'Virtual Health Records', desc: 'Secure storage for records, lab reports, prescriptions.', to: '/health-records', color: 'from-cyan-500/20 to-cyan-600/5' },
  { icon: Users, title: 'Community & Forums', desc: 'Connect with patients with similar conditions.', to: '/community', color: 'from-cyan-500/20 to-cyan-600/5' },
  { icon: Apple, title: 'AI Diet & Exercise Plans', desc: 'Personalized fitness and nutrition.', to: '/diet-exercise', color: 'from-cyan-500/20 to-cyan-600/5' },
  { icon: BarChart3, title: 'Health Analytics & Reports', desc: 'Summarized analytics. Export for consultations.', to: '/analytics', color: 'from-cyan-500/20 to-cyan-600/5' },
]

const featuresDoctorOnly = [
  { icon: Stethoscope, title: 'Doctor Dashboard', desc: 'View all patients, histories, alerts, and vitals.', to: '/doctor', color: 'from-cyan-500/20 to-cyan-600/5' },
]

const featuresInfo = [
  { icon: Activity, title: 'AI Symptom Checker', desc: 'Enter symptoms for instant AI-driven analysis and risk prediction.' },
  { icon: Pill, title: 'Medication Management', desc: 'Track medications, doses, adherence, refill reminders.' },
  { icon: Video, title: 'Telemedicine Hub', desc: 'Video & chat with certified doctors. Digital prescriptions.' },
  { icon: LayoutDashboard, title: 'Personal Health Dashboard', desc: 'Real-time vitals, progress charts, gamified health score.' },
  { icon: Shield, title: 'Secure Authentication', desc: 'JWT, HIPAA compliance, multi-factor authentication.' },
  { icon: Stethoscope, title: 'Doctor Dashboard', desc: 'For doctors: view patients, histories, alerts, vitals.' },
]

export default function Home() {
  const { isAuthenticated, isDoctor } = useAuth()

  const featuresForRole = isAuthenticated
    ? [
        ...featuresPatient.filter((f) => (f.to !== '/symptom-checker' && f.to !== '/dashboard') || !isDoctor),
        ...(isDoctor ? featuresDoctorOnly : []),
      ]
    : []

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative py-20 md:py-32 px-4 md:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-cyan text-sm mb-8"
          >
            <Sparkles className="w-4 h-4" /> AI-Powered Healthcare
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Your Health, <span className="text-cyan">Smarter</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10"
          >
            Care that thinks ahead. One platform for your whole health.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 text-black font-semibold shadow-[0_0_30px_rgba(0,212,255,0.4)] hover:shadow-[0_0_40px_rgba(0,212,255,0.5)] transition-all hover:-translate-y-0.5"
                >
                  <LogIn className="w-5 h-5" /> Login
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl glass-panel text-white border border-white/10 hover:border-cyan-500/50 hover:text-cyan transition-all"
                >
                  <UserPlus className="w-5 h-5" /> Create account
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={isDoctor ? '/doctor' : '/dashboard'}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 text-black font-semibold shadow-[0_0_30px_rgba(0,212,255,0.4)] hover:shadow-[0_0_40px_rgba(0,212,255,0.5)] transition-all hover:-translate-y-0.5"
                >
                  Go to {isDoctor ? 'Doctor' : ''} Dashboard <ArrowRight className="w-5 h-5" />
                </Link>
                {!isDoctor && (
                  <Link
                    to="/symptom-checker"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl glass-panel text-white border border-white/10 hover:border-cyan-500/50 hover:text-cyan transition-all"
                  >
                    Symptom Checker
                  </Link>
                )}
                {isDoctor && (
                  <Link
                    to="/telemedicine"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl glass-panel text-white border border-white/10 hover:border-cyan-500/50 hover:text-cyan transition-all"
                  >
                    Telemedicine
                  </Link>
                )}
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Features: for guests = info only; for logged in = only what they can access */}
      <section id="features" className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.h2 {...fadeIn} className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            {isAuthenticated ? 'Your features' : 'What Nexora offers'}
          </motion.h2>
          <motion.p {...fadeIn} className="text-zinc-400 text-center max-w-2xl mx-auto mb-16">
            {isAuthenticated
              ? 'Everything you can access in one place.'
              : 'Sign in or create an account to use these features.'}
          </motion.p>

          {!isAuthenticated ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuresInfo.map((f, i) => (
                <motion.div
                  key={f.title}
                  {...stagger}
                  transition={{ delay: i * 0.05 }}
                  className="glass-panel p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                    <f.icon className="w-6 h-6 text-cyan" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuresForRole.map((f, i) => (
                <motion.div
                  key={f.to}
                  {...stagger}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link to={f.to} className="block h-full group">
                    <div className={`glass-panel p-6 h-full rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all duration-300 bg-gradient-to-br ${f.color}`}>
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors">
                        <f.icon className="w-6 h-6 text-cyan" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan transition-colors">{f.title}</h3>
                      <p className="text-zinc-400 text-sm leading-relaxed mb-4">{f.desc}</p>
                      <span className="inline-flex items-center gap-1 text-cyan text-sm font-medium">
                        Open <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
