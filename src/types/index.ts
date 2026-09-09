export type ProjectStatus = 'shipped' | 'in-development' | 'published-npm'
export type ProjectTier = 'flagship' | 'secondary'

export interface Project {
  id: string
  name: string
  /** "owner/repo" — rendered in monospace as a verifiable artifact. */
  repo: string
  /** Year (or year range) for the editorial index. */
  year: string
  /** Short "kind" label, e.g. "Cross-platform framework". */
  platform: string
  tagline: string
  description: string
  features: string[]
  tech: string[]
  github: string
  demo?: string
  accent: string
  accentGlow: string
  category: string
  status: ProjectStatus
  tier: ProjectTier
  highlights: CaseStudyHighlight[]
}

export interface CaseStudyHighlight {
  label: string
  value: string
}

export interface Experience {
  role: string
  company: string
  location: string
  period: string
  current?: boolean
  bullets: string[]
}

export interface Education {
  degree: string
  institution: string
  period: string
  note?: string
}

export interface Certification {
  name: string
  issuer: string
  year: string
}

export interface Skill {
  name: string
  category: string
  level?: number
  icon?: string
}
