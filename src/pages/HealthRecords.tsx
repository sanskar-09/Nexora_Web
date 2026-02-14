import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Search, Download, FileCheck } from 'lucide-react'

const MOCK_RECORDS = [
  { id: '1', name: 'Lab results - CBC', date: '2025-02-10', type: 'Lab report' },
  { id: '2', name: 'Prescription - Lisinopril', date: '2025-01-15', type: 'Prescription' },
  { id: '3', name: 'Annual physical summary', date: '2024-12-01', type: 'Summary' },
  { id: '4', name: 'X-Ray - Chest', date: '2024-11-20', type: 'Imaging' },
]

export default function HealthRecords() {
  const [search, setSearch] = useState('')

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-8"
      >
        <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
          <FileText className="w-6 h-6 text-cyan" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Virtual Health Records</h1>
          <p className="text-zinc-400">Securely store records, lab reports, prescriptions. AI-assisted document search for doctors.</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-4 rounded-xl border border-white/10 mb-6 flex items-center gap-3"
      >
        <Search className="w-5 h-5 text-zinc-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search records (AI-assisted)..."
          className="flex-1 bg-transparent text-white placeholder-zinc-500 outline-none"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-panel rounded-2xl border border-white/10 overflow-hidden"
      >
        <div className="p-4 border-b border-white/10 flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-cyan" />
          <h2 className="font-semibold text-white">Your records</h2>
        </div>
        <div className="divide-y divide-white/5">
          {MOCK_RECORDS.filter((r) => !search || r.name.toLowerCase().includes(search.toLowerCase())).map((r) => (
            <div key={r.id} className="p-5 flex flex-wrap items-center justify-between gap-4 hover:bg-white/[0.02] transition">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-cyan" />
                </div>
                <div>
                  <p className="font-medium text-white">{r.name}</p>
                  <p className="text-zinc-500 text-sm">{r.type} • {r.date}</p>
                </div>
              </div>
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-zinc-400 hover:text-cyan hover:border-cyan-500/30 text-sm transition">
                <Download className="w-4 h-4" /> Export
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
