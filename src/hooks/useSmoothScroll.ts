import { useEffect } from 'react'
import Lenis from 'lenis'
import { setLenis } from '../lib/smoothScroll'

/* -------------------------------------------------------------------------- *
 *  useSmoothScroll — installs Lenis inertial smooth-scroll for the whole      *
 *  page. This is the backbone of the "kinetic" feel: scroll-linked Framer     *
 *  transforms (parallax, the pinned work reel, velocity skew) ride on top of  *
 *  a smoothed scroll position.                                                *
 *                                                                             *
 *  Contract:                                                                   *
 *   - Disabled entirely under prefers-reduced-motion (native scroll instead). *
 *   - Manual rAF loop (version-agnostic across Lenis releases).               *
 *   - Registers the instance in the smoothScroll singleton so anchor nav      *
 *     (NavBar / Hero / Footer / CommandPalette) can call lenis.scrollTo.      *
 * -------------------------------------------------------------------------- */
export function useSmoothScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      smoothWheel: true,
    })
    setLenis(lenis)

    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = window.requestAnimationFrame(raf)
    }
    rafId = window.requestAnimationFrame(raf)

    return () => {
      window.cancelAnimationFrame(rafId)
      lenis.destroy()
      setLenis(null)
    }
  }, [])
}
