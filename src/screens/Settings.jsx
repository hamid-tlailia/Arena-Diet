import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../store/useStore'
import { t } from '../i18n'
import Ico from '../components/icons'

const GOALS = [
  { id: 'loseWeight', icon: 'Flame' },
  { id: 'energy', icon: 'Zap' },
  { id: 'health', icon: 'HeartPulse' },
  { id: 'discipline', icon: 'Brain' },
]

export default function Settings() {
  const lang = useStore((s) => s.lang)
  const setLang = useStore((s) => s.setLang)
  const themeMode = useStore((s) => s.themeMode)
  const setThemeMode = useStore((s) => s.setThemeMode)
  const user = useStore((s) => s.user)
  const setUser = useStore((s) => s.setUser)
  const notificationsEnabled = useStore((s) => s.notificationsEnabled)
  const setNotificationsEnabled = useStore((s) => s.setNotificationsEnabled)
  const resetAll = useStore((s) => s.resetAll)
  const pushToast = useStore((s) => s.pushToast)

  const [name, setName] = useState(user.name)
  const [confirmReset, setConfirmReset] = useState(false)
  const [saved, setSaved] = useState(false)

  const goalLabel = (id) => t(lang, { loseWeight: 'goalLose', energy: 'goalEnergy', health: 'goalHealth', discipline: 'goalDiscipline' }[id])

  const saveProfile = () => {
    setUser({ name: name.trim() })
    setSaved(true)
    setTimeout(() => setSaved(false), 1800)
  }

  const toggleNotif = async () => {
    if (notificationsEnabled) {
      setNotificationsEnabled(false)
      return
    }
    if (typeof Notification !== 'undefined' && Notification.permission === 'default') {
      try {
        const perm = await Notification.requestPermission()
        setNotificationsEnabled(true)
        if (perm !== 'granted') {
          pushToast({ kind: 'info', title: '🔔', body: t(lang, 'setNotifDenied') })
        }
      } catch {
        setNotificationsEnabled(true)
      }
    } else {
      setNotificationsEnabled(true)
      if (typeof Notification !== 'undefined' && Notification.permission === 'denied') {
        pushToast({ kind: 'info', title: '🔔', body: t(lang, 'setNotifDenied') })
      }
    }
  }

  const Row = ({ icon, title, children }) => (
    <div className="card p-4">
      <p className="font-black text-sm flex items-center gap-2 mb-3">
        <Ico name={icon} size={16} className="accent" />
        {title}
      </p>
      {children}
    </div>
  )

  const Seg = ({ options, value, onChange }) => (
    <div className="chip rounded-2xl p-1 flex gap-1">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={`flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-black transition-all ${
            value === o.value ? 'bg-gradient-to-br from-[var(--accent)] to-[var(--accent-3)] text-[var(--on-accent)] shadow-glow' : 't-muted'
          }`}
          aria-pressed={value === o.value}
        >
          {o.icon && <Ico name={o.icon} size={13} />}
          {o.label}
        </button>
      ))}
    </div>
  )

  return (
    <div className="flex flex-col gap-4">
      <div className="pt-1">
        <h1 className="text-2xl font-black grad-text">{t(lang, 'setTitle')}</h1>
      </div>

      {/* profile */}
      <Row icon="User" title={t(lang, 'setProfile')}>
        <div className="flex gap-2 mb-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t(lang, 'setNamePh')}
            className="chip rounded-2xl px-4 py-2.5 text-sm font-bold flex-1 bg-transparent outline-none min-w-0"
          />
          <button onClick={saveProfile} className="btn-primary rounded-2xl px-4 py-2.5 text-sm font-black shrink-0">
            {saved ? t(lang, 'setSaved') : t(lang, 'save')}
          </button>
        </div>
        <p className="t-faint text-[11px] font-bold mb-2">{t(lang, 'setGoal')}</p>
        <div className="grid grid-cols-2 gap-2">
          {GOALS.map((g) => (
            <button
              key={g.id}
              onClick={() => setUser({ goal: g.id })}
              className={`chip rounded-2xl p-3 flex items-center gap-2 text-xs font-black transition-all ${
                user.goal === g.id ? 'grad-border' : 'opacity-70'
              }`}
              style={user.goal === g.id ? { background: 'var(--card-hover)' } : undefined}
            >
              <Ico name={g.icon} size={16} className={user.goal === g.id ? 'accent' : 't-faint'} />
              {goalLabel(g.id)}
            </button>
          ))}
        </div>
      </Row>

      {/* language */}
      <Row icon="Languages" title={t(lang, 'setLang')}>
        <Seg
          value={lang}
          onChange={setLang}
          options={[
            { value: 'ar', label: 'العربية', icon: 'Globe' },
            { value: 'en', label: 'English', icon: 'Globe' },
          ]}
        />
      </Row>

      {/* theme */}
      <Row icon="Palette" title={t(lang, 'setTheme')}>
        <Seg
          value={themeMode}
          onChange={setThemeMode}
          options={[
            { value: 'auto', label: t(lang, 'themeAuto'), icon: 'RefreshCw' },
            { value: 'day', label: t(lang, 'themeDay'), icon: 'Sunrise' },
            { value: 'night', label: t(lang, 'themeNight'), icon: 'Moon' },
          ]}
        />
      </Row>

      {/* notifications */}
      <Row icon="BellRing" title={t(lang, 'setNotif')}>
        <p className="t-muted text-xs leading-relaxed mb-3">{t(lang, 'setNotifDesc')}</p>
        <button
          onClick={toggleNotif}
          className={`w-full rounded-2xl py-3 font-black text-sm flex items-center justify-center gap-2 ${notificationsEnabled ? 'btn-primary' : 'btn-ghost'}`}
          role="switch"
          aria-checked={notificationsEnabled}
        >
          <Ico name={notificationsEnabled ? 'Bell' : 'BellOff'} size={16} />
          {notificationsEnabled ? t(lang, 'setNotifOn') : t(lang, 'setNotifOff')}
        </button>
      </Row>

      {/* danger */}
      <Row icon="Trash2" title={t(lang, 'setData')}>
        <p className="t-muted text-xs leading-relaxed mb-3">{t(lang, 'setResetDesc')}</p>
        <button
          onClick={() => (confirmReset ? (resetAll(), setConfirmReset(false)) : setConfirmReset(true))}
          className="w-full rounded-2xl py-3 font-black text-sm text-red-400 border border-red-400/30 bg-red-400/5 transition-transform active:scale-[0.98]"
        >
          {confirmReset ? `⚠️ ${t(lang, 'setResetConfirm')}` : t(lang, 'setReset')}
        </button>
      </Row>

      <p className="text-center t-faint text-[11px] font-semibold pb-2">{t(lang, 'setVersion')}</p>
    </div>
  )
}
