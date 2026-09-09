export interface ProcessStep {
  id: string
  index: string
  title: string
  body: string
  artifacts: string[]
}

/* How a product gets from an idea to something people actually use. */
export const processSteps: ProcessStep[] = [
  {
    id: 'frame',
    index: '01',
    title: 'Frame',
    body:
      'Before code, the question. I find the real problem (the one users feel, not the one the brief describes) and surface the hard constraints early so they shape the architecture instead of the bug list.',
    artifacts: ['Problem statement', 'Constraint map', 'Success metrics'],
  },
  {
    id: 'architect',
    index: '02',
    title: 'Architect',
    body:
      'A typed, modular foundation with predictable state and clear seams: the kind of structure a framework, an LLM, and a mobile app can all share. Decisions get written down so the system survives past month six.',
    artifacts: ['Module map', 'Typed boundaries', 'Performance budget'],
  },
  {
    id: 'build',
    index: '03',
    title: 'Build',
    body:
      'Vertical slices over horizontal layers. The first PR is something you can touch (a feed, a chat, a training loop), not a folder of utils. Ship daily, review continuously, refactor on the third pass.',
    artifacts: ['Vertical-slice MVP', 'Design system', 'Test harness'],
  },
  {
    id: 'ship',
    index: '04',
    title: 'Ship',
    body:
      'CI that enforces the budget, env-aware builds, signed releases, OTA where it fits. Deployments that used to take a day take ten minutes, and stop failing the way they used to.',
    artifacts: ['CI/CD pipeline', 'Crash + perf telemetry', 'Release playbook'],
  },
  {
    id: 'measure',
    index: '05',
    title: 'Measure',
    body:
      'Cold-start, frame drops, crash-free sessions, retention, eval scores. Numbers I can defend in a roadmap meeting, and if something regresses, the dashboard tells us before users do.',
    artifacts: ['Perf budgets', 'Crash-free %', 'Eval gates'],
  },
]
