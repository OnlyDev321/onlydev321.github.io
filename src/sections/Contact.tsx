import { useRef, useState, type FormEvent } from 'react'
import { Mail, MapPin, Copy, Check, Send } from 'lucide-react'
import { GithubIcon, InstagramIcon, FacebookIcon, TiktokIcon } from '../components/SocialIcons'
import { Container, Section, SectionHeader } from '../components/ui'
import { Reveal } from '../components/Kinetic'
import LocalTime from '../components/LocalTime'

/* -------------------------------------------------------------------------- *
 *  CONTACT (05) - the close.                                                  *
 *                                                                            *
 *  Two-column card on md+ (left = status + channels, right = a no-backend    *
 *  form), single column on mobile. RESTRAINT ZONE: <Reveal> entry only, no   *
 *  decorative motion. The form has no server: "Open email draft" composes a  *
 *  mailto and hands off to the user's client, so the page stays static and   *
 *  trackless. Chrome accent is `--accent` only. All copy free of em dashes.  *
 * -------------------------------------------------------------------------- */

const EMAIL = 'onlydev.321@gmail.com'

const channels = [
  { icon: <GithubIcon size={16} />,    label: 'GitHub',    handle: 'OnlyDev321',             href: 'https://github.com/OnlyDev321',        external: true },
  { icon: <FacebookIcon size={16} />,  label: 'Facebook',  handle: 'Tran Hau',               href: 'https://www.facebook.com/tran.hau.691306/', external: true },
  { icon: <InstagramIcon size={16} />, label: 'Instagram', handle: '@kim_jinho2412',        href: 'https://www.instagram.com/kim_jinho2412/',  external: true },
  { icon: <TiktokIcon size={16} />,    label: 'TikTok',    handle: '@kim_jinho2412',        href: 'https://www.tiktok.com/@kim_jinho2412',     external: true },
  { icon: <Mail size={16} strokeWidth={1.5} />, label: 'Email', handle: EMAIL,              href: `mailto:${EMAIL}`,                       external: false },
] as const

const fieldClass =
  'w-full rounded-[var(--r-sm)] border border-[color:var(--line)] bg-[color:var(--bg-elev)] px-3.5 py-2.5 text-body text-[color:var(--ink)] outline-none transition-colors duration-200 placeholder:text-[color:var(--ink-faint)] focus:border-[color:var(--accent)]'

const labelClass = 'font-mono text-eyebrow uppercase tracking-[0.16em] text-[color:var(--ink-faint)]'

type FieldName = 'name' | 'email' | 'message'
type FieldErrors = Partial<Record<FieldName, string>>

/* Basic, intentionally forgiving email shape: something@something.something. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [copied, setCopied] = useState(false)
  const [opened, setOpened] = useState(false)

  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const validate = (data: typeof formData): FieldErrors => {
    const next: FieldErrors = {}
    if (!data.name.trim()) next.name = 'Please enter your name.'
    if (!data.email.trim()) next.email = 'Please enter your email.'
    else if (!EMAIL_RE.test(data.email.trim())) next.email = 'Please enter a valid email address.'
    if (!data.message.trim()) next.message = 'Please enter a message.'
    return next
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const nextErrors = validate(formData)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setOpened(false)
      /* Move focus to the first invalid field, in DOM order. */
      if (nextErrors.name) nameRef.current?.focus()
      else if (nextErrors.email) emailRef.current?.focus()
      else if (nextErrors.message) messageRef.current?.focus()
      return
    }

    const subject = `Project inquiry from ${formData.name || 'your portfolio'}`
    const body = `${formData.message}\n\nFrom: ${formData.name}\nReply to: ${formData.email}`
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setOpened(true)
  }

  return (
    <Section id="contact" aria-labelledby="contact-heading">
      <Container>
        <SectionHeader
          index="05"
          label="CONTACT"
          id="contact-heading"
          title={['Let’s build something ', <span className="serif-italic">impactful.</span>]}
          lede="Looking for a full-stack engineer, a UX/UI designer, or a bilingual Bridge Software Engineer (BrSE) between Korea and Vietnam? Send me a message. I read every inquiry personally and reply promptly."
        />

        <Reveal className="mt-12 lg:mt-16">
          <div className="grid overflow-hidden rounded-[var(--r-lg)] border border-[color:var(--line)] bg-[color:var(--surface)] shadow-[var(--shadow-sm)] md:grid-cols-2">
            {/* ===== LEFT — status + channels ===== */}
            <div className="flex flex-col gap-7 border-b border-[color:var(--line)] p-6 sm:p-8 md:border-b-0 md:border-r">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                <span className="inline-flex items-center gap-2 rounded-[var(--r-pill)] border border-[color:var(--line)] bg-[color:var(--surface-2)] px-3 py-1.5 font-mono text-eyebrow uppercase tracking-[0.16em] text-[color:var(--ink-muted)]">
                  <span
                    aria-hidden="true"
                    className="relative h-1.5 w-1.5 rounded-full bg-[color:var(--ok)] before:absolute before:inset-0 before:animate-pulse-ring before:rounded-full before:bg-[color:var(--ok)]"
                  />
                  Open to opportunities
                </span>
                <LocalTime />
              </div>

              <p className="inline-flex items-center gap-2 text-small text-[color:var(--ink-muted)]">
                <MapPin size={15} strokeWidth={1.5} aria-hidden="true" className="text-[color:var(--ink-faint)]" />
                Seoul, South Korea · Soongsil University
              </p>

              <div>
                <p className={labelClass}>Focus &amp; Roles</p>
                <p className="mt-2.5 max-w-[42ch] text-body text-[color:var(--ink-muted)]">
                  Full-stack web applications, AI integrations, UX/UI prototyping,
                  and Bridge Software Engineer (BrSE) roles connecting Vietnam and Korea.
                </p>
              </div>

              {/* Quick-copy email */}
              <button
                type="button"
                onClick={copyEmail}
                data-cursor="target"
                aria-label={copied ? 'Email address copied' : `Copy email address ${EMAIL}`}
                className="group flex min-h-[44px] w-full items-center justify-between gap-3 rounded-[var(--r-sm)] border border-[color:var(--line)] bg-[color:var(--bg-elev)] px-3.5 py-2.5 text-left transition-colors duration-200 hover:border-[color:var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)] active:scale-95"
              >
                <span className="data flex min-w-0 items-center gap-2.5 text-[color:var(--ink)]">
                  <Mail size={15} strokeWidth={1.5} aria-hidden="true" className="flex-shrink-0 text-[color:var(--ink-faint)]" />
                  <span className="truncate">{EMAIL}</span>
                </span>
                <span className="inline-flex flex-shrink-0 items-center gap-1.5 text-small font-medium text-[color:var(--ink-muted)] transition-colors duration-200 group-hover:text-[color:var(--accent-strong)]">
                  {copied ? (
                    <Check size={15} strokeWidth={1.5} aria-hidden="true" className="text-[color:var(--ok)]" />
                  ) : (
                    <Copy size={15} strokeWidth={1.5} aria-hidden="true" />
                  )}
                  {copied ? 'Copied' : 'Copy'}
                </span>
              </button>

              {/* Channels */}
              <ul className="mt-auto flex flex-col gap-1 border-t border-[color:var(--line)] pt-5">
                {channels.map(c => (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      data-cursor="target"
                      className="group flex min-h-[44px] items-center gap-3 rounded-[var(--r-sm)] px-1.5 py-1.5 transition-colors duration-200 hover:bg-[color:var(--surface-2)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)] active:scale-95"
                    >
                      <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-[var(--r-sm)] border border-[color:var(--line)] text-[color:var(--ink-muted)] transition-colors duration-200 group-hover:border-[color:var(--accent)] group-hover:text-[color:var(--accent-strong)]">
                        {c.icon}
                      </span>
                      <span className="flex min-w-0 flex-col">
                        <span className="text-small font-medium text-[color:var(--ink)]">{c.label}</span>
                        <span className="link-underline data truncate text-[color:var(--ink-muted)]">{c.handle}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* ===== RIGHT — no-backend form ===== */}
            <div className="bg-[color:var(--surface)] p-6 sm:p-8">
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-name" className={labelClass}>Name</label>
                  <input
                    ref={nameRef}
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={e => {
                      const value = e.target.value
                      setFormData(f => ({ ...f, name: value }))
                      if (errors.name) setErrors(prev => ({ ...prev, name: undefined }))
                    }}
                    aria-invalid={errors.name ? true : undefined}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className={fieldClass}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1.5 text-small text-[color:var(--err)]">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-email" className={labelClass}>Email</label>
                  <input
                    ref={emailRef}
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={e => {
                      const value = e.target.value
                      setFormData(f => ({ ...f, email: value }))
                      if (errors.email) setErrors(prev => ({ ...prev, email: undefined }))
                    }}
                    aria-invalid={errors.email ? true : undefined}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className={fieldClass}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1.5 text-small text-[color:var(--err)]">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-message" className={labelClass}>Message</label>
                  <textarea
                    ref={messageRef}
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    placeholder="What are you building, and where are you stuck?"
                    value={formData.message}
                    onChange={e => {
                      const value = e.target.value
                      setFormData(f => ({ ...f, message: value }))
                      if (errors.message) setErrors(prev => ({ ...prev, message: undefined }))
                    }}
                    aria-invalid={errors.message ? true : undefined}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className={`${fieldClass} resize-y`}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1.5 text-small text-[color:var(--err)]">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button type="submit" data-cursor="target" className="btn-primary group w-full justify-center">
                  <Send size={16} strokeWidth={1.5} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5" />
                  Open email draft
                </button>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <p aria-live="polite" className="text-small font-medium text-[color:var(--ok)]">
                    {opened ? 'Draft opened.' : ''}
                  </p>
                  <p className={labelClass}>No backend · No tracking</p>
                </div>
              </form>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
