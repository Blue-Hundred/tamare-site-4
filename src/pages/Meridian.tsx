import { useRef, useState, useEffect, type ReactNode } from 'react'
import { Link, useOutletContext } from 'react-router'
import { motion, useInView } from 'framer-motion'
import PixelBlast from '../components/PixelBlast'
import svgPaths from '../imports/Databases/svg-4toy70dlwj'
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

function CountUp({ value, suffix = '', duration = 1.6 }: { value: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setDisplay(value)
      return
    }
    let raf = 0
    let start: number | null = null
    const tick = (now: number) => {
      if (start === null) start = now
      const progress = Math.min((now - start) / (duration * 1000), 1)
      // easeOutExpo for a snappy count that settles smoothly
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setDisplay(Math.round(eased * value))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

function SectionHeading({ title, body }: { title: string; body?: ReactNode }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      <h2 className="text-h2 lg:col-span-5" style={{ color: '#0f0f0e' }}>{title}</h2>
      {body ? (
        <div className="text-body-18 lg:col-span-6 lg:col-start-7 flex flex-col gap-5" style={{ color: '#0f0f0e' }}>{body}</div>
      ) : null}
    </div>
  )
}

function BackArrow({ flip = false }: { flip?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"
      style={flip ? { transform: 'rotate(180deg)' } : undefined}>
      <path d="M12 19L5 12L12 5" stroke="#0f0f0e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M19 12H5" stroke="#0f0f0e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}

function CaseStudyTopBar() {
  const linkText = { fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 14, color: '#0f0f0e' } as const
  return (
    <div className="fixed top-0 left-0 right-0 z-40 flex items-center px-5 sm:px-8 md:px-9 bg-white"
      style={{ height: 77, borderBottom: '1px solid #d2d2d2' }}>
      <Link to="/#work" className="flex items-center gap-[10px]" style={{ textDecoration: 'none' }}>
        <BackArrow />
        <span className="hidden sm:inline" style={linkText}>Back to portfolio</span>
      </Link>
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center" aria-hidden="true">
        <svg width="30" height="40" viewBox="0 0 31.5145 42.0193" fill="none">
          <path d={svgPaths.p1b65ed80} fill="black" />
          <path d={svgPaths.p11c45c00} fill="black" />
          <path d={svgPaths.pd915a80} fill="black" />
          <path d={svgPaths.p2e1b9140} fill="black" />
          <path d={svgPaths.p32ecd500} fill="black" />
        </svg>
      </div>
      <Link to="/#work" className="flex items-center gap-[10px] ml-auto" style={{ textDecoration: 'none' }}>
        <span style={linkText}>Next Project</span>
        <BackArrow flip />
      </Link>
    </div>
  )
}

function StatArrowIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <rect fill="#E4E4E4" height="34" rx="17" width="34" />
      <path d={svgPaths.p3f21df00} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}

type OutletCtx = { loaded: boolean; hoverOn: () => void; hoverOff: () => void }

export default function Meridian() {
  const { hoverOn, hoverOff } = useOutletContext<OutletCtx>()
  const pixelSize = usePixelSize(3)
  const contentWidth = 'max-w-[1156px] mx-auto'
  const challengeCards = [
    {
      title: 'Customer Friction',
      body: 'Engineers had to relearn workflows across database products and frequently relied on support.',
    },
    {
      title: 'Duplicated investment',
      body: 'Teams independently designed and engineered similar capabilities, increasing development and maintenance costs.',
    },
    {
      title: 'Limited scalability',
      body: 'Fragmented experiences made it difficult to bring database products into the broader Integrated Engineers Portal (IEP).',
    },
  ]

  return (
    <div style={{ background: '#f9f9f9' }}>
      <CaseStudyTopBar />
      <main>
        <section className="relative overflow-hidden bg-white px-4 sm:px-8 md:px-14 pt-28 md:pt-[178px] pb-14 md:pb-20 md:min-h-[723px]">
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <PixelBlast color="#d8d8d8" pixelSize={pixelSize} patternDensity={0.6} patternScale={1.5}
              edgeFade={0.18} speed={2} enableRipples={true} transparent />
          </div>
          <div className={`relative z-10 ${contentWidth} grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start`}>
            <Reveal className="lg:col-span-6 lg:col-start-1">
              <div className="bg-white rounded p-4 md:p-5">
                <h1 className="text-h1" style={{ color: '#0f0f0e' }}>
                  Creating a Unified Database Management Platform
                </h1>
                <p className="text-body-32 mt-4 md:mt-6" style={{ color: '#0f0f0e' }}>
                  Designing a scalable enterprise platform that standardized database onboarding, provisioning, and service management across multiple database products.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-5 lg:col-start-8">
              <aside className="bg-white rounded p-4 md:p-5">
                {[
                  { label: 'CLIENT', value: 'JPMorgan Chase & Co.' },
                  { label: 'ROLE', value: 'Lead Experience Designer\nLead Experience Researcher' },
                  { label: 'YEAR', value: '2025' },
                  { label: 'DURATION', value: '6 months' },
                  { label: 'TASKS', value: 'Experience Research, Experience Design, Service Design, Clickable Prototype' },
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

        <section className="px-4 sm:px-8 md:px-14 pt-16 pb-4 md:py-[88px]">
          <div className={contentWidth}>
            <Reveal>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-8 mb-8 md:mt-[80px] md:mb-[132px]">
                <h2 className="text-h2 lg:col-span-5" style={{ color: '#0f0f0e' }}>Summary</h2>
                <div className="text-body-18 lg:col-span-6 lg:col-start-7" style={{ color: '#0f0f0e' }}>
                  <p>Enterprise engineers relied on more than ten independent database control planes to provision and manage database services. Each product had evolved independently, resulting in inconsistent workflows, terminology, navigation patterns, and operational experiences. Engineers frequently switched between systems, searched multiple documentation sources, and relied on tribal knowledge to complete routine tasks.</p>
                  <p className="mt-5">The long-term vision was to create a shared experience that could scale across database products while providing a consistent foundation for the Integrated Engineers Portal (IEP).</p>
                  <p className="mt-5">This case study focuses on one representative workflow—database onboarding and provisioning—to illustrate the broader experience strategy developed for the platform. Although the platform supports many database management capabilities, this workflow best demonstrates the research, systems thinking, and product design decisions that established reusable patterns across the ecosystem.</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="mt-6 md:mt-[70px] rounded-[20px] bg-white overflow-hidden min-h-[180px] md:min-h-[474px]">
                <img
                  src="/images/databases-cover.png"
                  alt="Perspective mockup of the Cloud Relational Databases dashboard showing the My Databases view with recent services, performance and health, applications, pricing charts, and the product knowledge base"
                  className="w-full h-full object-cover"
                  style={{ minHeight: 'inherit' }}
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="px-4 sm:px-8 md:px-14 pt-16 pb-4 md:py-[90px]">
          <div className={`${contentWidth} grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12 md:mb-[132px]`}>
            <Reveal className="lg:col-span-5">
              <div>
                <h2 className="text-h2" style={{ color: '#0f0f0e' }}>The Challenge</h2>
                <p className="text-body-18 mt-5" style={{ color: '#0f0f0e' }}>
                  Enterprise engineers relied on more than 10+ independent database control planes across relational, non-relational, and graph technologies. Although engineers performed many of the same tasks across products, each control plane had different navigation, terminology, provisioning workflows, documentation, and operational experiences.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-6 lg:col-start-7">
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
            <div className={`${contentWidth} mt-4 md:mt-[70px]`}>
              <img
                src="/images/legacy-databases-experiences.png"
                alt="Collage of legacy database control-plane interfaces — Gaia MS SQL, Cockroach DB, Oracle Services, MySQL, TigerGraph, and Cassandra dashboards — each with different navigation, terminology, and visual styling"
                className="w-full h-auto block rounded-[20px]"
                loading="lazy"
              />
            </div>
          </Reveal>
        </section>

        <section className="px-4 sm:px-8 md:px-14 py-16 md:py-[90px]">
          <div className={contentWidth}>
            <Reveal className="block mb-24 md:mb-[180px]">
              <SectionHeading
                title="Framing the Problem with Data"
                body={
                  <>
                    <p>The initiative began with an audit of existing control planes and expanded through multiple rounds of research to build an evidence-based view of the broader database experience.</p>
                    <p>We synthesized the findings into personas, Jobs to Be Done, and service blueprints that connected customer needs with the systems, teams, and processes supporting them. This helped us identify where experiences could be standardized, where technology-specific differences mattered, and which opportunities would have the greatest impact on self-service.</p>
                    <p>The result was a shared understanding of the problem that helped align product, design, and engineering around a scalable experience strategy rather than a series of disconnected UI improvements.</p>
                  </>
                }
              />
            </Reveal>
            <Reveal delay={0.04}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {[
                  { src: '/images/ui-audit.png', alt: 'Zoomed-out UI audit board mapping every existing database control plane side by side, from DB Portal to Gaia MS SQL', caption: 'UI Audit' },
                  { src: '/images/databases-synthesis.png', alt: 'Research synthesis board grouping customer friction points, risks, design process, and ideal UX states into color-coded sticky notes', caption: 'Synthesis' },
                ].map(img => (
                  <figure key={img.caption} className="flex flex-col gap-3">
                    <div className="bg-white rounded-[20px] overflow-hidden" style={{ border: '1px solid rgba(15,15,14,0.08)' }}>
                      <img
                        src={img.src || "/placeholder.svg"}
                        alt={img.alt}
                        className="w-full h-auto block"
                        style={{ aspectRatio: '16 / 9', objectFit: 'cover', objectPosition: 'top left' }}
                        loading="lazy"
                      />
                    </div>
                    <figcaption style={{ color: '#767675', fontSize: 14, lineHeight: '24px' }}>{img.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="mt-8 md:mt-10 bg-white rounded-[20px] p-6 md:p-10 flex flex-col gap-10 md:gap-[70px]">
                <div className="flex flex-col gap-8 md:gap-10">
                  <div className="flex flex-col gap-3">
                    <p style={{ color: '#0f0f0e', fontWeight: 600, fontSize: 20, lineHeight: '30px', letterSpacing: '-0.4px' }}>Discovery Research</p>
                    <p className="text-body-18" style={{ color: '#0f0f0e' }}>I conducted three rounds of research to understand the challenges behind the fragmented experience.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
                    {[
                      { n: '1', t: 'Stakeholder Interviews & UI Audit', b: 'Engineers had to relearn workflows across database products and frequently relied on support.' },
                      { n: '2', t: 'Usability Tests', b: 'Engineers had to relearn workflows across database products and frequently relied on support.' },
                      { n: '3', t: 'Qualitative Interviews', b: 'Engineers had to relearn workflows across database products and frequently relied on support.' },
                    ].map(item => (
                      <article key={item.n} className="flex flex-col gap-6 md:gap-8">
                        <div className="bg-[#f5f5f5] rounded-full flex items-center justify-center shrink-0" style={{ width: 68, height: 68 }}>
                          <span style={{ color: '#0f0f0e', fontWeight: 600, fontSize: 20, lineHeight: '30px', letterSpacing: '-0.4px' }}>{item.n}</span>
                        </div>
                        <div className="flex flex-col gap-3">
                          <h3 style={{ color: '#0f0f0e', fontWeight: 600, fontSize: 18, lineHeight: '26px' }}>{item.t}</h3>
                          <p className="text-body-18" style={{ color: '#0f0f0e' }}>{item.b}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-8">
                  <p style={{ color: '#0f0f0e', fontWeight: 600, fontSize: 20, lineHeight: '30px', letterSpacing: '-0.4px' }}>Round 3 research revealed significant gaps in self-service.</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-9">
                    {[73, 85, 85, 69].map((n, i) => (
                      <div key={i} className={`flex flex-col gap-3 ${i < 3 ? 'md:border-r md:border-[#e4e4e4] md:pr-6' : ''}`}>
                        <p style={{ color: '#0f0f0e', fontWeight: 500, fontSize: 'clamp(2.25rem, 4vw, 3.375rem)', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
                          <CountUp value={n} suffix="%" duration={1.6 + i * 0.15} />
                        </p>
                        <p style={{ color: '#0f0f0e', fontSize: 14, lineHeight: '24px' }}>Of users needed SRE support to complete the onboarding and provisioning processes</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="px-4 sm:px-8 md:px-14 py-16 md:py-[90px]">
              <div className={`${contentWidth} grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12`}>
                <Reveal className="lg:col-span-5">
                  <h2 className="text-h2" style={{ color: '#0f0f0e' }}>Defining Personas and Service Blueprint</h2>
                </Reveal>
                <Reveal delay={0.08} className="lg:col-span-6 lg:col-start-7">
                  <p className="text-body-18" style={{ color: '#0f0f0e' }}>
                    Research identified two primary personas. Service blueprints connected the dots between technology, data, product, and user experience to better understand how customer friction and pain points correlated to the backend technologies orchestrating the experience.
              </p>
            </Reveal>
            <Reveal delay={0.12} className="lg:col-span-12">
              <div className="grid grid-cols-1 gap-5 md:gap-6">
                <div className="rounded-[10px] overflow-hidden bg-white">
                  <img src={personasImage} alt="Persona boards" className="w-full h-auto block" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-5 md:gap-6 md:h-[407px]">
                  <div className="rounded-[10px] overflow-hidden bg-white flex items-center justify-center">
                    <img src={blueprintImage} alt="Service blueprint map" className="w-full h-full object-contain block" />
                  </div>
                  <div className="rounded-[10px] overflow-hidden bg-white">
                    <img src={blueprintImage} alt="Service blueprint detail" className="w-full h-full object-cover block" />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="px-4 sm:px-8 md:px-14 py-16 md:py-[90px]">
          <div className={`${contentWidth} grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12`}>
            <Reveal className="lg:col-span-5">
              <h2 className="text-h2" style={{ color: '#0f0f0e' }}>Redesigning the Information Architecture</h2>
            </Reveal>
            <Reveal delay={0.06} className="lg:col-span-6 lg:col-start-7">
              <p className="text-body-18" style={{ color: '#0f0f0e' }}>
                One of the clearest manifestations of fragmentation was navigation. Database products organized similar capabilities differently, forcing engineers to develop a new mental model for each technology. I established a common information architecture organized around customer tasks.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-12">
              <div className="grid grid-cols-1 gap-5 md:gap-6">
                <div className="rounded-[20px] overflow-hidden md:mt-[100px]">
                  <img src="/images/databases-information-architecture.png" alt="Information architecture diagram mapping the Databases hub into seven top-level sections and a second row of user-journey screens ending in the numbered Create Database Service provisioning flow" className="w-full h-auto block" loading="lazy" />
                </div>
                <div className="rounded-[20px] overflow-hidden md:mt-[80px]">
                  <img src="/images/databases-components.png" alt="Databases design system component library organized into nine groups: navigation, dashboard and overview components, resource and service cards, tables and lists, search and filters, detail sections, steps and progress, form components, and actions and feedback" className="w-full h-auto block" loading="lazy" />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="px-4 sm:px-8 md:px-14 py-16 md:py-[90px]">
          <div className={`${contentWidth} grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-24 md:mb-[140px]`}>
            <Reveal className="lg:col-span-5">
              <article>
                <h2 className="text-h2" style={{ color: '#0f0f0e' }}>Results</h2>
                <p className="text-body-18 mt-5" style={{ color: '#0f0f0e' }}>
                  We launched Cloud Relational Databases and established the foundation for future control planes, consolidating previously fragmented experience into a consistent and scaleable product.
                </p>
              </article>
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-6 lg:col-start-7">
              <div className="grid grid-cols-2 gap-4 md:gap-5">
                {[
                  { n: 92, suffix: '%', l: 'Task completion Rate' },
                  { n: 95, suffix: '', l: 'Task completion Rate' },
                  { n: 95, suffix: '', l: 'Task completion Rate' },
                  { n: 100, suffix: '%', l: 'User preference of new experience' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 md:p-5 flex flex-col gap-3">
                    <StatArrowIcon />
                    <p style={{ color: '#0f0f0e', fontWeight: 500, fontSize: 'clamp(2.25rem, 4vw, 3.375rem)', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
                      <CountUp value={stat.n} suffix={stat.suffix} duration={1.6 + i * 0.15} />
                    </p>
                    <p className="text-body-14" style={{ color: '#0f0f0e' }}>{stat.l}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <div className={`${contentWidth} grid grid-cols-1 gap-5 md:gap-6`}>
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

        <section className="px-4 sm:px-8 md:px-14 pt-8 md:pt-12 pb-24 md:pb-[120px]">
          <div className={`${contentWidth} flex flex-col items-center text-center`}>
            <div style={{ width: 1, height: 220, background: '#dadada' }} />
            <Reveal>
              <div className="flex items-center justify-center gap-[10px] mt-10">
                <span style={{ color: '#999', fontWeight: 600, fontSize: 14, lineHeight: '26px' }}>Next Case Study</span>
                <BackArrow flip />
              </div>
              <h3 className="mt-4" style={{ color: '#0f0f0e', fontWeight: 600, fontSize: 20, lineHeight: '30px', letterSpacing: '-0.4px' }}>Modernizing Family Banking</h3>
              <p className="mt-3 mx-auto" style={{ color: '#0f0f0e', fontSize: 18, lineHeight: '28px', maxWidth: 509 }}>Engineers had to relearn workflows across database products and frequently relied on support.</p>
            </Reveal>
          </div>
        </section>
      </main>

      {/* Contact */}
      <section id="contact" className="px-8 md:px-14 py-40 bg-white" style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: '30%', zIndex: 0 }}>
          <PixelBlast color="#d8d8d8" pixelSize={pixelSize} patternDensity={0.75} patternScale={1.5}
            edgeFade={0.08} speed={2} enableRipples={true} transparent />
        </div>
        <div className="max-w-screen-xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>
          <Reveal>
            <span className="text-xs font-light tracking-widest" style={{ opacity: 1, color: '#0f0f0e', letterSpacing: '0.15em', background: '#ffffff', padding: '4px 10px 4px 0', borderRadius: 4, display: 'inline-block' }}>CONTACT</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-light mt-6" style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)', letterSpacing: '-0.01em', lineHeight: 1.05, fontWeight: 400 }}>
              Let&apos;s<br />
              <a
                href="mailto:alex@mercer.studio"
                style={{ textDecoration: 'underline', textUnderlineOffset: '0.1em', textDecorationThickness: '1px', color: '#0f0f0e', opacity: 1, transition: 'opacity 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.5'; hoverOn() }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; hoverOff() }}
              >
                Connect.
              </a>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10 mt-24">
              <div className="flex flex-col gap-2" style={{ background: '#ffffff', padding: '8px 12px', borderRadius: 4 }}>
                <a href="mailto:alex@mercer.studio" className="text-sm font-light" style={{ opacity: 1, color: '#0f0f0e', textDecoration: 'none' }}>alex@mercer.studio</a>
                <span className="text-sm font-light" style={{ opacity: 1, color: '#0f0f0e' }}>Amsterdam, NL</span>
              </div>
              <div className="flex items-center gap-8" style={{ background: '#ffffff', padding: '8px 12px', borderRadius: 4 }}>
                {['Instagram', 'LinkedIn', 'Are.na'].map(l => (
                  <a key={l} href="#" className="text-sm font-light"
                    style={{ opacity: 1, color: '#0f0f0e', textDecoration: 'none', transition: 'opacity 0.2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.6'; hoverOn() }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; hoverOff() }}
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
      <footer className="px-8 md:px-14 py-8 bg-white" style={{ borderTop: '1px solid rgba(15,15,14,0.08)' }}>
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          <span className="text-xs font-light" style={{ color: '#767675' }}>© 2026 Tamaré Reese</span>
          <span className="text-xs font-light" style={{ color: '#767675' }}>All rights reserved</span>
        </div>
      </footer>
    </div>
  )
}
