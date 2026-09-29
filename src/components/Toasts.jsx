import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../store/useStore'
import Ico from './icons'

const KIND_GRAD = {
  info: 'from-[var(--accent)] to-[var(--accent-2)]',
  success: 'from-emerald-400 to-teal-400',
  badge: 'from-amber-300 via-yellow-400 to-orange-400',
}

export default function Toasts() {
  const toasts = useStore((s) => s.toasts)
  const dismiss = useStore((s) => s.dismissToast)

  useEffect(() => {
    if (!toasts.length) return
    const timers = toasts.map((t) => setTimeout(() => dismiss(t.id), 6000))
    return () => timers.forEach(clearTimeout)
  }, [toasts, dismiss])

  return (
    <div className="fixed top-3 inset-x-3 z-[90] flex flex-col gap-2 pointer-events-none max-w-md mx-auto">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ y: -70, opacity: 0, scale: 0.92 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -40, opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            className="pointer-events-auto glass-strong rounded-2xl p-3 pe-2 shadow-lux flex items-start gap-3"
            onClick={() => dismiss(t.id)}
            role="status"
          >
            <span className={`mt-0.5 shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br ${KIND_GRAD[t.kind] || KIND_GRAD.info} grid place-items-center text-[var(--on-accent)]`}>
              <Ico name={t.kind === 'badge' ? 'Trophy' : t.kind === 'success' ? 'CheckCircle2' : 'Sparkles'} size={18} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-sm leading-snug">{t.title}</p>
              <p className="t-muted text-xs leading-relaxed mt-0.5">{t.body}</p>
            </div>
            <span className="t-faint shrink-0 p-1">
              <Ico name="X" size={14} />
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
