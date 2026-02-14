import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, MessageCircle, BookOpen, Heart } from 'lucide-react'
import { sanitizeForDisplay } from '../utils/security'

const MOCK_FORUMS = [
  { id: '1', title: 'Living with Type 2 Diabetes', posts: 234, category: 'Diabetes' },
  { id: '2', title: 'Hypertension management tips', posts: 189, category: 'Cardiac' },
  { id: '3', title: 'Mental wellness & chronic conditions', posts: 156, category: 'Wellness' },
]

const MOCK_POSTS = [
  { id: '1', author: 'Sarah M.', content: 'What has helped you most with morning glucose readings?', time: '2 hours ago', replies: 12 },
  { id: '2', author: 'John D.', content: 'Recommendations for BP monitors that sync with apps?', time: '5 hours ago', replies: 8 },
]

export default function Community() {
  const [tab, setTab] = useState<'forums' | 'education'>('forums')

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-8"
      >
        <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
          <Users className="w-6 h-6 text-cyan" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Community & Forums</h1>
          <p className="text-zinc-400">Connect with patients with similar conditions. Doctor-moderated Q&A and health awareness.</p>
        </div>
      </motion.div>

      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setTab('forums')}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition ${
            tab === 'forums' ? 'border-cyan-500 bg-cyan-500/10 text-cyan' : 'border-white/10 bg-white/5 text-zinc-400 hover:border-white/20'
          }`}
        >
          <MessageCircle className="w-5 h-5" /> Forums
        </button>
        <button
          onClick={() => setTab('education')}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition ${
            tab === 'education' ? 'border-cyan-500 bg-cyan-500/10 text-cyan' : 'border-white/10 bg-white/5 text-zinc-400 hover:border-white/20'
          }`}
        >
          <BookOpen className="w-5 h-5" /> Education
        </button>
      </div>

      {tab === 'forums' && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-3 gap-4 mb-8"
          >
            {MOCK_FORUMS.map((f) => (
              <div
                key={f.id}
                className="glass-panel p-5 rounded-xl border border-white/10 hover:border-cyan-500/30 transition cursor-pointer"
              >
                <Heart className="w-8 h-8 text-cyan mb-3" />
                <h3 className="font-semibold text-white">{f.title}</h3>
                <p className="text-zinc-500 text-sm">{f.category} • {f.posts} posts</p>
              </div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-panel rounded-2xl border border-white/10 overflow-hidden"
          >
            <div className="p-4 border-b border-white/10">
              <h2 className="font-semibold text-white">Recent discussions</h2>
            </div>
            <div className="divide-y divide-white/5">
              {MOCK_POSTS.map((p) => (
                <div key={p.id} className="p-5 hover:bg-white/[0.02] transition">
                  <p className="text-white font-medium">{sanitizeForDisplay(p.content)}</p>
                  <p className="text-zinc-500 text-sm mt-1">by {sanitizeForDisplay(p.author)} • {p.time} • {p.replies} replies</p>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}

      {tab === 'education' && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-8 rounded-2xl border border-white/10"
        >
          <BookOpen className="w-12 h-12 text-cyan mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Personalized health tips & articles</h2>
          <p className="text-zinc-400 text-sm mb-6">AI-generated recommendations based on your history. Videos and articles tailored to your conditions.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {['Understanding your BP numbers', 'Diet tips for diabetes', 'Exercise and heart health', 'Medication adherence'].map((t, i) => (
              <div key={i} className="p-4 rounded-xl border border-white/10 hover:border-cyan-500/30 transition cursor-pointer">
                <p className="font-medium text-white">{t}</p>
                <p className="text-zinc-500 text-xs mt-1">Recommended for you</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
