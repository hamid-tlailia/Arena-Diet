import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useStore, selectEffectiveTheme } from '../store/useStore'
import { t } from '../i18n'
import { DIETS, dietById } from '../data/diets'
import { PROTOCOLS } from '../data/fasting'
import { dailyInsight, buildContext } from '../coach/engine'
import { dayKey, fmtClock } from '../utils/time'
import Ico from '../components/icons'

const card = (i) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.07, type: 'spring', stiffness: 260, damping: 26 },
})

export default function Home({ goTab }) {
  const lang = useStore((s) => s.lang)
  const theme = useStore(selectEffectiveTheme)
  const user = useStore((s) => s.user)
  const activeDiet = useStore((s) => s.activeDiet)
  const fasting = useStore((s) => s.fasting)
  const streak = useStore((s) => s.streak)
  const completedFasts = useStore((s) => s.completedFasts)
  const daysActive = useStore((s) => s.daysActive)
  const badges = useStore((s) => s.badges)
  const interests = useStore((s) => s.interests)
  const store = useStore()

  const hour = new Date().getHours()
  const greeting =
    hour >= 5 && hour < 12
      ? t(lang, 'greetMorning')
      : hour < 17
        ? t(lang, 'greetAfternoon')
        : hour < 21
          ? t(lang, 'greetEvening')
          : t(lang, 'greetNight')

  const diet = dietById(activeDiet)
  const running = fasting.status === 'running'
  const elapsedMs = running ? Date.now() - fasting.startTime : 0
  const protocol = PROTOCOLS.find((p) => p.id === fasting.protocolId)

  const ctx = useMemo(() => buildContext(store, lang), [activeDiet, user.name, lang, streak.current])
  const insight = useMemo(() => dailyInsight(dayKey(), ctx, lang), [ctx, lang])

  // passion radar: most-viewed diet that isn't the active one
  const passion = useMemo(() => {
    const entries = Object.entries(interests)
    if (!entries.length) return null
    const sorted = entries.sort((a, b) => b[1].views - a[1].views)
    const [topId, data] = sorted[0]
    if (topId !== activeDiet && data.views >= 2) return dietById(topId)
    return null
  }, [interests, activeDiet])

  const stats = [
    { icon: 'Flame', value: streak.current, label: t(lang, 'homeStreak'), hue: '#ff6b2d' },
    { icon: 'Trophy', value: completedFasts, label: t(lang, 'homeFastsDone'), hue: '#f5c26b' },
    { icon: 'CalendarCheck', value: daysActive, label: t(lang, 'homeDaysActive'), hue: '#39d0c0' },
    { icon: 'Medal', value: badges.length, label: t(lang, 'homeBadges'), hue: '#8b7bff' },
  ]

  return (
    <div className="flex flex-col gap-5">
      {/* greeting hero */}
      <motion.section {...card(0)} className="pt-2">
        <div className="flex items-end justify-between">
          <div>
            <p className="t-muted text-sm font-bold flex items-center gap-1.5">
              <Ico name={theme === 'day' ? 'Sunrise' : 'Moon'} size={15} className="accent" />
              {greeting}
              {streak.current >= 3 && <span className="num">· 🔥 x{streak.current}</span>}
            </p>
            <h1 className="text-3xl font-black mt-1 leading-tight">
              {user.name ? user.name : t(lang, 'appName')}
              <span className="grad-text">.</span>
            </h1>
          </div>
        </div>
        <p className="t-muted text-[13px] mt-2 leading-relaxed border-s-2 ps-3" style={{ borderColor: 'var(--accent)' }}>
          {theme === 'day' ? t(lang, 'themeDayQuote') : t(lang, 'themeNightQuote')}
        </p>
      </motion.section>

      {/* fasting live / quick start */}
      <motion.section {...card(1)}>
        {running ? (
          <button onClick={() => goTab('fasting')} className="card grad-border card-hover w-full p-4 text-start relative overflow-hidden">
            <div className="absolute -top-10 -end-10 w-40 h-40 rounded-full blur-3xl" style={{ background: 'var(--accent)', opacity: 0.25 }} />
            <div className="flex items-center gap-3 relative">
              <span className="w-12 h-12 rounded-2xl grid place-items-center bg-gradient-to-br from-[var(--accent)] to-[var(--accent-3)] text-[var(--on-accent)] animate-pulse-soft">
                <Ico name="Hourglass" size={24} />
              </span>
              <div className="flex-1">
                <p className="font-black text-sm flex items-center gap-2">
                  {t(lang, 'homeFastingNow')}
                  <span className="flex h-2 w-2">
                    <span className="animate-ping absolute h-2 w-2 rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                </p>
                <p className="num text-2xl font-black grad-text" dir="ltr">{fmtClock(elapsedMs)}</p>
              </div>
              <Ico name={lang === 'ar' ? 'ChevronLeft' : 'ChevronRight'} size={20} className="t-faint" />
            </div>
          </button>
        ) : (
          <button onClick={() => goTab('fasting')} className="btn-primary w-full rounded-3xl p-4 flex items-center gap-3 text-start">
            <span className="w-12 h-12 rounded-2xl grid place-items-center bg-white/20">
              <Ico name="Play" size={24} />
            </span>
            <div>
              <p className="font-black text-base">{t(lang, 'homeQuickStart')}</p>
              <p className="text-xs opacity-80 font-semibold">{t(lang, 'homeNoFastYet')}</p>
            </div>
            <Ico name={lang === 'ar' ? 'ChevronLeft' : 'ChevronRight'} size={20} className="ms-auto opacity-80" />
          </button>
        )}
      </motion.section>

      {/* stats bento */}
      <motion.section {...card(2)} className="grid grid-cols-4 gap-2.5">
        {stats.map((s) => (
          <div key={s.label} className="card card-hover p-3 flex flex-col items-center gap-1.5 text-center">
            <span className="w-9 h-9 rounded-xl grid place-items-center" style={{ background: `${s.hue}1d`, color: s.hue }}>
              <Ico name={s.icon} size={18} />
            </span>
            <p className="num text-xl font-black leading-none">{s.value}</p>
            <p className="t-faint text-[10px] font-bold leading-tight">{s.label}</p>
          </div>
        ))}
      </motion.section>

      {/* active diet card */}
      <motion.section {...card(3)}>
        <button onClick={() => goTab('diets')} className="card card-hover w-full p-5 text-start relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.14]"
            style={{ background: `linear-gradient(120deg, ${diet.gradient[0]}, ${diet.gradient[1]})` }}
          />
          <div className="relative flex items-start gap-4">
            <span
              className="w-14 h-14 rounded-2xl grid place-items-center shrink-0 text-white shadow-glow"
              style={{ background: `linear-gradient(135deg, ${diet.gradient[0]}, ${diet.gradient[1]})` }}
            >
              <Ico name={diet.icon} size={27} />
            </span>
            <div className="flex-1 min-w-0">
              <p className="t-faint text-[11px] font-bold">{t(lang, 'homeActiveDiet')}</p>
              <p className="font-black text-lg leading-tight mt-0.5">{diet.name[lang]}</p>
              <p className="t-muted text-xs mt-1 leading-relaxed line-clamp-2">{diet.tagline[lang]}</p>
            </div>
            <span className="chip rounded-full px-3 py-1 text-[10px] font-black shrink-0 flex items-center gap-1">
              {t(lang, 'homeSwitch')}
              <Ico name="RefreshCw" size={11} />
            </span>
          </div>
        </button>
      </motion.section>

      {/* AI daily insight */}
      <motion.section {...card(4)} className="card p-4 relative overflow-hidden">
        <div className="absolute top-0 start-0 w-full h-[3px] bg-gradient-to-l from-[var(--accent)] via-[var(--accent-2)] to-[var(--accent-3)]" />
        <p className="font-black text-xs flex items-center gap-1.5 accent mb-2">
          <Ico name="Sparkles" size={14} />
          {t(lang, 'homeDailyInsight')}
        </p>
        <p className="text-[13px] leading-relaxed t-muted">{insight.body}</p>
      </motion.section>

      {/* passion radar */}
      {passion && (
        <motion.section {...card(5)} className="card grad-border p-4">
          <p className="font-black text-xs flex items-center gap-1.5 mb-2" style={{ color: passion.gradient[0] }}>
            <Ico name="Target" size={14} />
            {t(lang, 'homePassion')}
          </p>
          <div className="flex items-center gap-3">
            <span
              className="w-10 h-10 rounded-xl grid place-items-center text-white shrink-0"
              style={{ background: `linear-gradient(135deg, ${passion.gradient[0]}, ${passion.gradient[1]})` }}
            >
              <Ico name={passion.icon} size={20} />
            </span>
            <p className="t-muted text-xs leading-relaxed flex-1">
              {t(lang, 'homePassionHint').replace('{diet}', passion.name[lang])}
            </p>
            <button
              onClick={() => goTab('diets')}
              className="btn-primary rounded-xl px-3.5 py-2 text-xs font-black shrink-0"
            >
              {t(lang, 'homePassionGo')}
            </button>
          </div>
        </motion.section>
      )}

      {/* explore all */}
      <motion.section {...card(6)}>
        <button onClick={() => goTab('diets')} className="btn-ghost w-full rounded-2xl py-3 font-black text-sm flex items-center justify-center gap-2">
          <Ico name="UtensilsCrossed" size={17} className="accent" />
          {t(lang, 'homeExplore')}
        </button>
      </motion.section>
    </div>
  )
}
