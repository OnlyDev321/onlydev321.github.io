import type Lenis from 'lenis'

/* -------------------------------------------------------------------------- *
 *  Smooth-scroll singleton. App.tsx owns the Lenis instance (see              *
 *  useSmoothScroll); everyone else navigates through these helpers so anchor  *
 *  jumps stay buttery and consistent. Falls back to native smooth scroll when *
 *  Lenis is absent (reduced-motion, SSR, or before mount).                    *
 * -------------------------------------------------------------------------- */

let instance: Lenis | null = null

export function setLenis(l: Lenis | null) {
  instance = l
}

export function getLenis(): Lenis | null {
  return instance
}

/** Header offset so anchored sections don't hide under the fixed nav. */
const NAV_OFFSET = -76

export function scrollToId(id: string) {
  const target = id.startsWith('#') ? id : `#${id}`
  const el = document.querySelector<HTMLElement>(target)
  if (!el) return
  if (instance) {
    instance.scrollTo(el, { offset: NAV_OFFSET, duration: 1.1 })
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export function scrollToTop() {
  if (instance) instance.scrollTo(0, { duration: 1.1 })
  else window.scrollTo({ top: 0, behavior: 'smooth' })
}
