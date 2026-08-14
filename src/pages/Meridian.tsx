import { useRef, useState, useEffect, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import PixelBlast from '../components/PixelBlast'
import NavBar from '../components/NavBar'
import architectureImage from '../imports/Databases/246c5a6d9c942f00012f575ad446d86a09c5dab6.png'
import experienceMapImage from '../imports/Databases/c38b9a065ae6afc6e3f13f2d46efee0586b97afa.png'
import prototypeImage from '../imports/Databases/d837be23860c1da0ac7bcafedc4dc6b06b226433.png'
import workflowImage from '../imports/Databases/e32937999a0fce8d57bcb9ae5e6c08abacbd1f3b.png'
import personasImage from '../imports/Databases/267c205dc382f590b717a76a3b90365da5afb8b2.png'
import blueprintImage from '../imports/Databases/1887e9d636693dc6c50eebc16511159b07b7d0ff.png'

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

function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })
  return (
    <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}>
      {children}
    </motion.div>
  )
}

function SectionHeading({ title, body }: { title: string; body?: string }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
      <h2 className="text-h2 lg:col-span-4" style={{ color: '#0f0f0e' }}>{title}</h2>
      {body ? (
        <p className="text-body-18 lg:col-span-8" style={{ color: '#0f0f0e' }}>{body}</p>
      ) : null}
    </div>
  )
}

export default function Meridian() {
  const pixelSize = usePixelSize(3)
  const contentWidth = 'max-w-[1156px] mx-auto'
  const challengeCards = [
    {
      title: 'Customer friction',
      body: 'Engineers had to relearn workflows across database products and repeatedly depend on support teams.',
    },
    {
      title: 'Duplicated investment',
      body: 'Each team redesigned similar capabilities independently, increasing delivery and maintenance cost.',
    },
    {
      title: 'Limited scalability',
      body: 'Fragmented interactions made it difficult to onboard products into the Integrated Engineers Portal (IEP).',
    },
  ]

  return (
    <div style={{ background: '#f9f9f9' }}>
      <NavBar />
      <main>
        <section className="relative overflow-hidden px-4 sm:px-8 md:px-14 pt-28 md:pt-[178px] pb-14 md:pb-20 md:min-h-[723px]">
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <PixelBlast color="#d8d8d8" pixelSize={pixelSize} patternDensity={0.6} patternScale={1.5}
              edgeFade={0.18} speed={2} enableRipples={true} transparent />
          </div>
          <div className={`relative z-10 ${contentWidth} grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start`}>
            <Reveal className="lg:col-span-6 lg:col-start-1">
              <div className="bg-[#f9f9f9] rounded p-4 md:p-5">
                <h1 className="text-h1" style={{ color: '#0f0f0e', fontSize: 'clamp(1.8rem, 5.8vw, 3rem)', lineHeight: 'clamp(2.2rem, 6.8vw, 3.625rem)', letterSpacing: '-0.02em' }}>
                  Creating a Unified Database Management Platform
                </h1>
                <p className="text-body-32 mt-4 md:mt-6" style={{ color: '#0f0f0e', fontSize: 'clamp(1rem, 2.8vw, 1.625rem)', lineHeight: 'clamp(1.6rem, 3.8vw, 2.625rem)', letterSpacing: '-0.02em' }}>
                  Designing a scalable enterprise platform that standardized database onboarding, provisioning, and service management across multiple database products.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-5 lg:col-start-8">
              <aside className="bg-[#f9f9f9] rounded p-4 md:p-5">
                {[
                  { label: 'CLIENT', value: 'JPMorgan Chase & Co.' },
                  { label: 'ROLE', value: 'Lead Experience Designer\nLead Experience Researcher' },
                  { label: 'YEAR', value: '2025' },
                  { label: 'DURATION', value: '6 months' },
                  { label: 'RESPONSIBILITIES', value: 'Experience Research, Experience Design, Service Design, Clickable Prototype' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-0 border-b border-[rgba(15,15,14,0.15)] py-3">
                    <div className="text-brow sm:w-[140px] shrink-0" style={{ color: '#0f0f0e', lineHeight: 1.5 }}>
                      {label}
                    </div>
                    <div className="text-body-14 flex-1" style={{ color: '#0f0f0e', whiteSpace: 'pre-line' }}>
                      {value}
                    </div>
                  </div>
                ))}
              </aside>
            </Reveal>
          </div>
        </section>

        <section className="px-4 sm:px-8 md:px-14 py-16 md:py-[88px] bg-white">
          <div className={contentWidth}>
            <Reveal>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                <h2 className="text-h2 lg:col-span-5" style={{ color: '#0f0f0e' }}>Summary</h2>
                <div className="text-body-18 lg:col-span-7" style={{ color: '#0f0f0e' }}>
                  <p>Enterprise engineers relied on more than ten independent database control planes to provision and manage database services. Each product had evolved independently, resulting in inconsistent workflows, terminology, navigation patterns, and operational experiences. Engineers frequently switched between systems, searched multiple documentation sources, and relied on tribal knowledge to complete routine tasks.</p>
                  <p className="mt-5">The long-term vision was to create a shared experience that could scale across database products while providing a consistent foundation for the Integrated Engineers Portal (IEP).</p>
                  <p className="mt-5">This case study focuses on one representative workflow—database onboarding and provisioning—to illustrate the broader experience strategy developed for the platform.</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="mt-10 md:mt-[70px] rounded-[20px] bg-[#f9f9f9] min-h-[180px] md:min-h-[474px]" />
            </Reveal>
          </div>
        </section>

        <section className="px-4 sm:px-8 md:px-14 py-16 md:py-[90px]">
          <div className={`${contentWidth} grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start`}>
            <Reveal className="lg:col-span-5">
              <div>
                <h2 className="text-h2" style={{ color: '#0f0f0e' }}>The Challenge</h2>
                <p className="text-body-18 mt-5" style={{ color: '#0f0f0e' }}>
                  Enterprise engineers relied on more than 10+ independent database control planes across relational, non-relational, and graph technologies. Although engineers performed many of the same tasks across products, each control plane had different navigation, terminology, provisioning workflows, documentation, and operational experiences.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-7">
              <div className="grid grid-cols-1 gap-4 md:gap-5">
                {challengeCards.map(card => (
                  <article key={card.title} className="bg-white rounded-xl p-5 md:p-6">
                    <h3 className="text-h4" style={{ color: '#0f0f0e' }}>{card.title}</h3>
                    <p className="text-body-18 mt-2" style={{ color: '#0f0f0e' }}>{card.body}</p>
                  </article>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className={`${contentWidth} mt-10 md:mt-[70px] rounded-[20px] bg-white min-h-[180px] md:min-h-[474px]`} />
          </Reveal>
        </section>

        <section className="px-4 sm:px-8 md:px-14 py-16 md:py-[90px] bg-white">
          <div className={contentWidth}>
            <Reveal>
              <SectionHeading
                title="Framing the Problem with Data"
                body="The initiative began with an audit of existing control planes and expanded through multiple rounds of research to understand the customer and operational challenges behind the fragmented experience."
              />
            </Reveal>
            <Reveal delay={0.08}>
              <div className="mt-8 md:mt-10 bg-[#f7f8fa] rounded-xl p-5 md:p-7">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                  {[
                    { k: 'Stakeholder Interviews & UI Audit', v: 'Engineers had to relearn workflows across database products and frequently relied on support.' },
                    { k: 'Usability Study', v: 'Customers struggled to discover the right services and complete recurring tasks.' },
                    { k: 'Self-service Research', v: 'Research revealed significant gaps in self-service and workflow guidance.' },
                  ].map(item => (
                    <article key={item.k} className="bg-white rounded-lg p-4 md:p-5">
                      <h4 className="text-brow" style={{ color: '#0f0f0e', letterSpacing: '0.08em' }}>{item.k}</h4>
                      <p className="text-body-14 mt-2" style={{ color: '#0f0f0e' }}>{item.v}</p>
                    </article>
                  ))}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mt-6">
                  {[
                    { n: '73%', l: 'Customers experienced friction navigating control planes' },
                    { n: '85%', l: 'Customers relied on support to complete tasks' },
                    { n: '85%', l: 'Engineers wanted one consistent experience' },
                    { n: '69%', l: 'Customers struggled to find documentation' },
                  ].map(stat => (
                    <div key={stat.n + stat.l} className="bg-white rounded-lg p-4 md:p-5">
                      <p className="text-h3" style={{ color: '#0f0f0e' }}>{stat.n}</p>
                      <p className="text-body-14 mt-1" style={{ color: '#0f0f0e' }}>{stat.l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="px-4 sm:px-8 md:px-14 py-16 md:py-[90px]">
          <div className={`${contentWidth} grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10`}>
            <Reveal className="lg:col-span-4">
              <h2 className="text-h2" style={{ color: '#0f0f0e' }}>Defining Personas and Service Blueprint</h2>
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-8">
              <p className="text-body-18" style={{ color: '#0f0f0e' }}>
                Research identified two primary personas. Service blueprints connected the dots between technology, data, product, and user experience to better understand how customer friction and pain points correlated to the backend technologies orchestrating the experience.
              </p>
            </Reveal>
            <Reveal delay={0.12} className="lg:col-span-12">
              <div className="bg-white rounded-[20px] p-4 md:p-5 grid grid-cols-1 gap-5 md:gap-6">
                <div className="rounded-[10px] overflow-hidden bg-white">
                  <img src={personasImage} alt="Persona boards" className="w-full h-auto block" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-5 md:gap-6 md:h-[407px]">
                  <div className="rounded-[10px] overflow-hidden bg-white">
                    <img src={blueprintImage} alt="Service blueprint map" className="w-full h-full object-cover object-top block" />
                  </div>
                  <div className="rounded-[10px] overflow-hidden bg-white">
                    <img src={blueprintImage} alt="Service blueprint detail" className="w-full h-full object-cover block" />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="px-4 sm:px-8 md:px-14 py-16 md:py-[90px] bg-white">
          <div className={`${contentWidth} grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10`}>
            <Reveal className="lg:col-span-5">
              <h2 className="text-h2" style={{ color: '#0f0f0e' }}>Redesigning Information Architecture</h2>
            </Reveal>
            <Reveal delay={0.06} className="lg:col-span-7">
              <p className="text-body-18" style={{ color: '#0f0f0e' }}>
                One of the clearest manifestations of fragmentation was navigation. Database products organized similar capabilities differently, forcing engineers to develop a new mental model for each technology. I established a common information architecture organized around customer tasks.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-12">
              <div className="grid grid-cols-1 gap-5 md:gap-6">
                <div className="rounded-[20px] overflow-hidden bg-[#fbfcfc]">
                  <img src={architectureImage} alt="Information architecture redesign concept" className="w-full h-auto block" />
                </div>
                <div className="rounded-[20px] overflow-hidden bg-[#f9fbfd] p-4 md:p-8">
                  <img src={experienceMapImage} alt="Unified information architecture and interface system" className="w-full h-auto block" />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="px-4 sm:px-8 md:px-14 py-16 md:py-[90px]">
          <div className={`${contentWidth} grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start`}>
            <Reveal className="lg:col-span-5">
              <article>
                <h2 className="text-h2" style={{ color: '#0f0f0e' }}>Results</h2>
                <p className="text-body-32 mt-5" style={{ color: '#0f0f0e' }}>
                  We launched Cloud Relational Databases and established the foundation for future control planes, consolidating previously fragmented experience into a consistent and scaleable product.
                </p>
              </article>
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-4 md:gap-5">
                {[
                  { n: '92%', l: 'Task completion Rate' },
                  { n: '95', l: 'Task completion Rate' },
                  { n: '95', l: 'Task completion Rate' },
                  { n: '100%', l: 'User preference of new experience' },
                ].map(stat => (
                  <div key={stat.n + stat.l} className="bg-white rounded-xl p-4 md:p-5">
                    <p className="text-h3" style={{ color: '#0f0f0e' }}>{stat.n}</p>
                    <p className="text-body-14 mt-2" style={{ color: '#0f0f0e' }}>{stat.l}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <div className={`${contentWidth} mt-8 md:mt-10 grid grid-cols-1 gap-5 md:gap-6`}>
            <Reveal>
              <div className="rounded-none overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.16)] bg-white">
                <img src={prototypeImage} alt="Database operations dashboard overview" className="w-full h-auto block" />
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                <div className="overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.16)] bg-white">
                  <img src={workflowImage} alt="Provisioning panel UI" className="w-full h-auto block" />
                </div>
                <div className="overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.16)] bg-white">
                  <img src={workflowImage} alt="Service request detail view" className="w-full h-auto block" />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="px-4 sm:px-8 md:px-14 py-14 md:py-20 bg-[#f9f9f9]">
          <div className={`${contentWidth} grid grid-cols-1 lg:grid-cols-2 gap-8 items-start`}>
            <div />
            <Reveal>
              <aside className="border-l border-[#dadada] pl-6 md:pl-10">
                <p className="text-brow" style={{ color: '#999', letterSpacing: '0.12em' }}>Next Case Study →</p>
                <h3 className="text-h3 mt-3" style={{ color: '#0f0f0e' }}>Modernizing Family Banking</h3>
                <p className="text-body-14 mt-3" style={{ color: '#0f0f0e' }}>Engineers had to relearn workflows across database products and frequently relied on support.</p>
              </aside>
            </Reveal>
          </div>
        </section>
      </main>

      {/* Contact — matches homepage */}
      <section id="contact" className="px-4 sm:px-8 md:px-14 py-24 md:py-32 lg:py-40" style={{ position: 'relative', background: '#ffffff' }}>
        <div className="absolute top-0 bottom-0 right-0 left-0 md:left-[15%] lg:left-[30%] z-0">
          <PixelBlast color="#d8d8d8" pixelSize={pixelSize} patternDensity={0.75} patternScale={1.5}
            edgeFade={0.08} speed={2} enableRipples={true} transparent />
        </div>
        <div className={contentWidth} style={{ position: 'relative', zIndex: 1 }}>
          <Reveal>
            <span className="text-xs font-light tracking-widest" style={{ opacity: 1, color: '#0f0f0e', letterSpacing: '0.15em', background: '#ffffff', padding: '4px 10px 4px 0', borderRadius: 4, display: 'inline-block' }}>CONTACT</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-light mt-6" style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)', letterSpacing: '-0.01em', lineHeight: 1.05, fontWeight: 400, color: '#0f0f0e' }}>
              Let's<br />
              <a
                href="mailto:alex@mercer.studio"
                style={{ textDecoration: 'underline', textUnderlineOffset: '0.1em', textDecorationThickness: '1px', color: '#0f0f0e', opacity: 1, transition: 'opacity 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.5' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
              >
                Connect.
              </a>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 md:gap-10 mt-16 md:mt-24">
              <div className="flex flex-col gap-2" style={{ background: '#ffffff', padding: '8px 12px', borderRadius: 4 }}>
                <a href="mailto:alex@mercer.studio" className="text-sm font-light" style={{ color: '#0f0f0e', textDecoration: 'none' }}>alex@mercer.studio</a>
                <span className="text-sm font-light" style={{ color: '#0f0f0e' }}>Amsterdam, NL</span>
              </div>
              <div className="flex items-center gap-4 sm:gap-8 flex-wrap" style={{ background: '#ffffff', padding: '8px 12px', borderRadius: 4 }}>
                {['Instagram', 'LinkedIn', 'Are.na'].map(l => (
                  <a key={l} href="#" className="text-sm font-light"
                    style={{ color: '#0f0f0e', textDecoration: 'none', transition: 'opacity 0.2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.6' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
                  >
                    {l}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-8 md:px-14 py-6 md:py-8" style={{ background: '#ffffff', borderTop: '1px solid rgba(15,15,14,0.08)' }}>
        <div className={`${contentWidth} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0`}>
          <span className="text-xs font-light" style={{ color: '#767675' }}>© 2026 Alex Mercer</span>
          <span className="text-xs font-light" style={{ color: '#767675' }}>All rights reserved</span>
        </div>
      </footer>
    </div>
  )
}
