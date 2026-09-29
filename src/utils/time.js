// ===== time & number helpers (bilingual aware) =====

export const pad = (n) => String(n).padStart(2, '0')

export function fmtClock(ms) {
  const s = Math.max(0, Math.floor(ms / 1000))
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  return `${pad(h)}:${pad(m)}:${pad(sec)}`
}

export function fmtHM(hoursFloat) {
  const h = Math.floor(hoursFloat)
  const m = Math.round((hoursFloat - h) * 60)
  return m ? `${h}h ${m}m` : `${h}h`
}

export const dayKey = (d = new Date()) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

export const yesterdayKey = () => {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return dayKey(d)
}

export const dateOnly = (ts) => dayKey(new Date(ts))

// Arabic pluralization: arUnit(5,'ساعة','ساعتان','ساعات','ساعة')
export function arUnit(n, one, two, few, many) {
  if (n === 1) return `${n} ${one}`
  if (n === 2) return two
  if (n >= 3 && n <= 10) return `${n} ${few}`
  return `${n} ${many}`
}

export function timeAgo(ts, lang) {
  const diff = Date.now() - ts
  const m = Math.floor(diff / 60000)
  const h = Math.floor(m / 60)
  const d = Math.floor(h / 24)
  if (lang === 'ar') {
    if (m < 1) return 'الآن'
    if (m < 60) return `قبل ${arUnit(m, 'دقيقة', 'دقيقتين', 'دقائق', 'دقيقة')}`
    if (h < 24) return `قبل ${arUnit(h, 'ساعة', 'ساعتين', 'ساعات', 'ساعة')}`
    return `قبل ${arUnit(d, 'يوم', 'يومين', 'أيام', 'يومًا')}`
  }
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  if (h < 24) return `${h}h ago`
  return `${d}d ago`
}

// deterministic pseudo-random from a string seed (for daily insights)
export function seededPick(seedStr, arr) {
  let h = 2166136261
  for (let i = 0; i < seedStr.length; i++) {
    h ^= seedStr.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return arr[Math.abs(h) % arr.length]
}
