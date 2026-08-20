import type { ReactNode } from 'react'

type CaseStudyParagraphProps = {
  children: ReactNode
  className?: string
}

export default function CaseStudyParagraph({ children, className = '' }: CaseStudyParagraphProps) {
  return (
    <p className={`text-body-18 max-w-[720px] ${className}`} style={{ color: '#595958' }}>
      {children}
    </p>
  )
}
