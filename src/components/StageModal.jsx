import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../store/useStore'
import { t, isRTL } from '../i18n'
import { arUnit } from '../utils/time'
import Ico from './icons'

/** Bottom-sheet explaining one fasting stage ("process") in depth */
export default function StageModal({ stage, onClose }) {
  const lang = useStore((s) => s.lang)
  const rtl = isRTL(lang)

  return (
    <AnimatePresence>
      {stage && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[70] bg-black/55 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 34 }}
            className="fixed bottom-0 inset-x-0 z-[75] max-w-md mx-auto glass-strong rounded-t-[2.2rem] shadow-lux max-h-[82vh] overflow-y-auto no-scrollbar"
            role="dialog"
            aria-modal="true"
          >
            <div className="sticky top-0 pt-3 pb-2 px-5 glass-strong rounded-t-[2.2rem] z-10">
              <div className="w-12 h-1.5 rounded-full mx-auto mb-3" style={{ background: 'var(--ring-track)' }} />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className="w-14 h-14 rounded-2xl grid place-items-center shrink-0"
                    style={{ background: `${stage.hue}22`, color: stage.hue, boxShadow: `0 0 24px -4px ${stage.hue}77` }}
                  >
                    <Ico name={stage.icon} size={28} strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="font-black text-lg leading-tight">{stage.name[lang]}</p>
                    <p className="t-muted text-xs font-semibold">
                      {t(lang, 'stageAt')}{' '}
                      {lang === 'ar'
                        ? arUnit(stage.h, 'ساعة', 'ساعتين', 'ساعات', 'ساعة')
                        : `${stage.h} hour${stage.h > 1 ? 's' : ''}`}
                    </p>
                  </div>
                </div>
                <button onClick={onClose} className="btn-ghost w-9 h-9 rounded-xl grid place-items-center shrink-0" aria-label={t(lang, 'close')}>
                  <Ico name="X" size={16} />
                </button>
              </div>
            </div>

            <div className="px-5 pb-10 pt-2 flex flex-col gap-5">
              <section>
                <h4 className="flex items-center gap-2 font-black text-sm mb-2.5 accent">
                  <Ico name="Activity" size={16} />
                  {t(lang, 'stageWhatHappens')}
                </h4>
                <ul className="flex flex-col gap-2">
                  {stage.happens[lang].map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[13px] leading-relaxed t-muted">
                      <span className="mt-1.5 w-2 h-2 rounded-full shrink-0" style={{ background: stage.hue }} />
                      {h}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="card p-4 grad-border">
                <h4 className="flex items-center gap-2 font-black text-sm mb-2.5" style={{ color: stage.hue }}>
                  <Ico name="Sparkles" size={16} />
                  {t(lang, 'stageBenefits')}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {stage.gains[lang].map((g, i) => (
                    <span key={i} className="chip rounded-full px-3 py-1.5 text-xs font-bold flex items-center gap-1.5">
                      <Ico name="Check" size={13} style={{ color: stage.hue }} />
                      {g}
                    </span>
                  ))}
                </div>
              </section>

              <section className="flex items-start gap-3 rounded-2xl p-4" style={{ background: `${stage.hue}14` }}>
                <Ico name="Lightbulb" size={20} className="shrink-0 mt-0.5" style={{ color: stage.hue }} />
                <div>
                  <p className="font-black text-xs mb-1" style={{ color: stage.hue }}>
                    {t(lang, 'stageCoachNote')}
                  </p>
                  <p className="text-[13px] leading-relaxed t-muted">{stage.coachNote[lang]}</p>
                </div>
              </section>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
