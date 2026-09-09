import { ArrowRight } from 'lucide-react'
import { Container, Section } from '../components/ui'
import { KineticText, Reveal } from '../components/Kinetic'
import { scrollToId } from '../lib/smoothScroll'

/* -------------------------------------------------------------------------- *
 *  ABOUT — the thesis. Single centered measure, no card, no columns. The      *
 *  display thesis is the visual centerpiece (high-contrast --ink); three      *
 *  Instrument-serif italic words carry the emphasis.                          *
 * -------------------------------------------------------------------------- */

export default function About() {
  return (
    <Section id="about" aria-labelledby="about-thesis">
      <Container size="narrow" className="text-center">
        <Reveal>
          <span className="section-index text-[color:var(--accent-strong)]">About &amp; Thesis</span>
        </Reveal>

        <KineticText
          as="h2"
          id="about-thesis"
          className="thesis mt-6 text-display text-[color:var(--ink)]"
        >
          {[
            'I connect modern code with human experience. The ',
            <span key="frontend" className="serif-italic text-[color:var(--ink)]">interface</span>,
            ' that users love, the ',
            <span key="backend" className="serif-italic text-[color:var(--ink)]">architecture</span>,
            ' that scales underneath, and the ',
            <span key="bridge" className="serif-italic text-[color:var(--ink)]">bridge</span>,
            ' that brings cross-cultural software teams together.',
          ]}
        </KineticText>

        <Reveal
          as="p"
          delay={0.1}
          className="mx-auto mt-8 max-w-[62ch] text-lede text-[color:var(--ink-muted)]"
        >
          I am <strong className="font-semibold text-[color:var(--ink)]">Tran Hau</strong> (Korean name: <strong className="font-semibold text-[color:var(--ink)]">김진호</strong> / OnlyDev), a Software Engineering student at <strong className="font-medium text-[color:var(--ink)]">Soongsil University</strong> in Seoul, South Korea. I develop across React, Next.js, Spring Boot, Python, and C++, with a strong focus on real-world AI applications and seamless UX/UI design. Fluent in Vietnamese and Korean, I am building toward a career as a Bridge Software Engineer (BrSE).
        </Reveal>

        <Reveal delay={0.16} className="mt-9">
          <a
            href="#contact"
            data-cursor="target"
            onClick={e => {
              e.preventDefault()
              scrollToId('contact')
            }}
            className="link-underline group inline-flex min-h-[44px] items-center gap-2 font-display text-[color:var(--ink)]"
          >
            Start a conversation
            <ArrowRight
              size={18}
              strokeWidth={1.5}
              aria-hidden="true"
              className="text-[color:var(--accent-strong)] transition-transform duration-200 group-hover:translate-x-1"
            />
          </a>
        </Reveal>
      </Container>
    </Section>
  )
}
