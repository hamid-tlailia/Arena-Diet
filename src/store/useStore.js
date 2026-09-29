// ===== Persistent app store (Zustand + localStorage) =====
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { dayKey, yesterdayKey, dateOnly } from '../utils/time'

const initialProgress = {
  fasting: { status: 'idle', protocolId: '16-8', startTime: null, targetHours: 16, notified: [] },
  history: [],
  streak: { current: 0, best: 0, lastActive: null, fastStreak: 0, lastFastDate: null },
  daysActive: 0,
  completedFasts: 0,
  badges: [],
  interests: {},
  notifications: [],
  lastNudgeDate: null,
  lastComebackDate: null,
  regenCount: 0,
}

let toastSeq = 0

export const useStore = create(
  persist(
    (set, get) => ({
      // --- prefs ---
      lang: 'ar',
      themeMode: 'auto', // auto | day | night
      onboarded: false,
      notificationsEnabled: false,
      user: { name: '', goal: 'loseWeight' },
      activeDiet: 'if',

      ...initialProgress,

      toasts: [], // transient (not persisted across reloads by partialize)

      // --- actions ---
      setLang: (lang) => set({ lang }),
      setThemeMode: (themeMode) => set({ themeMode }),
      setUser: (patch) => set((s) => ({ user: { ...s.user, ...patch } })),
      finishOnboarding: () => set({ onboarded: true }),
      setActiveDiet: (activeDiet) => set({ activeDiet }),
      setNotificationsEnabled: (notificationsEnabled) => set({ notificationsEnabled }),

      // engagement / passion tracking
      viewDiet: (id) =>
        set((s) => {
          const cur = s.interests[id] || { views: 0, lastViewed: 0 }
          return { interests: { ...s.interests, [id]: { views: cur.views + 1, lastViewed: Date.now() } } }
        }),

      touch: () => {
        const today = dayKey()
        const s = get()
        if (s.streak.lastActive === today) return
        set((st) => {
          const isConsecutive = st.streak.lastActive === yesterdayKey()
          const current = isConsecutive ? st.streak.current + 1 : 1
          const badges = [...st.badges]
          const hour = new Date().getHours()
          if (hour < 7 && !badges.includes('earlyBird')) badges.push('earlyBird')
          if (hour >= 0 && hour < 3 && !badges.includes('nightOwl')) badges.push('nightOwl')
          if (current >= 3 && !badges.includes('streak3')) badges.push('streak3')
          if (current >= 7 && !badges.includes('streak7')) badges.push('streak7')
          return {
            streak: { ...st.streak, current, best: Math.max(st.streak.best, current), lastActive: today },
            daysActive: st.daysActive + 1,
            badges,
          }
        })
      },

      awardBadge: (id) =>
        set((s) => (s.badges.includes(id) ? s : { badges: [...s.badges, id] })),

      startFast: (protocolId, targetHours) =>
        set({
          fasting: {
            status: 'running',
            protocolId,
            startTime: Date.now(),
            targetHours,
            notified: ['fed'],
          },
        }),

      stopFast: () => {
        const s = get()
        const f = s.fasting
        if (f.status !== 'running') return null
        const end = Date.now()
        const elapsedH = (end - f.startTime) / 36e5
        const completed = elapsedH >= f.targetHours
        const entry = {
          id: `${f.startTime}`,
          protocolId: f.protocolId,
          start: f.startTime,
          end,
          hours: Math.round(elapsedH * 10) / 10,
          targetHours: f.targetHours,
          completed,
        }
        set((st) => {
          const badges = [...st.badges]
          let fastStreak = st.streak.fastStreak
          let lastFastDate = st.streak.lastFastDate
          if (completed) {
            const today = dateOnly(end)
            if (lastFastDate !== today) {
              fastStreak = lastFastDate === yesterdayKey() ? fastStreak + 1 : 1
              lastFastDate = today
            }
            if (!badges.includes('firstFast')) badges.push('firstFast')
            if (f.targetHours >= 20 && !badges.includes('warrior')) badges.push('warrior')
            if (elapsedH >= 18 && !badges.includes('renewal')) badges.push('renewal')
          }
          return {
            fasting: { ...f, status: 'idle', startTime: null, notified: [] },
            history: [entry, ...st.history].slice(0, 60),
            completedFasts: completed ? st.completedFasts + 1 : st.completedFasts,
            streak: { ...st.streak, fastStreak, lastFastDate },
            badges,
          }
        })
        return entry
      },

      markNotified: (ids) =>
        set((s) => ({ fasting: { ...s.fasting, notified: [...new Set([...s.fasting.notified, ...ids])] } })),

      setNudgeDate: (d) => set({ lastNudgeDate: d }),
      setComebackDate: (d) => set({ lastComebackDate: d }),
      incRegen: () => set((s) => ({ regenCount: s.regenCount + 1 })),

      // notifications (persisted history) + toasts (transient)
      notify: ({ title, body, kind = 'info' }) => {
        const n = { id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, ts: Date.now(), title, body, kind, read: false }
        set((s) => ({ notifications: [n, ...s.notifications].slice(0, 40) }))
        // real browser push if permission granted
        const st = get()
        if (st.notificationsEnabled && typeof Notification !== 'undefined' && Notification.permission === 'granted') {
          try {
            new Notification(title, { body, icon: './favicon.svg' })
          } catch {
            /* in-app only */
          }
        }
        get().pushToast({ title, body, kind })
      },

      pushToast: (t) => {
        const id = ++toastSeq
        set((s) => ({ toasts: [...s.toasts.slice(-2), { id, ...t }] }))
        return id
      },
      dismissToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),

      markAllRead: () => set((s) => ({ notifications: s.notifications.map((n) => ({ ...n, read: true })) })),

      resetAll: () => {
        set({
          ...initialProgress,
          onboarded: false,
          notificationsEnabled: false,
          user: { name: '', goal: 'loseWeight' },
          activeDiet: 'if',
          toasts: [],
        })
      },
    }),
    {
      name: 'lumina-diet-v1',
      partialize: (s) => {
        const { toasts, ...rest } = s
        return rest
      },
    },
  ),
)

// --- derived selectors ---
export const selectEffectiveTheme = (s) => {
  if (s.themeMode !== 'auto') return s.themeMode
  const h = new Date().getHours()
  return h >= 6 && h < 18 ? 'day' : 'night'
}

export const selectElapsedMs = (s) =>
  s.fasting.status === 'running' && s.fasting.startTime ? Date.now() - s.fasting.startTime : 0
