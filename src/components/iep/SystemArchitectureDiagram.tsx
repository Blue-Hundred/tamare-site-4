import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { IEP } from './tokens'

const layers = [
  {
    key: 'product',
    title: 'Product Experiences',
    items: ['Relational', 'Non-relational', 'Graph', 'Other'],
    desc: 'Complete database experiences for each hub, composed entirely from the shared system below rather than built independently.',
  },
  {
    key: 'patterns',
    title: 'Experience Patterns',
    items: ['Provisioning', 'Operations', 'Monitoring', 'Configuration', 'Service Management'],
    desc: 'Reusable combinations of components that solve recurring database workflows while allowing technology-specific configuration.',
  },
  {
    key: 'components',
    title: 'Components',
    items: ['Forms', 'Tables', 'Cards', 'Navigation', 'Status', 'Modals', 'Alerts', 'Steppers'],
    desc: 'Reusable building blocks for common interface interactions, structured around shared behavior instead of a single product.',
  },
  {
    key: 'foundations',
    title: 'Foundations',
    items: ['Type', 'Color', 'Spacing', 'Grid', 'Icons', 'Interaction States'],
    desc: 'The shared visual and behavioral language that removes repeated design decisions and creates predictable behavior across every hub.',
  },
] as const

export default function SystemArchitectureDiagram({ title }: { title?: string }) {
  const [hovered, setHovered] = useState<number | null>(null)
  const [pinned, setPinned] = useState<number | null>(null)
  const reduce = useReducedMotion() ?? false
  const active = hovered ?? pinned

  return (
    <div className="rounded-[20px] bg-white p-5 md:p-8" style={{ border: `1px solid ${IEP.cardBorder}` }}>
      {title && (
        <h2 className="text-h3 mb-6 md:mb-8" style={{ color: '#0f0f0e' }}>
          {title}
        </h2>
      )}
      <p className="mb-6" style={{ fontSize: 13, color: IEP.muted, fontWeight: 300 }}>
        Product experiences are composed from a common system. Hover, focus, or tap a layer to see its role and how it
        connects to the layers around it.
      </p>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-4 md:items-stretch">
        {layers.map((layer, i) => {
          const isActive = active === i
          const isNeighbor = active !== null && Math.abs(active - i) === 1
          return (
            <div key={layer.key} className="relative flex min-w-0 flex-col">
              {i > 0 && (
                <div className="absolute -left-3 top-1/2 z-10 hidden -translate-y-1/2 items-center md:flex" aria-hidden="true">
                  <span
                    style={{
                      fontSize: 16,
                      lineHeight: 1,
                      color: active !== null && (active === i || active === i - 1) ? IEP.accent : IEP.border,
                      transition: 'color 0.25s ease',
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
              <button
                type="button"
                aria-pressed={pinned === i}
                aria-expanded={isActive}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                onClick={() => setPinned(pinned === i ? null : i)}
                className="text-left rounded-xl px-5 py-5 md:px-6 outline-none w-full"
                style={{
                  border: `1px solid ${isActive ? IEP.accent : isNeighbor ? '#c7cdf0' : IEP.border}`,
                  background: isActive ? IEP.accentTint : '#fff',
                  transition: 'border-color 0.25s ease, background-color 0.25s ease',
                }}
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
                <div className="mt-3 flex flex-wrap gap-2">
                  {layer.items.map(item => (
                    <span
                      key={item}
                      style={{
                        fontSize: 12,
                        fontWeight: 400,
                        color: isActive ? IEP.accent : IEP.body,
                        padding: '4px 10px',
                        borderRadius: 100,
                        border: `1px solid ${isActive ? '#c7cdf0' : IEP.border}`,
                        background: '#fff',
                        transition: 'color 0.25s ease, border-color 0.25s ease',
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.p
                      initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
                      animate={reduce ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
                      exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: 'hidden', color: IEP.body, fontSize: 14, lineHeight: '22px' }}
                    >
                      <span className="block pt-3">{layer.desc}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
