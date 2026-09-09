import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { processSteps } from '../data/process'
import { Container, Section, SectionHeader } from '../components/ui'
import { Reveal } from '../components/Kinetic'

/* -------------------------------------------------------------------------- *
 *  PROCESS — earned 01..05 indices as a vertical stepped list on a hairline.  *
 *                                                                             *
 *  Structure is the message: a single `border-l` rail carries the steps; the  *
 *  mono step index is the big structural cue (text-h2, ink-faint); the        *
 *  display title + short body read like an editorial spec sheet; artifacts    *
 *  are small mono `.chip` tags. Every rail node dot is the ONE chrome accent  *
 *  (`--accent`); chrome stays a single hue throughout.                        *
 *                                                                             *
 *  The only motion is the entry stagger (~80ms/item) and an accent draw-line  *
 *  that fills the rail as the section scrolls. Both collapse to a correct     *
 *  static render under prefers-reduced-motion.                                *
 * -------------------------------------------------------------------------- */

export default function Process() {
  const reduce = useReducedMotion()
  const railRef = useRef<HTMLDivElement>(null)

  /* Accent draw-line: scaleY fills the rail in step with scroll progress. */
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start 70%', 'end 60%'],
  })
  const drawScale = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 })

  return (
    <Section id="process" aria-labelledby="process-heading">
      <Container>
        <SectionHeader
          index="03"
          label="PROCESS"
          title={['From idea to ', <span key="shipped" className="serif-italic">shipped.</span>]}
          lede="No surprises in the middle. The same discipline behind a framework, a model, and an app."
          id="process-heading"
        />

        <div ref={railRef} className="relative mt-12 sm:mt-16">
          {/* Structural rail — the single hairline the steps hang from. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-2 bottom-2 left-[6px] w-px bg-[color:var(--line)] sm:left-[6.5rem]"
          />
          {/* Accent draw-line — fills the rail on scroll (the one chrome hue). */}
          <motion.span
            aria-hidden="true"
            style={{ scaleY: reduce ? 1 : drawScale }}
            className="pointer-events-none absolute top-2 bottom-2 left-[6px] w-px origin-top bg-[color:var(--accent)] sm:left-[6.5rem]"
          />

          <ol className="relative">
            {processSteps.map((step, i) => (
              <li key={step.id} className="relative">
                <Reveal
                  delay={i * 0.08}
                  className="grid grid-cols-1 pb-12 last:pb-0 sm:grid-cols-[5.5rem_1fr] sm:gap-x-8 sm:pb-16"
                >
                  {/* Rail node dot — the one chrome accent, centered on the hairline. */}
                  <span
                    aria-hidden="true"
                    className="absolute top-[7px] left-0 grid h-3.5 w-3.5 place-items-center sm:left-[calc(6.5rem-7px)]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
                    <span className="absolute inset-0 rounded-full border border-[color:var(--accent)] opacity-30" />
                  </span>

                  {/* Big mono index — structure, not decoration. Above title on xs. */}
                  <span className="pl-7 font-mono text-h2 leading-none text-[color:var(--ink-faint)] sm:pl-0 sm:pr-4 sm:pt-px sm:text-right">
                    {step.index}
                  </span>

                  {/* Step content. */}
                  <div className="mt-3 pl-7 sm:mt-0 sm:pl-0">
                    <h3 className="text-h3 font-display text-[color:var(--ink)] sm:text-h2">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-[58ch] text-body text-[color:var(--ink-muted)]">
                      {step.body}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-2.5">
                      {step.artifacts.map(artifact => (
                        <li
                          key={artifact}
                          className="chip inline-flex min-h-[1.9rem] items-center px-3 py-1"
                        >
                          {artifact}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  )
}
