import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { X, ExternalLink, ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { GithubIcon } from './SocialIcons'
import { useModalA11y } from '../hooks/useModalA11y'
import type { Project } from '../types'

const ease = [0.23, 1, 0.32, 1] as const

/* -------------------------------------------------------------------------- *
 *  PROJECT MODAL — full case-study sheet, portalled to <body>.                *
 *                                                                             *
 *  Why createPortal: ProjectModal renders from inside the Work section, which *
 *  sits under a `.cv-auto` wrapper (content-visibility: auto implies          *
 *  contain: paint). That establishes a containing block for `position:fixed`  *
 *  descendants, so a fixed overlay would anchor to the wrapper, not the       *
 *  viewport. Portalling into <body> escapes every ancestor's containing block.*
 *                                                                             *
 *  Accent discipline: the per-project hue is SCOPED here via `--card-accent`  *
 *  and used only for borders, dots, glows, the highlight values, and the      *
 *  capability ticks. All card text stays --ink / --ink-muted so it passes AA  *
 *  on the light default. A SOLID top accent rule (never a gradient) marks the *
 *  panel. Closes on Escape, backdrop click, or the floating close button;     *
 *  body scroll is locked while open.                                          *
 * -------------------------------------------------------------------------- */
export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null
  onClose: () => void
}) {
  const reduceMotion = useReducedMotion()
  const panelRef = useRef<HTMLDivElement>(null)

  /* Focus-trap, scroll-lock, initial focus, Escape, and focus-restore are all
     owned by the shared overlay hook. */
  useModalA11y(!!project, panelRef, onClose, { initialFocus: 'first' })

  if (typeof document === 'undefined') return null

  /* npm distribution demos read differently than a live web demo. */
  const isNpm = project?.demo?.includes('npmjs.com') ?? false
  const demoLabel = isNpm ? 'View on npm' : 'Open live demo'

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          key="case-study"
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.25, ease }}
          onClick={onClose}
          className="fixed inset-0 z-[110] flex items-start justify-center overflow-y-auto bg-[color:var(--modal-backdrop)] p-3 backdrop-blur-md sm:p-6"
        >
          {/* ===== Panel — anchored at top, capped to (viewport - overlay pad). */}
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            onClick={e => e.stopPropagation()}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 320, damping: 32, mass: 0.9 }}
            style={{ ['--card-accent' as string]: project.accent } as React.CSSProperties}
            className="relative my-auto flex max-h-[calc(100dvh-1.5rem)] w-full max-w-[960px] flex-col overflow-hidden rounded-[var(--r-lg)] bg-[color:var(--bg-elev)] shadow-[var(--shadow-md)] sm:max-h-[calc(100dvh-3rem)]"
          >
            {/* Panel border tinted by the project accent (~33%). */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10 rounded-[var(--r-lg)] border"
              style={{ borderColor: 'color-mix(in srgb, var(--card-accent) 33%, var(--line-strong))' }}
            />
            {/* Solid top accent rule (NOT a gradient). */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 z-10 h-[3px] rounded-t-[var(--r-lg)]"
              style={{ background: 'var(--card-accent)' }}
            />

            {/* Floating close button — anchored to the panel frame. */}
            <button
              type="button"
              onClick={onClose}
              data-cursor="target"
              aria-label="Close case study"
              className="absolute right-3 top-3 z-20 grid h-11 w-11 place-items-center rounded-[var(--r-sm)] border border-[color:var(--line-strong)] bg-[color:var(--surface)] text-[color:var(--ink-muted)] transition-colors duration-200 hover:border-[color:var(--accent)] hover:text-[color:var(--accent-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)] active:scale-95 sm:right-4 sm:top-4"
            >
              <X size={18} strokeWidth={1.5} aria-hidden="true" />
            </button>

            {/* ===== Scroll body — the only overflow surface. */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              {/* HEADER — radial accent tint from accentGlow. */}
              <header
                className="relative isolate px-5 pb-8 pt-12 sm:px-9 sm:pb-10 sm:pt-14"
                style={{
                  background: `radial-gradient(ellipse 120% 100% at 14% 0%, ${project.accentGlow}, transparent 62%)`,
                }}
              >
                {/* Category pill — accent owns the border + dot, text stays ink. */}
                <span className="card-pill inline-flex items-center gap-2 rounded-[var(--r-pill)] border px-3 py-1 font-mono text-eyebrow uppercase tracking-[0.16em]">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: 'var(--card-accent)' }}
                  />
                  {project.category}
                </span>

                <h2 id="case-study-title" className="mt-5 text-display text-[color:var(--ink)]">
                  {project.name}
                </h2>

                <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-data text-[color:var(--ink-faint)]">
                  <span>{project.platform}</span>
                  <span aria-hidden="true" className="text-[color:var(--line-strong)]">/</span>
                  <span className="data">{project.year}</span>
                </p>

                <p className="mt-5 max-w-[60ch] text-lede text-[color:var(--ink-muted)]">
                  {project.tagline}
                </p>
              </header>

              {/* HIGHLIGHTS BAND — responsive 2×4 grid. Values mixed toward ink
                  so the accent stays AA at small sizes on the light default. */}
              <div
                className="grid grid-cols-2 gap-px border-y border-[color:var(--line)] bg-[color:var(--line)] sm:grid-cols-4"
                role="list"
                aria-label="Project highlights"
              >
                {project.highlights.map(h => (
                  <div key={h.label} role="listitem" className="bg-[color:var(--bg-elev)] px-5 py-5 sm:px-6">
                    <p
                      className="font-mono tabular-nums text-data-lg leading-tight"
                      style={{ color: 'color-mix(in srgb, var(--card-accent) 60%, var(--ink))' }}
                    >
                      {h.value}
                    </p>
                    <p className="mt-2 font-mono text-eyebrow uppercase tracking-[0.14em] text-[color:var(--ink-faint)]">
                      {h.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* BODY — single column on mobile, 7/5 split on lg. */}
              <div className="grid grid-cols-1 gap-x-12 gap-y-10 px-5 py-8 sm:px-9 sm:py-10 lg:grid-cols-[7fr_5fr]">
                {/* Overview + capabilities */}
                <div className="min-w-0">
                  <section aria-labelledby="modal-overview">
                    <h3
                      id="modal-overview"
                      className="font-mono text-eyebrow uppercase tracking-[0.18em] text-[color:var(--ink-faint)]"
                    >
                      Overview
                    </h3>
                    <p className="mt-4 text-body text-[color:var(--ink-muted)]">{project.description}</p>
                  </section>

                  <section aria-labelledby="modal-capabilities" className="mt-9">
                    <h3
                      id="modal-capabilities"
                      className="font-mono text-eyebrow uppercase tracking-[0.18em] text-[color:var(--ink-faint)]"
                    >
                      Capabilities
                    </h3>
                    <ul className="mt-4 flex flex-col gap-3.5">
                      {project.features.map(feature => (
                        <li key={feature} className="flex items-start gap-3">
                          <CheckCircle2
                            size={18}
                            strokeWidth={1.5}
                            aria-hidden="true"
                            className="mt-0.5 flex-shrink-0"
                            style={{ color: 'var(--card-accent)' }}
                          />
                          <span className="text-body text-[color:var(--ink-muted)]">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>

                {/* Tech chips + link cards */}
                <aside className="min-w-0">
                  <h3 className="font-mono text-eyebrow uppercase tracking-[0.18em] text-[color:var(--ink-faint)]">
                    Built with
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map(t => (
                      <li
                        key={t}
                        className="chip px-3 py-1.5"
                        style={{ ['--chip-accent' as string]: project.accent } as React.CSSProperties}
                      >
                        {t}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 flex flex-col gap-3">
                    {/* View source — always present. */}
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="target"
                      aria-label={`View source for ${project.name} on GitHub`}
                      className="group flex min-h-[3.25rem] items-center gap-3 rounded-[var(--r-md)] border border-[color:var(--line-strong)] bg-[color:var(--surface)] px-4 py-3 transition-colors duration-200 hover:border-[color:var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)] active:scale-95"
                    >
                      <span
                        aria-hidden="true"
                        className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-[var(--r-sm)] text-[color:var(--ink)]"
                        style={{ background: 'color-mix(in srgb, var(--card-accent) 12%, transparent)' }}
                      >
                        <GithubIcon size={18} />
                      </span>
                      <span className="flex min-w-0 flex-col">
                        <span className="font-display text-small font-semibold text-[color:var(--ink)]">
                          View source
                        </span>
                        <span className="truncate font-mono text-[0.72rem] text-[color:var(--ink-faint)]">
                          {project.repo}
                        </span>
                      </span>
                      <ArrowUpRight
                        size={18}
                        strokeWidth={1.5}
                        aria-hidden="true"
                        className="ml-auto flex-shrink-0 text-[color:var(--ink-faint)] transition-[transform,color] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--accent-strong)]"
                      />
                    </a>

                    {/* Conditional demo card — npm or live. */}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="target"
                        aria-label={`${demoLabel} for ${project.name}`}
                        className="group flex min-h-[3.25rem] items-center gap-3 rounded-[var(--r-md)] border px-4 py-3 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)] active:scale-95"
                        style={{ borderColor: 'color-mix(in srgb, var(--card-accent) 45%, var(--line-strong))' }}
                      >
                        <span
                          aria-hidden="true"
                          className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-[var(--r-sm)]"
                          style={{
                            color: 'var(--card-accent)',
                            background: 'color-mix(in srgb, var(--card-accent) 12%, transparent)',
                          }}
                        >
                          <ExternalLink size={18} strokeWidth={1.5} />
                        </span>
                        <span className="flex min-w-0 flex-col">
                          <span className="font-display text-small font-semibold text-[color:var(--ink)]">
                            {demoLabel}
                          </span>
                          <span className="truncate font-mono text-[0.72rem] text-[color:var(--ink-faint)]">
                            {project.demo.replace(/^https?:\/\//, '')}
                          </span>
                        </span>
                        <ArrowUpRight
                          size={18}
                          strokeWidth={1.5}
                          aria-hidden="true"
                          className="ml-auto flex-shrink-0 text-[color:var(--ink-faint)] transition-[transform,color] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--accent-strong)]"
                        />
                      </a>
                    )}
                  </div>
                </aside>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
