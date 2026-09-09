import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "../components/SocialIcons";
import { Container } from "../components/ui";
import { Reveal } from "../components/Kinetic";
import ProjectModal from "../components/ProjectModal";
import { useWindowSize } from "../hooks/useWindowSize";
import { flagshipProjects, secondaryProjects } from "../data/projects";
import type { Project } from "../types";

/* -------------------------------------------------------------------------- *
 *  WORK — the centerpiece (device #3: pinned horizontal reel).                *
 *                                                                             *
 *  On a wide pointer-capable viewport with motion allowed, the eight flagship *
 *  cards live on a single horizontal track. An outer wrapper grows tall       *
 *  (viewport height + the track's horizontal overflow) so that a sticky       *
 *  h-screen stage stays pinned while vertical scroll is *scrubbed* into a     *
 *  horizontal translate. The first panel is the section intro so the reel     *
 *  reads as one editorial spread.                                             *
 *                                                                             *
 *  On touch / narrow / reduced-motion, the same eight cards become a native   *
 *  horizontal scroll-snap strip below a normal stacked intro — every card     *
 *  stays reachable with zero scripted motion (the spec's true baseline).      *
 *                                                                             *
 *  Accent discipline: project.accent is scoped per card via --card-accent and *
 *  used ONLY for borders, dots, glows and the big ghost number. All card text *
 *  stays --ink / --ink-muted so it passes AA on the light default.            *
 * -------------------------------------------------------------------------- */

const ease = [0.23, 1, 0.32, 1] as const;

type StatusMeta = { label: string; dot: string };

function statusMeta(status: Project["status"]): StatusMeta {
  switch (status) {
    case "published-npm":
      return { label: "Published on npm", dot: "var(--ok)" };
    case "in-development":
      return { label: "In development", dot: "var(--warn)" };
    default:
      return { label: "Shipped", dot: "var(--accent)" };
  }
}

function isNpmDemo(demo?: string): boolean {
  return demo?.includes("npmjs.com") ?? false;
}

/* -------------------------------------------------------------------------- *
 *  FLAGSHIP CARD                                                              *
 * -------------------------------------------------------------------------- */
function FlagshipCard({
  project,
  index,
  variant,
  onOpen,
}: {
  project: Project;
  index: number;
  variant: "reel" | "strip";
  onOpen: (p: Project) => void;
}) {
  const number = String(index + 1).padStart(2, "0");
  const status = statusMeta(project.status);
  const npm = isNpmDemo(project.demo);
  const valueColor = "color-mix(in srgb, var(--card-accent) 60%, var(--ink))";

  /* Cards size to their content; the reel track's `items-stretch` then makes
   * every card equal to the TALLEST card, so the densest card never clips and
   * the rest still share one height. A min-h keeps short cards substantial. */
  const sizing =
    variant === "reel"
      ? "w-[clamp(300px,80vw,540px)] min-h-[clamp(440px,68vh,600px)]"
      : "w-[85vw] max-w-[440px] min-h-[clamp(440px,70vh,600px)] h-auto";

  const open = () => onOpen(project);

  return (
    <article
      data-cursor="target"
      style={
        { ["--card-accent" as string]: project.accent } as React.CSSProperties
      }
      className={`group relative flex flex-shrink-0 snap-center flex-col overflow-hidden rounded-[var(--r-lg)] border border-[color:var(--line)] bg-[color:var(--surface)] shadow-[var(--shadow-sm)] transition-[transform,box-shadow] duration-[240ms] [transition-timing-function:var(--ease-out)] hover:-translate-y-1.5 hover:shadow-[var(--shadow-md)] ${sizing}`}
    >
      {/* Stretched overlay button — fills the card to open the case study while
       * sitting BELOW the real links (which are raised with relative + z-10). */}
      <button
        type="button"
        data-cursor="target"
        onClick={open}
        aria-label={`Open case study for ${project.name}`}
        className="absolute inset-0 z-0 cursor-pointer rounded-[var(--r-lg)] outline-none transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)] active:scale-95"
      />

      {/* Accent-tinted top border line (solid, never a gradient hue in chrome). */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px"
        style={{
          background: "color-mix(in srgb, var(--card-accent) 55%, transparent)",
        }}
      />

      {/* HEADER PLATE — accent glow, ghost number, monogram, status, source.
       * pointer-events-none lets header clicks fall through to the overlay; the
       * GitHub link re-enables them so it stays independently clickable. */}
      <header
        className="pointer-events-none relative isolate z-10 flex items-start justify-between gap-3 px-6 pb-5 pt-6 sm:px-7"
        style={{
          background: `radial-gradient(120% 130% at 12% 0%, ${project.accentGlow}, transparent 64%)`,
        }}
      >
        {/* Big ghost number. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-3 right-4 select-none font-display text-[5.5rem] font-extrabold leading-none tracking-[-0.05em] sm:text-[6.5rem]"
          style={{ color: project.accent, opacity: 0.12 }}
        >
          {number}
        </span>

        <div className="relative z-10 flex items-center gap-3">
          {/* Monogram tile. */}
          <span
            aria-hidden="true"
            className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-[var(--r-sm)] font-display text-[1.35rem] font-bold leading-none"
            style={{
              color: project.accent,
              background:
                "color-mix(in srgb, var(--card-accent) 14%, transparent)",
              border:
                "1px solid color-mix(in srgb, var(--card-accent) 38%, transparent)",
            }}
          >
            {project.name[0]}
          </span>
          {/* Status pill — accent owns the dot, text stays ink. */}
          <span className="card-pill inline-flex items-center gap-2 rounded-[var(--r-pill)] border px-2.5 py-1 font-mono text-[0.66rem] uppercase tracking-[0.14em]">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: status.dot }}
            />
            {status.label}
          </span>
        </div>

        {/* GitHub link — raised above the overlay button so it stays clickable. */}
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="target"
          aria-label={`View ${project.name} source on GitHub`}
          className="pointer-events-auto relative z-10 grid h-11 w-11 flex-shrink-0 place-items-center rounded-[var(--r-sm)] border border-[color:var(--line)] bg-[color:var(--surface)] text-[color:var(--ink-muted)] transition-colors duration-200 hover:border-[color:var(--accent)] hover:text-[color:var(--accent-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)] active:scale-95"
        >
          <GithubIcon size={18} />
        </a>
      </header>

      {/* BODY — pointer-events-none so card clicks fall through to the overlay
       * button; the real links below re-enable pointer events. */}
      <div className="pointer-events-none relative z-10 flex min-h-0 flex-1 flex-col px-6 pb-6 sm:px-7">
        <h3 className="text-h2 text-[color:var(--ink)]">{project.name}</h3>

        <p className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-data">
          <span className="text-[color:var(--ink-faint)]">
            {project.platform}
          </span>
          <span aria-hidden="true" className="text-[color:var(--line-strong)]">
            /
          </span>
          <span className="data text-[color:var(--ink-faint)]">
            {project.year}
          </span>
        </p>

        <p className="mt-3 line-clamp-2 text-body text-[color:var(--ink-muted)]">
          {project.tagline}
        </p>

        {/* 2×2 highlights grid — single column under 360px so long values do not
         * clip, two columns above; tabular values mixed toward ink. */}
        <dl className="mt-5 grid grid-cols-1 gap-px overflow-hidden rounded-[var(--r-sm)] border border-[color:var(--line)] bg-[color:var(--line)] min-[360px]:grid-cols-2">
          {project.highlights.slice(0, 4).map((h) => (
            <div
              key={h.label}
              className="bg-[color:var(--surface)] px-3.5 py-3"
            >
              <dd
                className="data text-data-lg leading-tight tabular-nums"
                style={{ color: valueColor }}
              >
                {h.value}
              </dd>
              <dt className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] tabular-nums text-[color:var(--ink-faint)]">
                {h.label}
              </dt>
            </div>
          ))}
        </dl>

        {/* Tech chips — first six + overflow count. */}
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 6).map((t) => (
            <li
              key={t}
              className="chip px-2.5 py-1"
              style={
                {
                  ["--chip-accent" as string]: project.accent,
                } as React.CSSProperties
              }
            >
              {t}
            </li>
          ))}
          {project.tech.length > 6 && (
            <li className="chip px-2.5 py-1 text-[color:var(--ink-faint)]">
              +{project.tech.length - 6}
            </li>
          )}
        </ul>

        {/* Footer row — case-study cue + conditional demo link. */}
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-[color:var(--line)] pt-4">
          <span className="link-underline font-display text-small font-semibold text-[color:var(--ink)]">
            Case study
            <ArrowUpRight
              size={15}
              strokeWidth={1.5}
              aria-hidden="true"
              className="ml-1 inline-block align-[-0.1em] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>

          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="target"
              aria-label={`${npm ? "View on npm" : "Open live demo"} for ${project.name}`}
              className="pointer-events-auto relative z-10 inline-flex min-h-[2.25rem] items-center gap-1.5 rounded-[var(--r-sm)] border border-[color:var(--line)] px-2.5 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-[color:var(--ink-muted)] transition-colors duration-200 hover:border-[color:var(--accent)] hover:text-[color:var(--accent-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)] active:scale-95"
            >
              <ExternalLink size={13} strokeWidth={1.5} aria-hidden="true" />
              {npm ? "npm" : "Live"}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------------- *
 *  REEL INTRO PANEL — the first horizontal panel (and the stacked fallback    *
 *  intro). `progress` drives the accent bar only in the pinned reel.          *
 * -------------------------------------------------------------------------- */
function ReelIntro({
  variant,
  progress,
}: {
  variant: "reel" | "strip";
  progress?: ReturnType<typeof useTransform<number, number>>;
}) {
  const body = (
    <>
      <span className="section-index">
        <span className="text-[color:var(--ink-muted)]">01</span>
        <span className="mx-2 text-[color:var(--ink-faint)]">/</span>
        <span className="text-[color:var(--accent-strong)]">WORK</span>
      </span>

      <h2
        id="work-title"
        className="mt-5 font-display text-h1 text-[color:var(--ink)]"
      >
        The <span className="serif-italic">Project.</span>
      </h2>

      <p className="mt-5 max-w-[42ch] text-lede text-[color:var(--ink-muted)]">
        Eight flagship builds, every claim grounded in a public repository. A
        framework, a self-training LLM, a published library, on-device ML, and
        the apps that run on them.
      </p>

      {variant === "reel" ? (
        <div className="mt-9 flex items-center gap-4">
          <span className="font-mono text-eyebrow uppercase tracking-[0.16em] text-[color:var(--ink-faint)]">
            Scroll to advance
          </span>
          <div
            aria-hidden="true"
            className="relative h-1 w-40 overflow-hidden rounded-[var(--r-pill)] bg-[color:var(--surface-2)]"
          >
            <motion.span
              className="absolute inset-y-0 left-0 w-full origin-left rounded-[var(--r-pill)] bg-[color:var(--accent)]"
              style={{ scaleX: progress }}
            />
          </div>
        </div>
      ) : (
        <p className="mt-8 inline-flex items-center gap-2 font-mono text-eyebrow uppercase tracking-[0.16em] text-[color:var(--ink-faint)]">
          Swipe through the reel
          <ArrowUpRight
            size={14}
            strokeWidth={1.5}
            aria-hidden="true"
            className="rotate-45"
          />
        </p>
      )}
    </>
  );

  if (variant === "reel") {
    return (
      <div className="flex min-h-[clamp(440px,72vh,640px)] w-[clamp(300px,70vw,460px)] flex-shrink-0 flex-col justify-center pr-4">
        {body}
      </div>
    );
  }
  return body;
}

/* -------------------------------------------------------------------------- *
 *  PINNED REEL (wide + motion) — scrubbed horizontal track inside a tall      *
 *  outer wrapper whose sticky child stays h-screen.                           *
 * -------------------------------------------------------------------------- */
function PinnedReel({ onOpen }: { onOpen: (p: Project) => void }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollDistanceRef = useRef(0);

  const [wrapperHeight, setWrapperHeight] = useState(0);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  /* Function-form transform reads the measured distance ref at evaluation
   * time, so the x range stays correct after layout / resize without re-wiring
   * the motion value. */
  const x = useTransform(
    scrollYProgress,
    (p) => -(p * scrollDistanceRef.current),
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      const viewportWidth = window.innerWidth;
      const distance = Math.max(0, track.scrollWidth - viewportWidth);
      scrollDistanceRef.current = distance;
      setWrapperHeight(window.innerHeight + distance);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    window.addEventListener("orientationchange", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
    };
  }, []);

  return (
    <div
      ref={outerRef}
      style={{ height: wrapperHeight || "100vh" }}
      className="relative"
    >
      {/* pt clears the floating nav so cards never sit under it; pb balances. */}
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden pt-[5.5rem] pb-8">
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex items-stretch gap-6 pl-[clamp(1rem,6vw,5rem)] pr-[clamp(1rem,8vw,8rem)] will-change-transform"
        >
          <ReelIntro variant="reel" progress={scrollYProgress} />
          {flagshipProjects.map((project, i) => (
            <FlagshipCard
              key={project.id}
              project={project}
              index={i}
              variant="reel"
              onOpen={onOpen}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- *
 *  FALLBACK STRIP (narrow / reduced-motion) — native scroll-snap.            *
 * -------------------------------------------------------------------------- */
function FallbackStrip({ onOpen }: { onOpen: (p: Project) => void }) {
  return (
    <>
      <Container>
        <Reveal>
          <ReelIntro variant="strip" />
        </Reveal>
      </Container>

      <ul
        className="mt-10 flex snap-x snap-mandatory list-none gap-5 overflow-x-auto px-[clamp(1rem,4vw,2rem)] pb-4 [scrollbar-width:thin] [-webkit-overflow-scrolling:touch]"
        aria-label="Flagship projects"
      >
        {flagshipProjects.map((project, i) => (
          <li key={project.id} className="flex">
            <FlagshipCard
              project={project}
              index={i}
              variant="strip"
              onOpen={onOpen}
            />
          </li>
        ))}
        {/* Trailing spacer so the last card can snap-center on wide-ish touch. */}
        <li aria-hidden="true" className="block w-[1px] flex-shrink-0" />
      </ul>
    </>
  );
}

/* -------------------------------------------------------------------------- *
 *  SECONDARY "ALSO SHIPPED" — calm static grid.                              *
 * -------------------------------------------------------------------------- */
function AlsoShipped({ onOpen }: { onOpen: (p: Project) => void }) {
  return (
    <Container>
      <div className="flex flex-col gap-4 border-t border-[color:var(--line-strong)] pt-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Reveal>
            <span className="section-index">
              <span className="text-[color:var(--ink-muted)]">Also</span>
              <span className="mx-2 text-[color:var(--ink-faint)]">/</span>
              <span className="text-[color:var(--accent-strong)]">
                Small Project
              </span>
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h3 className="mt-4 text-h2 text-[color:var(--ink)]">
              Smaller builds,{" "}
              <span className="serif-italic">same standard.</span>
            </h3>
          </Reveal>
          <Reveal
            as="p"
            delay={0.08}
            className="mt-3 max-w-[52ch] text-body text-[color:var(--ink-muted)]"
          >
            Focused apps and tools that ship the same discipline at a smaller
            scope. Public repositories, every one.
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <a
            href="https://github.com/OnlyDev321"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="target"
            className="btn-ghost flex-shrink-0"
            aria-label="Browse all repositories on GitHub"
          >
            <GithubIcon size={16} />
            All repositories
            <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
          </a>
        </Reveal>
      </div>

      <ul
        className="mt-9 grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
      >
        {secondaryProjects.map((project, i) => (
          <li key={project.id}>
            <Reveal delay={i * 0.08}>
              <article
                data-cursor="target"
                style={
                  {
                    ["--card-accent" as string]: project.accent,
                  } as React.CSSProperties
                }
                className="group relative flex h-full flex-col rounded-[var(--r-md)] border border-[color:var(--line)] bg-[color:var(--surface)] p-5 shadow-[var(--shadow-sm)] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-[color:var(--line-strong)] hover:shadow-[var(--shadow-md)]"
              >
                {/* Stretched overlay button — opens the case study; no inner links
                 * here so it owns the whole card. */}
                <button
                  type="button"
                  data-cursor="target"
                  onClick={() => onOpen(project)}
                  aria-label={`Open case study for ${project.name}`}
                  className="absolute inset-0 z-0 cursor-pointer rounded-[var(--r-md)] outline-none transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)] active:scale-95"
                />

                <div className="pointer-events-none relative z-10 flex items-start justify-between gap-3">
                  <span
                    aria-hidden="true"
                    className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-[var(--r-sm)] font-display text-[1.2rem] font-bold leading-none"
                    style={{
                      color: project.accent,
                      background:
                        "color-mix(in srgb, var(--card-accent) 14%, transparent)",
                      border:
                        "1px solid color-mix(in srgb, var(--card-accent) 38%, transparent)",
                    }}
                  >
                    {project.name[0]}
                  </span>
                  <ArrowUpRight
                    size={18}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="flex-shrink-0 text-[color:var(--ink-faint)] transition-[transform,color] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--accent-strong)]"
                  />
                </div>

                <h4 className="pointer-events-none relative z-10 mt-4 font-display text-h3 text-[color:var(--ink)]">
                  {project.name}
                </h4>
                <p className="pointer-events-none relative z-10 mt-1 font-mono text-data text-[color:var(--ink-faint)]">
                  {project.platform}
                </p>
                <p className="pointer-events-none relative z-10 mt-2 text-small text-[color:var(--ink-muted)]">
                  {project.tagline}
                </p>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </Container>
  );
}

/* -------------------------------------------------------------------------- *
 *  WORK SECTION                                                               *
 * -------------------------------------------------------------------------- */
export default function Work() {
  const reduceMotion = useReducedMotion();
  const { width } = useWindowSize();
  const [activeModal, setActiveModal] = useState<Project | null>(null);

  const pinned = width >= 1024 && !reduceMotion;

  return (
    <section id="work" aria-labelledby="work-title" className="relative">
      {pinned ? (
        <PinnedReel onOpen={setActiveModal} />
      ) : (
        <div style={{ paddingBlock: "var(--section-y)" }}>
          <FallbackStrip onOpen={setActiveModal} />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 0.7, ease }}
        style={{ paddingBlock: "var(--section-y-tight)" }}
      >
        <AlsoShipped onOpen={setActiveModal} />
      </motion.div>

      <ProjectModal
        project={activeModal}
        onClose={() => setActiveModal(null)}
      />
    </section>
  );
}
