import { IEP } from './tokens'

const layers = [
  { key: 'foundations', title: 'Foundations', items: ['Type', 'Color', 'Spacing', 'Grid', 'Icons', 'Interaction States'] },
  { key: 'components', title: 'Components', items: ['Forms', 'Tables', 'Cards', 'Navigation', 'Status', 'Modals', 'Alerts', 'Steppers'] },
  { key: 'patterns', title: 'Experience Patterns', items: ['Provisioning', 'Operations', 'Monitoring', 'Configuration', 'Service Management'] },
  { key: 'product', title: 'Product Experiences', items: ['Relational', 'Non-relational', 'Graph', 'Other'] },
] as const

export default function SystemArchitectureDiagram({ title }: { title?: string }) {
  return (
    <div className="rounded-[20px] bg-white p-5 md:p-8" style={{ border: `1px solid ${IEP.cardBorder}` }}>
      {title && (
        <h2 className="text-h3 mb-6 md:mb-8" style={{ color: '#0f0f0e' }}>
          {title}
        </h2>
      )}
      <p className="mb-6" style={{ fontSize: 13, color: IEP.muted, fontWeight: 300 }}>
        Product experiences are composed from a common system. A shared system connects foundations, components, experience patterns, and product experiences.
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:items-stretch">
        {layers.map((layer, i) => {
          return (
            <div key={layer.key} className="relative flex min-w-0 flex-col">
              {i % 2 === 1 && (
                <div className="absolute -left-3 top-1/2 z-10 hidden -translate-y-1/2 items-center sm:flex" aria-hidden="true">
                  <span
                    style={{
                      fontSize: 16,
                      lineHeight: 1,
                      color: IEP.border,
                    }}
                  >
                    →
                  </span>
                </div>
              )}
              {i > 0 && (
                <div className="flex justify-center py-1 md:hidden" aria-hidden="true">
                  <span style={{ fontSize: 16, lineHeight: 1, color: IEP.border }}>↓</span>
                </div>
              )}
  <div
  className="flex h-full w-full flex-col rounded-xl px-5 py-5 text-center md:px-6"

                style={{ border: `1px solid ${IEP.border}`, background: '#fff' }}
              >
                <span
                  className="block"
                  style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: IEP.muted, fontWeight: 400 }}
                >
                  Layer {i + 1}
                </span>
                <span className="mt-2 block" style={{ fontSize: 16, fontWeight: 600, color: IEP.ink, letterSpacing: '-0.01em' }}>
                  {layer.title}
                </span>
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  {layer.items.map(item => (
                    <span
                      key={item}
                      style={{
                        fontSize: 12,
                        fontWeight: 400,
                        color: IEP.body,
                        padding: '4px 10px',
                        borderRadius: 100,
                        border: `1px solid ${IEP.border}`,
                        background: '#fff',
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
  </div>
  </div>
          )
        })}
      </div>
    </div>
  )
}
