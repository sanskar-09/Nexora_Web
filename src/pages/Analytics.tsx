import { motion } from 'framer-motion'
import { BarChart3, Download, FileText, TrendingUp } from 'lucide-react'

const MOCK_SUMMARY = [
  { label: 'Avg. heart rate (30d)', value: '72 bpm', trend: 'stable' },
  { label: 'Avg. BP (30d)', value: '120/78', trend: 'improving' },
  { label: 'Medication adherence', value: '94%', trend: 'good' },
  { label: 'Active days', value: '24/30', trend: 'good' },
]

export default function Analytics() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 mb-8"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-cyan" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Health Analytics & Reports</h1>
            <p className="text-zinc-400">Summarized analytics for you and doctors. Export for consultations or insurance.</p>
          </div>
        </div>
        <button className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500/20 text-cyan border border-cyan-500/30 hover:bg-cyan-500/30 transition">
          <Download className="w-5 h-5" /> Export report
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 rounded-2xl border border-white/10 mb-8"
      >
        <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-cyan" /> Summary (last 30 days)
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MOCK_SUMMARY.map((s) => (
            <div key={s.label} className="p-4 rounded-xl border border-white/10">
              <p className="text-zinc-500 text-sm">{s.label}</p>
              <p className="text-xl font-semibold text-white mt-1">{s.value}</p>
              <p className="text-cyan text-xs mt-1">{s.trend}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-panel p-6 rounded-2xl border border-white/10"
      >
        <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-cyan" /> Vitals trend
        </h2>
        <div className="h-56 flex items-end gap-2">
          {[70, 72, 71, 73, 72, 71, 72, 70, 72, 71, 72, 73].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${(h / 80) * 100}%` }}
              transition={{ delay: 0.2 + i * 0.03, duration: 0.4 }}
              className="flex-1 rounded-t bg-cyan-500/30 min-h-[4px]"
            />
          ))}
        </div>
        <p className="text-zinc-500 text-sm mt-2 text-center">Heart rate (bpm) over last 12 readings</p>
      </motion.div>
    </div>
  )
}
