import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '../store/useStore'
import { t } from '../i18n'
import { DIETS } from '../data/diets'
import { BADGES } from '../data/badges'
import { dailyInsight, buildContext } from '../coach/engine'
import { dayKey, dateOnly, fmtHM } from '../utils/time'
import Ico from '../components/icons'

export default function Coach() {
  const lang = useStore((s) => s.lang)
  const store = useStore()
  const history = useStore((s) => s.history)
  const interests = useStore((s) => s.interests)
  const badges = useStore((s) => s.badges)
  const daysActive = useStore((s) => s.daysActive)
  const streak = useStore((s) => s.streak)
  const incRegen = useStore((s) => s.incRegen)
  const regenCount = useStore((s) => s.regenCount)

  const [salt, setSalt] = useState(0)
  const ctx = useMemo(() => buildContext(store, lang), [store.activeDiet, store.user.name, lang, streak.current])
  const insight = useMemo(() => dailyInsight(dayKey(), ctx, lang, salt), [ctx, lang, salt])

  // weekly analytics
  const week = useMemo(() => {
    const days = []
    const now = new Date()
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now)
      d.setDate(d.getDate() - i)
      days.push({ key: dateOnly(d.getTime()), label: d.toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', { weekday: 'short' }) })
    }
    const byDay = days.map((d) => ({
      ...d,
      hours: history.filter((h) => dateOnly(h.end) === d.key).reduce((sum, h) => sum + h.hours, 0),
    }))
    const totalH = byDay.reduce((s, d) => s + d.hours, 0)
    const done = history.filter((h) => h.completed && byDay.some((d) => dateOnly(h.end) === d.key))
    return { byDay, totalH, count: done.length, avg: done.length ? totalH / history.length : 0, max: Math.max(1, ...byDay.map((d) => d.hours)) }
  }, [history, lang])

  const maxViews = Math.max(1, ...Object.values(interests).map((i) => i.views))
  const consistency = Math.min(100, Math.round(((daysActive % 30) / 30) * 100 + Math.min(40, streak.current * 6)))

  return (
    <div className="flex flex-col gap-5">
      <div className="pt-1">
        <h1 className="text-2xl font-black grad-text flex items-center gap-2">
          {t(lang, 'coachTitle')}
          <Ico name="Sparkles" size={22} className="accent" />
        </h1>
        <p className="t-muted text-sm mt-1">{t(lang, 'coachSubtitle')}</p>
      </div>

      {/* AI daily insight */}
      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="card grad-border p-5 relative overflow-hidden">
        <div className="absolute -top-12 -end-12 w-36 h-36 rounded-full blur-3xl" style={{ background: 'var(--accent)', opacity: 0.22 }} />
        <p className="font-black text-xs accent flex items-center gap-1.5 mb-2.5 relative">
          <Ico name="Brain" size={14} />
          {t(lang, 'coachInsight')}
        </p>
        <p className="text-sm leading-relaxed t-muted relative min-h-[48px]">{insight.body}</p>
        <button
          onClick={() => {
            setSalt((s) => s + 1)
            incRegen()
          }}
          className="btn-ghost rounded-xl px-3.5 py-2 text-xs font-black flex items-center gap-1.5 mt-3 relative"
        >
          <Ico name="RefreshCw" size={13} className="accent" />
          {t(lang, 'coachRegenerate')}
        </button>
      </motion.section>

      {/* consistency + week bars */}
      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }} className="card p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="font-black text-sm flex items-center gap-2">
            <Ico name="Activity" size={15} className="accent" />
            {t(lang, 'coachWeekTitle')}
          </p>
          <span className="chip rounded-full px-2.5 py-1 text-[10px] font-black accent num">{t(lang, 'coachConsistency')}: {consistency}%</span>
        </div>

        {history.length === 0 ? (
          <p className="t-faint text-xs text-center py-6">{t(lang, 'coachNoData')}</p>
        ) : (
          <>
            <div className="flex items-end justify-between gap-2 h-28 mb-2" dir="ltr">
              {week.byDay.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.max(4, (d.hours / week.max) * 100)}%` }}
                    transition={{ delay: 0.15 + i * 0.05, type: 'spring', stiffness: 200, damping: 22 }}
                    className="w-full max-w-[26px] rounded-lg"
                    style={{
                      background: d.hours > 0 ? 'linear-gradient(to top, var(--accent), var(--accent-3))' : 'var(--ring-track)',
                      boxShadow: d.hours > 0 ? '0 0 14px -2px var(--accent)' : 'none',
                    }}
                  />
                  <span className="t-faint text-[9px] font-bold">{d.label}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {[
                { v: week.count, l: t(lang, 'coachWeekFasts'), icon: 'Trophy' },
                { v: Math.round(week.totalH), l: t(lang, 'coachWeekHours'), icon: 'Hourglass' },
                { v: week.avg ? fmtHM(week.avg) : '—', l: t(lang, 'coachWeekAvg'), icon: 'Timer' },
              ].map((s, i) => (
                <div key={i} className="chip rounded-2xl p-3 text-center">
                  <Ico name={s.icon} size={15} className="accent mx-auto mb-1" />
                  <p className="num font-black text-base leading-none">{s.v}</p>
                  <p className="t-faint text-[10px] font-bold mt-1">{s.l}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </motion.section>

      {/* interest map — passion tracking */}
      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="card p-5">
        <p className="font-black text-sm flex items-center gap-2">
          <Ico name="Target" size={15} className="accent" />
          {t(lang, 'coachInterests')}
        </p>
        <p className="t-faint text-[11px] mt-0.5 mb-4">{t(lang, 'coachInterestsHint')}</p>
        <div className="flex flex-col gap-3">
          {DIETS.map((d) => {
            const views = interests[d.id]?.views || 0
            return (
              <div key={d.id} className="flex items-center gap-3">
                <span
                  className="w-8 h-8 rounded-lg grid place-items-center text-white shrink-0"
                  style={{ background: `linear-gradient(135deg, ${d.gradient[0]}, ${d.gradient[1]})` }}
                >
                  <Ico name={d.icon} size={15} />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="font-bold text-xs truncate">{d.name[lang]}</p>
                    <p className="t-faint text-[10px] font-black shrink-0">
                      {views} {t(lang, 'coachView')}
                    </p>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--ring-track)' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(views / maxViews) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(to left, ${d.gradient[0]}, ${d.gradient[1]})` }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </motion.section>

      {/* badges */}
      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }} className="card p-5">
        <p className="font-black text-sm flex items-center gap-2 mb-4">
          <Ico name="Medal" size={15} className="accent" />
          {t(lang, 'coachBadges')}
        </p>
        <div className="grid grid-cols-4 gap-3">
          {BADGES.map((b, i) => {
            const earned = badges.includes(b.id)
            return (
              <motion.div
                key={b.id}
                initial={{ scale: 0.6, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, type: 'spring', stiffness: 300, damping: 18 }}
                className="flex flex-col items-center gap-1.5 text-center"
                title={b.desc[lang]}
              >
                <span
                  className={`w-14 h-14 rounded-2xl grid place-items-center relative ${
                    earned ? 'bg-gradient-to-br from-amber-300 to-orange-400 text-white shadow-glow' : 't-faint'
                  }`}
                  style={!earned ? { background: 'var(--ring-track)' } : undefined}
                >
                  <Ico name={earned ? b.icon : 'Lock'} size={24} />
                  {earned && (
                    <span className="absolute -top-1 -end-1 w-4 h-4 rounded-full bg-emerald-400 grid place-items-center">
                      <Ico name="Check" size={10} className="text-white" strokeWidth={3.5} />
                    </span>
                  )}
                </span>
                <p className={`text-[10px] font-black leading-tight ${earned ? '' : 't-faint'}`}>{b.name[lang]}</p>
              </motion.div>
            )
          })}
        </div>
      </motion.section>
    </div>
  )
}
