import { useEffect, useRef } from 'react'

/* -------------------------------------------------------------------------- *
 *  MAGNETIC CURSOR (device #5) — two-layer pointer.                           *
 *                                                                            *
 *  Inner dot follows the real cursor 1:1. Outer ring lerps behind and snaps  *
 *  to any element declaring `data-cursor="target"`, growing to a halo and    *
 *  tinting with the accent. While snapped, the ring stays glued to the       *
 *  target by re-reading its rect inside the single rAF loop — so there is    *
 *  NO window 'scroll' listener (Lenis owns scroll), and the only layout      *
 *  read happens while actively hovering a target (bounded, rare).            *
 *                                                                            *
 *  Spawns nothing on touch / coarse pointer / reduced motion.               *
 * -------------------------------------------------------------------------- */
export default function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx
    let ry = my
    let snapEl: HTMLElement | null = null

    const onMove = (e: PointerEvent) => {
      mx = e.clientX
      my = e.clientY
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`
    }

    const onOver = (e: PointerEvent) => {
      const t = (e.target as Element | null)?.closest?.('[data-cursor="target"]')
      if (t instanceof HTMLElement) {
        snapEl = t
        ring.classList.add('is-snapped')
      } else if (snapEl) {
        snapEl = null
        ring.classList.remove('is-snapped')
      }
    }

    const onDown = () => ring.classList.add('is-pressed')
    const onUp = () => ring.classList.remove('is-pressed')
    const onLeave = () => { dot.style.opacity = '0'; ring.style.opacity = '0' }
    const onEnter = () => { dot.style.opacity = '1'; ring.style.opacity = '1' }

    /* One rAF loop, transforms only. The single layout read (rect) happens
       only while snapped to a target. */
    let rafId = 0
    const tick = () => {
      let tx = mx
      let ty = my
      if (snapEl) {
        if (snapEl.isConnected) {
          const r = snapEl.getBoundingClientRect()
          tx = r.left + r.width / 2
          ty = r.top + r.height / 2
        } else {
          snapEl = null
          ring.classList.remove('is-snapped')
        }
      }
      rx += (tx - rx) * 0.18
      ry += (ty - ry) * 0.18
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`
      rafId = window.requestAnimationFrame(tick)
    }

    document.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver, { passive: true })
    document.addEventListener('pointerdown', onDown, { passive: true })
    document.addEventListener('pointerup', onUp, { passive: true })
    document.addEventListener('pointerleave', onLeave, { passive: true })
    document.addEventListener('pointerenter', onEnter, { passive: true })
    rafId = window.requestAnimationFrame(tick)

    return () => {
      window.cancelAnimationFrame(rafId)
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('pointerup', onUp)
      document.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('pointerenter', onEnter)
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  )
}
