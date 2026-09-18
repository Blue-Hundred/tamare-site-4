import { useState } from 'react'
import { IEP } from './tokens'

type Answer = 'yes' | 'no' | null

function Node({
  label,
  active,
  tone = 'default',
}: {
  label: string
  active: boolean
  tone?: 'default' | 'outcome'
}) {
  return (
    <div
      className="rounded-lg px-4 py-3 text-center"
      style={{
        border: `1px solid ${active ? IEP.accent : IEP.border}`,
        background: active ? (tone === 'outcome' ? IEP.accent : IEP.accentTint) : '#fff',
        color: active ? (tone === 'outcome' ? '#fff' : IEP.accent) : IEP.muted,
        fontSize: 13,
        fontWeight: active ? 600 : 400,
        opacity: active ? 1 : 0.55,
        transition: 'all 0.25s ease',
      }}
    >
      {label}
    </div>
  )
}

function Arrow({ active }: { active: boolean }) {
  return (
    <div className="flex justify-center py-1.5" aria-hidden="true">
      <span style={{ fontSize: 15, lineHeight: 1, color: active ? IEP.accent : IEP.border, transition: 'color 0.25s ease' }}>↓</span>
    </div>
  )
}

function Decision({
  question,
  value,
  onChange,
  active,
}: {
  question: string
  value: Answer
  onChange: (a: Answer) => void
  active: boolean
}) {
  return (
    <div
      className="rounded-xl px-4 py-4 flex flex-col gap-3"
      style={{ border: `1px solid ${active ? IEP.accent : IEP.border}`, background: '#fff', opacity: active ? 1 : 0.55, transition: 'all 0.25s ease' }}
    >
      <span style={{ fontSize: 13, fontWeight: 500, color: IEP.ink, textAlign: 'center' }}>{question}</span>
      <div className="flex items-center justify-center gap-2">
        {(['yes', 'no'] as const).map(option => {
          const selected = value === option
          return (
            <button
              key={option}
              type="button"
              aria-pressed={selected}
              disabled={!active}
              onClick={() => onChange(selected ? null : option)}
              className="rounded-full outline-none"
              style={{
                padding: '5px 18px',
                fontSize: 12,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                cursor: active ? 'pointer' : 'default',
                border: `1px solid ${selected ? IEP.accent : IEP.border}`,
                background: selected ? IEP.accent : '#fff',
                color: selected ? '#fff' : IEP.body,
                transition: 'all 0.2s ease',
              }}
            >
              {option}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function GovernanceDiagram() {
  const [q1, setQ1] = useState<Answer>(null)
  const [q2, setQ2] = useState<Answer>(null)

  // Reset the downstream decision whenever the first one changes away from "no".
  const setFirst = (a: Answer) => {
    setQ1(a)
    if (a !== 'no') setQ2(null)
  }

  const reuse = q1 === 'yes'
  const toQ2 = q1 === 'no'
  const extend = toQ2 && q2 === 'yes'
  const propose = toQ2 && q2 === 'no'

  return (
    <div className="rounded-[20px] bg-white p-5 md:p-8" style={{ border: `1px solid ${IEP.cardBorder}` }}>
      <p className="mb-6" style={{ fontSize: 13, color: IEP.muted, fontWeight: 300 }}>
        Every new requirement is evaluated against the existing system first. Answer the decision points to trace the
        path a request follows.
      </p>

      <div className="mx-auto flex flex-col" style={{ maxWidth: 460 }}>
        <Node label="Need identified" active />
        <Arrow active />
        <Decision question="Can an existing component solve it?" value={q1} onChange={setFirst} active />
        <Arrow active={reuse || toQ2} />
        {reuse ? (
          <Node label="Reuse" active tone="outcome" />
        ) : (
          <>
            <Node label="Reuse" active={false} tone="outcome" />
            <Arrow active={toQ2} />
            <Decision question="Can an existing component be extended?" value={q2} onChange={setQ2} active={toQ2} />
            <Arrow active={extend || propose} />
            {extend ? (
              <Node label="Extend + validate" active tone="outcome" />
            ) : (
              <>
                <Node label="Extend + validate" active={false} tone="outcome" />
                <Arrow active={propose} />
                <Node label="Propose new pattern" active={propose} />
                <Arrow active={propose} />
                <Node label="Review" active={propose} />
                <Arrow active={propose} />
                <Node label="Validate" active={propose} />
                <Arrow active={propose} />
                <Node label="Publish" active={propose} />
                <Arrow active={propose} />
                <Node label="Adopt" active={propose} tone="outcome" />
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
