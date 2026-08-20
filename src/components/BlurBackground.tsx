import type { ReactNode } from 'react'

type BlurBackgroundProps = {
  children: ReactNode
  className?: string
}

export default function BlurBackground({ children, className = '' }: BlurBackgroundProps) {
  return (
    <div
      className={`rounded-[20px] p-4 md:p-5 ${className}`}
      style={{ backdropFilter: 'blur(6px)' }}
    >
      {children}
    </div>
  )
}
