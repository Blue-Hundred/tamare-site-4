import { Fragment } from 'react'
import { IEP } from './tokens'

const BLUE = '#2563eb'
const BLUE_SOFT = '#eff4ff'
const BLUE_BORDER = '#c9dbff'

type Phase =
  | { kind: 'anchor'; label: string }
  | { kind: 'cluster'; title: string; items: string[] }

const phases: Phase[] = [
  { kind: 'anchor', label: 'Research & define scope and goals' },
  {
    kind: 'cluster',
    title: 'Build the system',
    items: ['Identify components', 'Design the system components', 'Create the design documentation', 'Develop UI components'],
  },
  { kind: 'anchor', label: 'Create & develop guidelines' },
  { kind: 'cluster', title: 'Roll out & sustain', items: ['Conduct training', 'Test & innovate where necessary', 'Maintain & improve'] },
]

function Arrow() {
  return (
    <div className="flex items-center justify-center text-[#9db6ee]" aria-hidden="true">
      <span className="hidden lg:block" style={{ fontSize: 20, lineHeight: 1 }}>
        →
      </span>
      <span className="block lg:hidden" style={{ fontSize: 20, lineHeight: 1 }}>
        ↓
      </span>
    </div>
  )
}

function AnchorCard({ label }: { label: string }) {
  return (
    <div
      className="flex items-center justify-center rounded-2xl px-5 py-6 text-center"
      style={{
        width: 176,
        minHeight: 148,
        background: BLUE,
        boxShadow: '0 6px 16px rgba(37,99,235,0.22)',
      }}
    >
      <span style={{ fontSize: 14, fontWeight: 600, color: '#fff', lineHeight: 1.35 }}>{label}</span>
    </div>
  )
}

function Cluster({ title, items }: { title: string; items: string[] }) {
  return (
    <div
      className="rounded-2xl p-4"
      style={{ background: BLUE_SOFT, border: `1px solid ${BLUE_BORDER}`, maxWidth: 300 }}
    >
      <p
        className="mb-3 px-1 font-mono uppercase"
        style={{ fontSize: 10, letterSpacing: '0.08em', color: BLUE, fontWeight: 600 }}
      >
        {title}
      </p>
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <div
            key={item}
            className="flex items-center rounded-xl bg-white px-3 py-2.5 text-left"
            style={{ border: `1px solid ${IEP.border}` }}
          >
            <span style={{ fontSize: 12, fontWeight: 500, color: IEP.ink, lineHeight: 1.3 }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function DesignProcessDiagram() {
  return (
    <div
      className="rounded-[20px] px-4 py-10 md:px-10 md:py-14"
      style={{ background: '#fff', border: `1px solid ${IEP.cardBorder}` }}
    >
      <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-stretch lg:justify-center lg:gap-5">
        {phases.map((phase, i) => (
          <Fragment key={i}>
            {phase.kind === 'anchor' ? (
              <div className="flex items-center">
                <AnchorCard label={phase.label} />
              </div>
            ) : (
              <Cluster title={phase.title} items={phase.items} />
            )}
            {i < phases.length - 1 && <Arrow />}
          </Fragment>
        ))}
      </div>
    </div>
  )
}
