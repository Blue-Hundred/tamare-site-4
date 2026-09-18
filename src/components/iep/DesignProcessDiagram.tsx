import { Fragment } from 'react'
import { IEP } from './tokens'

const ORANGE = '#ec6a3e'
const ORANGE_SOFT = '#f4926b'

type Phase =
  | { kind: 'anchor'; label: string }
  | { kind: 'cluster'; items: string[] }

const phases: Phase[] = [
  { kind: 'anchor', label: 'Research & define scope and goals' },
  {
    kind: 'cluster',
    items: ['Identify components', 'Design the system components', 'Create the design documentation', 'Develop UI components'],
  },
  { kind: 'anchor', label: 'Create & develop guidelines' },
  { kind: 'cluster', items: ['Conduct training', 'Test & innovate where necessary', 'Maintain & improve'] },
]

function Arrow() {
  return (
    <div className="flex items-center justify-center text-[#c9c9cc]" aria-hidden="true">
      <span className="hidden lg:block" style={{ fontSize: 18, lineHeight: 1 }}>
        →
      </span>
      <span className="block lg:hidden" style={{ fontSize: 18, lineHeight: 1 }}>
        ↓
      </span>
    </div>
  )
}

function AnchorBox({ label }: { label: string }) {
  return (
    <div
      className="flex items-center justify-center rounded-2xl px-5 py-6 text-center"
      style={{
        width: 168,
        minHeight: 132,
        background: '#fff',
        border: `1px solid ${IEP.border}`,
        boxShadow: '0 4px 12px rgba(15,15,14,0.05)',
      }}
    >
      <span style={{ fontSize: 13, fontWeight: 500, color: IEP.ink, lineHeight: 1.35 }}>{label}</span>
    </div>
  )
}

function Cluster({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3" style={{ maxWidth: 320 }}>
      {items.map((item, i) => (
        <div
          key={item}
          className="flex items-center justify-center rounded-full p-4 text-center"
          style={{
            width: 132,
            height: 132,
            background: i % 2 === 0 ? ORANGE : ORANGE_SOFT,
            color: '#fff',
          }}
        >
          <span style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.3 }}>{item}</span>
        </div>
      ))}
    </div>
  )
}

export default function DesignProcessDiagram() {
  return (
    <div
      className="rounded-[20px] px-4 py-10 md:px-10 md:py-14"
      style={{ background: '#f3f2fb', border: `1px solid ${IEP.cardBorder}` }}
    >
      <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-center lg:justify-center lg:gap-5">
        {phases.map((phase, i) => (
          <Fragment key={i}>
            {phase.kind === 'anchor' ? <AnchorBox label={phase.label} /> : <Cluster items={phase.items} />}
            {i < phases.length - 1 && <Arrow />}
          </Fragment>
        ))}
      </div>
    </div>
  )
}
