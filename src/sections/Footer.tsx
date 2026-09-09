import { ArrowUp } from 'lucide-react'
import { GithubIcon, InstagramIcon, FacebookIcon, TiktokIcon } from '../components/SocialIcons'
import { Container } from '../components/ui'
import LocalTime from '../components/LocalTime'
import { scrollToId, scrollToTop } from '../lib/smoothScroll'

/* -------------------------------------------------------------------------- *
 *  FOOTER — full-width mega-signature over --bg-elev (chrome, not a Section). *
 *                                                                             *
 *  The wordmark sits at text-display scale and doubles as a back-to-top       *
 *  control. Below it: status, sitemap, and connect columns.                   *
 * -------------------------------------------------------------------------- */

const sitemap = [
  { id: 'about',      label: 'About' },
  { id: 'work',       label: 'Work' },
  { id: 'stack',      label: 'Stack' },
  { id: 'process',    label: 'Process' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact',    label: 'Contact' },
] as const

const connect = [
  { href: 'https://github.com/OnlyDev321',                 icon: <GithubIcon size={16} />,    label: 'GitHub · OnlyDev321' },
  { href: 'https://www.facebook.com/tran.hau.691306/',    icon: <FacebookIcon size={16} />,  label: 'Facebook' },
  { href: 'https://www.instagram.com/kim_jinho2412/',     icon: <InstagramIcon size={16} />, label: 'Instagram' },
  { href: 'https://www.tiktok.com/@kim_jinho2412',        icon: <TiktokIcon size={16} />,    label: 'TikTok' },
] as const

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      aria-label="Site footer"
      className="relative z-[1] border-t border-[color:var(--line)] bg-[color:var(--bg-elev)] pb-10 pt-[clamp(3.5rem,7vw,6rem)]"
    >
      <Container>
        {/* ---- Mega-signature — also the back-to-top control ---- */}
        <button
          type="button"
          data-cursor="target"
          onClick={scrollToTop}
          aria-label="Tran Hau (김진호) — back to top"
          className="group block w-full text-left font-display text-display font-bold tracking-[-0.035em] text-[color:var(--ink)] transition-[transform,opacity] duration-200 ease-[var(--ease-out)] active:scale-[0.985] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--accent)]"
        >
          Tran{' '}
          <span className="serif-italic text-[color:var(--ink)] transition-colors duration-200 group-hover:text-[color:var(--accent-strong)]">
            Hau
          </span>
          <span aria-hidden="true" className="serif-italic text-[color:var(--accent-strong)]">.</span>
          <span className="ml-3 font-mono text-[0.45em] font-normal tracking-normal text-[color:var(--ink-muted)]">
            (김진호)
          </span>
        </button>

        <p className="mt-6 max-w-[60ch] text-body text-[color:var(--ink-muted)]">
          Full-Stack Software Engineer &amp; UX/UI Designer based in Seoul, South Korea.
          Studying at Soongsil University and engineering open-source projects on GitHub.
        </p>

        {/* ---- Columns: Status · Sitemap · Connect (stack on mobile) ---- */}
        <div className="mt-12 grid gap-10 border-t border-[color:var(--line)] pt-10 sm:grid-cols-2 md:grid-cols-12 md:gap-10">
          {/* Status */}
          <div className="md:col-span-4">
            <p className="eyebrow">Status</p>
            <p className="mt-4 inline-flex items-center gap-2 text-small text-[color:var(--ink-muted)]">
              <span
                aria-hidden="true"
                className="relative h-1.5 w-1.5 rounded-full bg-[color:var(--ok)] before:absolute before:inset-0 before:animate-pulse-ring before:rounded-full before:bg-[color:var(--ok)]"
              />
              Open to opportunities &amp; BrSE roles
            </p>
            <div className="mt-3">
              <LocalTime />
            </div>
          </div>

          {/* Sitemap */}
          <nav aria-label="Footer navigation" className="md:col-span-4">
            <p className="eyebrow">Sitemap</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {sitemap.map(l => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    data-cursor="target"
                    onClick={e => { e.preventDefault(); scrollToId(l.id) }}
                    className="link-underline inline-flex min-h-[44px] items-center text-small text-[color:var(--ink-muted)]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="target"
                  className="link-underline inline-flex min-h-[44px] items-center text-small text-[color:var(--ink-muted)]"
                >
                  Resume
                </a>
              </li>
            </ul>
          </nav>

          {/* Connect */}
          <div className="md:col-span-4">
            <p className="eyebrow">Connect</p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {connect.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="target"
                  aria-label={s.label}
                  title={s.label}
                  className="grid h-11 w-11 place-items-center rounded-[var(--r-sm)] border border-[color:var(--line)] bg-[color:var(--surface)] text-[color:var(--ink-muted)] transition-[transform,border-color,color] duration-200 ease-[var(--ease-out)] hover:-translate-y-0.5 hover:border-[color:var(--accent)] hover:text-[color:var(--accent-strong)] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]"
                >
                  {s.icon}
                </a>
              ))}
              <button
                type="button"
                onClick={scrollToTop}
                data-cursor="target"
                aria-label="Back to top"
                className="grid h-11 w-11 place-items-center rounded-[var(--r-sm)] border border-[color:var(--accent)] bg-[color:var(--accent-glow)] text-[color:var(--accent-strong)] transition-[transform,box-shadow] duration-200 ease-[var(--ease-out)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow)] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]"
              >
                <ArrowUp size={16} strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* ---- Colophon — mono, tabular ---- */}
        <div className="mt-12 flex flex-col gap-3 border-t border-[color:var(--line)] pt-6 text-data tabular-nums text-[color:var(--ink-faint)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Tran Hau (김진호) · OnlyDev. All rights reserved.</p>
          <p>
            Built with React 19 + Vite. Soongsil University · Seoul, Korea.
          </p>
        </div>
      </Container>
    </footer>
  )
}
