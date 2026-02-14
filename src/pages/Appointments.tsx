import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, Video, Plus } from 'lucide-react'

const MOCK_APPOINTMENTS = [
  { id: '1', doctor: 'Dr. Sarah Chen', date: '2025-02-18', time: '10:00 AM', type: 'Video', status: 'upcoming' },
  { id: '2', doctor: 'Dr. James Wilson', date: '2025-02-15', time: '2:30 PM', type: 'In-person', status: 'completed' },
  { id: '3', doctor: 'Dr. Emily Ross', date: '2025-02-25', time: '9:00 AM', type: 'Video', status: 'upcoming' },
]

export default function Appointments() {
  const [showBook, setShowBook] = useState(false)

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 mb-8"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
            <Calendar className="w-6 h-6 text-cyan" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Appointment Scheduling</h1>
            <p className="text-zinc-400">Book, reschedule, or cancel. Automated queues & reminders for doctors.</p>
          </div>
        </div>
        <button
          onClick={() => setShowBook(true)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500/20 text-cyan border border-cyan-500/30 hover:bg-cyan-500/30 transition"
        >
          <Plus className="w-5 h-5" /> Book appointment
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-2xl border border-white/10 overflow-hidden"
      >
        <div className="p-4 border-b border-white/10 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-cyan" />
          <h2 className="font-semibold text-white">Your appointments</h2>
        </div>
        <div className="divide-y divide-white/5">
          {MOCK_APPOINTMENTS.map((a) => (
            <div key={a.id} className="p-5 flex flex-wrap items-center justify-between gap-4 hover:bg-white/[0.02] transition">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                  <User className="w-6 h-6 text-cyan" />
                </div>
                <div>
                  <p className="font-medium text-white">{a.doctor}</p>
                  <p className="text-zinc-500 text-sm flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> {a.date} • <Clock className="w-4 h-4 inline" /> {a.time}
                  </p>
                  <p className="text-zinc-600 text-xs flex items-center gap-1 mt-1">
                    <Video className="w-3.5 h-3.5" /> {a.type}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs ${
                  a.status === 'upcoming' ? 'bg-cyan-500/20 text-cyan' : 'bg-zinc-500/20 text-zinc-400'
                }`}>
                  {a.status}
                </span>
                {a.status === 'upcoming' && (
                  <>
                    <button className="px-4 py-2 rounded-lg border border-white/10 text-zinc-400 hover:text-cyan hover:border-cyan-500/30 text-sm">Reschedule</button>
                    <button className="px-4 py-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 text-sm">Cancel</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {showBook && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
          onClick={() => setShowBook(false)}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-panel p-6 rounded-2xl max-w-md w-full border border-white/10"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Book appointment</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Doctor</label>
                <select className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-cyan-500/50 outline-none">
                  <option>Dr. Sarah Chen - General</option>
                  <option>Dr. James Wilson - Cardiology</option>
                  <option>Dr. Emily Ross - Internal Medicine</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Date</label>
                <input type="date" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-cyan-500/50 outline-none" />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Time</label>
                <select className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-cyan-500/50 outline-none">
                  <option>9:00 AM</option>
                  <option>10:00 AM</option>
                  <option>11:00 AM</option>
                  <option>2:00 PM</option>
                  <option>3:00 PM</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Type</label>
                <select className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-cyan-500/50 outline-none">
                  <option>Video call</option>
                  <option>In-person</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowBook(false)} className="flex-1 py-3 rounded-xl border border-white/10 text-zinc-400">Cancel</button>
              <button className="flex-1 py-3 rounded-xl bg-cyan-500 text-black font-semibold">Book</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
