import { useRef, useState, useEffect } from 'react'
import { useOutletContext } from 'react-router'
import { motion, useInView } from 'framer-motion'
import PixelBlast from '../components/PixelBlast'

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

const awards = [
  { title: 'Awwwards Site of the Day', project: 'Cairn', year: '2023' },
  { title: 'CSS Design Awards', project: 'Forma Studio Campaign', year: '2024' },
  { title: 'Typewolf Featured', project: 'Olio Press', year: '2023' },
  { title: 'Communication Arts', project: 'Meridian', year: '2024' },
]

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

export default function About() {
  const { loaded, hoverOn, hoverOff } = useOutletContext<OutletCtx>()
  const pixelSize = usePixelSize(3)

  return (
    <section style={{ background: '#ffffff', color: '#0f0f0e', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif", overflowX: 'hidden' }}>
      {/* Top band: portrait + headline */}
      <div className="px-8 md:px-14 pt-40 pb-20">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 16 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-xs font-light tracking-widest" style={{ color: '#0f0f0e', letterSpacing: '0.15em' }}>ABOUT</span>
          </motion.div>

          <div className="mt-12 grid md:grid-cols-2 gap-12 items-start">
            {/* Portrait placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 24 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{
                width: '100%',
                aspectRatio: '3/4',
                background: 'rgba(15,15,14,0.04)',
                border: '1px solid rgba(15,15,14,0.1)',
                borderRadius: 6,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                maxWidth: 480,
              }}
            >
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ opacity: 0.2 }}>
                <circle cx="24" cy="18" r="9" stroke="#0f0f0e" strokeWidth="1.5" />
                <path d="M6 42c0-9.941 8.059-18 18-18s18 8.059 18 18" stroke="#0f0f0e" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span style={{ fontSize: '0.7rem', opacity: 0.25, letterSpacing: '0.12em', fontWeight: 300 }}>YOUR PHOTO HERE</span>
            </motion.div>

            {/* Bio */}
            <div className="flex flex-col justify-between h-full gap-12 pt-2">
              <motion.h1
                className="font-light"
                style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)', letterSpacing: '-0.01em', lineHeight: 1.05, fontWeight: 400 }}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 32 }}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                Craft over<br />convention.
              </motion.h1>

              <div className="flex flex-col gap-6">
                <Reveal delay={0.1}>
                  <p className="font-light" style={{ fontSize: '1.05rem', lineHeight: 1.75, color: '#595958', fontWeight: 300 }}>
                    I solve complex problems, improve experiences, and build products that create meaningful business results. My career has taken me from agency work designing financial products for KeyBank and First National Bank to enterprise roles at Bath &amp; Body Works and JPMorgan Chase, where I&apos;ve worked across customer experiences, internal platforms, and developer tools.
                  </p>
                </Reveal>
                <Reveal delay={0.15}>
                  <p className="font-light" style={{ fontSize: '1.05rem', lineHeight: 1.75, color: '#595958', fontWeight: 300 }}>
                    At JPMorgan Chase, I&apos;ve learned to look beyond the interface and understand how customer needs, business strategy, technology, architecture, operations, and data connect. I&apos;m also fascinated by the shift toward faster experimentation, machine learning, and AI, and I enjoy thoughtful conversations about the future of technology, modern design, and design philosophy.
                  </p>
                </Reveal>
                <Reveal delay={0.2}>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {['Product Strategy', '0-to-1 Product Design', 'Complex Workflows', 'Systems Thinking', 'Interaction Design', 'Information Architecture', 'Design Systems', 'User Research', 'Rapid Prototyping', 'AI & Automation Experiences', 'Fintech', 'Financial Operations', 'Enterprise Platforms', 'Cross-functional Leadership', 'Stakeholder Alignment', 'Figma', 'GitHub Copilot', 'Vercel v0', 'Claude Code'].map(s => (
                      <span key={s} style={{ fontSize: '0.75rem', fontWeight: 400, letterSpacing: '0.02em', color: '#0f0f0e', border: '1px solid rgba(15,15,14,0.2)', borderRadius: 100, padding: '5px 14px', display: 'inline-block' }}>{s}</span>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recognition */}
      <div className="px-8 md:px-14 py-20" style={{ borderTop: '1px solid rgba(15,15,14,0.08)' }}>
        <div className="max-w-screen-xl mx-auto">
          <Reveal>
            <span className="text-xs font-light tracking-widest" style={{ color: '#0f0f0e', letterSpacing: '0.15em' }}>EXPERIENCE</span>
          </Reveal>
          <div className="mt-10 flex flex-col">
            {awards.map((a, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="flex items-center justify-between py-6" style={{ borderBottom: '1px solid rgba(15,15,14,0.08)' }}>
                  <span className="font-light" style={{ fontWeight: 300, color: '#0f0f0e', fontSize: '1rem' }}>{a.title}</span>
                  <div className="flex items-center gap-8">
                    <span className="text-sm font-light" style={{ color: '#595958' }}>{a.project}</span>
                    <span className="text-sm font-light" style={{ color: '#767675' }}>{a.year}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Contact */}
      <section id="contact" className="px-8 md:px-14 py-40" style={{ position: 'relative' }}>
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
              <div className="flex items-center gap-8" style={{ background: '#ffffff', padding: '8px 12px', borderRadius: 4 }}>
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex items-center justify-center"
                  style={{ width: 40, height: 40, borderRadius: 9999, border: '1px solid #0f0f0e', color: '#0f0f0e', transition: 'opacity 0.2s' }}
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

      {/* Footer */}
      <footer className="px-8 md:px-14 py-8" style={{ background: '#ffffff', borderTop: '1px solid rgba(15,15,14,0.08)' }}>
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
              <span className="text-xs font-light" style={{ color: '#767675' }}>© 2026 Tamaré Reese</span>
          <span className="text-xs font-light" style={{ color: '#767675' }}>All rights reserved</span>
        </div>
      </footer>
    </section>
  )
}
