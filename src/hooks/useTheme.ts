import { useEffect, useRef, useState } from 'react'

/* -------------------------------------------------------------------------- *
 *  useTheme — dark/light with View Transitions for the toggle.               *
 *                                                                            *
 *  Where supported (Chromium 111+, Safari 18, Firefox behind flag), the      *
 *  toggle plays a circular-clip reveal that originates from the click point. *
 *  Chrome's `View Transitions API` lets us snapshot the old DOM, mutate, and *
 *  cross-fade the two with a custom CSS transition. The clip-path animation  *
 *  is owned by the consumer of this hook (see index.css `::view-transition`  *
 *  rules).                                                                   *
 *                                                                            *
 *  Where unsupported, the function still works — it just flips synchronously *
 *  with no animation. No JS fallback / polyfill: this is enhancement, not    *
 *  required behaviour.                                                       *
 *                                                                            *
 *  Reduced-motion users skip the transition outright.                        *
 * -------------------------------------------------------------------------- */

type Theme = 'dark' | 'light'

/* The View Transitions API is widely shipped (Chromium 111+, Safari 18) but
 * some TS lib versions don't yet declare `startViewTransition` on Document.
 * We narrow via an unknown intermediate so TS doesn't conflict with newer
 * lib types where the method *is* declared. */
type StartViewTransition = (cb: () => void | Promise<void>) => unknown

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  const saved = localStorage.getItem('theme') as Theme | null
  if (saved === 'dark' || saved === 'light') return saved
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  /* The next click coordinate is captured in a ref so the consumer can pass
   * it through a normal onClick — no need to thread MouseEvent into the
   * toggle signature. */
  const originRef = useRef<{ x: number; y: number } | null>(null)
  const setOrigin = (x: number, y: number) => {
    originRef.current = { x, y }
  }

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'

    /* Always commit the theme change. Belt-and-suspenders: the View
     * Transitions wipe is decorative; the underlying setTheme MUST run. */
    const commit = () => setTheme(next)

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const docVT = document as unknown as {
      startViewTransition?: StartViewTransition
    }

    if (reduce || typeof docVT.startViewTransition !== 'function') {
      commit()
      return
    }

    /* Default origin: top-right of the navbar (where the toggle button
     * lives) so even keyboard activation gets a credible reveal arc. */
    const o =
      originRef.current ?? {
        x: window.innerWidth - 56,
        y: 40,
      }
    document.documentElement.style.setProperty('--theme-origin-x', `${o.x}px`)
    document.documentElement.style.setProperty('--theme-origin-y', `${o.y}px`)

    /* Hypotenuse to the farthest viewport corner — the clip-circle radius
     * needed to cover the whole page from the origin. */
    const farX = Math.max(o.x, window.innerWidth - o.x)
    const farY = Math.max(o.y, window.innerHeight - o.y)
    const radius = Math.hypot(farX, farY)
    document.documentElement.style.setProperty('--theme-radius', `${radius}px`)

    document.documentElement.setAttribute(
      'data-vt-direction',
      next === 'dark' ? 'to-dark' : 'to-light',
    )

    /* IMPORTANT: call startViewTransition *on* document, not as a detached
     * reference. Some Chromium builds throw "Illegal invocation" otherwise
     * because `this` is not a Document. We also wrap in try/catch and
     * always fall back to a plain setTheme so the toggle never silently
     * fails — that was the root cause of the "theme toggle does nothing"
     * report. */
    try {
      const transition = docVT.startViewTransition.call(document, commit)
      void transition
    } catch {
      commit()
    }
  }

  return { theme, toggle, setOrigin }
}
