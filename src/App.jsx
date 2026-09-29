import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore, selectEffectiveTheme } from './store/useStore'
import { isRTL } from './i18n'
import useSmartEngine from './hooks/useSmartEngine'
import Aurora from './components/Aurora'
import Header from './components/Header'
import BottomNav from './components/BottomNav'
import Toasts from './components/Toasts'
import Onboarding from './screens/Onboarding'
import Home from './screens/Home'
import Fasting from './screens/Fasting'
import Diets from './screens/Diets'
import Coach from './screens/Coach'
import Settings from './screens/Settings'

export default function App() {
  const lang = useStore((s) => s.lang)
  const theme = useStore(selectEffectiveTheme)
  const onboarded = useStore((s) => s.onboarded)
  const [tab, setTab] = useState('home')
  const [dietSel, setDietSel] = useState(null)

  // smart notification engine
  useSmartEngine()

  // theme + language wiring to <html>
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.lang = lang
    document.documentElement.dir = isRTL(lang) ? 'rtl' : 'ltr'
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', theme === 'day' ? '#fff7ec' : '#060a1c')
  }, [theme, lang])

  const goTab = (id) => {
    setTab(id)
    if (id !== 'diets') setDietSel(null)
  }

  if (!onboarded) {
    return (
      <>
        <Aurora />
        <Onboarding />
        <Toasts />
      </>
    )
  }

  const SCREENS = {
    home: <Home goTab={goTab} />,
    fasting: <Fasting />,
    diets: <Diets selected={dietSel} setSelected={setDietSel} />,
    coach: <Coach />,
    settings: <Settings />,
  }

  return (
    <div className="min-h-dvh">
      <Aurora />
      <div className="max-w-md mx-auto px-4 pb-32 pt-3 min-h-dvh">
        <Header />
        <main className="mt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab + (dietSel ? '-detail' : '')}
              initial={{ opacity: 0, y: 18, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.99 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {SCREENS[tab]}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <BottomNav tab={tab} setTab={goTab} />
      <Toasts />
    </div>
  )
}
