# Build contract — Aashir Athar portfolio (BINDING)

Concept: **"An editorial spec sheet that moves like a demo reel."** Impeccable by default (must pass review with motion OFF), kinetic on purpose (budget spent in exactly the seven devices below). **Light is the default theme**; dark is an equal-parity toggle. **One chrome accent: Signal Cyan (`--accent`).** Per-project accents live ONLY inside the Work reel cards (scoped `--card-accent`), never in chrome.

## Token vocabulary (already defined in `src/index.css` — use via Tailwind arbitrary values)
- Color: `text-[color:var(--ink)]` / `--ink-muted` / `--ink-faint` / `--accent` / `--accent-strong` / `--highlight` / `--ok` / `--warn` / `--err`. Surfaces: `--bg` `--bg-elev` `--surface` `--surface-2`. Lines: `--line` `--line-strong`.
- Type utilities (Tailwind from @theme): `text-mega text-display text-h1 text-h2 text-h3 text-lede text-body text-small text-eyebrow text-data`. Families: `font-display font-body font-mono` + class `.serif-italic`.
- Radii: `rounded-[var(--r-xs)]` (.375) `--r-sm` (.625, buttons/inputs) `--r-md` (1rem cards) `--r-lg` (1.5rem reel/modal) `--r-pill`.
- Shadows: `shadow-[var(--shadow-sm)]` (rest) `--shadow-md` (hover) `--shadow-glow` (accent).
- Section rhythm: wrap sections in `<Section>` (applies `--section-y`). Container: `<Container>` (1200px track, 1640 at 4K, fluid px).
- Easing: `var(--ease-out)` reveals, `--ease-inout` morph, `--ease-reel` drag, `--ease-snap` press release.
- z-index: nav 40, rail 60, backdrop 100, modal 110, cursor 9000.
- Helpers: `.eyebrow` `.section-index` `.data` `.chip` `.btn-primary` `.btn-ghost` `.link-underline` `.glass` `.serif-italic` `.hero-name .char` `.reveal-mask` `.text-outline` `.card-pill` `.pull-quote` `.thesis`.

## Primitives available
- `import { Container, Section, SectionHeader } from '../components/ui'`
- `import { KineticText, Reveal } from '../components/Kinetic'` — `<KineticText as="h2" id="...">{['plain ', <span className="serif-italic">accent</span>]}</KineticText>` does a word-by-word mask reveal; `<Reveal>` fades a block up on entry. Both collapse to static under reduced-motion.
- `import BigMarquee from '../components/BigMarquee'` — the SINGLE marquee (device #4).
- Data: `import { flagshipProjects, secondaryProjects } from '../data/projects'`, `experience/education/certifications/skills` from `../data/resume`, `processSteps` from `../data/process`. Types in `../types`.
- Icons: `lucide-react` — global `strokeWidth={1.5}` on every icon. Social SVGs in `../components/SocialIcons`. `import LocalTime from '../components/LocalTime'`.
- Smooth-scroll anchors: `import { scrollToId, scrollToTop } from '../lib/smoothScroll'`.

## Hard rules (anti-tells — do NOT violate)
- NO gradient text on headers; emphasis = weight + Instrument-serif italic word (`.serif-italic`).
- NO second chrome hue (no violet/gold/pink in chrome); `--highlight` warm tone is for STAT VALUES only.
- NO em dashes in copy (use periods/commas). NO emojis. NO `999/9999` ad-hoc z-index.
- NO side-stripe accent borders; emphasis = full `--line-strong` border, `--surface-2` fill, or a mono index.
- NO three-equal-card feature row; grids are asymmetric. Hero is split-asymmetric, NOT centered.
- NO decorative loops (float/orbit/hue/infinite-shimmer). Only the 7 devices animate.
- Every pressable: `:active` scale 0.97; focus-visible accent ring; touch target ≥44px.
- Light-theme project accents fail AA as small text: use `--card-accent` for borders/dots/glows/large number ONLY; card text stays `--ink`/`--ink-muted`.
- Tabular numerals on all data/stats/dates (`.data` / `font-mono` already set it).

## The 7 kinetic devices (exhaustive)
1 Hero mega-type char-rise (once, first paint). 2 Hero atmosphere parallax (≤40px, never text). 3 Work pinned horizontal reel (scrubbed pin; touch → native swipe strip). 4 ONE capabilities marquee ribbon. 5 Magnetic cursor (accent tint). 6 Scroll-velocity skew on reel + pull-quote (±4deg, never body text). 7 Theme view-transition circular reveal. Restraint zones (no motion): nav links (underline only), Cmd+K palette (zero open/close anim), forms, the "also shipped" grid (one 80ms first-reveal stagger max).

## Per-section art direction (§8)
- **Hero** — split-asymmetric. Left: mono availability kicker → mega wordmark "Aashir" (Bricolage 800) + "Athar" in Instrument italic → one-line role lede (≤66ch) → `View work` (primary) + `Open live demo` (ghost) → mono location + live Lahore time. Right: dark → lazy Three.js cyan flow; light → CSS `--accent-glow` blobs (≤0.06 opacity). Senior cue: real ticking Lahore time.
- **About (thesis)** — single centered measure (max 66ch), `text-lede`, 2-3 Instrument-italic emphasis words, `.thesis` hanging punctuation. No card, no columns. One display pull-quote gets velocity skew.
- **Work reel** — `01 / WORK` index. Pinned horizontal track of 8 flagship cards (`--r-lg`): scoped `--card-accent` top-glow, project name (`text-h2`), one-line tagline, 2×2 mono highlights grid (tabular), tech chips, `View source` always + `Open live demo` only when `demo` exists. Accent progress bar tracks reel position; touch → native scroll-snap strip. Senior cue: concrete verifiable highlights.
- **Work "also shipped"** — below reel, `repeat(auto-fit,minmax(280px,1fr))`, 4 calm static cards (title, one line, accent dot, source link). 80ms stagger once.
- **Stack** — grouped by architectural layer (Frameworks & Renderers · ML/AI · Mobile · Backend/Infra · Tooling/Design) using `border-t` dividers + negative space, NOT card boxes. Each group: display sub-head + flow of mono chips. The single marquee ribbon sits between Stack and Process.
- **Process** — earned `01–05` indices, vertical stepped, mono numbers as structure, display title + short text on divide-y; a clip-path draw-line connects steps on scroll.
- **Experience** — left mono date rail (tabular) + right content on a `border-l` hairline timeline with `--accent` node dots. Nodes fade+rise 80ms stagger.
- **Contact** — two-column on L+ (form left, channels right), single column mobile. Label-above-input, helper text, inline error below (never alert()), full state vocab, `aria-invalid`+`aria-describedby`, accent focus rings, working `mailto`. Restraint zone — no motion.
- **Footer** — full-width `text-display` mega-signature over `--bg-elev`. Mono row: location · live Lahore time · "Built with React 19 + Vite" · colophon (Bricolage Grotesque / Geist / Geist Mono / Instrument Serif). One mask-up reveal on entry.

## Section order & ids (for nav + anchors)
hero · about · work · stack · process · experience · contact · footer. Section indices: About 01, Work 01/WORK label, Stack 02, Process 03, Experience 04, Contact 05 (Hero unnumbered). (Use a consistent mono `NN / NAME` index per section header.)
