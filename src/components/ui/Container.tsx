import { type HTMLAttributes } from 'react'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'narrow' | 'default'
}

/* 1200px content track (1640px at 4K via .bp-xxl-container), fluid gutters. */
export function Container({ size = 'default', className = '', ...rest }: ContainerProps) {
  const track = size === 'narrow' ? 'max-w-[760px]' : 'bp-xxl-container'
  return (
    <div
      className={`mx-auto w-full px-[clamp(1rem,4vw,2rem)] ${track} ${className}`}
      {...rest}
    />
  )
}
