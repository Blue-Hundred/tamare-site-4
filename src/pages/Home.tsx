import React, { useState, useRef, useEffect } from 'react'
import { useOutletContext } from 'react-router'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionValue,
} from 'framer-motion'
import { Link } from 'react-router'
import PixelBlast from '../components/PixelBlast'
import ContactSection from '../components/ContactSection'
import { CursorContext } from '../app/Root'

const projects = [
  {
    id: '01',
    title: 'Creating a Unified Database Management Platform',
    company: 'JPMorgan Chase & Co.',
    tags: ['Product Design', 'Experience Research', 'Service Design'],
    year: '2025-2026',
    image: '/images/databases-cover.png',
    href: '/work/databases',
  },
  {
    id: '02',
    title: 'Enabling In-Store Pickup',
    company: 'Bath & Body Works',
    tags: ['Product Design', 'Service Design'],
    year: '2019',
    image: '/images/bbw-cover.png',
    href: '/work/bath-body-works',
  },
  {
    id: '03',
    title: 'Apple Pay Integration',
    company: 'Bath & Body Works',
    tags: ['Experience Design', 'Experience Mapping'],
    year: '2018',
    image: '/images/bbw-applepay-cover.png',
    href: '/work/apple-pay',
  },
  {
    id: '04',
    title: 'Modernizing Family Banking',
    company: 'JPMorgan Chase',
    tags: ['Experience Design', 'UI Design and Delivery'],
    year: '2025',
    image: '/images/family-banking-cover.png',
    href: '/work/family-banking',
  },
]

function BlurText({ text, play, delay = 0.06, className, style }: {
  text: string; play: boolean; delay?: number; className?: string; style?: React.CSSProperties
}) {
  const words = text.split(' ')
  return (
    <span className={className} style={{ display: 'inline', ...style }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: 'blur(12px)', y: 8 }}
          animate={play ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
          transition={{ duration: 0.6, delay: i * delay, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {word}{i < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </span>
  )
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}>
      {children}
    </motion.div>
  )
}

function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rawY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])
  const y = useSpring(rawY, { stiffness: 60, damping: 20 })
  return (
    <div ref={ref} style={{ width: '100%', aspectRatio: '16/10', overflow: 'hidden', borderRadius: 12 }}>
      <motion.img src={src} alt={alt}
        style={{ width: '100%', height: '120%', objectFit: 'cover', display: 'block', marginTop: '-10%', y }} />
    </div>
  )
}

function ProjectCard({ p, index, activeProject, setActiveProject }: {
  p: typeof projects[0]; index: number; activeProject: number | null; setActiveProject: (i: number | null) => void
}) {
  const dimmed = activeProject !== null && activeProject !== index
  const cursorCtx = React.useContext(CursorContext)
  const inner = (
    <motion.div className="group"
      onHoverStart={() => { setActiveProject(index); cursorCtx.setHovered(true) }}
      onHoverEnd={() => { setActiveProject(null); cursorCtx.setHovered(false) }}
      animate={{ opacity: dimmed ? 0.3 : 1 }}
      transition={{ duration: 0.3 }}
    >
      <ParallaxImage src={p.image} alt={p.title} />
      <div className="pt-5 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span style={{ fontSize: '0.65rem', color: '#767675', letterSpacing: '0.1em', fontWeight: 300 }}>{p.id}</span>
          <span style={{ fontSize: '0.7rem', fontWeight: 400, letterSpacing: '0.04em', padding: '3px 10px', border: '1px solid rgba(15,15,14,0.3)', borderRadius: 100, color: '#595958' }}>
            {p.company}
          </span>
          <span style={{ fontSize: '0.7rem', color: '#767675', fontWeight: 300, marginLeft: 'auto' }}>{p.year}</span>
        </div>
        <h2 style={{ fontSize: 'clamp(1.1rem, 2vw, 1.45rem)', fontWeight: 300, letterSpacing: '-0.015em', lineHeight: 1.25, color: '#0f0f0e' }}>
          {p.title}
        </h2>
        <div className="flex flex-wrap gap-2 pt-1">
          {p.tags.map(t => (
            <span key={t} style={{ fontSize: '0.68rem', fontWeight: 300, color: '#595958', letterSpacing: '0.06em' }}>{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
  return (
    <Reveal delay={index * 0.08}>
      {'href' in p && p.href
        ? <Link to={p.href} style={{ textDecoration: 'none', display: 'block' }}>{inner}</Link>
        : inner}
    </Reveal>
  )
}

function usePixelSize(base = 3) {
  const [size, setSize] = useState(base)
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth
      if (w < 480) setSize(base * 0.85)
      else if (w < 768) setSize(base * 0.9)
      else if (w < 1024) setSize(base * 0.95)
      else setSize(base)
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [base])
  return size
}

type OutletCtx = { loaded: boolean; hoverOn: () => void; hoverOff: () => void }

export default function Home() {
  const { loaded } = useOutletContext<OutletCtx>()
  const [activeProject, setActiveProject] = useState<number | null>(null)
  const pixelSize = usePixelSize(3)

  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 600], [0, -80])
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])

  return (
    <>
      {/* Hero */}
      <section className="px-8 md:px-14 pt-40 pb-24 overflow-hidden" style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
  <PixelBlast color="#d8d8d8" pixelSize={pixelSize} patternDensity={0.75} patternScale={1.5}
  edgeFade={0.08} speed={2} enableRipples={true} transparent />
        </div>
        <div className="max-w-screen-xl mx-auto flex flex-col gap-10" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 16 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ alignSelf: 'flex-start', background: '#ffffff', padding: '4px 10px 4px 0', borderRadius: 4 }}
          >
            <span className="text-xs font-light tracking-widest" style={{ color: '#0f0f0e', letterSpacing: '0.15em' }}>PRODUCT & SERVICE DESIGNER</span>
            <span className="text-xs font-light" style={{ color: '#0f0f0e' }}>—</span>
          </motion.div>

          <motion.h1
            className="font-light"
            style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)', letterSpacing: '-0.01em', lineHeight: 1.2, fontWeight: 400, y: heroY, opacity: heroOpacity, color: '#0f0f0e' }}
          >
            <span style={{ display: 'inline', boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone', padding: '0.12em 0' }}>
              <BlurText text="Framing problems," play={loaded} delay={0.07} />
            </span>
            <br />
            <span style={{ display: 'inline', boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone', padding: '0.12em 0' }}>
              <BlurText text="crafting solutions." play={loaded} delay={0.12} />
            </span>
          </motion.h1>

          <motion.div
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 -mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
            transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-light" style={{ fontSize: 'clamp(0.875rem, 2vw, 1.15rem)', maxWidth: 720, lineHeight: 1.9, color: '#0f0f0e', fontWeight: 300, display: 'inline', boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone', background: '#ffffff', padding: '2px 0' }}>
              Product designer utilizing AI to streamline workflows and simplify experiences.
            </p>
            <div className="flex items-center gap-2 self-start md:self-end" style={{ background: '#ffffff', padding: '4px 10px 4px 0', borderRadius: 4 }}>
              <span className="text-xs font-light" style={{ opacity: 1, color: '#0f0f0e' }}>Available for projects</span>
              <a href="#contact" className="text-xs font-light underline" style={{ textUnderlineOffset: 4, color: '#0f0f0e' }}>Get in touch</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="px-8 md:px-14 pt-20 pb-32">
        <div className="max-w-screen-xl mx-auto">
          <Reveal>
            <div className="flex items-baseline justify-between mb-14">
              <span className="text-xs font-light tracking-widest" style={{ opacity: 1, color: '#0f0f0e', letterSpacing: '0.15em' }}>SELECTED WORK</span>
              <span className="text-xs font-light" style={{ opacity: 1, color: '#0f0f0e' }}>2018 — Present</span>
            </div>
          </Reveal>
          <div className="grid gap-x-8 gap-y-16" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 480px), 1fr))' }}>
            {projects.map((p, i) => (
              <ProjectCard key={p.id} p={p} index={i} activeProject={activeProject} setActiveProject={setActiveProject} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <ContactSection />

      {/* Footer */}
      <footer className="px-8 md:px-14 py-8" style={{ borderTop: '1px solid rgba(15,15,14,0.08)' }}>
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          <span className="text-xs font-light" style={{ color: '#767675' }}>© 2026 Tamaré Reese</span>
          <span className="text-xs font-light" style={{ color: '#767675' }}>All rights reserved</span>
        </div>
      </footer>
    </>
  )
}
