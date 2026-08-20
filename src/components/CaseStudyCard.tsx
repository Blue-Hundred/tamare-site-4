import type { ReactNode } from 'react'

type CaseStudyCardProps = {
  children: ReactNode
  className?: string
}

export default function CaseStudyCard({ children, className = '' }: CaseStudyCardProps) {
  return (
    <div className={`rounded-[10px] bg-white ${className}`.trim()}>
      {children}
    </div>
  )
}
