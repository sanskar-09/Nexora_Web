import { motion } from 'framer-motion'
import { TrendingUp, Heart, AlertTriangle, Activity } from 'lucide-react'

const MOCK_PREDICTIONS = [
  { condition: 'Cardiovascular risk', risk: 'low', trend: 'stable', value: 12, unit: '%', description: 'Based on BP, cholesterol, and activity.' },
  { condition: 'Type 2 diabetes', risk: 'moderate', trend: 'improving', value: 18, unit: '%', description: 'Lifestyle and glucose trends.' },
  { condition: 'Hypertension', risk: 'elevated', trend: 'monitor', value: 28, unit: '%', description: 'Recent BP readings above target.' },
]

export default function Predictions() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-8"
      >
        <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-cyan" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">AI-Powered Health Predictions</h1>
          <p className="text-zinc-400">Predict future risks from history and vitals. Animated trends for early intervention.</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-8 rounded-2xl border border-cyan-500/20 mb-8"
      >
        <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-cyan" /> Risk overview (next 5 years)
        </h2>
        <div className="h-48 flex items-end gap-3">
          {MOCK_PREDICTIONS.map((p, i) => (
            <motion.div
              key={p.condition}
              initial={{ height: 0 }}
              animate={{ height: `${Math.min(p.value * 2.2, 100)}%` }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
              className="flex-1 rounded-t-lg bg-gradient-to-t from-cyan-500/40 to-cyan-500/20 flex flex-col justify-end p-2"
            >
              <span className="text-cyan font-bold text-sm">{p.value}{p.unit}</span>
              <span className="text-zinc-500 text-xs truncate" title={p.condition}>{p.condition.split(' ')[0]}</span>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-zinc-500">
          {MOCK_PREDICTIONS.map((p) => (
            <span key={p.condition}>{p.condition}</span>
          ))}
        </div>
      </motion.div>

      <div className="space-y-4">
        {MOCK_PREDICTIONS.map((p, i) => (
          <motion.div
            key={p.condition}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="glass-panel p-6 rounded-xl border border-white/10 flex flex-wrap items-center gap-6"
          >
            <div className="w-14 h-14 rounded-xl bg-cyan-500/20 flex items-center justify-center shrink-0">
              <Heart className="w-7 h-7 text-cyan" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white">{p.condition}</h3>
              <p className="text-zinc-500 text-sm">{p.description}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-cyan">{p.value}{p.unit}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                p.risk === 'low' ? 'bg-green-500/20 text-green-400' : p.risk === 'moderate' ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'
              }`}>
                {p.risk}
              </span>
              <span className="text-zinc-500 text-sm">{p.trend}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 glass-panel p-5 rounded-xl border border-amber-500/20 flex items-center gap-4"
      >
        <AlertTriangle className="w-10 h-10 text-amber-400 shrink-0" />
        <div>
          <p className="font-medium text-white">Preventative care</p>
          <p className="text-zinc-500 text-sm">These predictions help you and your doctor plan early interventions. Share reports at your next visit.</p>
        </div>
      </motion.div>
    </div>
  )
}
