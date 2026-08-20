import { type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export type PostItTheme = {
  tint: string
  title: string
  body: string
}

const rotations = [-2.2, 1.6, -1.2, 2, -1.7, 1.3]

function PostItReveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}>
      {children}
    </motion.div>
  )
}

/**
 * A single sticky-note styled card with a tape strip, subtle rotation,
 * and a hover interaction that straightens and lifts the card.
 */
export function PostItNote({ theme, rotation }: { theme: PostItTheme; rotation: number }) {
  return (
    <article
      className="group relative p-6 md:p-7 flex flex-col gap-3"
      style={{
        background: theme.tint,
        transform: `rotate(${rotation}deg)`,
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        boxShadow: '0 1px 1px rgba(0,0,0,0.04), 0 10px 18px -6px rgba(0,0,0,0.18)',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'rotate(0deg) translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 1px rgba(0,0,0,0.04), 0 20px 30px -8px rgba(0,0,0,0.22)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = `rotate(${rotation}deg)`; (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 1px rgba(0,0,0,0.04), 0 10px 18px -6px rgba(0,0,0,0.18)' }}
    >
      {/* tape strip */}
      <span
        aria-hidden="true"
        className="absolute left-1/2 -top-2.5 -translate-x-1/2"
        style={{ width: 74, height: 20, background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(0,0,0,0.05)', transform: 'translateX(-50%) rotate(-1.5deg)' }}
      />
      <h4 className="text-h4" style={{ color: '#0f0f0e' }}>{theme.title}</h4>
      <p className="text-body-14" style={{ color: '#464646', lineHeight: 1.6 }}>{theme.body}</p>
    </article>
  )
}

/**
 * Reusable responsive grid of post-it notes, each staggered in on scroll.
 * Used across case studies (e.g. Bath & Body Works BOPIS, Apple Pay Integration)
 * to present themes, insights, or takeaways in a consistent sticky-note style.
 */
export function PostItGrid({ items, className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pt-4' }: { items: PostItTheme[]; className?: string }) {
  return (
    <div className={className}>
      {items.map((theme, i) => {
        const rotation = rotations[i % rotations.length]
        return (
          <PostItReveal key={theme.title} delay={i * 0.06}>
            <PostItNote theme={theme} rotation={rotation} />
          </PostItReveal>
        )
      })}
    </div>
  )
}
