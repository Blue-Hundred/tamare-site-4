import { useRef, useState, useLayoutEffect, useCallback } from 'react'
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

const cardLayout = [
  { side: 'left' as const, top: 40 },
  { side: 'left' as const, top: 300 },
  { side: 'right' as const, top: 40 },
  { side: 'right' as const, top: 300 },
]

const pathVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1 },
}

const HUB_GAP = 40 // gap between the circle edge and the bracket vertex

/**
 * Animated hub-and-spoke diagram recreating the "Key UX Innovations" summary:
 * a central hub, four full-width highlight pills, and bracket-style connectors
 * whose two lines on each side converge to a single point aimed at the hub.
 *
 * Every coordinate is measured from the real, laid-out DOM (offsetLeft/
 * offsetTop, which ignore the entrance transform), so the connectors always
 * meet their pills exactly regardless of text length, viewport width, or
 * resize.
 */
export default function KeyUXDiagram() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const hubRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const pillRefs = useRef<(HTMLSpanElement | null)[]>([])
  const inView = useInView(wrapperRef, { once: true, margin: '-80px 0px' })

  const [paths, setPaths] = useState<string[]>([])
  const [viewBox, setViewBox] = useState({ width: 1160, height: 620 })

  const measure = useCallback(() => {
    const container = containerRef.current
    const hub = hubRef.current
    if (!container || !hub) return

    setViewBox({ width: container.offsetWidth, height: container.offsetHeight })

    const hubCenterX = hub.offsetLeft + hub.offsetWidth / 2
    const hubCenterY = hub.offsetTop + hub.offsetHeight / 2
    const hubRadius = hub.offsetWidth / 2

    // Shared bracket vertex on each side, pointed toward the hub.
    const leftVertexX = hubCenterX - hubRadius - HUB_GAP
    const rightVertexX = hubCenterX + hubRadius + HUB_GAP

    const nextPaths = cardLayout.map((layout, i) => {
      const card = cardRefs.current[i]
      const pill = pillRefs.current[i]
      if (!card || !pill) return ''

      const isTop = layout.top < 200
      const isLeft = layout.side === 'left'

      // Card's offset parent is the container, so its coordinates are already
      // in container space. The pill sits at the top of the card, so the pill's
      // bottom edge is cardTop + pill height.
      const anchorX = isLeft ? card.offsetLeft + card.offsetWidth : card.offsetLeft
      const anchorY = isTop ? card.offsetTop : card.offsetTop + pill.offsetHeight

      const vertexX = isLeft ? leftVertexX : rightVertexX
      const vertexY = hubCenterY

      // Cubic that leaves the pill horizontally and arrives horizontally at the
      // shared vertex, so top and bottom lines meet in a clean point.
      const midX = (anchorX + vertexX) / 2
      return `M ${anchorX} ${anchorY} C ${midX} ${anchorY}, ${midX} ${vertexY}, ${vertexX} ${vertexY}`
    })

    setPaths(nextPaths)
  }, [])

  useLayoutEffect(() => {
    measure()
    const container = containerRef.current
    if (!container || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(() => measure())
    observer.observe(container)
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [measure])

  return (
    <div ref={wrapperRef} className="relative w-full">
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
            className="flex flex-col gap-3"
          >
            <span className="rounded-full px-5 py-3 text-white text-center" style={{ background: item.color, fontWeight: 700, fontSize: 15 }}>
              {item.title}
            </span>
            <p className="text-body-14" style={{ color: '#464646', lineHeight: 1.6 }}>{item.body}</p>
          </motion.div>
        ))}
      </div>

      {/* Desktop: hub-and-spoke layout */}
      <div ref={containerRef} className="hidden md:block relative" style={{ minHeight: 480 }}>
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
          fill="none"
          aria-hidden="true"
        >
          {paths.map((d, i) => (
            d ? (
              <motion.path
                key={innovations[i].title}
                d={d}
                stroke="#333333"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                variants={pathVariants}
                transition={{ duration: 0.9, ease: 'easeInOut', delay: 0.3 + i * 0.05 }}
              />
            ) : null
          ))}
        </svg>

        <motion.div
          ref={hubRef}
          className="absolute rounded-full flex items-center justify-center text-center px-6"
          style={{ left: '50%', top: 'calc(50% - 30px)', width: 260, height: 260, marginLeft: -130, marginTop: -130, background: '#0f7bf0', color: '#ffffff', fontWeight: 700, fontSize: 26, lineHeight: 1.25 }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={measure}
        >
          Key UX Innovations
        </motion.div>

        {cardLayout.map((layout, i) => {
          const item = innovations[i]
          const positionStyle = layout.side === 'left'
            ? { left: 0, top: layout.top, width: 'calc(50% - 210px)' }
            : { right: 0, top: layout.top, width: 'calc(50% - 210px)' }
          return (
            <motion.div
              key={item.title}
              ref={el => { cardRefs.current[i] = el }}
              className="absolute flex flex-col gap-3"
              style={positionStyle}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.45 + i * 0.12 }}
              onAnimationComplete={measure}
            >
              <span
                ref={el => { pillRefs.current[i] = el }}
                className="block w-full rounded-full px-6 py-3.5 text-white text-center"
                style={{ background: item.color, fontWeight: 700, fontSize: 15 }}
              >
                {item.title}
              </span>
              <p className="text-body-14" style={{ color: '#464646', lineHeight: 1.6 }}>{item.body}</p>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
