import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

type Innovation = {
  title: string
  body: string
  color: string
}

const innovations: Innovation[] = [
  { title: 'Contextual Prompts', color: '#f5a524', body: 'Tested and refined UI language and iconography to reinforce trust in the payment process.' },
  { title: 'Secure Checkout Messaging', color: '#2fa84f', body: 'Loyalty limbo users received in-context messaging to complete account activation without leaving checkout.' },
  { title: 'Net New Payment Drawer', color: '#5b93ad', body: 'Designed and launched a collapsible mobile drawer that consolidated Apple Pay, PayPal, Guest Checkout, and Sign-In options. This pattern ensured clarity and flexibility on small screens.' },
  { title: 'UI Modernization', color: '#ef5b5b', body: 'Introduced sticky navigation, scroll-triggered animations, and a simplified CTA hierarchy for a cleaner, more intuitive experience.' },
]

const pathVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1 },
}

/**
 * Animated hub-and-spoke diagram recreating the "Key UX Innovations" summary:
 * a central hub with four connected highlight pills, revealed with a
 * staggered, motion-driven entrance instead of a static exported image.
 */
export default function KeyUXDiagram() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })

  return (
    <div ref={ref} className="relative w-full">
      {/* Mobile / narrow: simple stacked list */}
      <div className="flex flex-col gap-4 md:hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[20px] flex items-center justify-center text-center px-6 py-8"
          style={{ background: '#0f7bf0', color: '#ffffff', fontWeight: 700, fontSize: 22, lineHeight: 1.25 }}
        >
          Key UX Innovations
        </motion.div>
        {innovations.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 + i * 0.1 }}
            className="rounded-[16px] p-5 flex flex-col gap-3"
            style={{ border: '1px solid rgba(15,15,14,0.08)', background: '#ffffff' }}
          >
            <span className="self-start rounded-full px-4 py-2 text-white" style={{ background: item.color, fontWeight: 700, fontSize: 14 }}>
              {item.title}
            </span>
            <p className="text-body-14" style={{ color: '#464646', lineHeight: 1.6 }}>{item.body}</p>
          </motion.div>
        ))}
      </div>

      {/* Desktop: hub-and-spoke layout */}
      <div className="hidden md:block relative" style={{ minHeight: 600 }}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1160 600" fill="none" preserveAspectRatio="none" aria-hidden="true">
          <motion.path d="M 385 175 C 320 175, 320 230, 320 300 C 320 370, 320 425, 385 425" stroke="#c9c9c9" strokeWidth="1.5"
            initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={pathVariants} transition={{ duration: 0.9, ease: 'easeInOut', delay: 0.3 }} />
          <motion.path d="M 775 175 C 840 175, 840 230, 840 300 C 840 370, 840 425, 775 425" stroke="#c9c9c9" strokeWidth="1.5"
            initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={pathVariants} transition={{ duration: 0.9, ease: 'easeInOut', delay: 0.3 }} />
        </svg>

        <motion.div
          className="absolute rounded-full flex items-center justify-center text-center px-6"
          style={{ left: '50%', top: '50%', width: 260, height: 260, marginLeft: -130, marginTop: -130, background: '#0f7bf0', color: '#ffffff', fontWeight: 700, fontSize: 26, lineHeight: 1.25 }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Key UX Innovations
        </motion.div>

        {[
          { item: innovations[0], style: { left: 0, top: 40, width: 340 } },
          { item: innovations[1], style: { left: 0, top: 330, width: 340 } },
          { item: innovations[2], style: { right: 0, top: 40, width: 340 } },
          { item: innovations[3], style: { right: 0, top: 330, width: 340 } },
        ].map(({ item, style }, i) => (
          <motion.div
            key={item.title}
            className="absolute flex flex-col gap-3"
            style={style}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.45 + i * 0.12 }}
          >
            <span className="self-start rounded-full px-5 py-2.5 text-white" style={{ background: item.color, fontWeight: 700, fontSize: 15 }}>
              {item.title}
            </span>
            <p className="text-body-14" style={{ color: '#464646', lineHeight: 1.6 }}>{item.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
