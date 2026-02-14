import { motion } from 'framer-motion'
import { Apple, Dumbbell, TrendingUp, Flame } from 'lucide-react'

const MOCK_TIPS = [
  { day: 'Today', tip: 'Aim for 7,500 steps. You\'re at 4,230 – a short walk after dinner will help.', progress: 56 },
  { day: 'Tomorrow', tip: 'Add a serving of leafy greens to lunch. Try spinach or kale in a salad.', progress: 0 },
]

const MOCK_PLAN = [
  { day: 'Mon', exercise: '30 min walk', nutrition: 'Balanced plate' },
  { day: 'Tue', exercise: 'Strength 20 min', nutrition: 'High protein' },
  { day: 'Wed', exercise: 'Rest / stretch', nutrition: 'Fiber focus' },
  { day: 'Thu', exercise: '30 min walk', nutrition: 'Low sodium' },
  { day: 'Fri', exercise: 'Strength 20 min', nutrition: 'Balanced' },
  { day: 'Sat', exercise: '45 min active', nutrition: 'Flexible' },
  { day: 'Sun', exercise: 'Rest', nutrition: 'Meal prep' },
]

export default function DietExercise() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-8"
      >
        <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
          <Apple className="w-6 h-6 text-cyan" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">AI Diet & Exercise Plans</h1>
          <p className="text-zinc-400">Personalized fitness and nutrition from your health data. Interactive progress tracking.</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 rounded-2xl border border-cyan-500/20 mb-8 bg-gradient-to-br from-cyan-500/5 to-transparent"
      >
        <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
          <Flame className="w-5 h-5 text-cyan" /> Daily tip (personalized)
        </h2>
        <div className="space-y-4">
          {MOCK_TIPS.map((t, i) => (
            <div key={t.day} className="p-4 rounded-xl border border-white/10">
              <p className="text-zinc-400 text-sm mb-1">{t.day}</p>
              <p className="text-white">{t.tip}</p>
              {t.progress > 0 && (
                <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${t.progress}%` }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                    className="h-full rounded-full bg-cyan-500"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-panel rounded-2xl border border-white/10 overflow-hidden"
      >
        <div className="p-4 border-b border-white/10 flex items-center gap-2">
          <Dumbbell className="w-5 h-5 text-cyan" />
          <h2 className="font-semibold text-white">Your weekly plan</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-zinc-400 font-medium">Day</th>
                <th className="text-left p-4 text-zinc-400 font-medium">Exercise</th>
                <th className="text-left p-4 text-zinc-400 font-medium">Nutrition focus</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_PLAN.map((row) => (
                <tr key={row.day} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="p-4 font-medium text-white">{row.day}</td>
                  <td className="p-4 text-zinc-300">{row.exercise}</td>
                  <td className="p-4 text-zinc-300">{row.nutrition}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 glass-panel p-5 rounded-xl border border-white/10 flex items-center gap-4"
      >
        <TrendingUp className="w-10 h-10 text-cyan" />
        <div>
          <p className="font-medium text-white">Based on your health data</p>
          <p className="text-zinc-500 text-sm">Plans are adjusted using your vitals, conditions, and goals. Update your dashboard regularly for better recommendations.</p>
        </div>
      </motion.div>
    </div>
  )
}
