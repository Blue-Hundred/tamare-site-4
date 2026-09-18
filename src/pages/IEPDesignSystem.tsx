import { useRef, useState, useEffect, type ReactNode } from 'react'
import { Link, useOutletContext } from 'react-router'
import { motion, useInView } from 'framer-motion'
import PixelBlast from '../components/PixelBlast'
import ContactSection from '../components/ContactSection'
import CaseStudyImagePlaceholder from '../components/CaseStudyImagePlaceholder'
import SystemArchitectureDiagram from '../components/iep/SystemArchitectureDiagram'
import DesignProcessDiagram from '../components/iep/DesignProcessDiagram'
import ServiceCardShowcase from '../components/iep/ServiceCardShowcase'
import InteractiveTypeScale from '../components/iep/InteractiveTypeScale'
import InteractiveColorRamps from '../components/iep/InteractiveColorRamps'
import FoundationsShowcase from '../components/iep/FoundationsShowcase'
import ButtonMatrix from '../components/iep/ButtonMatrix'
import { IEP } from '../components/iep/tokens'
import svgPaths from '../imports/Databases/svg-4toy70dlwj'

const linkText = { fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 14, color: '#0f0f0e' } as const

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
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

function BackArrow({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={flip ? { transform: 'rotate(180deg)' } : undefined}
    >
      <path d="M12 19L5 12L12 5" stroke="#0f0f0e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M19 12H5" stroke="#0f0f0e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}

function CaseStudyTopBar() {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-40 flex items-center px-5 sm:px-8 md:px-9"
      style={{
        height: 77,
        background: 'rgba(255,255,255,0.6)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(15,15,14,0.06)',
      }}
    >
      <Link to="/#work" className="flex items-center gap-[10px]" style={{ textDecoration: 'none' }}>
        <BackArrow />
        <span style={linkText}>
          <span className="sm:hidden">Work</span>
          <span className="hidden sm:inline">Back to Work</span>
        </span>
      </Link>
      <Link to="/" aria-label="Home" className="absolute left-1/2 -translate-x-1/2 flex items-center">
        <svg width="18" height="24" viewBox="0 0 31.5145 42.0193" fill="none">
          <path d={svgPaths.p1b65ed80} fill="black" />
          <path d={svgPaths.p11c45c00} fill="black" />
          <path d={svgPaths.pd915a80} fill="black" />
          <path d={svgPaths.p2e1b9140} fill="black" />
          <path d={svgPaths.p32ecd500} fill="black" />
        </svg>
      </Link>
      <Link to="/work/databases" className="flex items-center gap-[10px] ml-auto" style={{ textDecoration: 'none' }}>
        <span className="font-light sm:font-medium" style={{ ...linkText, fontWeight: undefined }}>
          Next Project
        </span>
        <BackArrow flip />
      </Link>
    </div>
  )
}

function SectionHeading({ title, body }: { title: string; body?: ReactNode }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      <h2 className="text-h2 lg:col-span-5" style={{ color: '#0f0f0e' }}>
        {title}
      </h2>
      {body ? (
        <div className="text-body-18 lg:col-span-6 lg:col-start-7 flex flex-col gap-5" style={{ color: '#595958' }}>
          {body}
        </div>
      ) : null}
    </div>
  )
}

function PillLabel({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-flex items-center rounded-full bg-white"
      style={{
        padding: '10px 20px',
        border: `1px solid ${IEP.border}`,
        boxShadow: '0 6px 16px rgba(15,15,14,0.06)',
        color: '#0f0f0e',
        fontSize: 18,
        fontWeight: 500,
      }}
    >
      {children}
    </span>
  )
}

const contentWidth = 'max-w-[1156px] mx-auto'

type OutletCtx = { loaded: boolean; hoverOn: () => void; hoverOff: () => void }

export default function IEPDesignSystem() {
  const { hoverOn, hoverOff } = useOutletContext<OutletCtx>()
  const pixelSize = usePixelSize(3)
  const [nextHover, setNextHover] = useState(false)

  const challengeAreas = [
    {
      n: '01',
      t: 'Fragmented experiences',
      b: 'Common tasks were represented through different navigation, terminology, forms, tables, status treatments, and interaction patterns.',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="3" width="7" height="7" rx="1.5" stroke={IEP.accent} strokeWidth="1.6" />
          <rect x="14" y="4.5" width="6.5" height="6.5" rx="1.5" stroke={IEP.accent} strokeWidth="1.6" strokeDasharray="2.5 2.5" />
          <rect x="4.5" y="14" width="6.5" height="6.5" rx="1.5" stroke={IEP.accent} strokeWidth="1.6" strokeDasharray="2.5 2.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" stroke={IEP.accent} strokeWidth="1.6" />
        </svg>
      ),
    },
    {
      n: '02',
      t: 'Different technologies',
      b: 'Relational, non-relational, and graph databases shared foundational workflows but required different configuration parameters, operational commands, and monitoring information.',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <ellipse cx="12" cy="5.5" rx="7" ry="2.6" stroke={IEP.accent} strokeWidth="1.6" />
          <path d="M5 5.5v6c0 1.44 3.13 2.6 7 2.6s7-1.16 7-2.6v-6" stroke={IEP.accent} strokeWidth="1.6" />
          <path d="M5 11.5v6c0 1.44 3.13 2.6 7 2.6s7-1.16 7-2.6v-6" stroke={IEP.accent} strokeWidth="1.6" />
        </svg>
      ),
    },
    {
      n: '03',
      t: 'Scaling beyond one product',
      b: 'The system needed to support four centralized hubs without creating one-off components for every database technology.',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 3l8 4.5-8 4.5-8-4.5L12 3z" stroke={IEP.accent} strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M4 12l8 4.5 8-4.5" stroke={IEP.accent} strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M4 16.5L12 21l8-4.5" stroke={IEP.accent} strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      ),
    },
  ]

  const accessibilityItems = [
    {
      t: 'Color contrast',
      b: 'Text, icons, and interactive states meet WCAG AA contrast targets across both light and dark modes.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="8.5" stroke={IEP.accent} strokeWidth="1.6" />
          <path d="M12 3.5a8.5 8.5 0 0 0 0 17V3.5z" fill={IEP.accent} />
        </svg>
      ),
    },
    {
      t: 'Keyboard accessible and focus visible',
      b: 'Every interactive component is reachable by keyboard with a clear, consistent focus indicator.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="2.5" y="6" width="19" height="12" rx="2" stroke={IEP.accent} strokeWidth="1.6" />
          <path d="M6 9.5h.01M9 9.5h.01M12 9.5h.01M15 9.5h.01M18 9.5h.01M6 12.5h.01M9 12.5h.01M15 12.5h.01M18 12.5h.01" stroke={IEP.accent} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M8.5 15.3h7" stroke={IEP.accent} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      t: 'Readability',
      b: 'Type scale, line length, and spacing are tuned for dense operational screens without sacrificing clarity.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 5.5h14M5 5.5v2M12 5.5v13M12 18.5H9.5M12 18.5h2.5M19 5.5v2" stroke={IEP.accent} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ]

  const foundationItems = ['Typography', 'Color', 'Spacing', 'Grid', 'Iconography', 'Radius', 'Elevation', 'Interaction states']

  return (
    <div style={{ background: '#f9f9f9' }}>
      <CaseStudyTopBar />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-white px-4 sm:px-8 md:px-14 pt-28 md:pt-[178px] pb-28 md:pb-[178px] md:min-h-[723px] flex flex-col justify-center">
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <PixelBlast
              color="#EDEDED"
              pixelSize={pixelSize}
              patternDensity={0.6}
              patternScale={1.5}
              edgeFade={0.18}
              speed={2}
              enableRipples={true}
              transparent
            />
          </div>
          <div className={`relative z-10 ${contentWidth} grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start`}>
            <Reveal className="lg:col-span-6 lg:col-start-1">
              <div>
                <h1 className="text-display-large" style={{ color: '#0f0f0e' }}>
                  <span
                    style={{
                      boxDecorationBreak: 'clone',
                      WebkitBoxDecorationBreak: 'clone',
                      padding: '0 0.3em',
                      marginLeft: '-0.3em',
                    }}
                  >
                    IEP Design System
                  </span>
                </h1>
                <p className="text-body-18 mt-4 md:mt-6" style={{ color: '#595958' }}>
                  <span
                    style={{
                      boxDecorationBreak: 'clone',
                      WebkitBoxDecorationBreak: 'clone',
                      padding: '0.1em 0.3em',
                      marginLeft: '-0.3em',
                    }}
                  >
                    Creating a scalable experience foundation for enterprise database infrastructure.
                  </span>
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-5 lg:col-start-8">
              <aside>
                {[
                  { label: 'CLIENT', value: 'JPMorgan Chase & Co.' },
                  { label: 'ROLE', value: 'Lead Experience Designer\nDesign System Lead' },
                  { label: 'YEAR', value: '2025' },
                  {
                    label: 'TASKS',
                    value: 'Design Systems, Product Design, Platform Design, Systems Thinking, Interaction Design, Component Architecture',
                  },
                ].map(({ label, value }, i, arr) => (
                  <div
                    key={label}
                    className={`flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-0 py-3 ${i < arr.length - 1 ? 'border-b border-[rgba(15,15,14,0.15)]' : ''}`}
                  >
                    <div
                      className="text-xs font-light tracking-widest sm:w-[140px] shrink-0"
                      style={{ color: '#0f0f0e', letterSpacing: '0.15em', lineHeight: 1.5 }}
                    >
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

        {/* The Challenge */}
        <section className="px-4 sm:px-8 md:px-14 pt-16 pb-4 md:py-[90px]">
          <div className={contentWidth}>
  <Reveal>
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
  <h2 className="text-h2 lg:col-span-5 lg:sticky lg:top-[93px] lg:self-start lg:z-10" style={{ color: '#0f0f0e' }}>
  From 10+ control planes to 4 centralized hubs
  </h2>
  <div className="lg:col-span-6 lg:col-start-7 flex flex-col">
  <div className="text-body-18 flex flex-col gap-5" style={{ color: '#595958' }}>
  <p>
  More than ten database control planes had evolved independently over time. Although they supported many of the same
  fundamental tasks, each product used different navigation models, terminology, forms, tables, status treatments,
  configuration patterns, and operational workflows.
  </p>
  <p>Simply combining the existing applications would have carried those inconsistencies into the new platform.</p>
  <p>
  The challenge became determining what should be shared, what needed to remain technology-specific, and how both could
  coexist within one scalable experience system.
  </p>
  </div>
  <div className="mt-12 md:mt-[70px] flex flex-col gap-3">
    {challengeAreas.map(area => (
      <article
        key={area.n}
        className="flex items-start gap-4 rounded-xl bg-white p-5"
        style={{ border: `1px solid ${IEP.border}` }}
      >
        <div
          className="flex shrink-0 items-center justify-center rounded-[10px]"
          style={{ width: 44, height: 44, background: '#fff', border: `1px solid ${IEP.border}` }}
          aria-label={`${area.t} icon`}
        >
          {area.icon}
        </div>
        <div>
          <h3 className="text-h4" style={{ color: '#0f0f0e' }}>
            {area.t}
          </h3>
          <p className="text-body-14 mt-1.5" style={{ color: '#595958' }}>
            {area.b}
          </p>
        </div>
      </article>
    ))}
  </div>
  </div>
  </div>
  </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-10 md:mt-[70px]">
                <figure className="flex flex-col">
                  <img
                    src="/images/legacy-databases-experiences.png"
                    alt="Before: independently evolved database control planes — legacy interfaces including Gaia MS SQL, CockroachDB, Gaia Oracle, Gaia MySQL, TigerGraph, and Cassandra, each with different navigation, colors, and layouts."
                    className="w-full rounded-[20px] object-cover"
                    style={{ aspectRatio: '21 / 9' }}
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption className="mt-4 text-body-14 text-[#6b6b6b]">
                    Legacy interfaces — Gaia MS SQL, CockroachDB, Gaia Oracle, Gaia MySQL, TigerGraph, Cassandra, and others.
                  </figcaption>
                </figure>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Finding the common layer — dark */}
        <section className="px-4 sm:px-8 md:px-14 py-16 md:py-[90px]" style={{ background: '#3c4a5c' }}>
          <div className={contentWidth}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <Reveal className="lg:col-span-4">
                <div>
                  <h2 className="text-h2" style={{ color: '#ffffff' }}>
                    Finding the common layer
                  </h2>
                  <div className="text-body-18 mt-5 flex flex-col gap-4" style={{ color: 'rgba(255,255,255,0.82)' }}>
                    <p>The work began by treating the existing control planes as a dataset.</p>
                    <p>
                      I audited recurring structures and interactions across database products — including navigation,
                      forms, tables, service cards, status indicators, configuration controls, operational actions,
                      notifications, and documentation patterns.
                    </p>
                    <p>This allowed the experience to be separated into four layers.</p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.08} className="lg:col-span-8">
                <SystemArchitectureDiagram />
              </Reveal>
            </div>
          </div>
        </section>

        {/* The Design Process */}
        <section className="px-4 sm:px-8 md:px-14 pt-16 pb-4 md:py-[90px]">
          <div className={contentWidth}>
            <Reveal>
              <h2 className="text-h2 text-center" style={{ color: '#0f0f0e' }}>
                The design process
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="mt-10 md:mt-[60px]">
                <DesignProcessDiagram />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Design System Goals */}
        <section className="px-4 sm:px-8 md:px-14 pt-6 pb-4 md:py-[90px]">
          <div className={contentWidth}>
            <Reveal>
              <div className="max-w-[720px]">
                <h2 className="text-h2" style={{ color: '#0f0f0e' }}>
                  Design system goals
                </h2>
                <p className="text-body-18 mt-4" style={{ color: '#595958' }}>
                  Three principles guided every decision — the system had to be accessible, scalable across viewports,
                  and universal enough to serve every database control plane product.
                </p>
              </div>
            </Reveal>

            {/* Accessibility */}
            <Reveal delay={0.05}>
              <div className="mt-12 md:mt-[70px] grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
                <div className="lg:col-span-4">
                  <PillLabel>Accessibility</PillLabel>
                </div>
                <div className="lg:col-span-8 flex flex-col gap-6">
                  <div>
                    <h3 className="text-h4" style={{ color: '#0f0f0e' }}>
                      Ensuring accessibility throughout the system
                    </h3>
                    <p className="text-body-18 mt-2" style={{ color: '#595958' }}>
                      Accessibility is crucial throughout the development of a design system. It was built into the
                      foundations rather than added at the end.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    {accessibilityItems.map(item => (
                      <article
                        key={item.t}
                        className="flex items-start gap-4 rounded-xl bg-white p-5"
                        style={{ border: `1px solid ${IEP.border}` }}
                      >
                        <div
                          className="flex shrink-0 items-center justify-center rounded-[10px]"
                          style={{ width: 40, height: 40, background: IEP.accentTint }}
                        >
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="text-[16px] font-medium" style={{ color: '#0f0f0e' }}>
                            {item.t}
                          </h4>
                          <p className="text-body-14 mt-1.5" style={{ color: '#595958' }}>
                            {item.b}
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Scalable */}
            <Reveal delay={0.05}>
              <div className="mt-12 md:mt-[70px] grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
                <div className="lg:col-span-4">
                  <PillLabel>Scalable</PillLabel>
                </div>
                <div className="lg:col-span-8">
                  <h3 className="text-h4" style={{ color: '#0f0f0e' }}>
                    All components seamlessly scale across viewports
                  </h3>
                  <p className="text-body-18 mt-2" style={{ color: '#595958' }}>
                    The same components adapt from wide operational consoles down to compact layouts without breaking
                    hierarchy, density, or interaction behavior.
                  </p>
  <figure className="mt-6">
  <img
  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Design%20System%20View%20ports%20image-HrJ3BSYSW0iLSaHOKBvj7xYd6R5VZJ.png"
  alt="Responsive database dashboard across desktop and mobile viewports"
  className="w-full rounded-[20px]"
  loading="lazy"
  />
  </figure>
                </div>
              </div>
            </Reveal>

            {/* Universal */}
            <Reveal delay={0.05}>
              <div className="mt-12 md:mt-[70px] grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
                <div className="lg:col-span-4">
                  <PillLabel>Universal</PillLabel>
                </div>
                <div className="lg:col-span-8">
                  <h3 className="text-h4" style={{ color: '#0f0f0e' }}>
                    Components and patterns work across every database product
                  </h3>
                  <p className="text-body-18 mt-2" style={{ color: '#595958' }}>
                    A single service-card component represents different database technologies while preserving the same
                    hierarchy and interaction behavior.
                  </p>
                  <div className="mt-6">
                    <ServiceCardShowcase />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Establishing a shared language — Foundations */}
        <section className="px-4 sm:px-8 md:px-14 pt-6 pb-4 md:py-[90px]">
          <div className={contentWidth}>
  <Reveal>
  <div className="flex flex-col gap-4">
  <h2 className="text-h2 max-w-4xl" style={{ color: '#0f0f0e' }}>
  Establishing a shared language
  </h2>
  <div className="flex max-w-[720px] flex-col gap-5 text-body-18" style={{ color: '#595958' }}>
  <p>The foundations established the visual and behavioral rules shared across all four database hubs.</p>
  <p>
  Their purpose extended beyond visual consistency. Foundations removed repeated design decisions and
  created predictable interaction behavior across the platform.
  </p>
  </div>
  </div>
  </Reveal>
  <Reveal delay={0.06}>
  <div className="mt-6 flex flex-nowrap gap-2.5 overflow-x-auto md:mt-8">
  {foundationItems.map(item => (
  <span
  key={item}
  className="shrink-0 whitespace-nowrap"
  style={{
  fontSize: 13,
  lineHeight: '20px',
  fontWeight: 400,
  color: IEP.ink,
  padding: '8px 14px',
  borderRadius: 100,
  border: `1px solid ${IEP.border}`,
  background: '#fff',
  }}
  >
  {item}
  </span>
  ))}
  </div>
  </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-10 md:mt-[50px]">
                <InteractiveTypeScale />
                <img
                  src="/images/iep-typography-reference.png"
                  alt="Figtree typography reference showing weights, alphabet specimens, type scale, and design variables."
                  width={1824}
                  height={1360}
                  loading="lazy"
                  decoding="async"
                  className="mt-6 w-full rounded-[20px] object-cover"
                />
                <div className="mt-6">
                  <InteractiveColorRamps />
                </div>
                <img
                  src="/images/iep-semantic-colors-reference.png"
                  alt="Semantic Colors reference showing light and dark mode mappings for background, text, border, icon, and status tokens."
                  width={1824}
                  height={1365}
                  loading="lazy"
                  decoding="async"
                  className="mt-6 w-full rounded-[20px] object-cover"
                />
                <FoundationsShowcase />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Buttons */}
        <section className="px-4 sm:px-8 md:px-14 pt-6 pb-4 md:py-[90px]">
          <div className={contentWidth}>
            <Reveal>
              <div className="max-w-[720px]">
                <h2 className="text-h2" style={{ color: '#0f0f0e' }}>
                  Buttons
                </h2>
                <p className="text-body-18 mt-4" style={{ color: '#595958' }}>
                  A complete set of button sizes and variants, defined once and reused across every database hub in both
                  light and dark surfaces.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="mt-10 md:mt-[50px]">
                <ButtonMatrix />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Design Examples */}
        <section className="px-4 sm:px-8 md:px-14 py-16 md:py-[90px]">
          <div className={contentWidth}>
            <Reveal>
              <div className="max-w-[720px]">
                <h2 className="text-h2" style={{ color: '#0f0f0e' }}>
                  Design examples
                </h2>
                <p className="text-body-18 mt-4" style={{ color: '#595958' }}>
                  Foundations, components, and patterns composed into real database control plane experiences.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="mt-10 md:mt-[50px] flex flex-col gap-5 md:gap-6">
                <CaseStudyImagePlaceholder label="Databases Overview — dashboard" aspect="16 / 9" />
                <CaseStudyImagePlaceholder label="Service details — Booking Platform" aspect="16 / 9" />
                <CaseStudyImagePlaceholder label="Create Database Service — guided flow with AI assistant" aspect="16 / 9" />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Next Project */}
        <section>
          <Reveal>
            <div style={{ borderTop: '1px solid #dadada' }}>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="hidden md:block" aria-hidden="true" />
                <Link
                  to="/work/databases"
                  aria-label="Next case study: Creating a Unified Database Management Platform"
                  onMouseEnter={() => {
                    setNextHover(true)
                    hoverOn()
                  }}
                  onMouseLeave={() => {
                    setNextHover(false)
                    hoverOff()
                  }}
                  onFocus={() => setNextHover(true)}
                  onBlur={() => setNextHover(false)}
                  className="md:border-l md:border-[#dadada] px-6 sm:px-10 md:px-14 py-10 md:py-12 cursor-pointer outline-none"
                  style={{
                    backgroundColor: nextHover ? '#f2f2f2' : 'transparent',
                    transition: 'background-color 0.35s ease',
                    textDecoration: 'none',
                    display: 'block',
                  }}
                >
                  <div className="flex-1 min-w-0 text-left md:text-right">
                    <div className="flex items-center justify-start md:justify-end gap-[8px]">
                      <span style={linkText}>Next Project</span>
                      <BackArrow flip />
                    </div>
                    <h3
                      className="mt-3"
                      style={{ color: '#0f0f0e', fontWeight: 600, fontSize: 18, lineHeight: '26px', letterSpacing: '-0.3px' }}
                    >
                      Creating a Unified Database Management Platform
                    </h3>
                    <p
                      className="mt-2 ml-0 md:ml-auto"
                      style={{ color: 'rgb(89, 89, 88)', fontSize: 14, fontWeight: 300, lineHeight: '24px', maxWidth: 520 }}
                    >
                      A scalable enterprise platform that standardized database onboarding, provisioning, and service
                      management across multiple database products.
                    </p>
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
          <span className="text-xs font-light" style={{ color: '#767675' }}>
            © 2026 Tamaré Reese
          </span>
          <span className="text-xs font-light" style={{ color: '#767675' }}>
            All rights reserved
          </span>
        </div>
      </footer>
    </div>
  )
}
