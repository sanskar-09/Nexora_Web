import { motion } from 'framer-motion'
import { Activity, Heart, Droplets, Flame, Trophy, TrendingUp } from 'lucide-react'

const VITALS = [
  { label: 'Heart rate', value: '72 bpm', icon: Heart, status: 'normal', color: 'text-green-400' },
  { label: 'Blood pressure', value: '118/76', icon: Activity, status: 'normal', color: 'text-green-400' },
  { label: 'Blood glucose', value: '98 mg/dL', icon: Droplets, status: 'normal', color: 'text-green-400' },
  { label: 'Steps today', value: '4,230', icon: Flame, status: 'goal', color: 'text-cyan' },
]

const ACHIEVEMENTS = [
  { name: '7-day streak', icon: '🔥', unlocked: true },
  { name: 'First check-in', icon: '✅', unlocked: true },
  { name: 'Hydration hero', icon: '💧', unlocked: true },
  { name: '30-day streak', icon: '⭐', unlocked: false },
]

export default function Dashboard() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-8"
      >
        <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
          <Activity className="w-6 h-6 text-cyan" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Personal Health Dashboard</h1>
          <p className="text-zinc-400">Real-time vitals, progress, and gamified health score.</p>
        </div>
      </motion.div>

      {/* Health score */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel p-8 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-transparent mb-8"
      >
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-zinc-400 mb-1">Health score</p>
            <p className="text-4xl font-bold text-cyan">82</p>
            <p className="text-zinc-500 text-sm mt-1">Good • Up 5 from last week</p>
          </div>
          <div className="w-32 h-32 rounded-full border-4 border-cyan-500/30 flex items-center justify-center text-3xl font-bold text-cyan">
            82
          </div>
        </div>
      </motion.div>

      {/* Vitals */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {VITALS.map((v, i) => (
          <motion.div
            key={v.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-panel p-5 rounded-xl border border-white/10"
          >
            <v.icon className={`w-8 h-8 ${v.color} mb-2`} />
            <p className="text-zinc-500 text-sm">{v.label}</p>
            <p className="text-white font-semibold text-lg">{v.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-6 rounded-2xl border border-white/10"
        >
          <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cyan" /> Progress (7 days)
          </h2>
          <div className="h-40 flex items-end gap-2">
            {[65, 72, 68, 75, 78, 80, 82].map((h, i) => (
              <div key={i} className="flex-1 rounded-t bg-cyan-500/30" style={{ height: `${h}%` }} title={`Day ${i + 1}: ${h}`} />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-zinc-500">
            <span>Mon</span>
            <span>Sun</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="glass-panel p-6 rounded-2xl border border-white/10"
        >
          <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-cyan" /> Achievements
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {ACHIEVEMENTS.map((a) => (
              <div
                key={a.name}
                className={`p-3 rounded-xl border ${a.unlocked ? 'border-cyan-500/30 bg-cyan-500/5' : 'border-white/5 bg-white/[0.02] opacity-60'}`}
              >
                <span className="text-2xl">{a.icon}</span>
                <p className="text-sm font-medium text-white mt-1">{a.name}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
