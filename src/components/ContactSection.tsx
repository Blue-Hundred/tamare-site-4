import React, { useState, useRef, useEffect } from 'react'
import { useOutletContext, Link } from 'react-router'
import { motion, useInView } from 'framer-motion'
import PixelBlast from './PixelBlast'

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

type OutletCtx = { loaded: boolean; hoverOn: () => void; hoverOff: () => void }

const navLinks = [
  { label: 'Work', to: '/#work' },
  { label: 'About', to: '/about' },
  { label: 'Resume', href: '/tamare-reese-resume.pdf' },
  ] as const

export default function ContactSection() {
  const { hoverOn, hoverOff } = useOutletContext<OutletCtx>()
  const pixelSize = usePixelSize(3)

  return (
    <section id="contact" className="px-8 md:px-14 py-40" style={{ position: 'relative', background: '#ffffff' }}>
      <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, zIndex: 0 }}>
        <PixelBlast color="#d8d8d8" pixelSize={pixelSize} patternDensity={0.75} patternScale={1.5}
          edgeFade={0.08} speed={2} enableRipples={true} transparent />
      </div>
      <div className="max-w-screen-xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>
        <Reveal>
          <span className="text-xs font-light tracking-widest" style={{ opacity: 1, color: '#0f0f0e', letterSpacing: '0.15em', background: '#ffffff', padding: '4px 10px 4px 0', borderRadius: 4, display: 'inline-block' }}>CONTACT</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-light mt-6" style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)', letterSpacing: '-0.01em', lineHeight: 1.05, fontWeight: 400 }}>
            <span style={{ background: '#ffffff', display: 'inline', boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone', padding: '0.04em 0.12em' }}>Let&apos;s</span><br />
            <a
              href="mailto:tamaredesign@outlook.com"
              style={{ textDecoration: 'underline', textUnderlineOffset: '0.1em', textDecorationThickness: '1px', color: '#0f0f0e', opacity: 1, transition: 'opacity 0.2s', background: '#ffffff', display: 'inline', boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone', padding: '0.04em 0.12em' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.5'; hoverOn() }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; hoverOff() }}
            >
              Connect.
            </a>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10 mt-24">
            <div className="flex flex-col gap-2 items-start">
              <a href="mailto:tamaredesign@outlook.com" className="text-sm font-light" style={{ opacity: 1, color: '#0f0f0e', textDecoration: 'none', background: '#ffffff', padding: '3px 8px', borderRadius: 4 }}>tamaredesign@outlook.com</a>
              <span className="text-sm font-light" style={{ opacity: 1, color: '#0f0f0e', background: '#ffffff', padding: '3px 8px', borderRadius: 4 }}>Tamaré Reese</span>
            </div>
            <div className="flex items-center gap-8">
              <nav className="flex items-center gap-6" aria-label="Footer">
                {navLinks.map((item) => {
                  const linkStyle = { fontSize: 14, fontWeight: 300, color: '#0f0f0e', textDecoration: 'none', transition: 'opacity 0.2s', background: '#ffffff', padding: '3px 8px', borderRadius: 4 } as const
                  const onEnter = (e: React.MouseEvent) => { (e.currentTarget as HTMLElement).style.opacity = '0.6'; hoverOn() }
                  const onLeave = (e: React.MouseEvent) => { (e.currentTarget as HTMLElement).style.opacity = '1'; hoverOff() }
                  return 'href' in item ? (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={linkStyle}
                      onMouseEnter={onEnter}
                      onMouseLeave={onLeave}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      key={item.label}
                      to={item.to}
                      style={linkStyle}
                      onMouseEnter={onEnter}
                      onMouseLeave={onLeave}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </nav>
              <a
                href="https://www.linkedin.com/in/tamarereese/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex items-center justify-center"
                style={{ width: 40, height: 40, borderRadius: 9999, border: '1px solid #0f0f0e', background: '#ffffff', color: '#0f0f0e', transition: 'opacity 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.6'; hoverOn() }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; hoverOff() }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
