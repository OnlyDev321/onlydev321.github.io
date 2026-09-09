import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { useTheme } from './hooks/useTheme'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import Navbar from './components/NavBar'
import ScrollProgress from './components/ScrollProgress'
import MagneticCursor from './components/MagneticCursor'
import BigMarquee from './components/BigMarquee'
import Hero from './sections/Hero'
import About from './sections/About'
import Work from './sections/Work'
import Stack from './sections/Stack'
import Process from './sections/Process'
import Experience from './sections/Experience'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

/* The ⌘K palette is lazy-loaded — only enters the bundle when invoked. */
const CommandPalette = lazy(() => import('./components/CommandPalette'))

export default function App() {
  const { theme, toggle, setOrigin } = useTheme()
  const [paletteOpen, setPaletteOpen] = useState(false)

  /* Inertial smooth scroll (Lenis). Disabled under reduced-motion in the hook. */
  useSmoothScroll()

  /* Global ⌘K / Ctrl+K, plus "/" when not in a field. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const meta = e.metaKey || e.ctrlKey
      if (meta && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen(o => !o)
        return
      }
      if (e.key === '/' && !paletteOpen) {
        const t = e.target as HTMLElement | null
        const isField = t?.tagName === 'INPUT' || t?.tagName === 'TEXTAREA' || (t?.isContentEditable ?? false)
        if (!isField) { e.preventDefault(); setPaletteOpen(true) }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [paletteOpen])

  /* Idle-prefetch the palette chunk so the first ⌘K is instant. Cancel with
     the matching API (cancelIdleCallback vs clearTimeout) so the cleanup is
     not a silent no-op under StrictMode / unmount. */
  useEffect(() => {
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void) => number
      cancelIdleCallback?: (id: number) => void
    }
    const prefetch = () => { void import('./components/CommandPalette') }
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(prefetch)
      return () => w.cancelIdleCallback?.(id)
    }
    const id = window.setTimeout(prefetch, 1500)
    return () => window.clearTimeout(id)
  }, [])

  const handleThemeToggle = useCallback(
    (e?: React.MouseEvent) => {
      if (e && typeof e.clientX === 'number') setOrigin(e.clientX, e.clientY)
      toggle()
    },
    [setOrigin, toggle],
  )

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <MagneticCursor />
      <ScrollProgress />
      <Navbar theme={theme} onToggleTheme={handleThemeToggle} onOpenPalette={() => setPaletteOpen(true)} />

      <main id="main">
        <Hero />

        <div className="cv-auto"><About /></div>

        {/* Work is NOT wrapped in cv-auto: its pinned reel sets a dynamic height
            and uses sticky positioning, which fight content-visibility. */}
        <Work />

        <div className="cv-auto"><Stack /></div>

        {/* The single marquee (device #4) — a capabilities ribbon. */}
        <div className="border-y border-[color:var(--line)]">
          <BigMarquee items={['Frameworks', 'LLMs', 'Component libraries', 'On-device ML', 'Full-stack apps']} speed={42} />
        </div>

        <div className="cv-auto"><Process /></div>
        <div className="cv-auto"><Experience /></div>
        <div className="cv-auto"><Contact /></div>
      </main>

      <Footer />

      <Suspense fallback={null}>
        <CommandPalette
          open={paletteOpen}
          onClose={() => setPaletteOpen(false)}
          theme={theme}
          onToggleTheme={() => handleThemeToggle()}
        />
      </Suspense>
    </>
  )
}
