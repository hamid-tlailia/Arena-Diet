import { memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { STAGES } from '../data/fasting'
import { fmtClock } from '../utils/time'
import Ico from './icons'

const R = 128
const C = 2 * Math.PI * R

/**
 * The luminous fasting ring:
 * - gradient arc fills with elapsed hours
 * - the "logo" of the current body-process ignites in the center
 * - stage beacons light up around the ring as their hour passes
 */
function FastingRing({ elapsedMs, targetHours, stage, lang, labels }) {
  const elapsedH = elapsedMs / 36e5
  const progress = Math.min(1, elapsedH / targetHours)
  const done = progress >= 1

  const beacons = STAGES.filter((s) => s.h > 0 && s.h < targetHours)

  return (
    <div className="relative mx-auto" style={{ width: 300, height: 300 }}>
      {/* halo */}
      <div
        className="absolute inset-0 rounded-full blur-3xl opacity-40 animate-pulse-soft"
        style={{ background: `radial-gradient(circle, ${stage.hue}55, transparent 70%)` }}
      />

      <svg viewBox="0 0 300 300" className="w-full h-full -rotate-90">
        <defs>
          <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={stage.hue} />
            <stop offset="60%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--accent-3)" />
          </linearGradient>
          <filter id="ring-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* track */}
        <circle cx="150" cy="150" r={R} fill="none" stroke="var(--ring-track)" strokeWidth="13" />

        {/* progress arc */}
        <circle
          cx="150"
          cy="150"
          r={R}
          fill="none"
          stroke="url(#ring-grad)"
          strokeWidth="13"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - progress)}
          filter="url(#ring-glow)"
          style={{ transition: 'stroke-dashoffset 1s cubic-bezier(.4,0,.2,1), stroke 1s' }}
        />

        {/* stage beacons */}
        {beacons.map((s) => {
          const angle = (s.h / targetHours) * Math.PI * 2
          const x = 150 + Math.cos(angle) * R
          const y = 150 + Math.sin(angle) * R
          const passed = elapsedH >= s.h
          const isNow = stage.id === s.id
          return (
            <g key={s.id} style={{ transition: 'opacity .6s' }}>
              {isNow && <circle cx={x} cy={y} r="13" fill={s.hue} opacity="0.35" className="animate-pulse-soft" />}
              <circle
                cx={x}
                cy={y}
                r={isNow ? 8 : passed ? 6 : 4.5}
                fill={passed ? s.hue : 'var(--ring-track)'}
                stroke={passed ? 'none' : 'var(--faint)'}
                strokeWidth="0.8"
                style={{ transition: 'all .8s ease', filter: passed ? `drop-shadow(0 0 6px ${s.hue})` : 'none' }}
              />
            </g>
          )
        })}
      </svg>

      {/* center: current process logo + timer */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={stage.id}
            initial={{ scale: 0.3, opacity: 0, rotate: -30 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.3, opacity: 0, rotate: 30 }}
            transition={{ type: 'spring', stiffness: 320, damping: 20 }}
            className="w-16 h-16 rounded-3xl grid place-items-center mb-1"
            style={{ background: `${stage.hue}22`, boxShadow: `0 0 30px -4px ${stage.hue}88`, color: stage.hue }}
          >
            <Ico name={stage.icon} size={30} strokeWidth={1.8} />
          </motion.div>
        </AnimatePresence>

        <p className="num text-[42px] leading-none font-black tracking-tight" dir="ltr">
          {fmtClock(elapsedMs)}
        </p>
        <p className="t-muted text-xs font-bold mt-1" style={{ color: stage.hue }}>
          {stage.name[lang]}
        </p>
        <p className="t-faint text-[11px] font-semibold num mt-0.5" dir="ltr">
          {Math.round(progress * 100)}% {done ? `— ${labels?.done || ''}` : ''}
        </p>
      </div>
    </div>
  )
}

export default memo(FastingRing)
