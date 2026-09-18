import { useState } from 'react'
import { Check } from 'lucide-react'
import { IEP } from './tokens'

const products = ['Graph', 'Relational', 'Non-relational', 'Other'] as const

const sharedItems = [
  'Page structure',
  'Navigation',
  'Form behavior',
  'Validation patterns',
  'Status presentation',
  'Confirmation patterns',
]

const variableData: Record<string, Record<(typeof products)[number], string>> = {
  'Database parameters': {
    Graph: 'Traversal depth, edge cache',
    Relational: 'vCPU, IOPS, storage size',
    'Non-relational': 'Partition keys, throughput',
    Other: 'Bucket size, eviction policy',
  },
  'Technology terminology': {
    Graph: 'Vertices, edges, traversals',
    Relational: 'Tables, rows, indexes',
    'Non-relational': 'Collections, documents',
    Other: 'Objects, keys, blobs',
  },
  'Configuration options': {
    Graph: 'Graph schema, query engine',
    Relational: 'Replication, failover',
    'Non-relational': 'Consistency, sharding',
    Other: 'TTL, compression',
  },
  'Operational commands': {
    Graph: 'Rebuild index, compact',
    Relational: 'Repave, failover, resize',
    'Non-relational': 'Repair, rebalance',
    Other: 'Flush, warm cache',
  },
  'Monitoring metrics': {
    Graph: 'Traversal latency, hops',
    Relational: 'QPS, connections, locks',
    'Non-relational': 'Read/write units, hot keys',
    Other: 'Hit ratio, evictions',
  },
  'Technology-specific guidance': {
    Graph: 'Model relationships early',
    Relational: 'Right-size before launch',
    'Non-relational': 'Design around access paths',
    Other: 'Set sensible TTLs',
  },
}

const variableItems = Object.keys(variableData)

type Selection = { group: 'shared' | 'variable'; item: string }

function GroupButton({
  item,
  selected,
  onSelect,
}: {
  item: string
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      onMouseEnter={onSelect}
      onFocus={onSelect}
      className="text-left rounded-lg px-3.5 py-2.5 outline-none w-full"
      style={{
        border: `1px solid ${selected ? IEP.accent : IEP.border}`,
        background: selected ? IEP.accentTint : '#fff',
        color: selected ? IEP.accent : IEP.ink,
        fontSize: 13,
        fontWeight: selected ? 600 : 400,
        transition: 'border-color 0.2s ease, background-color 0.2s ease, color 0.2s ease',
      }}
    >
      {item}
    </button>
  )
}

export default function VariabilityDiagram() {
  const [selection, setSelection] = useState<Selection>({ group: 'shared', item: sharedItems[0] })
  const isShared = selection.group === 'shared'

  return (
    <div className="rounded-[20px] bg-white p-5 md:p-8" style={{ border: `1px solid ${IEP.cardBorder}` }}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <span style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: IEP.muted, fontWeight: 500 }}>
              Shared
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sharedItems.map(item => (
                <GroupButton
                  key={item}
                  item={item}
                  selected={isShared && selection.item === item}
                  onSelect={() => setSelection({ group: 'shared', item })}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <span style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: IEP.muted, fontWeight: 500 }}>
              Variable
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {variableItems.map(item => (
                <GroupButton
                  key={item}
                  item={item}
                  selected={!isShared && selection.item === item}
                  onSelect={() => setSelection({ group: 'variable', item })}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-xl p-5 md:p-6 h-full" style={{ border: `1px solid ${IEP.border}`, background: '#fafafa' }}>
            <p style={{ fontSize: 14, color: IEP.body, lineHeight: '22px' }}>
              {isShared ? (
                <>
                  <span style={{ fontWeight: 600, color: IEP.ink }}>{selection.item}</span> behaves the same way across
                  every hub — the underlying component architecture stays constant.
                </>
              ) : (
                <>
                  <span style={{ fontWeight: 600, color: IEP.ink }}>{selection.item}</span> changes between technologies
                  while remaining inside the same component architecture.
                </>
              )}
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {products.map(product => (
                <div
                  key={product}
                  className="rounded-lg p-4 flex flex-col gap-2"
                  style={{ border: `1px solid ${IEP.border}`, background: '#fff' }}
                >
                  <span style={{ fontSize: 12, fontWeight: 600, color: IEP.ink }}>{product}</span>
                  {isShared ? (
                    <span className="flex items-center gap-1.5" style={{ fontSize: 13, color: IEP.accent, fontWeight: 500 }}>
                      <Check size={15} strokeWidth={2.5} aria-hidden="true" />
                      Consistent
                    </span>
                  ) : (
                    <span style={{ fontSize: 13, color: IEP.body, fontWeight: 400, lineHeight: '18px' }}>
                      {variableData[selection.item][product]}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
