import type { ComponentType } from 'react'
import type { LucideProps } from 'lucide-react'

interface ParticipantCriteriaCardProps {
  text: string
  icon: ComponentType<LucideProps>
}

export default function ParticipantCriteriaCard({ text, icon: Icon }: ParticipantCriteriaCardProps) {
  return (
    <article className="h-full flex items-start gap-4 rounded-[16px] p-5 md:p-6" style={{ background: '#ecf8ff' }}>
      <span
        className="shrink-0 rounded-full flex items-center justify-center"
        style={{ width: 40, height: 40, background: '#ffffff', color: '#014ba6' }}
        aria-hidden="true"
      >
        <Icon size={19} strokeWidth={1.8} />
      </span>
      <p className="text-body-18" style={{ color: '#0f0f0e' }}>{text}</p>
    </article>
  )
}
