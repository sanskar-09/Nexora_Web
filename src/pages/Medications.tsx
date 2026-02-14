import { useState } from 'react'
import { motion } from 'framer-motion'
import { Pill, Plus, Bell, History, TrendingUp, Clock, Stethoscope } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

type Med = {
  id: string
  name: string
  dose: string
  frequency: string
  timePeriod: string
  typeOfMedicine: string
  forDisease: string
  nextRefill: string | null
  adherence: number
}

const MOCK_MEDS: Med[] = [
  { id: '1', name: 'Lisinopril', dose: '10mg', frequency: 'Once daily', timePeriod: '6 months', typeOfMedicine: 'Tablet', forDisease: 'Hypertension', nextRefill: '2025-03-01', adherence: 94 },
  { id: '2', name: 'Metformin', dose: '500mg', frequency: 'Twice daily', timePeriod: '3 months', typeOfMedicine: 'Tablet', forDisease: 'Type 2 Diabetes', nextRefill: '2025-02-20', adherence: 88 },
  { id: '3', name: 'Vitamin D3', dose: '2000 IU', frequency: 'Once daily', timePeriod: 'Ongoing', typeOfMedicine: 'Capsule', forDisease: 'Vitamin D deficiency', nextRefill: null, adherence: 100 },
]

export default function Medications() {
  const [showAdd, setShowAdd] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const { isDoctor } = useAuth()

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 mb-8"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
            <Pill className="w-6 h-6 text-cyan" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Medication Management</h1>
            <p className="text-zinc-400">
              {isDoctor ? 'Manage patient medications. Add and edit prescriptions.' : 'View your medications, time period, type, and prescribed for.'}
            </p>
          </div>
        </div>
        {isDoctor && (
          <button
            onClick={() => setShowAdd(true)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500/20 text-cyan border border-cyan-500/30 hover:bg-cyan-500/30 transition"
          >
            <Plus className="w-5 h-5" /> Add medication
          </button>
        )}
      </motion.div>

      {!isDoctor && (
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {[
            { label: 'Smart notifications', icon: Bell, value: 'On' },
            { label: 'Refill reminders', icon: Bell, value: '3 upcoming' },
            { label: 'Adherence (30d)', icon: TrendingUp, value: '94%' },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-panel p-5 rounded-xl border border-white/10"
            >
              <s.icon className="w-8 h-8 text-cyan mb-2" />
              <p className="text-zinc-400 text-sm">{s.label}</p>
              <p className="text-white font-semibold">{s.value}</p>
            </motion.div>
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-panel rounded-2xl border border-white/10 overflow-hidden"
      >
        <div className="p-4 border-b border-white/10 flex items-center gap-2">
          <History className="w-5 h-5 text-cyan" />
          <h2 className="font-semibold text-white">{isDoctor ? 'Medications (manage)' : 'Your medications'}</h2>
        </div>
        <div className="divide-y divide-white/5">
          {MOCK_MEDS.map((med) => (
            <div key={med.id} className="p-5 flex flex-wrap items-start justify-between gap-4 hover:bg-white/[0.02] transition">
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center shrink-0">
                  <Pill className="w-5 h-5 text-cyan" />
                </div>
                <div>
                  <p className="font-medium text-white">{med.name}</p>
                  <p className="text-zinc-500 text-sm">{med.dose} • {med.frequency}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-zinc-400">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-4 h-4 text-cyan/80" /> {med.timePeriod}
                    </span>
                    <span>{med.typeOfMedicine}</span>
                    <span className="inline-flex items-center gap-1">
                      <Stethoscope className="w-4 h-4 text-cyan/80" /> {med.forDisease}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                {!isDoctor && (
                  <>
                    <div className="text-right">
                      <p className="text-xs text-zinc-500">Adherence</p>
                      <p className="text-cyan font-medium">{med.adherence}%</p>
                    </div>
                    {med.nextRefill && (
                      <div className="text-right">
                        <p className="text-xs text-zinc-500">Refill by</p>
                        <p className="text-amber-400 text-sm">{med.nextRefill}</p>
                      </div>
                    )}
                  </>
                )}
                {isDoctor && (
                  <button
                    onClick={() => setEditingId(editingId === med.id ? null : med.id)}
                    className="px-4 py-2 rounded-lg border border-white/10 text-zinc-400 hover:text-cyan hover:border-cyan-500/30 text-sm transition"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {showAdd && isDoctor && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
          onClick={() => setShowAdd(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-panel p-6 rounded-2xl max-w-md w-full border border-white/10"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Add medication</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Medication name" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 outline-none focus:border-cyan-500/50" />
              <input type="text" placeholder="Dose (e.g. 10mg)" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 outline-none focus:border-cyan-500/50" />
              <input type="text" placeholder="Frequency (e.g. Once daily)" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 outline-none focus:border-cyan-500/50" />
              <input type="text" placeholder="Time period (e.g. 3 months, Ongoing)" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 outline-none focus:border-cyan-500/50" />
              <input type="text" placeholder="Type (e.g. Tablet, Capsule, Injection)" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 outline-none focus:border-cyan-500/50" />
              <input type="text" placeholder="For disease / condition" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 outline-none focus:border-cyan-500/50" />
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowAdd(false)} className="flex-1 py-3 rounded-xl border border-white/10 text-zinc-400 hover:bg-white/5">Cancel</button>
              <button className="flex-1 py-3 rounded-xl bg-cyan-500 text-black font-semibold">Add</button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {editingId && isDoctor && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
          onClick={() => setEditingId(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-panel p-6 rounded-2xl max-w-md w-full border border-white/10"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Edit medication</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Medication name" defaultValue={MOCK_MEDS.find((m) => m.id === editingId)?.name} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 outline-none focus:border-cyan-500/50" />
              <input type="text" placeholder="Dose" defaultValue={MOCK_MEDS.find((m) => m.id === editingId)?.dose} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 outline-none focus:border-cyan-500/50" />
              <input type="text" placeholder="Frequency" defaultValue={MOCK_MEDS.find((m) => m.id === editingId)?.frequency} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 outline-none focus:border-cyan-500/50" />
              <input type="text" placeholder="Time period" defaultValue={MOCK_MEDS.find((m) => m.id === editingId)?.timePeriod} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 outline-none focus:border-cyan-500/50" />
              <input type="text" placeholder="Type of medicine" defaultValue={MOCK_MEDS.find((m) => m.id === editingId)?.typeOfMedicine} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 outline-none focus:border-cyan-500/50" />
              <input type="text" placeholder="For disease" defaultValue={MOCK_MEDS.find((m) => m.id === editingId)?.forDisease} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 outline-none focus:border-cyan-500/50" />
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setEditingId(null)} className="flex-1 py-3 rounded-xl border border-white/10 text-zinc-400 hover:bg-white/5">Cancel</button>
              <button className="flex-1 py-3 rounded-xl bg-cyan-500 text-black font-semibold">Save</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
