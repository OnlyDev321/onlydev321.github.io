import { type HTMLAttributes } from 'react'

interface SectionProps extends HTMLAttributes<HTMLElement> {
  spacing?: 'standard' | 'tight' | 'none'
}

const spacingClass = {
  standard: 'section-y',
  tight: 'section-y-tight',
  none: '',
} as const

export function Section({ spacing = 'standard', className = '', children, ...rest }: SectionProps) {
  return (
    <section className={`relative ${spacingClass[spacing]} ${className}`} {...rest}>
      {children}
    </section>
  )
}
