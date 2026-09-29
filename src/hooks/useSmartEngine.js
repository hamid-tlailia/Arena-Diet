import { useEffect, useRef } from 'react'
import { useStore } from '../store/useStore'
import { STAGES, stageForElapsed } from '../data/fasting'
import { generateMessage, buildContext } from '../coach/engine'
import { dayKey, yesterdayKey } from '../utils/time'

/**
 * The «smart brain» — watches time, fasting stages, streaks and passion,
 * and fires AI-generated motivational notifications at the right moment.
 */
export default function useSmartEngine() {
  const timer = useRef(null)

  useEffect(() => {
    const s0 = useStore.getState()
    s0.touch() // streak tracking / daily activity

    // comeback detection (was away ≥ 2 days)
    const last = s0.streak.lastActive
    if (last && last !== dayKey() && last !== yesterdayKey() && s0.lastComebackDate !== dayKey()) {
      const ctx = buildContext(s0, s0.lang)
      const msg = generateMessage('comeback', ctx, s0.lang)
      s0.notify({ ...msg, kind: 'info' })
      s0.setComebackDate(dayKey())
    }

    const tick = () => {
      const s = useStore.getState()
      const ctx = buildContext(s, s.lang)
      const hour = new Date().getHours()
      const today = dayKey()

      // ---- fasting engine ----
      if (s.fasting.status === 'running' && s.fasting.startTime) {
        const elapsedH = (Date.now() - s.fasting.startTime) / 36e5
        const target = s.fasting.targetHours
        const toNotify = []

        // stage ignition notifications
        for (const st of STAGES) {
          if (st.h > 0 && elapsedH >= st.h && st.h <= target && !s.fasting.notified.includes(st.id)) {
            const cur = stageForElapsed(elapsedH)
            const msg = generateMessage('stage', ctx, s.lang, {
              stageName: st.name[s.lang],
              stageHint: st.short[s.lang],
            })
            s.notify({ ...msg, kind: st.h >= 18 ? 'badge' : 'info' })
            toNotify.push(st.id)
          }
        }

        // 80% milestone
        if (elapsedH >= target * 0.8 && !s.fasting.notified.includes('m80')) {
          const msg = generateMessage('milestone', ctx, s.lang, { pct: 80 })
          s.notify({ ...msg, kind: 'info' })
          toNotify.push('m80')
        }

        // goal reached
        if (elapsedH >= target && !s.fasting.notified.includes('goal')) {
          const msg = generateMessage('goal', ctx, s.lang, { hours: target })
          s.notify({ ...msg, kind: 'success' })
          toNotify.push('goal')
        }

        if (toNotify.length) s.markNotified(toNotify)
      }

      // ---- daily motivational pulses (max 1/day) ----
      if (s.lastNudgeDate !== today && s.notificationsEnabled) {
        if (hour >= 7 && hour <= 10) {
          const msg = generateMessage('morning', ctx, s.lang)
          s.notify({ ...msg, kind: 'info' })
          s.setNudgeDate(today)
        } else if (hour >= 20 && hour <= 23) {
          // evening: streak risk if no fast today
          const didToday = s.fasting.status === 'running' || s.streak.lastFastDate === today
          const kind = didToday ? 'evening' : 'streakRisk'
          const msg = generateMessage(kind, ctx, s.lang)
          s.notify({ ...msg, kind: didToday ? 'info' : 'badge' })
          s.setNudgeDate(today)
        }
      }
    }

    timer.current = setInterval(tick, 5000)
    const first = setTimeout(tick, 2500)
    return () => {
      clearInterval(timer.current)
      clearTimeout(first)
    }
  }, [])
}
