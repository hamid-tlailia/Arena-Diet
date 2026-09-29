import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../store/useStore'
import { t } from '../i18n'
import { PROTOCOLS, STAGES, stageForElapsed } from '../data/fasting'
import FastingRing from '../components/FastingRing'
import StageModal from '../components/StageModal'
import Ico from '../components/icons'
import { fmtHM, timeAgo, arUnit } from '../utils/time'

export default function Fasting() {
  const lang = useStore((s) => s.lang)
  const fasting = useStore((s) => s.fasting)
  const history = useStore((s) => s.history)
  const startFast = useStore((s) => s.startFast)
  const stopFast = useStore((s) => s.stopFast)
  const pushToast = useStore((s) => s.pushToast)

  const running = fasting.status === 'running'
  const [now, setNow] = useState(Date.now())
  const [picked, setPicked] = useState(fasting.protocolId || '16-8')
  const [stageModal, setStageModal] = useState(null)
  const [confirmStop, setConfirmStop] = useState(false)
  const [result, setResult] = useState(null)

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [running])

  const elapsedMs = running ? now - fasting.startTime : 0
  const elapsedH = elapsedMs / 36e5
  const stage = stageForElapsed(elapsedH)
  const progress = Math.min(1, elapsedH / fasting.targetHours)
  const remainingMs = Math.max(0, fasting.targetHours * 36e5 - elapsedMs)

  const protocol = PROTOCOLS.find((p) => p.id === (running ? fasting.protocolId : picked))

  const baseHours = running ? fasting.targetHours : protocol?.fast || 24
  const visibleStages = useMemo(() => STAGES.filter((s) => s.h <= baseHours), [baseHours])

  const handleStart = () => {
    startFast(protocol.id, protocol.fast)
    setNow(Date.now())
  }

  const handleStopConfirm = () => {
    const entry = stopFast()
    setConfirmStop(false)
    if (entry) setResult(entry)
  }

  const stageState = (s) => {
    if (elapsedH >= s.h && Math.floor(elapsedH) === Math.floor(s.h)) return 'now'
    if (elapsedH >= s.h) return 'done'
    return 'locked'
  }

  return (
    <div className="flex flex-col gap-6">
      {/* title */}
      <div className="text-center pt-1">
        <h1 className="text-2xl font-black grad-text">{t(lang, 'fastTitle')}</h1>
        <p className="t-muted text-sm mt-1">{t(lang, 'fastSubtitle')}</p>
      </div>

      {/* ============ IDLE: protocol picker ============ */}
      {!running && (
        <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-3">
          <p className="font-black text-sm flex items-center gap-2">
            <Ico name="Hourglass" size={16} className="accent" />
            {t(lang, 'fastChoose')}
          </p>
          <div className="grid grid-cols-2 gap-3">
            {PROTOCOLS.map((p, i) => {
              const active = picked === p.id
              return (
                <motion.button
                  key={p.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setPicked(p.id)}
                  className={`card card-hover relative p-4 text-start ${active ? 'grad-border' : ''}`}
                  style={active ? { background: 'var(--card-hover)' } : undefined}
                  aria-pressed={active}
                >
                  {p.tag && (
                    <span className="absolute -top-2 end-3 text-[10px] font-black px-2 py-0.5 rounded-full bg-gradient-to-l from-[var(--accent)] to-[var(--accent-3)] text-[var(--on-accent)]">
                      {p.tag === 'popular' ? t(lang, 'fastPopular') : t(lang, 'fastRecommended')}
                    </span>
                  )}
                  <p className="num text-2xl font-black grad-text" dir="ltr">
                    {p.fast}:{p.eat.toString().padStart(2, '0')}
                  </p>
                  <p className="font-black text-[13px] mt-1 leading-tight">{p.name[lang]}</p>
                  <p className="t-faint text-[11px] font-bold mt-1">{p.level[lang]}</p>
                </motion.button>
              )
            })}
          </div>

          {protocol && (
            <motion.div
              key={protocol.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="card p-4 overflow-hidden"
            >
              <p className="t-muted text-[13px] leading-relaxed">{protocol.desc[lang]}</p>
              <div className="flex gap-2 mt-3">
                <span className="chip rounded-full px-3 py-1 text-[11px] font-bold flex items-center gap-1">
                  <Ico name="Timer" size={13} className="accent" />
                  {protocol.fast} {t(lang, 'fastHours')}
                </span>
                <span className="chip rounded-full px-3 py-1 text-[11px] font-bold flex items-center gap-1">
                  <Ico name="UtensilsCrossed" size={13} className="accent" />
                  {protocol.eat}h {t(lang, 'fastWindow')}
                </span>
              </div>
            </motion.div>
          )}

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleStart}
            className="btn-primary rounded-3xl py-4 font-black text-lg flex items-center justify-center gap-2.5 mt-1"
          >
            <Ico name="Play" size={22} />
            {t(lang, 'fastStart')}
          </motion.button>
        </motion.section>
      )}

      {/* ============ RUNNING: the ring ============ */}
      {running && (
        <motion.section initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-5">
          <FastingRing
            elapsedMs={elapsedMs}
            targetHours={fasting.targetHours}
            stage={stage}
            lang={lang}
            labels={{ done: t(lang, 'fastDoneShort') }}
          />

          <div className="grid grid-cols-2 gap-3 w-full">
            <div className="card p-3.5 text-center">
              <p className="t-faint text-[11px] font-bold">{t(lang, 'fastRemaining')}</p>
              <p className="num text-xl font-black mt-1" dir="ltr">{fmtHM(remainingMs / 36e5)}</p>
            </div>
            <div className="card p-3.5 text-center">
              <p className="t-faint text-[11px] font-bold">{t(lang, 'fastStage')}</p>
              <p className="text-sm font-black mt-1 truncate" style={{ color: stage.hue }}>{stage.name[lang]}</p>
            </div>
          </div>

          {progress >= 1 && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="card grad-border p-3 w-full text-center font-black text-sm"
              style={{ color: 'var(--accent)' }}
            >
              🏆 {t(lang, 'fastGoalDone')}
            </motion.div>
          )}

          <button
            onClick={() => (progress >= 1 ? handleStopConfirm() : setConfirmStop(true))}
            className="btn-ghost rounded-3xl py-3.5 px-8 font-black text-base flex items-center gap-2 w-full justify-center"
          >
            <Ico name="Square" size={18} />
            {t(lang, 'fastStop')}
          </button>
        </motion.section>
      )}

      {/* ============ Body journey timeline ============ */}
      <section className="flex flex-col gap-3">
        <div>
          <p className="font-black text-sm flex items-center gap-2">
            <Ico name="Dna" size={16} className="accent" />
            {t(lang, 'fastJourney')}
          </p>
          <p className="t-faint text-[11px] mt-0.5">{t(lang, 'fastTapStage')}</p>
        </div>

        <div className="flex flex-col gap-2">
          {visibleStages.map((s, i) => {
            const st = running ? stageState(s) : i === 0 ? 'now' : 'locked'
            const isActive = st === 'now'
            return (
              <motion.button
                key={s.id}
                onClick={() => setStageModal(s)}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                whileTap={{ scale: 0.98 }}
                className={`card card-hover flex items-center gap-3 p-3 text-start w-full ${isActive ? 'grad-border' : ''}`}
                style={isActive ? { background: `${s.hue}12` } : undefined}
              >
                <span
                  className="w-11 h-11 rounded-2xl grid place-items-center shrink-0 relative"
                  style={{
                    background: st === 'locked' ? 'var(--ring-track)' : `${s.hue}22`,
                    color: st === 'locked' ? 'var(--faint)' : s.hue,
                    boxShadow: isActive ? `0 0 18px -2px ${s.hue}66` : 'none',
                  }}
                >
                  <Ico name={st === 'done' ? 'CheckCircle2' : st === 'locked' ? 'Lock' : s.icon} size={20} strokeWidth={isActive ? 2.4 : 2} />
                  {isActive && (
                    <span className="absolute -top-1 -end-1 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute h-full w-full rounded-full opacity-75" style={{ background: s.hue }} />
                      <span className="relative rounded-full h-2.5 w-2.5" style={{ background: s.hue }} />
                    </span>
                  )}
                </span>
                <div className="flex-1 min-w-0">
                  <p className={`font-black text-[13px] ${st === 'locked' ? 't-faint' : ''}`}>{s.name[lang]}</p>
                  <p className="t-faint text-[11px] truncate">{s.short[lang]}</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="num text-xs font-black t-muted" dir="ltr">
                    {s.h}{t(lang, 'stageHourShort')}+
                  </span>
                  <span
                    className="text-[10px] font-black px-2 py-0.5 rounded-full"
                    style={
                      isActive
                        ? { background: s.hue, color: '#fff' }
                        : st === 'done'
                          ? { background: `${s.hue}22`, color: s.hue }
                          : { background: 'var(--ring-track)', color: 'var(--faint)' }
                    }
                  >
                    {isActive ? t(lang, 'fastNow') : st === 'done' ? t(lang, 'fastDoneShort') : t(lang, 'fastLocked')}
                  </span>
                </div>
              </motion.button>
            )
          })}
        </div>
      </section>

      {/* ============ History ============ */}
      <section className="flex flex-col gap-2.5">
        <p className="font-black text-sm flex items-center gap-2">
          <Ico name="CalendarCheck" size={16} className="accent" />
          {t(lang, 'fastHistory')}
        </p>
        {history.length === 0 ? (
          <div className="card p-6 text-center">
            <Ico name="Hourglass" size={26} className="t-faint mx-auto mb-2" />
            <p className="t-muted text-xs">{t(lang, 'fastEmptyHistory')}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {history.slice(0, 6).map((h) => (
              <div key={h.id} className="card flex items-center gap-3 p-3">
                <span
                  className={`w-10 h-10 rounded-xl grid place-items-center ${h.completed ? 'text-emerald-400' : 't-faint'}`}
                  style={{ background: h.completed ? '#34d39918' : 'var(--ring-track)' }}
                >
                  <Ico name={h.completed ? 'Trophy' : 'Hourglass'} size={18} />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-[13px] num" dir="ltr">
                    {h.hours}h / {h.targetHours}h
                  </p>
                  <p className="t-faint text-[11px]">{timeAgo(h.end, lang)}</p>
                </div>
                <span
                  className={`text-[10px] font-black px-2.5 py-1 rounded-full ${
                    h.completed ? 'bg-emerald-400/15 text-emerald-400' : 't-faint'
                  }`}
                  style={!h.completed ? { background: 'var(--ring-track)' } : undefined}
                >
                  {h.completed ? t(lang, 'fastCompleted') : t(lang, 'fastPartial')}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ============ stop confirm sheet ============ */}
      <AnimatePresence>
        {confirmStop && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[70] bg-black/55 backdrop-blur-sm"
              onClick={() => setConfirmStop(false)}
            />
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              className="fixed bottom-6 inset-x-4 z-[75] max-w-sm mx-auto glass-strong rounded-3xl shadow-lux p-5 text-center"
            >
              <p className="font-black text-lg">{t(lang, 'fastStopTitle')}</p>
              <p className="t-muted text-sm mt-2 leading-relaxed">
                {t(lang, 'fastStopBody').replace('{pct}', Math.round(progress * 100))}
              </p>
              <div className="flex gap-2.5 mt-4">
                <button onClick={() => setConfirmStop(false)} className="btn-primary flex-1 rounded-2xl py-3 font-black text-sm">
                  {t(lang, 'fastCancel')}
                </button>
                <button onClick={handleStopConfirm} className="btn-ghost flex-1 rounded-2xl py-3 font-black text-sm text-red-400">
                  {t(lang, 'fastStopConfirm')}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ============ result celebration ============ */}
      <AnimatePresence>
        {result && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm" onClick={() => setResult(null)} />
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-[75] max-w-sm mx-auto glass-strong rounded-[2rem] shadow-lux p-6 text-center"
            >
              <motion.span
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 300, damping: 14 }}
                className={`w-20 h-20 mx-auto rounded-3xl grid place-items-center mb-4 ${
                  result.completed ? 'bg-gradient-to-br from-amber-300 to-orange-400 text-white' : 'btn-ghost'
                }`}
                style={result.completed ? { boxShadow: '0 0 50px -8px #f59e0b99' } : undefined}
              >
                <Ico name={result.completed ? 'Trophy' : 'Hourglass'} size={38} />
              </motion.span>
              <p className="font-black text-xl">
                {result.completed ? t(lang, 'fastCongrats') : `💪 ${lang === 'ar' ? 'محاولة طيبة' : 'Good effort'}`}
              </p>
              <p className="t-muted text-sm mt-2 leading-relaxed">
                {result.completed
                  ? t(lang, 'fastCongratsBody').replace('{h}', String(result.hours)).replace('{p}', result.protocolId)
                  : t(lang, 'fastPartialBody').replace('{h}', String(result.hours)).replace('{t}', String(result.targetHours))}
              </p>
              <button onClick={() => setResult(null)} className="btn-primary rounded-2xl py-3 px-8 font-black text-sm mt-5 w-full">
                {t(lang, 'close')}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <StageModal stage={stageModal} onClose={() => setStageModal(null)} />
    </div>
  )
}
