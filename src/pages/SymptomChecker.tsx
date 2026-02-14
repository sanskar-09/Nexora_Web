import { useState } from 'react'
import { motion } from 'framer-motion'
import { Activity, AlertCircle, CheckCircle, Stethoscope } from 'lucide-react'

const MOCK_RESULT = {
  analysis: 'Based on your symptoms (headache, fatigue, mild fever), our AI suggests possible causes: tension headache, viral infection, or dehydration.',
  risk: 'low',
  recommendation: 'self_care',
  suggestions: [
    'Rest and stay hydrated. Drink plenty of water.',
    'Over-the-counter pain relief (e.g. acetaminophen) may help.',
    'If symptoms persist beyond 48 hours or worsen, see a doctor.',
  ],
}

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState('')
  const [duration, setDuration] = useState('')
  const [result, setResult] = useState<typeof MOCK_RESULT | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setResult(MOCK_RESULT)
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-8"
      >
        <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
          <Activity className="w-6 h-6 text-cyan" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">AI Symptom Checker</h1>
          <p className="text-zinc-400">Enter your symptoms for instant AI-driven analysis and risk prediction.</p>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-panel p-6 rounded-2xl border border-white/10"
        >
          <h2 className="text-lg font-semibold text-white mb-4">Describe your symptoms</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Symptoms (e.g. headache, fever, cough)</label>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:border-cyan-500/50 outline-none transition resize-none"
                placeholder="Describe what you're feeling..."
                required
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-2">How long? (e.g. 2 days)</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:border-cyan-500/50 outline-none transition"
                placeholder="Duration"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 text-black font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>Analyzing...</>
              ) : (
                <>
                  <Stethoscope className="w-5 h-5" /> Get AI Analysis
                </>
              )}
            </button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-panel p-6 rounded-2xl border border-white/10 min-h-[320px]"
        >
          <h2 className="text-lg font-semibold text-white mb-4">Analysis & recommendation</h2>
          {!result ? (
            <div className="flex flex-col items-center justify-center h-64 text-zinc-500">
              <Activity className="w-12 h-12 mb-4 opacity-50" />
              <p>Enter symptoms and click &quot;Get AI Analysis&quot; to see results.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-zinc-300 text-sm leading-relaxed">{result.analysis}</p>
              <div className="flex gap-2">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                  result.risk === 'low' ? 'bg-green-500/20 text-green-400' : result.risk === 'medium' ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  Risk: {result.risk}
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan">
                  {result.recommendation === 'self_care' ? <CheckCircle className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                  {result.recommendation === 'self_care' ? 'Self-care suggested' : 'See a doctor'}
                </span>
              </div>
              <ul className="space-y-2">
                {result.suggestions.map((s, i) => (
                  <li key={i} className="flex gap-2 text-sm text-zinc-400">
                    <span className="text-cyan">•</span> {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
