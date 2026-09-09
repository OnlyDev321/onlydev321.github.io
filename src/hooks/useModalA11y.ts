import { useEffect, type RefObject } from 'react'

/* -------------------------------------------------------------------------- *
 *  useModalA11y — one hook for every overlay (ProjectModal, CommandPalette,    *
 *  the mobile nav menu). It owns the full dialog accessibility contract:       *
 *                                                                              *
 *   - ref-counted body scroll-lock (so overlapping overlays never clobber      *
 *     each other's lock and the previous value is always restored),            *
 *   - initial focus moved into the dialog,                                     *
 *   - a Tab / Shift+Tab focus trap kept inside the container,                  *
 *   - Escape-to-close,                                                          *
 *   - focus restored to the opener when the dialog closes.                     *
 * -------------------------------------------------------------------------- */

let lockCount = 0
let savedOverflow = ''

function lockScroll() {
  if (lockCount === 0) {
    savedOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  }
  lockCount += 1
}
function unlockScroll() {
  lockCount = Math.max(0, lockCount - 1)
  if (lockCount === 0) document.body.style.overflow = savedOverflow
}

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])'

interface Options {
  /** 'first' focuses the first focusable child; 'container' focuses the panel itself. */
  initialFocus?: 'first' | 'container'
}

export function useModalA11y(
  open: boolean,
  containerRef: RefObject<HTMLElement | null>,
  onClose: () => void,
  { initialFocus = 'first' }: Options = {},
) {
  useEffect(() => {
    if (!open) return
    const container = containerRef.current
    const opener = (document.activeElement as HTMLElement | null) ?? null

    lockScroll()

    const focusables = () =>
      container
        ? Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(el => el.offsetParent !== null)
        : []

    /* Initial focus — next frame so the element is laid out. */
    const raf = requestAnimationFrame(() => {
      const f = focusables()
      if (initialFocus === 'first' && f[0]) f[0].focus()
      else if (container) {
        if (!container.hasAttribute('tabindex')) container.setAttribute('tabindex', '-1')
        container.focus()
      }
    })

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const f = focusables()
      if (f.length === 0) { e.preventDefault(); return }
      const first = f[0]
      const last = f[f.length - 1]
      const activeInside = container?.contains(document.activeElement)
      if (e.shiftKey && (document.activeElement === first || !activeInside)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && (document.activeElement === last || !activeInside)) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey, true)
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('keydown', onKey, true)
      unlockScroll()
      opener?.focus?.()
    }
    // Re-run only when the open state flips; the container ref is read live.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])
}
