import { skills } from '../data/resume'
import { Container, Section, SectionHeader } from '../components/ui'
import { Reveal } from '../components/Kinetic'

/* -------------------------------------------------------------------------- *
 *  STACK — the real tooling behind the work, grouped by architectural layer.  *
 *                                                                             *
 *  Reads as systems thinking, not a tag cloud: each layer is a ROW divided by *
 *  a hairline `--line` rule with generous negative space (NO card box). On    *
 *  large screens the display sub-head sits in a fixed left rail and the mono  *
 *  chips flow on the right; on mobile it stacks. Chips carry the single       *
 *  chrome accent on hover/focus (the .chip default — no per-group hues).      *
 *                                                                             *
 *  Source data groups by `category`; we relabel + order the layers top-down   *
 *  from the deepest engineering layer out to design craft.                    *
 * -------------------------------------------------------------------------- */

/* Layer order, top of the stack to the surface, with editorial relabels. */
const layers: { category: string; label: string }[] = [
  { category: 'Core', label: 'Core engineering' },
  { category: 'Systems', label: 'Systems & tooling' },
  { category: 'AI', label: 'AI / ML' },
  { category: 'Mobile', label: 'Mobile' },
  { category: 'Backend', label: 'Backend & infra' },
  { category: 'Web', label: 'Web' },
  { category: 'Design', label: 'Design & craft' },
]

export default function Stack() {
  return (
    <Section id="stack" aria-labelledby="stack-heading">
      <Container>
        <SectionHeader
          index="02"
          label="STACK"
          title={['Everything I ', <span key="ship" className="serif-italic">ship with.</span>]}
          lede="The actual tools behind the projects above, grouped by where they live in the stack. Not a tag cloud."
          id="stack-heading"
        />

        <div className="mt-12 sm:mt-16">
          {layers.map((layer, i) => {
            const items = skills.filter(s => s.category === layer.category)
            if (items.length === 0) return null

            return (
              <Reveal
                key={layer.category}
                as="div"
                delay={i * 0.06}
                className="grid gap-x-10 gap-y-5 border-t border-[color:var(--line)] py-8 sm:py-10 lg:grid-cols-[200px_1fr] lg:gap-x-14"
              >
                {/* Left rail — the layer name + a mono count for systems legibility. */}
                <div className="lg:pt-1">
                  <h3 className="text-h3 font-display text-[color:var(--ink)]">{layer.label}</h3>
                  <span className="mt-1.5 block font-mono text-eyebrow uppercase tracking-[0.16em] text-[color:var(--ink-faint)]">
                    {String(items.length).padStart(2, '0')} tools
                  </span>
                </div>

                {/* Right — the flowing chip set. */}
                <ul className="flex flex-wrap gap-2.5">
                  {items.map(skill => (
                    /* Static labels, not controls — no tabindex / cursor target. */
                    <li key={skill.name} className="chip inline-flex items-center px-3 py-1.5">
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
