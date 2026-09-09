import { useEffect, useState } from 'react'

/**
 * Live local time in Asia/Seoul (Seoul, South Korea). A signal that the
 * person on the other end is real, awake, and reachable. Updates every 30s
 * to keep the DOM cost negligible.
 */
export default function LocalTime() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(id)
  }, [])

  const time = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Seoul',
  }).format(now)

  // Working-hours indicator — 09:00–23:00 KST counts as "online"
  const hour = Number(
    new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      hour12: false,
      timeZone: 'Asia/Seoul',
    }).format(now),
  )
  const online = hour >= 9 && hour < 23

  return (
    <span className="inline-flex items-center gap-2 font-mono text-[0.72rem] text-[color:var(--ink-faint)]">
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 rounded-full ${online ? 'bg-[color:var(--ok)]' : 'bg-[color:var(--warn)]'}`}
        style={{
          boxShadow: online ? '0 0 8px var(--ok)' : '0 0 8px var(--warn)',
        }}
      />
      <span className="uppercase tracking-[0.16em]">
        Seoul · {time} KST
      </span>
    </span>
  )
}
