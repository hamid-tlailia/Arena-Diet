import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore, selectEffectiveTheme } from '../store/useStore'
import { t } from '../i18n'
import { timeAgo } from '../utils/time'
import Ico from './icons'
import Brand from './Brand'

export default function Header() {
  const lang = useStore((s) => s.lang)
  const theme = useStore(selectEffectiveTheme)
  const notifications = useStore((s) => s.notifications)
  const markAllRead = useStore((s) => s.markAllRead)
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const unread = notifications.filter((n) => !n.read).length

  useEffect(() => {
    const close = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false)
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [])

  return (
    <header className="flex items-center justify-between px-1 pt-2" ref={ref}>
      <div className="flex items-center gap-2.5">
        <Brand size={38} />
        <div>
          <p className="font-black text-lg leading-none">
            <span className="grad-text">{t(lang, 'appName')}</span>{' '}
            <span className="t-muted font-bold text-sm">{t(lang, 'appSuffix')}</span>
          </p>
          <p className="t-faint text-[11px] font-medium mt-0.5">{t(lang, 'tagline')}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="chip hidden sm:flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold t-muted">
          <Ico name={theme === 'day' ? 'Sunrise' : 'Moon'} size={14} className="accent" />
          {theme === 'day' ? t(lang, 'themeDayName') : t(lang, 'themeNightName')}
        </span>

        <div className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            className="btn-ghost relative w-10 h-10 rounded-2xl grid place-items-center"
            aria-label={t(lang, 'notifs')}
          >
            <Ico name="Bell" size={19} />
            {unread > 0 && (
              <span className="absolute -top-1 -end-1 min-w-[18px] h-[18px] px-1 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-3)] text-[var(--on-accent)] text-[10px] font-black grid place-items-center num">
                {unread}
              </span>
            )}
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.18 }}
                className="absolute end-0 top-12 w-[min(88vw,340px)] glass-strong rounded-3xl shadow-lux p-3 z-[80] max-h-[60vh] overflow-y-auto no-scrollbar"
              >
                <div className="flex items-center justify-between px-1 pb-2">
                  <p className="font-black text-sm">{t(lang, 'notifs')}</p>
                  {unread > 0 && (
                    <button onClick={markAllRead} className="text-[11px] font-bold accent">
                      {t(lang, 'notifMarkRead')}
                    </button>
                  )}
                </div>
                {notifications.length === 0 ? (
                  <div className="text-center py-8 px-4">
                    <Ico name="BellOff" size={28} className="t-faint mx-auto mb-2" />
                    <p className="t-muted text-xs leading-relaxed">{t(lang, 'notifEmpty')}</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-1.5">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`rounded-2xl p-3 border transition-colors ${
                          n.read ? 'border-transparent opacity-60' : 'border-[var(--glass-border)] bg-[var(--glass)]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-bold text-[13px] leading-snug">{n.title}</p>
                          <span className="t-faint text-[10px] shrink-0 num">{timeAgo(n.ts, lang)}</span>
                        </div>
                        <p className="t-muted text-xs leading-relaxed mt-1">{n.body}</p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}
