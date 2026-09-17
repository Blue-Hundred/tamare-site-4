import { useMemo, useState } from 'react'
import { IEP } from './tokens'

type Level = { key: string; label: string; items: string[] }

const levels: Level[] = [
  { key: 'atoms', label: 'Atoms', items: ['Button', 'Input', 'Select', 'Checkbox', 'Badge', 'Icon', 'Tooltip'] },
  { key: 'components', label: 'Components', items: ['Form Field', 'Parameter Row', 'Status Card', 'Data Table', 'Service Card'] },
  { key: 'patterns', label: 'Patterns', items: ['Create Service', 'Service Details', 'Repave', 'Monitoring'] },
  { key: 'products', label: 'Product Experiences', items: ['Graph', 'Relational', 'Non-relational', 'Other'] },
]

// Undirected relationships between adjacent levels. Hovering or selecting any
// node highlights everything reachable through these links, so the reuse of a
// single primitive across the system becomes visible.
const edges: [string, string][] = [
  ['Button', 'Service Card'],
  ['Input', 'Form Field'],
  ['Input', 'Parameter Row'],
  ['Select', 'Form Field'],
  ['Select', 'Parameter Row'],
  ['Checkbox', 'Form Field'],
  ['Checkbox', 'Data Table'],
  ['Badge', 'Parameter Row'],
  ['Badge', 'Status Card'],
  ['Badge', 'Data Table'],
  ['Badge', 'Service Card'],
  ['Icon', 'Status Card'],
  ['Icon', 'Data Table'],
  ['Icon', 'Service Card'],
  ['Tooltip', 'Form Field'],
  ['Form Field', 'Create Service'],
  ['Parameter Row', 'Create Service'],
  ['Parameter Row', 'Repave'],
  ['Status Card', 'Service Details'],
  ['Status Card', 'Repave'],
  ['Status Card', 'Monitoring'],
  ['Data Table', 'Monitoring'],
  ['Service Card', 'Service Details'],
  ['Create Service', 'Graph'],
  ['Create Service', 'Relational'],
  ['Create Service', 'Non-relational'],
  ['Service Details', 'Graph'],
  ['Service Details', 'Relational'],
  ['Service Details', 'Non-relational'],
  ['Service Details', 'Other'],
  ['Repave', 'Relational'],
  ['Repave', 'Other'],
  ['Monitoring', 'Graph'],
  ['Monitoring', 'Relational'],
  ['Monitoring', 'Non-relational'],
  ['Monitoring', 'Other'],
]

function buildAdjacency() {
  const adj = new Map<string, Set<string>>()
  for (const [a, b] of edges) {
    if (!adj.has(a)) adj.set(a, new Set())
    if (!adj.has(b)) adj.set(b, new Set())
    adj.get(a)!.add(b)
    adj.get(b)!.add(a)
  }
  return adj
}

export default function AtomsToExperiencesDiagram() {
  const adj = useMemo(buildAdjacency, [])
  const [hovered, setHovered] = useState<string | null>(null)
  const [pinned, setPinned] = useState<string | null>(null)
  const active = hovered ?? pinned

  // Highlight only the active node and the elements directly linked to it.
  // A full transitive traversal would reach nearly every node in this densely
  // connected graph, lighting up the whole diagram and hiding the actual reuse
  // relationship. Direct neighbors keep the trace legible and meaningful.
  const connected = useMemo(() => {
    if (!active) return null
    const seen = new Set<string>([active])
    for (const next of adj.get(active) ?? []) {
      seen.add(next)
    }
    return seen
  }, [active, adj])

  return (
    <div className="rounded-[20px] bg-white p-5 md:p-8" style={{ border: `1px solid ${IEP.cardBorder}` }}>
      <p className="mb-6" style={{ fontSize: 13, color: IEP.muted, fontWeight: 300 }}>
        Hover, focus, or tap any element to trace how it is reused across the system — from a single atom up to the
        database experiences it helps compose.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4">
        {levels.map((level, li) => (
          <div key={level.key} className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span
                style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: IEP.muted, fontWeight: 500 }}
              >
                {level.label}
              </span>
              {li < levels.length - 1 && (
                <span aria-hidden="true" className="hidden md:inline ml-auto" style={{ color: IEP.border }}>
                  →
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              {level.items.map(item => {
                const dimmed = connected !== null && !connected.has(item)
                const isActive = active === item
                const inTrace = connected !== null && connected.has(item)
                return (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={pinned === item}
                    onMouseEnter={() => setHovered(item)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(item)}
                    onBlur={() => setHovered(null)}
                    onClick={() => setPinned(pinned === item ? null : item)}
                    className="text-left rounded-lg px-3 py-2.5 outline-none"
                    style={{
                      border: `1px solid ${isActive || inTrace ? IEP.accent : IEP.border}`,
                      background: isActive ? IEP.accent : inTrace ? IEP.accentTint : '#fff',
                      color: isActive ? '#fff' : inTrace ? IEP.accent : IEP.ink,
                      opacity: dimmed ? 0.32 : 1,
                      fontSize: 13,
                      fontWeight: isActive ? 600 : 400,
                      transition: 'opacity 0.25s ease, background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease',
                    }}
                  >
                    {item}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
