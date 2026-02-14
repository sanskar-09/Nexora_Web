import { useState } from 'react'
import { motion } from 'framer-motion'
import { Watch, Heart, Droplets, Activity, AlertTriangle, Plus } from 'lucide-react'

const MOCK_DEVICES = [
  { id: '1', name: 'Apple Watch Series 9', type: 'watch', connected: true, lastSync: '2 min ago' },
  { id: '2', name: 'Omron BP Monitor', type: 'bp', connected: true, lastSync: '1 hour ago' },
  { id: '3', name: 'Accu-Chek Glucometer', type: 'glucose', connected: false, lastSync: 'Yesterday' },
]

const MOCK_ALERTS = [
  { id: '1', message: 'Resting heart rate slightly elevated (78 bpm). Within normal range.', severity: 'low', time: 'Today 9:42' },
  { id: '2', message: 'BP reading 132/84 – consider logging with doctor at next visit.', severity: 'medium', time: 'Yesterday' },
]

export default function Devices() {
  const [showAdd, setShowAdd] = useState(false)

  const iconFor = (type: string) => {
    if (type === 'watch') return Watch
    if (type === 'bp') return Heart
    return Droplets
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 mb-8"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
            <Activity className="w-6 h-6 text-cyan" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Device & Wearable Integration</h1>
            <p className="text-zinc-400">Sync smartwatches, BP monitors, glucometers. AI trend analysis & anomaly alerts.</p>
          </div>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500/20 text-cyan border border-cyan-500/30 hover:bg-cyan-500/30 transition"
        >
          <Plus className="w-5 h-5" /> Add device
        </button>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {MOCK_DEVICES.map((d) => {
          const Icon = iconFor(d.type)
          return (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className={`glass-panel p-5 rounded-xl border ${d.connected ? 'border-cyan-500/20' : 'border-white/10'}`}
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-cyan" />
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${d.connected ? 'bg-green-500/20 text-green-400' : 'bg-zinc-500/20 text-zinc-400'}`}>
                  {d.connected ? 'Connected' : 'Offline'}
                </span>
              </div>
              <h3 className="font-medium text-white mt-3">{d.name}</h3>
              <p className="text-zinc-500 text-sm">Last sync: {d.lastSync}</p>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-panel rounded-2xl border border-white/10 overflow-hidden"
      >
        <div className="p-4 border-b border-white/10 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          <h2 className="font-semibold text-white">AI trend alerts</h2>
        </div>
        <div className="divide-y divide-white/5">
          {MOCK_ALERTS.map((a) => (
            <div key={a.id} className="p-5 flex gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                a.severity === 'medium' ? 'bg-amber-500/20' : 'bg-cyan-500/20'
              }`}>
                <AlertTriangle className={`w-5 h-5 ${a.severity === 'medium' ? 'text-amber-400' : 'text-cyan'}`} />
              </div>
              <div>
                <p className="text-zinc-300 text-sm">{a.message}</p>
                <p className="text-zinc-500 text-xs mt-1">{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {showAdd && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
          onClick={() => setShowAdd(false)}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-panel p-6 rounded-2xl max-w-md w-full border border-white/10"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Add device</h3>
            <p className="text-zinc-400 text-sm mb-4">Pair a wearable or monitor. We support Apple Health, Google Fit, and many devices.</p>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-4 rounded-xl border border-white/10 hover:border-cyan-500/30 text-left transition">
                <Watch className="w-8 h-8 text-cyan" /> Smartwatch
              </button>
              <button className="w-full flex items-center gap-3 p-4 rounded-xl border border-white/10 hover:border-cyan-500/30 text-left transition">
                <Heart className="w-8 h-8 text-cyan" /> Blood pressure monitor
              </button>
              <button className="w-full flex items-center gap-3 p-4 rounded-xl border border-white/10 hover:border-cyan-500/30 text-left transition">
                <Droplets className="w-8 h-8 text-cyan" /> Glucometer
              </button>
            </div>
            <button onClick={() => setShowAdd(false)} className="w-full mt-4 py-3 rounded-xl border border-white/10 text-zinc-400">Cancel</button>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
