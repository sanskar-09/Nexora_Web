import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Stethoscope, User, Activity, AlertTriangle, FileText, Video, Plus, Pencil, UserMinus } from 'lucide-react'

const STORAGE_KEY = 'nexora_doctor_patients'

type Patient = {
  id: string
  name: string
  lastVisit: string
  alerts: number
  vitals: { hr: number; bp: string }
  condition: string
}

const DEFAULT_PATIENTS: Patient[] = [
  { id: '1', name: 'John Doe', lastVisit: '2 days ago', alerts: 1, vitals: { hr: 72, bp: '118/76' }, condition: 'Hypertension' },
  { id: '2', name: 'Jane Smith', lastVisit: '1 week ago', alerts: 0, vitals: { hr: 68, bp: '122/78' }, condition: 'Diabetes' },
  { id: '3', name: 'Mike Johnson', lastVisit: '3 days ago', alerts: 2, vitals: { hr: 85, bp: '135/88' }, condition: 'Cardiac follow-up' },
]

function loadPatients(): Patient[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_PATIENTS
    const parsed = JSON.parse(raw) as Patient[]
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_PATIENTS
  } catch {
    return DEFAULT_PATIENTS
  }
}

export default function DoctorDashboard() {
  const [patients, setPatients] = useState<Patient[]>(() => loadPatients())

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(patients))
    } catch {
      // ignore storage errors
    }
  }, [patients])
  const [selected, setSelected] = useState<string | null>(null)
  const [showAddPatient, setShowAddPatient] = useState(false)
  const [newName, setNewName] = useState('')
  const [newCondition, setNewCondition] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [editCondition, setEditCondition] = useState('')
  const [editLastVisit, setEditLastVisit] = useState('')
  const [editAlerts, setEditAlerts] = useState(0)
  const [editHr, setEditHr] = useState(0)
  const [editBp, setEditBp] = useState('')
  const [removingId, setRemovingId] = useState<string | null>(null)

  const patientCount = patients.length
  const activeAlerts = patients.reduce((sum, p) => sum + p.alerts, 0)
  const editingPatient = editingId ? patients.find((p) => p.id === editingId) : null

  const openEdit = (p: Patient) => {
    setEditingId(p.id)
    setEditName(p.name)
    setEditCondition(p.condition)
    setEditLastVisit(p.lastVisit)
    setEditAlerts(p.alerts)
    setEditHr(p.vitals.hr)
    setEditBp(p.vitals.bp)
  }

  const handleAddPatient = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newName.trim()) return
    const maxId = patients.reduce((m, p) => Math.max(m, parseInt(p.id, 10) || 0), 0)
    const id = String(maxId + 1)
    setPatients([
      ...patients,
      {
        id,
        name: newName.trim(),
        lastVisit: 'Just added',
        alerts: 0,
        vitals: { hr: 0, bp: '--/--' },
        condition: newCondition.trim() || 'General',
      },
    ])
    setNewName('')
    setNewCondition('')
    setShowAddPatient(false)
  }

  const handleEditPatient = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingId || !editName.trim()) return
    setPatients(
      patients.map((p) =>
        p.id === editingId
          ? {
              ...p,
              name: editName.trim(),
              condition: editCondition.trim() || 'General',
              lastVisit: editLastVisit.trim() || p.lastVisit,
              alerts: editAlerts,
              vitals: { hr: editHr, bp: editBp.trim() || '--/--' },
            }
          : p
      )
    )
    setEditingId(null)
  }

  const handleRemovePatient = (id: string) => {
    setPatients(patients.filter((p) => p.id !== id))
    setRemovingId(null)
    setSelected((s) => (s === id ? null : s))
  }

  const removingPatient = removingId ? patients.find((p) => p.id === removingId) : null

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 mb-8"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
            <Stethoscope className="w-6 h-6 text-cyan" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Doctor Dashboard</h1>
            <p className="text-zinc-400">View all patients, histories, alerts, and vitals. Add patients and manage care.</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddPatient(true)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500/20 text-cyan border border-cyan-500/30 hover:bg-cyan-500/30 transition"
        >
          <Plus className="w-5 h-5" /> Add patient
        </button>
      </motion.div>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total patients', value: String(patientCount), icon: User },
          { label: 'Active alerts', value: String(activeAlerts), icon: AlertTriangle },
          { label: 'Today appointments', value: '8', icon: Activity },
          { label: 'Pending prescriptions', value: '5', icon: FileText },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-panel p-5 rounded-xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-transparent"
          >
            <s.icon className="w-8 h-8 text-cyan mb-2" />
            <p className="text-zinc-400 text-sm">{s.label}</p>
            <p className="text-2xl font-bold text-white">{s.value}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-panel rounded-2xl border border-white/10 overflow-hidden"
      >
        <div className="p-4 border-b border-white/10 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-cyan" />
            <h2 className="font-semibold text-white">Patients</h2>
            <span className="text-zinc-500 text-sm">({patientCount} added)</span>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {patients.map((p) => (
            <motion.div
              key={p.id}
              whileHover={{ scale: 1.02 }}
              className={`glass-panel p-5 rounded-xl border cursor-pointer transition ${
                selected === p.id ? 'border-cyan-500/50 shadow-[0_0_24px_rgba(0,212,255,0.15)]' : 'border-white/10 hover:border-cyan-500/30'
              }`}
              onClick={() => setSelected(selected === p.id ? null : p.id)}
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <User className="w-6 h-6 text-cyan" />
                </div>
                {p.alerts > 0 && (
                  <span className="flex items-center gap-1 text-amber-400 text-xs">
                    <AlertTriangle className="w-4 h-4" /> {p.alerts}
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-white mt-3">{p.name}</h3>
              <p className="text-zinc-500 text-sm">{p.condition}</p>
              <div className="flex gap-4 mt-3 text-sm">
                <span className="text-zinc-400">HR: <span className="text-cyan">{p.vitals.hr || '--'}</span></span>
                <span className="text-zinc-400">BP: <span className="text-cyan">{p.vitals.bp}</span></span>
              </div>
              <p className="text-zinc-600 text-xs mt-2">Last visit: {p.lastVisit}</p>
              <div className="flex gap-2 mt-4">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); openEdit(p); }}
                  className="flex-1 py-2 rounded-lg bg-cyan-500/20 text-cyan border border-cyan-500/30 text-sm font-medium hover:bg-cyan-500/30 transition inline-flex items-center justify-center gap-1"
                >
                  <Pencil className="w-4 h-4" /> Edit
                </button>
                <button type="button" className="p-2 rounded-lg border border-white/10 text-zinc-400 hover:text-cyan hover:border-cyan-500/30 transition" title="Video call">
                  <Video className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setRemovingId(p.id); }}
                  className="p-2 rounded-lg border border-white/10 text-zinc-400 hover:text-red-400 hover:border-red-500/30 transition"
                  title="Remove patient"
                >
                  <UserMinus className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {showAddPatient && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
          onClick={() => setShowAddPatient(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-panel p-6 rounded-2xl max-w-md w-full border border-white/10"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Add patient</h3>
            <form onSubmit={handleAddPatient} className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Patient name</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Full name"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 outline-none focus:border-cyan-500/50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Condition (optional)</label>
                <input
                  type="text"
                  value={newCondition}
                  onChange={(e) => setNewCondition(e.target.value)}
                  placeholder="e.g. Hypertension, Diabetes"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 outline-none focus:border-cyan-500/50"
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setShowAddPatient(false)} className="flex-1 py-3 rounded-xl border border-white/10 text-zinc-400 hover:bg-white/5">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-3 rounded-xl bg-cyan-500 text-black font-semibold">
                  Add patient
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {removingId && removingPatient && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
          onClick={() => setRemovingId(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-panel p-6 rounded-2xl max-w-sm w-full border border-white/10"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                <UserMinus className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Remove patient</h3>
            </div>
            <p className="text-zinc-400 text-sm mb-6">
              Remove <span className="text-white font-medium">{removingPatient.name}</span> from your patient list? They will no longer appear here.
            </p>
            <div className="flex gap-3">
              <button type="button" onClick={() => setRemovingId(null)} className="flex-1 py-3 rounded-xl border border-white/10 text-zinc-400 hover:bg-white/5">
                Cancel
              </button>
              <button type="button" onClick={() => handleRemovePatient(removingId)} className="flex-1 py-3 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 font-medium">
                Remove
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {editingId && editingPatient && (
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
            className="glass-panel p-6 rounded-2xl max-w-md w-full border border-white/10 max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Edit patient</h3>
            <form onSubmit={handleEditPatient} className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Patient name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Full name"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 outline-none focus:border-cyan-500/50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Condition</label>
                <input
                  type="text"
                  value={editCondition}
                  onChange={(e) => setEditCondition(e.target.value)}
                  placeholder="e.g. Hypertension, Diabetes"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 outline-none focus:border-cyan-500/50"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Last visit</label>
                <input
                  type="text"
                  value={editLastVisit}
                  onChange={(e) => setEditLastVisit(e.target.value)}
                  placeholder="e.g. 2 days ago, 1 week ago"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 outline-none focus:border-cyan-500/50"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Alerts count</label>
                <input
                  type="number"
                  min={0}
                  value={editAlerts}
                  onChange={(e) => setEditAlerts(Number(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 outline-none focus:border-cyan-500/50"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Heart rate (bpm)</label>
                  <input
                    type="number"
                    min={0}
                    value={editHr || ''}
                    onChange={(e) => setEditHr(Number(e.target.value) || 0)}
                    placeholder="--"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 outline-none focus:border-cyan-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Blood pressure</label>
                  <input
                    type="text"
                    value={editBp}
                    onChange={(e) => setEditBp(e.target.value)}
                    placeholder="e.g. 118/76"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 outline-none focus:border-cyan-500/50"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setEditingId(null)} className="flex-1 py-3 rounded-xl border border-white/10 text-zinc-400 hover:bg-white/5">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-3 rounded-xl bg-cyan-500 text-black font-semibold">
                  Save changes
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
