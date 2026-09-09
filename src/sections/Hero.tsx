import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowRight, Download } from 'lucide-react'
import { GithubIcon, InstagramIcon, FacebookIcon, TiktokIcon } from '../components/SocialIcons'
import LocalTime from '../components/LocalTime'
import { Container } from '../components/ui'
import { scrollToId } from '../lib/smoothScroll'

/* Three.js hero layer is dark-only, gated, and lazy — never on the light
 * default, on touch, on reduced-motion, or on low-RAM devices (see gate). */
const HeroAmbient = lazy(() => import('../components/HeroAmbient'))

const ease = [0.23, 1, 0.32, 1] as const

/* Honest, repo-verifiable proof — the solo open-source body of work. */
const proof = [
  { value: '13', label: 'public repositories' },
  { value: '6', label: 'core languages' },
  { value: '3+', label: 'AI & systems builds' },
]

const socials = [
  { href: 'https://github.com/OnlyDev321',                 icon: <GithubIcon size={16} />,    label: 'GitHub' },
  { href: 'https://www.facebook.com/tran.hau.691306/',    icon: <FacebookIcon size={16} />,  label: 'Facebook' },
  { href: 'https://www.instagram.com/kim_jinho2412/',     icon: <InstagramIcon size={16} />, label: 'Instagram' },
  { href: 'https://www.tiktok.com/@kim_jinho2412',        icon: <TiktokIcon size={16} />,    label: 'TikTok' },
]

/* WebGL eligibility gate (perf): dark theme + fine pointer + motion allowed
 * + adequate RAM. Re-checked on theme change via the data-theme observer. */
function useShaderEligible(): boolean {
  const reduceMotion = useReducedMotion()
  const [eligible, setEligible] = useState(false)
  useEffect(() => {
    if (reduceMotion || typeof window === 'undefined' || !window.matchMedia) return
    const check = () => {
      const capable = window.matchMedia('(min-width: 768px) and (hover: hover) and (pointer: fine)').matches
      const dark = document.documentElement.getAttribute('data-theme') === 'dark'
      const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory
      const enoughRam = mem === undefined || mem >= 4
      setEligible(capable && dark && enoughRam)
    }
    check()
    const obs = new MutationObserver(check)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => obs.disconnect()
  }, [reduceMotion])
  return eligible
}

function CharReveal({ text, baseDelay = 0, italic = false }: { text: string; baseDelay?: number; italic?: boolean }) {
  return (
    <span className={italic ? 'serif-italic' : undefined}>
      {text.split('').map((c, i) => (
        <span key={`${c}-${i}`} className="char" style={{ animationDelay: `${baseDelay + 0.04 * i}s` }}>
          {c}
        </span>
      ))}
    </span>
  )
}

export default function Hero() {
  const shaderOn = useShaderEligible()
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLElement>(null)

  /* Device #2 — atmosphere parallax (never on text), clamped small. */
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const atmoY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])

  return (
    <section
      id="hero"
      ref={ref}
      aria-label="Introduction"
      className="relative isolate overflow-hidden"
      style={{ paddingTop: 'calc(var(--section-y-hero) + 1rem)', paddingBottom: 'var(--section-y-hero)' }}
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-14">
          {/* ---- Left: type (leads on every screen) ---- */}
          <div className="relative z-[1]">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="flex flex-wrap items-center gap-x-4 gap-y-2"
            >
              <LocalTime />
              <span className="inline-flex items-center gap-2 font-mono text-eyebrow uppercase tracking-[0.16em] text-[color:var(--ink-faint)]">
                <span aria-hidden="true" className="relative h-1.5 w-1.5 rounded-full bg-[color:var(--ok)] before:absolute before:inset-0 before:animate-pulse-ring before:rounded-full before:bg-[color:var(--ok)]" />
                Open to work
              </span>
            </motion.div>

            <p className="mt-7 font-mono text-eyebrow uppercase tracking-[0.16em] text-[color:var(--ink-faint)]">
              Full-Stack Engineer &amp; UX/UI Designer · Seoul, South Korea
            </p>

            <h1
              aria-label="Tran Hau (김진호) — Full-Stack Engineer & UX/UI Designer"
              className="hero-name mt-4 text-mega text-[color:var(--ink)]"
            >
              <span aria-hidden="true" className="block">
                <CharReveal text="Tran" />
              </span>
              <span aria-hidden="true" className="flex flex-wrap items-baseline gap-x-3 text-[color:var(--ink)]">
                <span>
                  <CharReveal text="Hau" baseDelay={0.26} italic />
                  <span className="char serif-italic text-[color:var(--accent-strong)]" style={{ animationDelay: '0.45s' }}>.</span>
                </span>
                <span className="font-mono text-[0.38em] font-normal tracking-normal text-[color:var(--ink-muted)]">
                  (김진호)
                </span>
              </span>
            </h1>

            <p className="reveal-mask mt-6 block max-w-[60ch] text-lede text-[color:var(--ink-muted)]">
              <span style={{ animationDelay: '0.5s' }}>
                Software engineering student at <span className="font-medium text-[color:var(--ink)]">Soongsil University</span> in Seoul.
                I build full-stack web applications, integrate <span className="serif-italic text-[color:var(--ink)]">voice &amp; vision AI</span>,
                and craft clean, accessible <span className="serif-italic text-[color:var(--ink)]">UX/UI</span> architectures bridging Vietnam and Korea.
              </span>
            </p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a href="#work" data-cursor="target" onClick={e => { e.preventDefault(); scrollToId('work') }} className="btn-primary group">
                View the work
                <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" />
              </a>
              <a href="/resume.pdf" download data-cursor="target" className="btn-ghost">
                <Download size={16} strokeWidth={1.5} aria-hidden="true" />
                Download resume
              </a>
            </motion.div>

            {/* Honest proof strip — concrete, mono, tabular. */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.7, ease }}
              className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-[color:var(--line)] pt-6"
            >
              {proof.map(p => (
                <span key={p.label} className="flex items-baseline gap-2">
                  <span className="data text-data-lg text-[color:var(--highlight)]">{p.value}</span>
                  <span className="text-small text-[color:var(--ink-faint)]">{p.label}</span>
                </span>
              ))}
              <span aria-hidden="true" className="hidden h-3 w-px bg-[color:var(--line-strong)] sm:block" />
              <ul className="flex items-center gap-2">
                {socials.map(s => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="target"
                      aria-label={s.label}
                      className="grid h-9 w-9 place-items-center rounded-[var(--r-sm)] border border-[color:var(--line)] text-[color:var(--ink-muted)] transition-colors duration-200 hover:border-[color:var(--accent)] hover:text-[color:var(--accent-strong)]"
                    >
                      {s.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* ---- Right: atmosphere (WebGL dark / CSS glow light). Decorative,
                 so it is hidden on mobile where the wordmark must lead. ---- */}
          <div className="relative hidden min-h-[460px] lg:block">
            <motion.div aria-hidden="true" style={{ y: reduceMotion ? 0 : atmoY }} className="absolute inset-0">
              <div className="grid-bg absolute inset-0 rounded-[var(--r-lg)] opacity-60 [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_72%)]" />
              <div
                className="ambient-glow top-[10%] left-[15%] h-[60%] w-[70%]"
                style={{ background: 'radial-gradient(circle, var(--accent-glow), transparent 65%)' }}
              />
              {shaderOn && (
                <Suspense fallback={null}>
                  <div className="hero-shader-layer absolute inset-0 overflow-hidden rounded-[var(--r-lg)] opacity-60 mix-blend-screen [mask-image:radial-gradient(ellipse_at_center,#000_45%,transparent_80%)]">
                    <HeroAmbient />
                  </div>
                </Suspense>
              )}
            </motion.div>
            <p className="absolute bottom-2 right-2 font-mono text-eyebrow uppercase tracking-[0.16em] text-[color:var(--ink-faint)]">
              // the page is the portfolio
            </p>
          </div>
        </div>

        {/* Scroll cue */}
        <motion.a
          href="#about"
          data-cursor="target"
          onClick={e => { e.preventDefault(); scrollToId('about') }}
          aria-label="Scroll down"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1, ease }}
          className="group mt-14 inline-flex items-center gap-2 font-mono text-eyebrow uppercase tracking-[0.18em] text-[color:var(--ink-faint)]"
        >
          <span>Scroll</span>
          <span aria-hidden="true" className="grid h-7 w-7 place-items-center rounded-full border border-[color:var(--line-strong)] transition-colors duration-200 group-hover:border-[color:var(--accent)] group-hover:text-[color:var(--accent-strong)]">
            <ArrowDown size={12} strokeWidth={1.5} />
          </span>
        </motion.a>
      </Container>
    </section>
  )
}
