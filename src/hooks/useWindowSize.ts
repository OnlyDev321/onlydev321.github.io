import { useState, useEffect } from 'react'

export function useWindowSize() {
  const [width, setWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1024
  )

  useEffect(() => {
    // Use ResizeObserver on body for foldable devices that change viewport
    // without triggering window resize, fallback to resize event
    let raf: number
    const handler = () => {
      raf = requestAnimationFrame(() => setWidth(window.innerWidth))
    }
    window.addEventListener('resize', handler, { passive: true })
    // Also catch orientation changes on mobile
    window.addEventListener('orientationchange', handler, { passive: true })
    return () => {
      window.removeEventListener('resize', handler)
      window.removeEventListener('orientationchange', handler)
      cancelAnimationFrame(raf)
    }
  }, [])

  return {
    width,
    // Mobile: everything under 768px (iPad Mini breakpoint)
    // This covers: Galaxy Z Fold folded (344), S8+ (360), SE (375),
    // 12 Pro (390), Pixel 7 (412), S20 Ultra (412), A51/71 (412),
    // XR (414), 14 Pro Max (430), Surface Duo (540)
    isMobile: width < 768,
  }
}
