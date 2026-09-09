import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Menu, X, Search } from 'lucide-react'
import { useWindowSize } from '../hooks/useWindowSize'
import { useModalA11y } from '../hooks/useModalA11y'
import { scrollToId, scrollToTop } from '../lib/smoothScroll'

interface NavbarProps {
  theme: 'dark' | 'light'
  onToggleTheme: (e?: React.MouseEvent) => void
  onOpenPalette: () => void
}

const links = [
  { id: 'about',      label: 'About' },
  { id: 'work',       label: 'Work' },
  { id: 'stack',      label: 'Stack' },
  { id: 'process',    label: 'Process' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact',    label: 'Contact' },
] as const

/* Floating glass pill nav (§7). Active-section indicator via Framer layoutId.
 * Restraint zone: hover = underline only, no decorative motion. */
export default function Navbar({ theme, onToggleTheme, onOpenPalette }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')
  const { isMobile } = useWindowSize()
  const isMenuOpen = isMobile && menuOpen
  const menuRef = useRef<HTMLDivElement>(null)

  useModalA11y(isMenuOpen, menuRef, () => setMenuOpen(false), { initialFocus: 'first' })

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    links.forEach(l => { const el = document.getElementById(l.id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  const go = (id: string) => { setMenuOpen(false); scrollToId(id) }
  const isMac = typeof navigator !== 'undefined' && /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform || navigator.userAgent || '')

  return (
    <>
      <motion.nav
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className="fixed inset-x-0 top-4 z-40 flex justify-center px-3 sm:top-6"
        aria-label="Primary"
      >
        <div className="glass flex w-full max-w-[1100px] items-center justify-between gap-2 rounded-[var(--r-pill)] py-2 pl-4 pr-2 shadow-[var(--shadow-sm)]">
          {/* Logo */}
          <button
            type="button"
            data-cursor="target"
            onClick={scrollToTop}
            className="flex flex-shrink-0 items-center gap-1.5 font-display text-[1.02rem] font-bold tracking-[-0.02em] text-[color:var(--ink)]"
            aria-label="Tran Hau (김진호) — back to top"
          >
            <img src="/favicon.svg" alt="" aria-hidden="true" width={26} height={26} loading="eager" decoding="async" className="h-[26px] w-[26px]" />
            <span>Tran Hau</span>
            <span className="rounded-[var(--r-sm)] bg-[color:var(--surface-2)] px-1.5 py-0.5 font-mono text-[0.7rem] font-normal tracking-normal text-[color:var(--ink-muted)]">
              김진호
            </span>
            <span aria-hidden="true" className="text-[color:var(--accent-strong)]">.</span>
          </button>

          {/* Desktop links */}
          {!isMobile && (
            <ul className="flex items-center gap-0.5">
              {links.map(l => {
                const isActive = active === l.id
                return (
                  <li key={l.id}>
                    <button
                      type="button"
                      aria-current={isActive ? 'page' : undefined}
                      data-cursor="target"
                      onClick={() => go(l.id)}
                      className={`relative rounded-[var(--r-sm)] px-3 py-1.5 text-small font-medium transition-colors duration-200 ${
                        isActive ? 'text-[color:var(--accent-strong)]' : 'text-[color:var(--ink-muted)] hover:text-[color:var(--ink)]'
                      }`}
                    >
                      {l.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-dot"
                          aria-hidden="true"
                          className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[color:var(--accent)]"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          )}

          {/* Controls */}
          <div className="flex items-center gap-1.5">
            {!isMobile && (
              <button
                type="button"
                onClick={onOpenPalette}
                data-cursor="target"
                aria-label="Open command palette"
                title="Search (press ⌘K)"
                className="hidden h-9 items-center gap-2 rounded-[var(--r-sm)] border border-[color:var(--line)] bg-[color:var(--surface)] pl-2.5 pr-1.5 text-[color:var(--ink-muted)] transition-colors duration-200 hover:border-[color:var(--line-strong)] hover:text-[color:var(--ink)] sm:inline-flex"
              >
                <Search size={14} strokeWidth={1.5} aria-hidden="true" />
                <kbd className="text-[0.62rem]">{isMac ? '⌘' : 'Ctrl '}K</kbd>
              </button>
            )}

            <button
              type="button"
              onClick={e => onToggleTheme(e)}
              data-cursor="target"
              className="grid h-9 w-9 place-items-center rounded-[var(--r-sm)] border border-[color:var(--line)] bg-[color:var(--surface)] text-[color:var(--ink-muted)] transition-colors duration-200 hover:text-[color:var(--ink)]"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            >
              {theme === 'dark' ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />}
            </button>

            {!isMobile && (
              <a
                href="mailto:onlydev.321@gmail.com"
                data-cursor="target"
                className="inline-flex h-9 items-center gap-1.5 rounded-[var(--r-sm)] bg-[color:var(--ink)] px-3.5 font-display text-[0.8rem] font-semibold text-[color:var(--bg)] transition-[transform,background,color] duration-200 hover:-translate-y-0.5 hover:bg-[color:var(--accent)] hover:text-[color:var(--accent-ink)] active:scale-95"
                aria-label="Contact Tran Hau — open email"
              >
                Get in touch
                <span aria-hidden="true">→</span>
              </a>
            )}

            {isMobile && (
              <>
                <button
                  type="button"
                  onClick={onOpenPalette}
                  data-cursor="target"
                  className="grid h-9 w-9 place-items-center rounded-[var(--r-sm)] border border-[color:var(--line)] bg-[color:var(--surface)] text-[color:var(--ink-muted)]"
                  aria-label="Open command palette"
                >
                  <Search size={16} strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={() => setMenuOpen(o => !o)}
                  data-cursor="target"
                  className="grid h-9 w-9 place-items-center rounded-[var(--r-sm)] border border-[color:var(--line)] bg-[color:var(--surface)] text-[color:var(--ink-muted)]"
                  aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={isMenuOpen}
                  aria-controls="mobile-menu"
                >
                  {isMenuOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
                </button>
              </>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-[39] flex flex-col items-center justify-center gap-1 bg-[color:var(--bg)]/95 backdrop-blur-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            {links.map((l, i) => (
              <span key={l.id} className="overflow-hidden">
                <motion.button
                  type="button"
                  onClick={() => go(l.id)}
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '110%' }}
                  transition={{ delay: i * 0.05, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  className="block px-6 py-2 font-display text-h2 font-bold tracking-[-0.02em] text-[color:var(--ink-muted)] hover:text-[color:var(--accent-strong)]"
                >
                  {l.label}
                </motion.button>
              </span>
            ))}
            <a
              href="mailto:onlydev.321@gmail.com"
              className="mt-8 inline-flex items-center gap-2 rounded-[var(--r-pill)] bg-[color:var(--ink)] px-9 py-3.5 font-display font-semibold text-[color:var(--bg)]"
            >
              Get in touch <span aria-hidden="true">→</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
