import { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Phone, User, Heart, Bell } from 'lucide-react'

const MOCK_ALERTS = [
  { id: '1', type: 'Fall detected', patient: 'John Doe', time: '2 min ago', severity: 'high', resolved: false },
  { id: '2', type: 'Abnormal heart rate', patient: 'Jane Smith', time: '1 hour ago', severity: 'medium', resolved: true },
  { id: '3', type: 'BP spike', patient: 'Mike Johnson', time: '3 hours ago', severity: 'medium', resolved: true },
]

export default function Emergency() {
  const [testing, setTesting] = useState(false)

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-8"
      >
        <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
          <AlertTriangle className="w-6 h-6 text-red-400" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Emergency Alert System</h1>
          <p className="text-zinc-400">Automatic alerts to doctors and family when abnormal readings or events are detected.</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-8 rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-500/5 to-transparent mb-8"
      >
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-zinc-400 mb-1">System status</p>
            <p className="text-2xl font-bold text-green-400 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse" /> Active & monitoring
            </p>
            <p className="text-zinc-500 text-sm mt-1">Wearables and vitals are being monitored 24/7.</p>
          </div>
          <button
            onClick={() => setTesting(true)}
            className="px-6 py-3 rounded-xl border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 transition"
          >
            Test alert (demo)
          </button>
        </div>
      </motion.div>

      <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center gap-2">
          <Bell className="w-5 h-5 text-cyan" />
          <h2 className="font-semibold text-white">Recent alerts</h2>
        </div>
        <div className="divide-y divide-white/5">
          {MOCK_ALERTS.map((a) => (
            <div key={a.id} className="p-5 flex flex-wrap items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                a.severity === 'high' ? 'bg-red-500/20' : 'bg-amber-500/20'
              }`}>
                <AlertTriangle className={`w-6 h-6 ${a.severity === 'high' ? 'text-red-400' : 'text-amber-400'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white">{a.type}</p>
                <p className="text-zinc-500 text-sm">Patient: {a.patient} • {a.time}</p>
              </div>
              <div className="flex items-center gap-2">
                {a.resolved ? (
                  <span className="px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-400">Resolved</span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs bg-red-500/20 text-red-400">Active</span>
                )}
                <button className="p-2 rounded-lg border border-white/10 text-zinc-400 hover:text-cyan hover:border-cyan-500/30">
                  <Phone className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 grid sm:grid-cols-2 gap-4"
      >
        <div className="glass-panel p-5 rounded-xl border border-white/10 flex items-center gap-4">
          <User className="w-10 h-10 text-cyan" />
          <div>
            <p className="font-medium text-white">Family contacts</p>
            <p className="text-zinc-500 text-sm">Emergency contacts receive alerts when critical events occur.</p>
          </div>
        </div>
        <div className="glass-panel p-5 rounded-xl border border-white/10 flex items-center gap-4">
          <Heart className="w-10 h-10 text-cyan" />
          <div>
            <p className="font-medium text-white">Wearable integration</p>
            <p className="text-zinc-500 text-sm">Fall detection, heart anomalies, and vital thresholds from connected devices.</p>
          </div>
        </div>
      </motion.div>

      {testing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
          onClick={() => setTesting(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-panel p-8 rounded-2xl max-w-sm w-full border border-amber-500/30 text-center"
          >
            <AlertTriangle className="w-16 h-16 text-amber-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Test alert sent</h3>
            <p className="text-zinc-400 text-sm mb-6">In production, this would notify doctors and emergency contacts.</p>
            <button onClick={() => setTesting(false)} className="w-full py-3 rounded-xl bg-cyan-500 text-black font-semibold">OK</button>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
