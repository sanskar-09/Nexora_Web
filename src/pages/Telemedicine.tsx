import { useState } from 'react'
import { motion } from 'framer-motion'
import { Video, MessageCircle, FileText, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const MOCK_DOCTORS = [
  { id: '1', name: 'Dr. Sarah Chen', spec: 'General Practice', available: true, rating: 4.9 },
  { id: '2', name: 'Dr. James Wilson', spec: 'Cardiology', available: true, rating: 4.8 },
  { id: '3', name: 'Dr. Emily Ross', spec: 'Internal Medicine', available: false, rating: 4.9 },
]

const MOCK_PATIENTS = [
  { id: '1', name: 'John Doe', condition: 'Hypertension', lastVisit: '2 days ago' },
  { id: '2', name: 'Jane Smith', condition: 'Type 2 Diabetes', lastVisit: '1 week ago' },
  { id: '3', name: 'Mike Johnson', condition: 'Cardiac follow-up', lastVisit: '3 days ago' },
]

export default function Telemedicine() {
  const [view, setView] = useState<'list' | 'video' | 'chat'>('list')
  const [, setSelected] = useState<string | null>(null)
  const { isDoctor } = useAuth()

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-8"
      >
        <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
          <Video className="w-6 h-6 text-cyan" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Telemedicine Hub</h1>
          <p className="text-zinc-400">
            {isDoctor ? 'Video & chat with your patients. Digital prescriptions & adherence monitoring.' : 'Video & chat with certified doctors. Digital prescriptions & adherence monitoring.'}
          </p>
        </div>
      </motion.div>

      <div className="flex gap-2 mb-8">
        {[
          { id: 'list', label: isDoctor ? 'My patients' : 'Find doctor', icon: User },
          { id: 'video', label: 'Video call', icon: Video },
          { id: 'chat', label: 'Chat', icon: MessageCircle },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setView(t.id as typeof view)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition ${
              view === t.id ? 'border-cyan-500 bg-cyan-500/10 text-cyan' : 'border-white/10 bg-white/5 text-zinc-400 hover:border-white/20'
            }`}
          >
            <t.icon className="w-5 h-5" /> {t.label}
          </button>
        ))}
      </div>

      {view === 'list' && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {isDoctor ? (
            MOCK_PATIENTS.map((patient) => (
              <div
                key={patient.id}
                className="glass-panel p-5 rounded-xl border border-white/10 hover:border-cyan-500/30 transition cursor-pointer"
                onClick={() => setSelected(patient.id)}
              >
                <div className="w-14 h-14 rounded-full bg-cyan-500/20 flex items-center justify-center mb-3">
                  <User className="w-7 h-7 text-cyan" />
                </div>
                <h3 className="font-semibold text-white">{patient.name}</h3>
                <p className="text-zinc-500 text-sm">{patient.condition}</p>
                <p className="text-zinc-600 text-xs mt-1">Last visit: {patient.lastVisit}</p>
                <button className="w-full mt-4 py-2 rounded-lg bg-cyan-500/20 text-cyan border border-cyan-500/30 hover:bg-cyan-500/30 text-sm font-medium transition">
                  Start consultation
                </button>
              </div>
            ))
          ) : (
            MOCK_DOCTORS.map((doc) => (
              <div
                key={doc.id}
                className="glass-panel p-5 rounded-xl border border-white/10 hover:border-cyan-500/30 transition cursor-pointer"
                onClick={() => setSelected(doc.id)}
              >
                <div className="w-14 h-14 rounded-full bg-cyan-500/20 flex items-center justify-center mb-3">
                  <User className="w-7 h-7 text-cyan" />
                </div>
                <h3 className="font-semibold text-white">{doc.name}</h3>
                <p className="text-zinc-500 text-sm">{doc.spec}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-amber-400 text-sm">★ {doc.rating}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${doc.available ? 'bg-green-500/20 text-green-400' : 'bg-zinc-500/20 text-zinc-400'}`}>
                    {doc.available ? 'Available' : 'Busy'}
                  </span>
                </div>
                <button className="w-full mt-4 py-2 rounded-lg bg-cyan-500/20 text-cyan border border-cyan-500/30 hover:bg-cyan-500/30 text-sm font-medium transition">
                  Start consultation
                </button>
              </div>
            ))
          )}
        </motion.div>
      )}

      {(view === 'video' || view === 'chat') && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-panel rounded-2xl border border-white/10 overflow-hidden aspect-video flex flex-col items-center justify-center p-8 text-center"
        >
          <div className="w-20 h-20 rounded-full bg-cyan-500/20 flex items-center justify-center mb-4">
            {view === 'video' ? <Video className="w-10 h-10 text-cyan" /> : <MessageCircle className="w-10 h-10 text-cyan" />}
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            {view === 'video' ? 'Video consultation' : isDoctor ? 'Chat with patient' : 'Chat with doctor'}
          </h3>
          <p className="text-zinc-400 text-sm mb-6 max-w-md">
            {isDoctor
              ? `Select a patient from the list to start a ${view === 'video' ? 'video call' : 'chat'}.`
              : `Select a doctor from the list to start a ${view === 'video' ? 'video call' : 'chat'}. Prescriptions can be shared digitally.`}
          </p>
          <button onClick={() => setView('list')} className="px-6 py-3 rounded-xl bg-cyan-500/20 text-cyan border border-cyan-500/30 hover:bg-cyan-500/30">
            {isDoctor ? 'Choose patient' : 'Choose doctor'}
          </button>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 glass-panel p-5 rounded-xl border border-white/10 flex items-center gap-4"
      >
        <FileText className="w-10 h-10 text-cyan" />
        <div>
          <p className="font-medium text-white">Digital prescriptions</p>
          <p className="text-zinc-500 text-sm">
            {isDoctor ? 'Share prescriptions digitally and monitor patient adherence from your dashboard.' : 'Doctors can share prescriptions digitally and monitor your adherence from their dashboard.'}
          </p>
        </div>
      </motion.div>
    </div>
  )
}
