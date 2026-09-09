import { MapPin } from 'lucide-react'
import { experience, education, certifications } from '../data/resume'
import { Container, Section, SectionHeader } from '../components/ui'
import { Reveal } from '../components/Kinetic'

/* -------------------------------------------------------------------------- *
 *  EXPERIENCE (05) — a document-style résumé timeline.                        *
 *                                                                            *
 *  Layout: on lg a 12-col grid. Left 8 cols are the role timeline, hung on a *
 *  `border-l` hairline with `--accent` node dots; right 4 cols stack         *
 *  Education + Certifications. Below lg it collapses to a single column      *
 *  (timeline first, then education/certs).                                   *
 *                                                                            *
 *  Chrome accent is `--accent` only — no per-company colors. Periods,        *
 *  locations and years are mono `.data` with tabular figures so the columns  *
 *  align. Each block fades in via <Reveal> with a short stagger.             *
 * -------------------------------------------------------------------------- */

export default function Experience() {
  return (
    <Section id="experience" aria-labelledby="experience-heading">
      <Container>
        <SectionHeader
          index="04"
          label="EXPERIENCE"
          id="experience-heading"
          title={['Where the ', <span className="serif-italic">reps</span>, ' came from.']}
          lede="Software engineering and academic research in Seoul, South Korea since 2022 — building scalable web platforms, real-world AI integrations, and cross-cultural engineering bridges."
        />

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-x-14 lg:gap-y-0">
          {/* ---- Role timeline ---- */}
          <div className="lg:col-span-8">
            <ol className="relative">
              {/* Continuous rail line, centered in the 1.5rem gutter column. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-2 bottom-2 w-px -translate-x-1/2 bg-[color:var(--line-strong)]"
              />
              {experience.map((exp, i) => (
                <li
                  key={`${exp.company}-${exp.period}`}
                  className="relative grid grid-cols-[1.5rem_1fr] gap-x-4 pb-10 last:pb-0 sm:gap-x-6"
                >
                  {/* Gutter: node dot centered exactly on the rail line. */}
                  <span aria-hidden="true" className="relative">
                    <span className="absolute left-3 top-7 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-[color:var(--bg)] bg-[color:var(--accent)] shadow-[var(--shadow-glow)]" />
                  </span>

                  <Reveal delay={Math.min(i * 0.06, 0.24)}>
                    <article className="rounded-[var(--r-md)] border border-[color:var(--line)] bg-[color:var(--surface)] p-5 shadow-[var(--shadow-sm)] sm:p-6">
                      <div className="flex flex-col gap-x-6 gap-y-2 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                            <h3 className="font-display text-h3 text-[color:var(--ink)]">{exp.role}</h3>
                            {exp.current && (
                              <span className="inline-flex items-center gap-1.5 rounded-[var(--r-pill)] border border-[color:var(--line)] bg-[color:var(--surface-2)] px-2.5 py-0.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[color:var(--ink-muted)]">
                                <span
                                  aria-hidden="true"
                                  className="relative h-1.5 w-1.5 rounded-full bg-[color:var(--ok)] before:absolute before:inset-0 before:animate-pulse-ring before:rounded-full before:bg-[color:var(--ok)]"
                                />
                                Current
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-body font-medium text-[color:var(--ink)]">{exp.company}</p>
                        </div>

                        <div className="flex flex-col gap-1 sm:shrink-0 sm:items-end sm:text-right">
                          <span className="data text-[color:var(--ink-muted)]">{exp.period}</span>
                          <span className="inline-flex items-center gap-1.5 font-mono text-[0.78rem] text-[color:var(--ink-faint)]">
                            <MapPin size={13} strokeWidth={1.5} aria-hidden="true" />
                            {exp.location}
                          </span>
                        </div>
                      </div>

                      <ul className="mt-4 space-y-2.5 border-t border-[color:var(--line)] pt-4">
                        {exp.bullets.map(bullet => (
                          <li key={bullet} className="flex gap-3 text-small text-[color:var(--ink-muted)]">
                            <span
                              aria-hidden="true"
                              className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]"
                            />
                            <span className="leading-relaxed">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>

          {/* ---- Education + Certifications ---- */}
          <aside className="flex flex-col gap-10 lg:col-span-4">
            <section aria-labelledby="education-heading">
              <Reveal>
                <h3 id="education-heading" className="eyebrow mb-4">
                  Education
                </h3>
              </Reveal>
              <ul className="space-y-3">
                {education.map((edu, i) => (
                  <li key={`${edu.institution}-${edu.period}`}>
                    <Reveal delay={Math.min(i * 0.06, 0.18)}>
                      <article className="rounded-[var(--r-md)] border border-[color:var(--line)] bg-[color:var(--surface)] p-5 shadow-[var(--shadow-sm)]">
                        <p className="font-display text-[1.02rem] font-semibold leading-snug text-[color:var(--ink)]">
                          {edu.degree}
                        </p>
                        <p className="mt-1 text-small text-[color:var(--ink-muted)]">{edu.institution}</p>
                        <p className="mt-2 data text-[color:var(--ink-faint)]">{edu.period}</p>
                        {edu.note && (
                          <p className="mt-2 text-small text-[color:var(--ink-muted)]">{edu.note}</p>
                        )}
                      </article>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="certifications-heading">
              <Reveal>
                <h3 id="certifications-heading" className="eyebrow mb-4">
                  Certifications
                </h3>
              </Reveal>
              <ul className="space-y-3">
                {certifications.map((cert, i) => (
                  <li key={`${cert.name}-${cert.year}`}>
                    <Reveal delay={Math.min(i * 0.06, 0.18)}>
                      <article className="rounded-[var(--r-md)] border border-[color:var(--line)] bg-[color:var(--surface)] p-5 shadow-[var(--shadow-sm)]">
                        <p className="font-display text-[1.02rem] font-semibold leading-snug text-[color:var(--ink)]">
                          {cert.name}
                        </p>
                        <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                          <p className="text-small text-[color:var(--ink-muted)]">{cert.issuer}</p>
                          <span className="data text-[color:var(--ink-faint)]">{cert.year}</span>
                        </div>
                      </article>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </Container>
    </Section>
  )
}
