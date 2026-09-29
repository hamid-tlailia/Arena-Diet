import { motion } from 'framer-motion'
import { useStore } from '../store/useStore'
import { t } from '../i18n'
import Ico from './icons'

const TABS = [
  { id: 'home', icon: 'Home', label: 'navHome' },
  { id: 'fasting', icon: 'Hourglass', label: 'navFasting' },
  { id: 'diets', icon: 'UtensilsCrossed', label: 'navDiets' },
  { id: 'coach', icon: 'Sparkles', label: 'navCoach' },
  { id: 'settings', icon: 'Settings', label: 'navSettings' },
]

export default function BottomNav({ tab, setTab }) {
  const lang = useStore((s) => s.lang)
  const fasting = useStore((s) => s.fasting)
  return (
    <nav className="fixed bottom-3 inset-x-3 z-[60] max-w-md mx-auto">
      <div className="glass-strong rounded-[1.8rem] shadow-lux px-2 py-2 flex items-center justify-between safe-bottom">
        {TABS.map((tb) => {
          const active = tab === tb.id
          const pulsing = tb.id === 'fasting' && fasting.status === 'running'
          return (
            <button
              key={tb.id}
              onClick={() => setTab(tb.id)}
              className="relative flex-1 flex flex-col items-center gap-0.5 py-1.5 rounded-2xl"
              aria-label={t(lang, tb.label)}
              aria-current={active ? 'page' : undefined}
            >
              {active && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-3)] opacity-95"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                />
              )}
              <span className={`relative z-10 ${active ? 'text-[var(--on-accent)]' : 't-muted'}`}>
                <Ico name={tb.icon} size={21} strokeWidth={active ? 2.4 : 2} />
              </span>
              <span className={`relative z-10 text-[10px] font-bold ${active ? 'text-[var(--on-accent)]' : 't-faint'}`}>
                {t(lang, tb.label)}
              </span>
              {pulsing && (
                <span className="absolute top-0.5 end-2 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
