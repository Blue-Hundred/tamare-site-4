import { useRef } from 'react'
import { useOutletContext } from 'react-router'
import { motion, useInView } from 'framer-motion'
import ContactSection from '../components/ContactSection'
import ProfileCard from '../components/ProfileCard'
import VinylRecord from '../components/VinylRecord'

const vinyls = [
  { cover: '/images/vinyl-cover-1.png', label: '/images/vinyl-cover-1.png', title: 'Bruno Mars — The Romantic' },
  { cover: '/images/vinyl-cover-2.png', label: '/images/vinyl-cover-2.png', title: 'Marvin Gaye — Live at the London Palladium' },
  { cover: '/images/vinyl-cover-3.png', label: '/images/vinyl-cover-3.png', title: 'Michael Jackson — Xscape' },
]

const awards = [
  { title: 'JPMorgan Chase & Co.', project: 'Vice President, Experience Designer', year: '2022-2026' },
  { title: 'JPMorgan Chase & Co.', project: 'Associate, Sr. UX Designer', year: '2020-2022' },
  { title: 'Bath & Body Works', project: 'Lead UX Designer', year: '2018-2020' },
  { title: 'g20', project: 'UX Designer', year: '2018' },
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
  const { loaded } = useOutletContext<OutletCtx>()

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
            {/* Profile card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 24 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-center md:justify-start"
            >
              <ProfileCard
                avatarUrl="/images/profile-avatar.png"
                iconUrl="/images/profile-logo-pattern.svg"
                name="Tamaré Reese"
                title="Product Designer"
                handle="tamarereese"
                status="Available for work"
                contactText="Contact"
                onContactClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
              />
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

      {/* Hobbies */}
      <div className="px-8 md:px-14 py-20" style={{ borderTop: '1px solid rgba(15,15,14,0.08)' }}>
        <div className="max-w-screen-xl mx-auto">
          <Reveal>
            <span className="text-xs font-light tracking-widest" style={{ color: '#0f0f0e', letterSpacing: '0.15em' }}>HOBBIES</span>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="font-light mt-6 max-w-2xl" style={{ fontSize: '1.05rem', lineHeight: 1.75, color: '#595958', fontWeight: 300 }}>
              In my free time, I&apos;m a novice DJ, listening mostly to classic RnB. Check out a few vinyls I&apos;ve been listening to below.
            </p>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-20 md:gap-28">
            {vinyls.map((v, i) => (
              <Reveal key={v.title} delay={0.1 + i * 0.08}>
                <div className="relative z-0 hover:z-20 flex flex-col gap-4">
                  <VinylRecord coverImage={v.cover} labelImage={v.label} title={v.title} />
                  <span className="text-sm font-light" style={{ color: '#595958' }}>{v.title}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Contact */}
      <ContactSection />

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
