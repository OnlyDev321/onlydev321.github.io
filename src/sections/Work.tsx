import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  MoveHorizontal,
} from "lucide-react";
import { GithubIcon } from "../components/SocialIcons";
import { Container } from "../components/ui";
import { Reveal } from "../components/Kinetic";
import ProjectModal from "../components/ProjectModal";
import { useWindowSize } from "../hooks/useWindowSize";
import { flagshipProjects, secondaryProjects } from "../data/projects";
import type { Project } from "../types";

/* -------------------------------------------------------------------------- *
 *  WORK — horizontal draggable showcase with natural vertical page scroll.   *
 *                                                                             *
 *  - Vertical mouse wheel up/down scrolls the page up/down normally.         *
 *  - Left-click drag (or touch / trackpad swipe / arrow buttons) pans cards   *
 *    smoothly horizontally with inertial glide.                              *
 *  - Accidental clicks are suppressed during drag so cards don't open modals. *
 * -------------------------------------------------------------------------- */

const ease = [0.23, 1, 0.32, 1] as const;

type StatusMeta = { label: string; dot: string };

function statusMeta(status: Project["status"]): StatusMeta {
  switch (status) {
    case "published-npm":
      return { label: "Published on npm", dot: "var(--ok)" };
    case "in-development":
      return { label: "In development", dot: "var(--warn)" };
    case "completed":
      return { label: "Completed", dot: "var(--ok)" };
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

  const sizing =
    variant === "reel"
      ? "w-[clamp(300px,40vw,520px)] min-h-[clamp(460px,65vh,590px)]"
      : "w-[85vw] max-w-[440px] min-h-[clamp(440px,68vh,580px)] h-auto";

  const open = () => onOpen(project);

  return (
    <article
      style={
        { ["--card-accent" as string]: project.accent } as React.CSSProperties
      }
      className={`group relative flex flex-shrink-0 flex-col overflow-hidden rounded-[var(--r-lg)] border border-[color:var(--line)] bg-[color:var(--surface)] shadow-[var(--shadow-sm)] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1.5 hover:border-[color:var(--line-strong)] hover:shadow-[var(--shadow-md)] ${sizing}`}
    >
      {/* Stretched overlay button — fills the card to open the case study while
       * sitting BELOW the real links. */}
      <button
        type="button"
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

      {/* HEADER PLATE — accent glow, ghost number, monogram, status, source. */}
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
          <span
            data-cursor="target"
            className="link-underline font-display text-small font-semibold text-[color:var(--ink)]"
          >
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
 *  REEL INTRO PANEL — section title, overview, navigation arrows & progress  *
 * -------------------------------------------------------------------------- */
function ReelIntro({
  variant,
  progress = 0,
  onPrev,
  onNext,
  canPrev = false,
  canNext = true,
}: {
  variant: "reel" | "strip";
  progress?: number;
  onPrev?: () => void;
  onNext?: () => void;
  canPrev?: boolean;
  canNext?: boolean;
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
        <div className="mt-8 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            {/* Arrow navigation buttons */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={onPrev}
                disabled={!canPrev}
                aria-label="Previous project"
                data-cursor="target"
                className="grid h-9 w-9 place-items-center rounded-[var(--r-sm)] border border-[color:var(--line)] bg-[color:var(--surface)] text-[color:var(--ink-muted)] transition-all duration-200 hover:border-[color:var(--accent)] hover:text-[color:var(--accent-strong)] disabled:pointer-events-none disabled:opacity-25 active:scale-95"
              >
                <ArrowLeft size={15} />
              </button>
              <button
                type="button"
                onClick={onNext}
                disabled={!canNext}
                aria-label="Next project"
                data-cursor="target"
                className="grid h-9 w-9 place-items-center rounded-[var(--r-sm)] border border-[color:var(--line)] bg-[color:var(--surface)] text-[color:var(--ink-muted)] transition-all duration-200 hover:border-[color:var(--accent)] hover:text-[color:var(--accent-strong)] disabled:pointer-events-none disabled:opacity-25 active:scale-95"
              >
                <ArrowRight size={15} />
              </button>
            </div>

            {/* Progress Bar */}
            <div
              aria-hidden="true"
              className="relative h-1 w-28 overflow-hidden rounded-[var(--r-pill)] bg-[color:var(--surface-2)]"
            >
              <div
                className="absolute inset-y-0 left-0 rounded-[var(--r-pill)] bg-[color:var(--accent)] transition-all duration-150"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>
          </div>

          <p className="flex items-center gap-2 font-mono text-eyebrow uppercase tracking-[0.16em] text-[color:var(--ink-faint)]">
            <MoveHorizontal
              size={14}
              className="text-[color:var(--accent)] animate-pulse"
            />
            Drag or swipe to explore
          </p>
        </div>
      ) : (
        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="inline-flex items-center gap-2 font-mono text-eyebrow uppercase tracking-[0.16em] text-[color:var(--ink-faint)]">
            <MoveHorizontal size={14} className="text-[color:var(--accent)]" />
            Swipe or drag cards
          </p>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onPrev}
              disabled={!canPrev}
              aria-label="Previous project"
              data-cursor="target"
              className="grid h-9 w-9 place-items-center rounded-[var(--r-sm)] border border-[color:var(--line)] bg-[color:var(--surface)] text-[color:var(--ink-muted)] transition-all duration-200 hover:border-[color:var(--accent)] hover:text-[color:var(--accent-strong)] disabled:pointer-events-none disabled:opacity-25 active:scale-95"
            >
              <ArrowLeft size={15} />
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={!canNext}
              aria-label="Next project"
              data-cursor="target"
              className="grid h-9 w-9 place-items-center rounded-[var(--r-sm)] border border-[color:var(--line)] bg-[color:var(--surface)] text-[color:var(--ink-muted)] transition-all duration-200 hover:border-[color:var(--accent)] hover:text-[color:var(--accent-strong)] disabled:pointer-events-none disabled:opacity-25 active:scale-95"
            >
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}
    </>
  );

  if (variant === "reel") {
    return (
      <div className="flex min-h-[clamp(460px,65vh,590px)] w-[clamp(300px,70vw,460px)] flex-shrink-0 flex-col justify-center pr-4 select-none">
        {body}
      </div>
    );
  }
  return body;
}

/* -------------------------------------------------------------------------- *
 *  DRAGGABLE REEL — mouse drag + touch/trackpad swipe + smooth momentum       *
 * -------------------------------------------------------------------------- */
function DraggableReel({
  onOpen,
  isDesktop,
}: {
  onOpen: (p: Project) => void;
  isDesktop: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const dragRef = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
    hasMoved: false,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
    momentumFrame: 0,
  });

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 0) {
      setProgress(0);
      setCanPrev(false);
      setCanNext(false);
      return;
    }
    const current = Math.max(0, Math.min(max, el.scrollLeft));
    setProgress(current / max);
    setCanPrev(current > 12);
    setCanNext(current < max - 12);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only primary button (left mouse click)
    if (e.button !== 0) return;
    const el = trackRef.current;
    if (!el) return;

    cancelAnimationFrame(dragRef.current.momentumFrame);

    dragRef.current.isDown = true;
    dragRef.current.startX = e.clientX;
    dragRef.current.scrollLeft = el.scrollLeft;
    dragRef.current.hasMoved = false;
    dragRef.current.lastX = e.clientX;
    dragRef.current.lastTime = performance.now();
    dragRef.current.velocity = 0;
  };

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!dragRef.current.isDown) return;
      const el = trackRef.current;
      if (!el) return;

      const dx = e.clientX - dragRef.current.startX;
      if (!dragRef.current.hasMoved && Math.abs(dx) > 6) {
        dragRef.current.hasMoved = true;
        setIsDragging(true);
      }

      if (dragRef.current.hasMoved) {
        // Prevent accidental text/image selection
        e.preventDefault();

        const now = performance.now();
        const dt = now - dragRef.current.lastTime;
        if (dt > 0) {
          dragRef.current.velocity = (e.clientX - dragRef.current.lastX) / dt;
        }
        dragRef.current.lastX = e.clientX;
        dragRef.current.lastTime = now;

        el.scrollLeft = dragRef.current.scrollLeft - dx;
      }
    };

    const handlePointerUp = () => {
      if (!dragRef.current.isDown) return;
      dragRef.current.isDown = false;
      const el = trackRef.current;

      if (dragRef.current.hasMoved) {
        // Intercept and swallow trailing click event so card modal doesn't trigger
        const preventClick = (e: MouseEvent) => {
          e.stopPropagation();
          e.preventDefault();
        };
        window.addEventListener("click", preventClick, {
          capture: true,
          once: true,
        });
        setTimeout(() => {
          window.removeEventListener("click", preventClick, { capture: true });
        }, 100);

        // Inertial glide momentum
        if (el) {
          let v = dragRef.current.velocity;
          v = Math.max(-2.2, Math.min(2.2, v));
          if (Math.abs(v) > 0.08) {
            let lastT = performance.now();
            const decay = 0.94;
            const glide = (now: number) => {
              const dt = now - lastT;
              lastT = now;
              if (Math.abs(v) > 0.02) {
                el.scrollLeft -= v * dt;
                v *= Math.pow(decay, dt / 16);
                dragRef.current.momentumFrame = requestAnimationFrame(glide);
              } else {
                setIsDragging(false);
              }
            };
            dragRef.current.momentumFrame = requestAnimationFrame(glide);
          } else {
            setIsDragging(false);
          }
        } else {
          setIsDragging(false);
        }
      } else {
        setIsDragging(false);
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      cancelAnimationFrame(dragRef.current.momentumFrame);
    };
  }, []);

  const scrollByAmount = (amount: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  const onPrev = () => scrollByAmount(-500);
  const onNext = () => scrollByAmount(500);

  if (isDesktop) {
    return (
      <div className="relative">
        <div
          ref={trackRef}
          onPointerDown={handlePointerDown}
          onDragStart={(e) => e.preventDefault()}
          className={`flex items-stretch gap-6 overflow-x-auto select-none no-scrollbar pl-[clamp(1rem,6vw,5rem)] pr-[clamp(1rem,8vw,8rem)] py-6 ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{
            WebkitOverflowScrolling: "touch",
          }}
        >
          <ReelIntro
            variant="reel"
            progress={progress}
            onPrev={onPrev}
            onNext={onNext}
            canPrev={canPrev}
            canNext={canNext}
          />
          {flagshipProjects.map((project, i) => (
            <FlagshipCard
              key={project.id}
              project={project}
              index={i}
              variant="reel"
              onOpen={onOpen}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <Container>
        <Reveal>
          <ReelIntro
            variant="strip"
            progress={progress}
            onPrev={onPrev}
            onNext={onNext}
            canPrev={canPrev}
            canNext={canNext}
          />
        </Reveal>
      </Container>

      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onDragStart={(e) => e.preventDefault()}
        className={`mt-10 flex list-none gap-5 overflow-x-auto select-none no-scrollbar px-[clamp(1rem,4vw,2rem)] pb-4 ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{
          WebkitOverflowScrolling: "touch",
        }}
        aria-label="Flagship projects"
      >
        {flagshipProjects.map((project, i) => (
          <div key={project.id} className="flex flex-shrink-0">
            <FlagshipCard
              project={project}
              index={i}
              variant="strip"
              onOpen={onOpen}
            />
          </div>
        ))}
        <div aria-hidden="true" className="block w-[1px] flex-shrink-0" />
      </div>
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
                {/* Stretched overlay button — opens the case study */}
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
  const { width } = useWindowSize();
  const [activeModal, setActiveModal] = useState<Project | null>(null);

  const isDesktop = width >= 1024;

  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="relative"
      style={{ paddingBlock: "var(--section-y)" }}
    >
      <DraggableReel onOpen={setActiveModal} isDesktop={isDesktop} />

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
