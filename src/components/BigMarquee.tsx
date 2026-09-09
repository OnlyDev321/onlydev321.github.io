import { memo, useMemo } from 'react'

interface BigMarqueeProps {
  items: string[]
  /** Animation duration in seconds (lower = faster). */
  speed?: number
  reverse?: boolean
  className?: string
}

/* -------------------------------------------------------------------------- *
 *  BIG MARQUEE — device #4, the SINGLE marquee on the page. A capabilities    *
 *  ribbon of outlined display words scrolling once-around seamlessly.         *
 *  Decorative + aria-hidden (the real capability list lives in <Stack/>).     *
 *  GPU-only transform, paused on hover, memoized leaf (perpetual animation).  *
 * -------------------------------------------------------------------------- */
function BigMarqueeBase({ items, speed = 40, reverse = false, className = '' }: BigMarqueeProps) {
  const doubled = useMemo(() => [...items, ...items], [items])
  return (
    <div aria-hidden="true" className={`marquee-track relative w-full overflow-hidden py-6 sm:py-9 ${className}`}>
      <div
        className="animate-marquee flex w-max items-center"
        style={{ ['--marquee-duration' as string]: `${speed}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex flex-shrink-0 items-center gap-8 sm:gap-12 min-[1920px]:gap-16">
            <span className="font-display text-display font-bold leading-none text-outline">{item}</span>
            <span aria-hidden="true" className="font-display text-display leading-none text-[color:var(--accent)]">/</span>
          </span>
        ))}
      </div>
    </div>
  )
}

const BigMarquee = memo(BigMarqueeBase)
export default BigMarquee
