import { motion, useScroll, useSpring } from 'framer-motion'

/* Thin top scroll-progress bar. Solid accent (no gradient chrome). */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 110, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'var(--accent)',
        transformOrigin: 'left',
        scaleX,
        zIndex: 50,
      }}
    />
  )
}
