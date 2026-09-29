import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../store/useStore'
import { t } from '../i18n'
import { DIETS } from '../data/diets'
import Brand from '../components/Brand'
import Ico from '../components/icons'

const GOALS = [
  { id: 'loseWeight', icon: 'Flame' },
  { id: 'energy', icon: 'Zap' },
  { id: 'health', icon: 'HeartPulse' },
  { id: 'discipline', icon: 'Brain' },
]

export default function Onboarding() {
  const lang = useStore((s) => s.lang)
  const setLang = useStore((s) => s.setLang)
  const themeMode = useStore((s) => s.themeMode)
  const setThemeMode = useStore((s) => s.setThemeMode)
  const user = useStore((s) => s.user)
  const setUser = useStore((s) => s.setUser)
  const activeDiet = useStore((s) => s.activeDiet)
  const setActiveDiet = useStore((s) => s.setActiveDiet)
  const finish = useStore((s) => s.finishOnboarding)

  const [step, setStep] = useState(0)
  const [name, setName] = useState(user.name)

  const goalLabel = (id) => t(lang, { loseWeight: 'goalLose', energy: 'goalEnergy', health: 'goalHealth', discipline: 'goalDiscipline' }[id])

  const steps = [
    // 0 — welcome
    <div key="w" className="flex flex-col items-center text-center gap-5">
      <motion.div initial={{ scale: 0, rotate: -40 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 220, damping: 16 }}>
        <Brand size={110} />
      </motion.div>
      <div>
        <p className="t-muted text-sm font-bold">{t(lang, 'onbWelcome')}</p>
        <h1 className="text-4xl font-black grad-text mt-1">
          {t(lang, 'appName')} <span className="text-[var(--ink)]">{t(lang, 'appSuffix')}</span>
        </h1>
      </div>
      <p className="t-muted text-sm leading-relaxed max-w-[270px]">{t(lang, 'onbSub')}</p>
      <div className="flex flex-wrap justify-center gap-2 mt-1">
        {['#glassmorphism', '#bento', '#AI-coach', '#adaptive-themes'].map((h) => (
          <span key={h} className="chip rounded-full px-3 py-1 text-[10px] font-black t-muted" dir="ltr">
            {h}
          </span>
        ))}
      </div>
    </div>,

    // 1 — name + goal
    <div key="p" className="flex flex-col gap-5 w-full">
      <div className="text-center">
        <h2 className="text-2xl font-black">{t(lang, 'onbName')}</h2>
      </div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={t(lang, 'setNamePh')}
        className="glass rounded-2xl px-5 py-4 text-center text-lg font-black bg-transparent outline-none w-full"
        maxLength={20}
      />
      <div>
        <p className="t-muted text-sm font-bold text-center mb-3">{t(lang, 'onbGoal')}</p>
        <div className="grid grid-cols-2 gap-2.5">
          {GOALS.map((g) => (
            <button
              key={g.id}
              onClick={() => setUser({ goal: g.id })}
              className={`chip rounded-2xl p-3.5 flex items-center gap-2 text-xs font-black transition-all ${user.goal === g.id ? 'grad-border' : 'opacity-70'}`}
              style={user.goal === g.id ? { background: 'var(--card-hover)' } : undefined}
            >
              <Ico name={g.icon} size={16} className={user.goal === g.id ? 'accent' : 't-faint'} />
              {goalLabel(g.id)}
            </button>
          ))}
        </div>
      </div>
    </div>,

    // 2 — pick diet
    <div key="d" className="flex flex-col gap-4 w-full">
      <div className="text-center">
        <h2 className="text-2xl font-black">{t(lang, 'onbPickDiet')}</h2>
      </div>
      <div className="flex flex-col gap-2.5">
        {DIETS.map((d) => (
          <button
            key={d.id}
            onClick={() => setActiveDiet(d.id)}
            className={`card card-hover flex items-center gap-3.5 p-3.5 text-start transition-all ${activeDiet === d.id ? 'grad-border' : 'opacity-75'}`}
            style={activeDiet === d.id ? { background: 'var(--card-hover)' } : undefined}
          >
            <span
              className="w-12 h-12 rounded-2xl grid place-items-center text-white shrink-0"
              style={{ background: `linear-gradient(135deg, ${d.gradient[0]}, ${d.gradient[1]})` }}
            >
              <Ico name={d.icon} size={22} />
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-black text-sm">{d.name[lang]}</p>
              <p className="t-faint text-[11px] truncate">{d.tagline[lang]}</p>
            </div>
            {activeDiet === d.id && <Ico name="CheckCircle2" size={20} className="accent shrink-0" />}
          </button>
        ))}
      </div>
    </div>,

    // 3 — lang + theme
    <div key="t" className="flex flex-col gap-5 w-full">
      <div className="text-center">
        <h2 className="text-2xl font-black">{t(lang, 'onbTheme')}</h2>
      </div>
      <div className="chip rounded-2xl p-1 flex gap-1">
        {[
          { v: 'ar', l: 'العربية' },
          { v: 'en', l: 'English' },
        ].map((o) => (
          <button
            key={o.v}
            onClick={() => setLang(o.v)}
            className={`flex-1 rounded-xl py-3 text-sm font-black transition-all ${lang === o.v ? 'bg-gradient-to-br from-[var(--accent)] to-[var(--accent-3)] text-[var(--on-accent)]' : 't-muted'}`}
          >
            {o.l}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { v: 'auto', icon: 'RefreshCw', l: t(lang, 'themeAuto') },
          { v: 'day', icon: 'Sunrise', l: t(lang, 'themeDay') },
          { v: 'night', icon: 'Moon', l: t(lang, 'themeNight') },
        ].map((o) => (
          <button
            key={o.v}
            onClick={() => setThemeMode(o.v)}
            className={`chip rounded-2xl p-3 flex flex-col items-center gap-1.5 text-[10px] font-black transition-all ${themeMode === o.v ? 'grad-border' : 'opacity-70'}`}
            style={themeMode === o.v ? { background: 'var(--card-hover)' } : undefined}
          >
            <Ico name={o.icon} size={19} className={themeMode === o.v ? 'accent' : 't-faint'} />
            {o.l}
          </button>
        ))}
      </div>
      <p className="t-faint text-[11px] text-center leading-relaxed">{t(lang, 'themeChip')}</p>
    </div>,
  ]

  const next = () => {
    if (step === 1) setUser({ name: name.trim() })
    if (step < steps.length - 1) setStep(step + 1)
    else {
      finish()
    }
  }

  return (
    <div className="min-h-dvh max-w-md mx-auto flex flex-col px-6 py-8 relative">
      {/* progress */}
      <div className="flex gap-1.5 mb-8 mt-2">
        {steps.map((_, i) => (
          <span
            key={i}
            className="h-1.5 rounded-full transition-all duration-500"
            style={{
              flex: i === step ? 2.4 : 1,
              background: i <= step ? 'linear-gradient(to left, var(--accent), var(--accent-3))' : 'var(--ring-track)',
            }}
          />
        ))}
      </div>

      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -40, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            className="w-full"
          >
            {steps[step]}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-2.5 mt-6 safe-bottom">
        {step > 0 && (
          <button onClick={() => setStep(step - 1)} className="btn-ghost rounded-2xl px-5 py-3.5 font-black text-sm">
            {t(lang, 'onbBack')}
          </button>
        )}
        <button onClick={next} className="btn-primary flex-1 rounded-2xl py-3.5 font-black text-base flex items-center justify-center gap-2">
          {step === steps.length - 1 ? t(lang, 'onbStart') : t(lang, 'onbNext')}
          {step < steps.length - 1 && <Ico name={lang === 'ar' ? 'ArrowLeft' : 'ArrowRight'} size={17} />}
        </button>
      </div>
    </div>
  )
}
