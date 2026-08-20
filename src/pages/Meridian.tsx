import { useRef, useState, useEffect, type ReactNode } from 'react'
import { Link, useOutletContext } from 'react-router'
import { motion, useInView } from 'framer-motion'
import PixelBlast from '../components/PixelBlast'
import ContactSection from '../components/ContactSection'
import svgPaths from '../imports/Databases/svg-4toy70dlwj'
import personasImage from '../imports/Databases/267c205dc382f590b717a76a3b90365da5afb8b2.png'
import blueprintImage from '../imports/Databases/1887e9d636693dc6c50eebc16511159b07b7d0ff.png'
import {
  Headset,
  Settings,
  Puzzle,
  CheckCircle2,
  Clock,
  UserPlus,
  Database,
  SlidersHorizontal,
  PlayCircle,
  Activity,
  Wrench,
  CircleDollarSign,
  FileText,
  Cog,
  User,
  Share2,
  Sparkles,
  Target,
  TrendingUp,
  Star,
  type LucideIcon,
} from 'lucide-react'

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

function MvpStrategy() {
  const BLUE = '#3651d4'
  const GREEN = '#2f9e6b'
  const PURPLE = '#4b3fa6'

  const efficiencyItems: { icon: LucideIcon; text: string }[] = [
    { icon: Headset, text: 'Reduce SRE support tickets and dependency on support teams for application onboarding and database service provisioning' },
    { icon: Settings, text: 'Automate manual processes and integrate disconnected systems' },
    { icon: Puzzle, text: 'Reduce fragmentation across database products and control planes' },
    { icon: CheckCircle2, text: 'Simplify onboarding and provisioning workflows' },
    { icon: Clock, text: 'Reduce the time required to complete each phase of the end-to-end experience' },
  ]

  const jobsItems: { icon: LucideIcon; text: string }[] = [
    { icon: UserPlus, text: 'Onboard applications and establish required access' },
    { icon: Database, text: 'Create and provision database services' },
    { icon: SlidersHorizontal, text: 'Configure database services based on application requirements' },
    { icon: PlayCircle, text: 'Complete post-provisioning requirements to get services running' },
    { icon: Activity, text: 'Monitor applications and database services' },
    { icon: Wrench, text: 'Perform ongoing service operations' },
    { icon: CircleDollarSign, text: 'Understand service costs and key cost drivers' },
    { icon: FileText, text: 'Access database service details, health, and management information' },
  ]

  const goals: { icon: LucideIcon; title: string; body: string }[] = [
    { icon: Cog, title: 'Optimize backstage operations', body: 'Reduce manual effort, operational handoffs, and increase engineering efficiency.' },
    { icon: User, title: 'Expand self-service capabilities', body: 'Enable engineers to complete critical onboarding, provisioning, and service management workflows with less SRE intervention.' },
    { icon: Share2, title: 'Connect the end-to-end ecosystem', body: 'Integrate the applications, APIs, and data required to establish continuous data sequences across the database service lifecycle.' },
    { icon: Clock, title: 'Reduce time-to-completion across the journey', body: 'Identify and remove friction, handoffs, and wait states within each phase of application onboarding, database provisioning, configuration, and service setup.' },
    { icon: Sparkles, title: 'Introduce AI-assisted guidance', body: 'Improve engineer education, troubleshooting, and solutioning throughout the Create Database Service and application/service monitoring experiences.' },
  ]

  const columns: { accent: string; tint: string; headerIcon: LucideIcon; title: string; items: { icon: LucideIcon; text: string }[] }[] = [
    { accent: BLUE, tint: '#eaeefb', headerIcon: TrendingUp, title: 'Driving operational efficiency and reducing support dependency', items: efficiencyItems },
    { accent: GREEN, tint: '#e6f4ec', headerIcon: User, title: 'Prioritizing core customer jobs to be done', items: jobsItems },
  ]

  return (
    <div className="bg-white rounded-[20px] p-6 md:p-10 flex flex-col gap-10 md:gap-14">
      <div className="flex flex-col items-center gap-3 text-center">
        <h3 className="text-h2 text-balance" style={{ color: '#0f0f0e' }}>MVP Strategy: Simplify. Automate. Empower.</h3>
        <p className="text-body-18 max-w-[720px] text-pretty" style={{ color: '#566072' }}>
          Building a unified experience that reduces operational overhead and empowers engineers to deliver faster.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {columns.map(col => (
          <div
            key={col.title}
            className="rounded-2xl border border-[#e7e7ea] p-6 md:p-8 flex flex-col gap-6"
            style={{ borderLeftWidth: 6, borderLeftColor: col.accent }}
          >
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
              <span className="shrink-0 flex items-center justify-center rounded-full" style={{ width: 56, height: 56, backgroundColor: col.tint }}>
                <col.headerIcon size={26} strokeWidth={2} style={{ color: col.accent }} aria-hidden="true" />
              </span>
              <h4 style={{ color: '#0f0f0e', fontWeight: 700, fontSize: 20, lineHeight: '28px', letterSpacing: '-0.3px' }}>{col.title}</h4>
            </div>
            <ul className="flex flex-col">
              {col.items.map((it, i) => (
                <li
                  key={it.text}
                  className={`flex items-start gap-4 py-4 ${i < col.items.length - 1 ? 'border-b border-[#eeeef0]' : ''}`}
                >
                  <it.icon size={24} strokeWidth={1.75} className="shrink-0 mt-0.5" style={{ color: col.accent }} aria-hidden="true" />
                  <span style={{ color: 'rgb(89, 89, 88)', fontSize: 14, fontWeight: 300, lineHeight: '24px' }}>{it.text}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-[#e7e7ea] p-6 md:p-8 flex flex-col gap-8">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
          <span className="shrink-0 flex items-center justify-center rounded-full" style={{ width: 56, height: 56, backgroundColor: '#efeef8' }}>
            <Target size={26} strokeWidth={2} style={{ color: PURPLE }} aria-hidden="true" />
          </span>
          <h4 style={{ color: '#0f0f0e', fontWeight: 700, fontSize: 20, lineHeight: '28px', letterSpacing: '-0.3px' }}>Product goals</h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-8 gap-x-6 lg:gap-x-4">
          {goals.map((g, i) => (
            <div key={g.title} className="relative rounded-xl border border-[#e7e7ea] pt-8 px-5 pb-6 flex flex-col gap-4">
              <span
                className="absolute -top-4 left-5 flex items-center justify-center rounded-full text-white"
                style={{ width: 32, height: 32, backgroundColor: PURPLE, fontSize: 13, fontWeight: 600 }}
              >
                {i + 1}
              </span>
              <g.icon size={34} strokeWidth={1.5} style={{ color: PURPLE }} aria-hidden="true" />
              <h5 style={{ color: '#0f0f0e', fontWeight: 700, fontSize: 16, lineHeight: '22px' }}>{g.title}</h5>
              <p style={{ color: 'rgb(89, 89, 88)', fontSize: 14, fontWeight: 300, lineHeight: '22px' }}>{g.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SectionHeading({ title, body }: { title: string; body?: ReactNode }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      <h2 className="text-h2 lg:col-span-5" style={{ color: '#0f0f0e' }}>{title}</h2>
      {body ? (
        <div className="text-body-18 lg:col-span-6 lg:col-start-7 flex flex-col gap-5" style={{ color: '#595958' }}>{body}</div>
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
      <Link to="/work/Buy-Online-Pickup-in-Store" className="flex items-center gap-[10px] ml-auto" style={{ textDecoration: 'none' }}>
        <span className="font-light sm:font-medium" style={{ ...linkText, fontWeight: undefined }}>Next Project</span>
        <BackArrow flip />
      </Link>
    </div>
  )
}

// Renders a 5-star scale filled proportionally to `percent` (0–100) in purple,
// e.g. percent={92} fills 92% of the five-star row.
function StarRating({ percent }: { percent: number }) {
  const PURPLE = '#4b3fa6'
  const clamped = Math.max(0, Math.min(100, percent))
  const size = 22
  const gap = 4
  const stars = (fill: string) =>
    Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={size} strokeWidth={1.75} fill={fill} style={{ color: PURPLE, flexShrink: 0 }} aria-hidden="true" />
    ))

  return (
    <div
      className="relative inline-flex w-fit"
      role="img"
      aria-label={`${clamped} out of 100, shown as a five-star rating`}
      style={{ gap }}
    >
      {/* Empty stars (outline) */}
      <div className="flex" style={{ gap }}>
        {stars('transparent')}
      </div>
      {/* Filled overlay clipped to the percentage */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${clamped}%` }}>
        <div className="flex" style={{ gap }}>
          {stars(PURPLE)}
        </div>
      </div>
    </div>
  )
}

type OutletCtx = { loaded: boolean; hoverOn: () => void; hoverOff: () => void }

export default function Meridian() {
  const { hoverOn, hoverOff } = useOutletContext<OutletCtx>()
  const pixelSize = usePixelSize(3)
  const contentWidth = 'max-w-[1156px] mx-auto'
  const [nextHover, setNextHover] = useState(false)
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
        <section className="relative overflow-hidden bg-white px-4 sm:px-8 md:px-14 pt-28 md:pt-[178px] pb-14 md:pb-20 md:min-h-[723px] flex flex-col justify-center">
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
                <p className="text-body-18 mt-4 md:mt-6" style={{ color: '#595958' }}>
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
                    <div className="text-xs font-light tracking-widest sm:w-[140px] shrink-0" style={{ color: '#0f0f0e', letterSpacing: '0.15em', lineHeight: 1.5 }}>
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
                <div className="text-body-18 lg:col-span-6 lg:col-start-7" style={{ color: '#595958' }}>
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
                <p className="text-body-18 mt-5" style={{ color: '#595958' }}>
                  Enterprise engineers relied on more than 10+ independent database control planes across relational, non-relational, and graph technologies. Although engineers performed many of the same tasks across products, each control plane had different navigation, terminology, provisioning workflows, documentation, and operational experiences.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-6 lg:col-start-7">
              <div className="grid grid-cols-1 gap-4 md:gap-5">
                {challengeCards.map(card => (
                  <article key={card.title} className="bg-white rounded-xl p-5 md:p-6">
                    <h3 className="text-h4" style={{ color: '#0f0f0e' }}>{card.title}</h3>
                    <p className="text-body-18 mt-2" style={{ color: '#595958' }}>{card.body}</p>
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
                    <p className="text-body-18" style={{ color: '#595958' }}>I conducted three rounds of research to understand the challenges behind the fragmented experience.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
                    {[
                      { n: '1', t: 'Stakeholder Interviews & UI Audit', b: 'Engineers had to relearn workflows across database products and frequently relied on support.' },
                      { n: '2', t: 'Usability Tests', b: 'Engineers had to relearn workflows across database products and frequently relied on support.' },
                      { n: '3', t: 'Qualitative Interviews', b: 'Engineers had to relearn workflows across database products and frequently relied on support.' },
                    ].map(item => (
                      <article key={item.n} className="flex flex-col gap-6">
                    <div className="rounded-full flex items-center justify-center shrink-0" style={{ width: 44, height: 44, backgroundColor: '#E9EDFB' }}>
                      <span style={{ color: '#3651D4', fontWeight: 600, fontSize: 16, lineHeight: '24px', letterSpacing: '-0.3px' }}>{item.n}</span>
                    </div>
                        <div className="flex flex-col gap-3">
                          <h3 style={{ color: '#0f0f0e', fontWeight: 600, fontSize: 18, lineHeight: '26px' }}>{item.t}</h3>
                          <p className="text-body-18" style={{ color: '#595958' }}>{item.b}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-8">
                  <p style={{ color: '#0f0f0e', fontWeight: 600, fontSize: 20, lineHeight: '30px', letterSpacing: '-0.4px' }}>Round 3 research revealed significant gaps in self-service.</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-9">
                    {[
                      { n: 73, label: 'Of users needed SRE support to complete the onboarding and provisioning processes' },
                      { n: 85, label: 'Want stronger observability and monitoring' },
                      { n: 85, label: 'Had concerns about cost transparency' },
                      { n: 69, label: 'Were uncertain when choosing database service sizes' },
                    ].map((stat, i) => (
                      <div key={i} className={`flex flex-col gap-3 ${i < 3 ? 'md:border-r md:border-[#e4e4e4] md:pr-6' : ''}`}>
                        <p style={{ color: '#0f0f0e', fontWeight: 500, fontSize: 'clamp(2.25rem, 4vw, 3.375rem)', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
                          <CountUp value={stat.n} suffix="%" duration={1.6 + i * 0.15} />
                        </p>
                        <p style={{ color: 'rgb(89, 89, 88)', fontSize: 14, fontWeight: 300, lineHeight: '24px' }}>{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="px-4 sm:px-8 md:px-14 pt-6 pb-16 md:py-[90px]">
              <div className={`${contentWidth} grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12`}>
                <Reveal className="lg:col-span-5">
                  <h2 className="text-h2" style={{ color: '#0f0f0e' }}>Defining Personas and Service Blueprint</h2>
                </Reveal>
                <Reveal delay={0.08} className="lg:col-span-6 lg:col-start-7">
                  <p className="text-body-18" style={{ color: '#595958' }}>
                    Research identified two primary personas. Service blueprints connected the dots between technology, data, product, and user experience to better understand how customer friction and pain points correlated to the backend technologies orchestrating the experience.
              </p>
            </Reveal>
            <Reveal delay={0.12} className="lg:col-span-12">
              <div className="grid grid-cols-1 gap-5 md:gap-6">
                <div className="rounded-[10px] overflow-hidden bg-white">
                  <img src={personasImage} alt="Persona boards" className="w-full h-auto block" />
                </div>
                <div className="rounded-[10px] overflow-hidden bg-white">
                  <img src={blueprintImage} alt="Service blueprint map" className="w-full h-auto block" />
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.16} className="lg:col-span-12">
              <MvpStrategy />
            </Reveal>
          </div>
        </section>

        <section className="px-4 sm:px-8 md:px-14 pt-6 pb-16 md:py-[90px]">
          <div className={`${contentWidth} grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12`}>
            <Reveal className="lg:col-span-5">
              <h2 className="text-h2" style={{ color: '#0f0f0e' }}>Redesigning the Information Architecture</h2>
            </Reveal>
            <Reveal delay={0.06} className="lg:col-span-6 lg:col-start-7">
              <p className="text-body-18" style={{ color: '#595958' }}>
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
                <p className="text-body-18 mt-5" style={{ color: '#595958' }}>
                  We launched Cloud Relational Databases and established the foundation for future control planes, consolidating previously fragmented experience into a consistent and scaleable product.
                </p>
              </article>
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-6 lg:col-start-7">
              <div className="grid grid-cols-2 gap-4 md:gap-5">
                {[
                  { n: 92, suffix: '%', l: 'Task completion Rate' },
                  { n: 95, suffix: '', l: 'CSAT' },
                  { n: 95, suffix: '', l: 'UMUX Lite' },
                  { n: 100, suffix: '%', l: 'User preference of new experience' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 md:p-5 flex flex-col gap-3">
                    <StarRating percent={stat.n} />
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
              <h3 className="mb-4 text-body-18" style={{ color: '#0f0f0e', fontWeight: 500 }}>Performance &amp; Health AI Assisted issue remediation</h3>
              <div className="rounded-none overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.16)] bg-white">
                <video
                  className="w-full h-auto block"
                  src="/videos/databases-monitoring-flow.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  aria-label="Screen recording walking through the database monitoring flow"
                />
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <h3 className="mt-[60px] mb-4 text-body-18" style={{ color: '#0f0f0e', fontWeight: 500 }}>Navigation from My Databases to Database Service Page</h3>
              <div className="overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.16)] bg-white">
                <video
                  className="w-full h-auto block"
                  src="/videos/databases-nav-to-service-flow.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  aria-label="Screen recording walking through navigating from the databases hub to a specific service"
                />
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <h3 className="mt-[60px] mb-4 text-body-18" style={{ color: '#0f0f0e', fontWeight: 500 }}>Create Database Service - Set Repave Schedule with AI Assistant</h3>
              <div className="overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.16)] bg-white">
                <video
                  className="w-full h-auto block"
                  src="/videos/databases-repave-schedule.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  aria-label="Screen recording walking through scheduling a database repave"
                />
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <h3 className="mt-[60px] mb-4 text-body-18" style={{ color: '#0f0f0e', fontWeight: 500 }}>Database Service provisioning failure - Submit ticket with AI Assistant</h3>
              <div className="overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.16)] bg-white">
                <video
                  className="w-full h-auto block"
                  src="/videos/databases-provisioning-error.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  aria-label="Screen recording walking through a database provisioning error state"
                />
              </div>
            </Reveal>
          </div>
        </section>

        <section>
          <Reveal>
            <div style={{ borderTop: '1px solid #dadada' }}>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="hidden md:block" aria-hidden="true" />
                <Link
                  to="/work/Buy-Online-Pickup-in-Store"
                  aria-label="Next case study: Creating an Omnichannel Pickup Experience"
                  onMouseEnter={() => { setNextHover(true); hoverOn() }}
                  onMouseLeave={() => { setNextHover(false); hoverOff() }}
                  onFocus={() => setNextHover(true)}
                  onBlur={() => setNextHover(false)}
                  className="md:border-l md:border-[#dadada] px-6 sm:px-10 md:px-14 py-10 md:py-12 cursor-pointer outline-none"
                  style={{ backgroundColor: nextHover ? '#f2f2f2' : 'transparent', transition: 'background-color 0.35s ease', textDecoration: 'none', display: 'block' }}
                >
                  <div className="flex-1 min-w-0 text-right">
                    <div className="flex items-center justify-end gap-[8px]">
                      <span style={{ color: '#999', fontWeight: 300, fontSize: 13, lineHeight: '22px' }}>Next</span>
                      <BackArrow flip />
                    </div>
                    <h3 className="mt-3" style={{ color: '#0f0f0e', fontWeight: 600, fontSize: 18, lineHeight: '26px', letterSpacing: '-0.3px' }}>Creating an Omnichannel Pickup Experience</h3>
                    <p className="mt-2 ml-auto" style={{ color: 'rgb(89, 89, 88)', fontSize: 14, fontWeight: 300, lineHeight: '24px', maxWidth: 520 }}>Bath &amp; Body Works set out to introduce Buy Online, Pick Up In Store (BOPIS), giving customers the convenience of shopping online while fulfilling their purchase through a nearby store.</p>
                  </div>
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      {/* Contact */}
      <ContactSection />

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
