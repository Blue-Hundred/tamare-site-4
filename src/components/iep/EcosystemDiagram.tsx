import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { IEP } from './tokens'

const legacyNodes = [
  'Gaia MS SQL',
  'Gaia Oracle',
  'Gaia MySQL',
  'CockroachDB',
  'Cassandra',
  'MongoDB',
  'TigerGraph',
  'Object Store',
  'Cache',
  'Search',
]

const hubs = [
  { title: 'Relational', members: 'MS SQL · Oracle · MySQL · CockroachDB' },
  { title: 'Non-relational', members: 'Cassandra · MongoDB' },
  { title: 'Graph', members: 'TigerGraph' },
  { title: 'Other', members: 'Object · Cache · Search' },
]

function TierLabel({ children }: { children: string }) {
  return (
    <div
      className="text-center"
      style={{ fontSize: 12, letterSpacing: '0.14em', color: IEP.muted, fontWeight: 500, textTransform: 'uppercase' }}
    >
      {children}
    </div>
  )
}

function Connector({ inView, reduce }: { inView: boolean; reduce: boolean }) {
  return (
    <div className="flex justify-center py-5" aria-hidden="true">
      <motion.div
        style={{ width: 1, height: 44, background: IEP.border, transformOrigin: 'top' }}
        initial={reduce ? false : { scaleY: 0, opacity: 0 }}
        animate={inView ? { scaleY: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  )
}

export default function EcosystemDiagram() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })
  const reduce = useReducedMotion() ?? false

  return (
    <div ref={ref} className="rounded-[20px] bg-white p-6 md:p-12" style={{ border: `1px solid ${IEP.cardBorder}` }}>
      <TierLabel>10+ control planes</TierLabel>
      <div className="mt-5 flex flex-wrap justify-center gap-2.5">
        {legacyNodes.map((node, i) => (
          <motion.span
            key={node}
            initial={reduce ? false : { opacity: 0, y: i % 2 ? -14 : 14, rotate: (i % 3) - 1 }}
            animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: reduce ? 0 : i * 0.04 }}
            style={{
              fontSize: 13,
              fontWeight: 400,
              color: IEP.body,
              padding: '6px 12px',
              borderRadius: 100,
              border: `1px solid ${IEP.border}`,
              background: '#fafafa',
            }}
          >
            {node}
          </motion.span>
        ))}
      </div>

      <Connector inView={inView} reduce={reduce} />

      <TierLabel>4 centralized hubs</TierLabel>
      <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {hubs.map((hub, i) => (
          <motion.div
            key={hub.title}
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: reduce ? 0 : 0.5 + i * 0.08 }}
            className="rounded-xl p-4 md:p-5 flex flex-col gap-1.5"
            style={{ border: `1px solid ${IEP.border}`, background: '#fff' }}
          >
            <span style={{ fontSize: 15, fontWeight: 600, color: IEP.ink, letterSpacing: '-0.01em' }}>{hub.title}</span>
            <span style={{ fontSize: 12, fontWeight: 300, color: IEP.muted, lineHeight: '18px' }}>{hub.members}</span>
          </motion.div>
        ))}
      </div>

      <Connector inView={inView} reduce={reduce} />

      <TierLabel>1 shared design system</TierLabel>
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 18 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: reduce ? 0 : 0.9 }}
        className="mt-5 rounded-xl px-6 py-6 flex items-center justify-center text-center"
        style={{ background: IEP.accentTint, border: `1px solid ${IEP.accent}` }}
      >
        <span style={{ fontSize: 16, fontWeight: 600, color: IEP.accent, letterSpacing: '-0.01em' }}>IEP Design System</span>
      </motion.div>
    </div>
  )
}
