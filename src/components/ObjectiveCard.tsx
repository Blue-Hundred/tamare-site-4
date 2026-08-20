import type { ReactNode } from 'react'
import CaseStudyCard from './CaseStudyCard'

type ObjectiveCardProps = {
  number: ReactNode
  title: string
  body: string
}

export function NumberIcon({ number }: { number: ReactNode }) {
  return (
    <div
      className="rounded-full flex items-center justify-center shrink-0"
      style={{ width: 44, height: 44, backgroundColor: '#f5f5f5' }}
      aria-hidden="true"
    >
      <span style={{ color: '#0f0f0e', fontWeight: 600, fontSize: 16, letterSpacing: '-0.3px' }}>
        {number}
      </span>
    </div>
  )
}

export default function ObjectiveCard({ number, title, body }: ObjectiveCardProps) {
  return (
    <CaseStudyCard className="p-5 md:p-6 flex flex-col gap-6 md:gap-8">
      <NumberIcon number={number} />
      <div className="flex flex-col gap-3">
        <h3 className="text-h4" style={{ color: '#0f0f0e' }}>{title}</h3>
        <p className="text-body-18" style={{ color: '#595958' }}>{body}</p>
      </div>
    </CaseStudyCard>
  )
}
