import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../store/useStore'
import { t } from '../i18n'
import { DIETS } from '../data/diets'
import Ico from '../components/icons'

export default function Diets({ selected, setSelected }) {
  const lang = useStore((s) => s.lang)
  const activeDiet = useStore((s) => s.activeDiet)

  return (
    <AnimatePresence mode="wait">
      {selected ? (
        <DietDetail key="detail" diet={selected} onBack={() => setSelected(null)} />
      ) : (
        <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -30 }} className="flex flex-col gap-5">
          <div className="pt-1">
            <h1 className="text-2xl font-black grad-text">{t(lang, 'dietsTitle')}</h1>
            <p className="t-muted text-sm mt-1 leading-relaxed">{t(lang, 'dietsSubtitle')}</p>
          </div>

          <div className="flex flex-col gap-4">
            {DIETS.map((d, i) => (
              <motion.button
                key={d.id}
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, type: 'spring', stiffness: 240, damping: 24 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelected(d)}
                className="card card-hover relative overflow-hidden p-5 text-start"
              >
                <div
                  className="absolute inset-0 opacity-[0.13]"
                  style={{ background: `linear-gradient(120deg, ${d.gradient[0]}, transparent 55%, ${d.gradient[1]})` }}
                />
                <div className="relative">
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className="w-14 h-14 rounded-2xl grid place-items-center text-white shadow-glow shrink-0"
                      style={{ background: `linear-gradient(135deg, ${d.gradient[0]}, ${d.gradient[1]})` }}
                    >
                      <Ico name={d.icon} size={26} />
                    </span>
                    <div className="flex flex-col items-end gap-1.5">
                      {activeDiet === d.id && (
                        <span className="flex items-center gap-1 text-[10px] font-black text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full">
                          <Ico name="CheckCircle2" size={11} />
                          {t(lang, 'dietsActiveNow')}
                        </span>
                      )}
                      <span className="t-faint text-[10px] font-bold chip rounded-full px-2.5 py-1">{d.level[lang]}</span>
                    </div>
                  </div>
                  <p className="font-black text-xl mt-3">{d.name[lang]}</p>
                  <p className="font-bold text-xs mt-0.5" style={{ color: d.gradient[0] }}>
                    {d.tagline[lang]}
                  </p>
                  <p className="t-muted text-[13px] leading-relaxed mt-2 line-clamp-2">{d.intro[lang]}</p>
                  <div className="flex items-center gap-1.5 mt-3 text-[11px] font-black accent">
                    {t(lang, 'dietsReadMore')}
                    <Ico name={lang === 'ar' ? 'ArrowLeft' : 'ArrowRight'} size={14} />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Section({ icon, title, children, hue }) {
  return (
    <section className="flex flex-col gap-2.5">
      <h3 className="font-black text-sm flex items-center gap-2" style={{ color: hue || 'var(--accent)' }}>
        <Ico name={icon} size={16} />
        {title}
      </h3>
      {children}
    </section>
  )
}

function DietDetail({ diet, onBack }) {
  const lang = useStore((s) => s.lang)
  const activeDiet = useStore((s) => s.activeDiet)
  const setActiveDiet = useStore((s) => s.setActiveDiet)
  const viewDiet = useStore((s) => s.viewDiet)
  const awardBadge = useStore((s) => s.awardBadge)
  const interests = useStore((s) => s.interests)
  const pushToast = useStore((s) => s.pushToast)

  // passion tracking + explorer badge
  useEffect(() => {
    viewDiet(diet.id)
  }, [diet.id])

  useEffect(() => {
    const ids = Object.keys(interests)
    if (ids.length >= 4) awardBadge('explorer')
  }, [interests])

  const isActive = activeDiet === diet.id

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ type: 'spring', stiffness: 240, damping: 26 }} className="flex flex-col gap-5">
      {/* hero */}
      <div className="card relative overflow-hidden p-5 grad-border">
        <div
          className="absolute inset-0 opacity-[0.17]"
          style={{ background: `linear-gradient(135deg, ${diet.gradient[0]}, ${diet.gradient[1]})` }}
        />
        <div className="relative">
          <button onClick={onBack} className="btn-ghost rounded-xl px-3 py-1.5 text-xs font-black flex items-center gap-1.5 mb-4">
            <Ico name={lang === 'ar' ? 'ArrowRight' : 'ArrowLeft'} size={14} />
            {t(lang, 'onbBack')}
          </button>
          <div className="flex items-center gap-4">
            <span
              className="w-16 h-16 rounded-3xl grid place-items-center text-white shadow-glow shrink-0 animate-float"
              style={{ background: `linear-gradient(135deg, ${diet.gradient[0]}, ${diet.gradient[1]})` }}
            >
              <Ico name={diet.icon} size={31} />
            </span>
            <div className="flex-1">
              <p className="font-black text-2xl leading-tight">{diet.name[lang]}</p>
              <p className="font-bold text-sm" style={{ color: diet.gradient[0] }}>
                {diet.tagline[lang]}
              </p>
            </div>
          </div>
          <p className="text-[13px] leading-relaxed mt-4 t-muted">{diet.intro[lang]}</p>

          <button
            onClick={() => {
              setActiveDiet(diet.id)
              if (!isActive) {
                pushToast({
                  kind: 'success',
                  title: lang === 'ar' ? `✅ ${diet.name.ar} أصبح نظامك` : `✅ ${diet.name.en} is now your plan`,
                  body: lang === 'ar' ? 'سنُخصّص رسائلك التحفيزية على هذا النظام من الآن.' : 'Your motivational messages are now tailored to this diet.',
                })
              }
            }}
            disabled={isActive}
            className={`${isActive ? 'btn-ghost opacity-70' : 'btn-primary'} w-full mt-4 rounded-2xl py-3 font-black text-sm flex items-center justify-center gap-2`}
          >
            <Ico name={isActive ? 'CheckCircle2' : 'Target'} size={17} />
            {isActive ? t(lang, 'dietsActiveNow') : t(lang, 'dietsMakeActive')}
          </button>
        </div>
      </div>

      {/* how it works */}
      <Section icon="Info" title={t(lang, 'dietsHow')} hue={diet.gradient[0]}>
        <ol className="flex flex-col gap-2">
          {diet.howIt[lang].map((step, i) => (
            <li key={i} className="card flex items-start gap-3 p-3.5">
              <span
                className="num w-7 h-7 rounded-lg grid place-items-center text-xs font-black text-white shrink-0"
                style={{ background: `linear-gradient(135deg, ${diet.gradient[0]}, ${diet.gradient[1]})` }}
              >
                {i + 1}
              </span>
              <p className="text-[13px] leading-relaxed t-muted pt-1">{step}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* benefits */}
      <Section icon="Sparkles" title={t(lang, 'dietsBenefits')} hue={diet.gradient[0]}>
        <div className="grid grid-cols-2 gap-2.5">
          {diet.benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className={`card p-3.5 ${i === 0 ? 'col-span-2' : ''}`}
            >
              <span className="w-9 h-9 rounded-xl grid place-items-center mb-2" style={{ background: `${diet.gradient[0]}1c`, color: diet.gradient[0] }}>
                <Ico name={b.icon} size={18} />
              </span>
              <p className="font-black text-[13px]">{b.t[lang]}</p>
              <p className="t-muted text-[11px] leading-relaxed mt-1">{b.d[lang]}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* allowed / forbidden */}
      <Section icon="Salad" title={t(lang, 'dietsAllowed')} hue="#34d399">
        <div className="flex flex-col gap-2">
          {diet.allowed.map((a, i) => (
            <div key={i} className="card flex items-center gap-3 p-3">
              <span className="w-10 h-10 rounded-xl grid place-items-center bg-emerald-400/10 text-emerald-400 shrink-0">
                <Ico name={a.icon} size={19} />
              </span>
              <div className="min-w-0">
                <p className="font-black text-[13px]">{a.label[lang]}</p>
                <p className="t-faint text-[11px]">{a.note[lang]}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section icon="ShieldCheck" title={t(lang, 'dietsForbidden')} hue="#f87171">
        <div className="flex flex-col gap-2">
          {diet.avoid.map((a, i) => (
            <div key={i} className="card flex items-center gap-3 p-3" style={{ borderColor: '#f8717130' }}>
              <span className="w-10 h-10 rounded-xl grid place-items-center bg-red-400/10 text-red-400 shrink-0">
                <Ico name={a.icon} size={19} />
              </span>
              <div className="min-w-0">
                <p className="font-black text-[13px]">{a.label[lang]}</p>
                <p className="t-faint text-[11px]">{a.why[lang]}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* exercises */}
      <Section icon="Dumbbell" title={t(lang, 'dietsExercises')} hue={diet.gradient[1]}>
        <div className="flex flex-col gap-2.5">
          {diet.exercises.map((e, i) => (
            <motion.div key={i} whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 12 }} viewport={{ once: true }} className="card p-4 flex items-start gap-3">
              <span
                className="w-11 h-11 rounded-2xl grid place-items-center text-white shrink-0"
                style={{ background: `linear-gradient(135deg, ${diet.gradient[0]}, ${diet.gradient[1]})` }}
              >
                <Ico name={e.icon} size={20} />
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-black text-[13px]">{e.name[lang]}</p>
                  <span className="chip rounded-full px-2 py-0.5 text-[10px] font-black t-muted shrink-0">{e.freq[lang]}</span>
                </div>
                <p className="t-muted text-[12px] leading-relaxed mt-1">{e.desc[lang]}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* tips + fact */}
      <Section icon="Lightbulb" title={t(lang, 'dietsTips')} hue="#f5c26b">
        <div className="card p-4 flex flex-col gap-2.5">
          {diet.tips.map((tip, i) => (
            <p key={i} className="flex items-start gap-2.5 text-[13px] leading-relaxed t-muted">
              <span className="mt-1.5 w-2 h-2 rounded-full shrink-0" style={{ background: 'var(--accent-3)' }} />
              {tip[lang]}
            </p>
          ))}
        </div>
      </Section>

      <div className="card grad-border p-4 flex items-start gap-3 mb-2">
        <Ico name="Star" size={20} className="accent shrink-0 mt-0.5" />
        <div>
          <p className="font-black text-xs accent mb-1">{t(lang, 'dietsFact')}</p>
          <p className="t-muted text-[13px] leading-relaxed">{diet.fact[lang]}</p>
        </div>
      </div>
    </motion.div>
  )
}
