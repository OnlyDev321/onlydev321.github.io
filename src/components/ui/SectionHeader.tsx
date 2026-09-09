import { type ReactNode } from 'react'
import { KineticText, Reveal } from '../Kinetic'

interface SectionHeaderProps {
  /** Two-digit mono index, e.g. "01". */
  index: string
  /** The single editorial kicker, e.g. "WORK". */
  label: string
  /** Display title. Pass an array mixing strings and a `.serif-italic` accent span. */
  title: ReactNode
  lede?: ReactNode
  id?: string
  className?: string
}

/* The one consistent section-header system: a mono `NN / LABEL` index, a
 * balance-wrapped display title (word-reveal), and an optional 66ch lede.
 * One editorial marker only — never a stacked eyebrow AND a number. */
export function SectionHeader({ index, label, title, lede, id, className = '' }: SectionHeaderProps) {
  return (
    <header className={`max-w-[46rem] ${className}`}>
      <Reveal>
        <span className="section-index">
          <span className="text-[color:var(--ink-muted)]">{index}</span>
          <span className="mx-2 text-[color:var(--ink-faint)]">/</span>
          <span className="text-[color:var(--accent-strong)]">{label}</span>
        </span>
      </Reveal>
      <KineticText
        as="h2"
        id={id}
        className="mt-5 font-display text-h1 text-[color:var(--ink)]"
      >
        {title}
      </KineticText>
      {lede && (
        <Reveal as="p" delay={0.08} className="mt-5 max-w-[60ch] text-lede text-[color:var(--ink-muted)]">
          {lede}
        </Reveal>
      )}
    </header>
  )
}
