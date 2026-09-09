import { Children, type ReactNode, isValidElement } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'

/* -------------------------------------------------------------------------- *
 *  KINETIC PRIMITIVES                                                          *
 *                                                                             *
 *  <KineticText> — word-by-word mask reveal on scroll-entry. Pass a string,   *
 *  or an array mixing strings and styled nodes (e.g. a `.serif-italic` accent *
 *  word). Strings split into words; each word rises out of an overflow-clip   *
 *  mask, staggered. Element children reveal as one unit (keeps inline style). *
 *                                                                             *
 *  <Reveal> — generic block fade/slide-in on scroll-entry.                    *
 *                                                                             *
 *  Both collapse to a STATIC render under prefers-reduced-motion (the spec's  *
 *  true baseline — the page reads correctly with motion off).                 *
 * -------------------------------------------------------------------------- */

const EASE = [0.23, 1, 0.32, 1] as const

type Tag = 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4'

interface KineticTextProps {
  children: ReactNode
  as?: Tag
  className?: string
  id?: string
  stagger?: number
  delay?: number
  once?: boolean
  margin?: string
}

export function KineticText({
  children,
  as = 'span',
  className = '',
  id,
  stagger = 0.045,
  delay = 0,
  once = true,
  margin = '-12% 0px -12% 0px',
}: KineticTextProps) {
  const reduce = useReducedMotion()
  const Comp = motion[as]

  if (reduce) {
    const Static = as
    return <Static className={className} id={id}>{children}</Static>
  }

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  }
  const word: Variants = {
    hidden: { y: '115%' },
    show: { y: 0, transition: { duration: 0.7, ease: EASE } },
  }

  /* Generous vertical padding so the overflow-clip mask never cuts ascenders,
   * descenders, or serif-italic swashes on large display type (the negative
   * margins cancel it, so layout/leading is unchanged). */
  const maskStyle = {
    paddingTop: '0.1em',
    paddingBottom: '0.3em',
    marginTop: '-0.1em',
    marginBottom: '-0.3em',
  }
  const tokens: ReactNode[] = []
  Children.toArray(children).forEach((child, ci) => {
    if (typeof child === 'string' || typeof child === 'number') {
      String(child).split(/(\s+)/).forEach((part, pi) => {
        if (part === '') return
        if (/^\s+$/.test(part)) {
          tokens.push(<span key={`s-${ci}-${pi}`}> </span>)
        } else {
          tokens.push(
            <span key={`w-${ci}-${pi}`} className="inline-flex overflow-hidden align-bottom" style={maskStyle}>
              <motion.span variants={word} className="inline-block">{part}</motion.span>
            </span>,
          )
        }
      })
    } else if (isValidElement(child)) {
      tokens.push(
        <span key={`e-${ci}`} className="inline-flex overflow-hidden align-bottom" style={maskStyle}>
          <motion.span variants={word} className="inline-block">{child}</motion.span>
        </span>,
      )
    }
  })

  return (
    <Comp id={id} className={className} variants={container} initial="hidden" whileInView="show" viewport={{ once, margin }}>
      {tokens}
    </Comp>
  )
}

interface RevealProps {
  children: ReactNode
  as?: Tag
  className?: string
  delay?: number
  y?: number
  once?: boolean
  margin?: string
}

export function Reveal({
  children,
  as = 'div',
  className = '',
  delay = 0,
  y = 22,
  once = true,
  margin = '-10% 0px -10% 0px',
}: RevealProps) {
  const reduce = useReducedMotion()
  const Comp = motion[as]

  if (reduce) {
    const Static = as
    return <Static className={className}>{children}</Static>
  }

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </Comp>
  )
}
