import { useRef, useState, useEffect, Fragment, type ReactNode } from 'react'
import { Link, useOutletContext } from 'react-router'
import { motion, useInView } from 'framer-motion'
import PixelBlast from '../components/PixelBlast'
import ContactSection from '../components/ContactSection'
import CaseStudyImagePlaceholder from '../components/CaseStudyImagePlaceholder'
import EcosystemDiagram from '../components/iep/EcosystemDiagram'
import SystemArchitectureDiagram from '../components/iep/SystemArchitectureDiagram'
import AtomsToExperiencesDiagram from '../components/iep/AtomsToExperiencesDiagram'
import VariabilityDiagram from '../components/iep/VariabilityDiagram'
import ServiceCardShowcase from '../components/iep/ServiceCardShowcase'
import InteractiveTypeScale from '../components/iep/InteractiveTypeScale'
import InteractiveColorRamps from '../components/iep/InteractiveColorRamps'
import FoundationsShowcase from '../components/iep/FoundationsShowcase'
import GovernanceDiagram from '../components/iep/GovernanceDiagram'
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

function SectionEyebrow(_props: { n: string; label: string }) {
  return null
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

function StepChain({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((step, i) => (
        <Fragment key={step}>
          <span
            style={{
              fontSize: 13,
              fontWeight: 400,
              color: IEP.ink,
              padding: '5px 12px',
              borderRadius: 100,
              border: `1px solid ${IEP.border}`,
              background: '#fff',
            }}
          >
            {step}
          </span>
          {i < steps.length - 1 && (
            <span aria-hidden="true" style={{ color: IEP.muted, fontSize: 13 }}>
              →
            </span>
          )}
        </Fragment>
      ))}
    </div>
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

  const foundationItems = ['Typography', 'Color', 'Spacing', 'Grid', 'Iconography', 'Radius', 'Elevation', 'Interaction states']

  const componentGroups = [
    { title: 'Inputs & Controls', items: ['Text fields', 'Selects', 'Autocomplete', 'Checkboxes', 'Radio controls', 'Toggles', 'Segmented controls', 'Technical parameter inputs'] },
    { title: 'Navigation', items: ['Global navigation', 'Side navigation', 'Tabs', 'Breadcrumbs', 'Page headers', 'Contextual navigation'] },
    { title: 'Data Display', items: ['Tables', 'Service cards', 'Key/value pairs', 'Metadata', 'Tags', 'Status indicators', 'Metrics'] },
    { title: 'Feedback', items: ['Alerts', 'Banners', 'Validation', 'Notifications', 'Loading states', 'Empty states', 'Progress indicators'] },
    { title: 'Actions', items: ['Buttons', 'Button groups', 'Overflow menus', 'Contextual actions', 'Confirmation dialogs', 'Destructive actions'] },
    { title: 'Containers', items: ['Cards', 'Panels', 'Accordions', 'Drawers', 'Modals', 'Sections'] },
  ]

  const patterns = [
    { title: 'Create Service', steps: ['Configuration', 'Validation', 'Review', 'Provisioning', 'Confirmation'] },
    { title: 'Service Management', steps: ['Identity', 'Health', 'Configuration', 'Resources', 'Operational Actions'] },
    { title: 'Operational Actions', steps: ['Action', 'Context', 'Confirmation', 'Processing', 'Completion'] },
    { title: 'System Feedback', steps: ['Status', 'Severity', 'Explanation', 'Recommended Action'] },
  ]

  const formStages = [
    { label: 'Legacy forms', placeholder: 'Legacy provisioning experiences' },
    { label: 'Shared form system', placeholder: 'IEP form components and states' },
    { label: 'Database-specific configuration', placeholder: 'Final Create Database Service experience' },
  ]

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
                <h1 className="text-h1" style={{ color: '#0f0f0e' }}>
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

        {/* 01 — Overview */}
        <section className="px-4 sm:px-8 md:px-14 pt-16 pb-4 md:py-[88px]">
          <div className={contentWidth}>
            <Reveal>
              <SectionEyebrow n="01" label="Overview" />
            </Reveal>
            <Reveal>
              <SectionHeading
                title="Designing the system behind the platform"
                body={
                  <>
                    <p>
                      Enterprise engineers relied on more than ten independently developed database control planes to
                      provision, configure, monitor, and manage database services.
                    </p>
                    <p>
                      As the organization moved toward four centralized database hubs, the challenge extended beyond
                      redesigning individual screens. We needed a shared experience foundation that could standardize
                      common workflows while supporting meaningful differences between relational, non-relational, graph,
                      and other database technologies.
                    </p>
                    <p>
                      I developed the IEP Design System as the reusable foundation for that transformation — establishing
                      shared primitives, components, patterns, and interaction standards that allowed distinct database
                      experiences to be built from the same underlying system.
                    </p>
                  </>
                }
              />
            </Reveal>
            <Reveal delay={0.08}>
              <div className="mt-10 md:mt-[70px]">
                <figure className="flex flex-col gap-3">
                  <img
                    src="/images/iep-design-system-cover.png"
                    alt="IEP Design System cover — color tokens 600 #0060F0, 200 #E2E8F0, and 950 #020617 on a blue gradient."
                    className="w-full rounded-[20px] object-cover"
                    style={{ aspectRatio: '16 / 9' }}
                  />
                  <figcaption style={{ color: '#767675', fontSize: 14, lineHeight: '24px' }}>
                    Dashboard, Create Database Service flow, service details, and operational workflows.
                  </figcaption>
                </figure>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 02 — The Challenge */}
        <section className="px-4 sm:px-8 md:px-14 pt-16 pb-4 md:py-[90px]">
          <div className={contentWidth}>
            <Reveal>
              <SectionEyebrow n="02" label="The Challenge" />
            </Reveal>
            <Reveal>
              <SectionHeading
                title="From 10+ control planes to 4 centralized hubs"
                body={
                  <>
                    <p>
                      More than ten database control planes had evolved independently over time. Although they supported
                      many of the same fundamental tasks, each product used different navigation models, terminology,
                      forms, tables, status treatments, configuration patterns, and operational workflows.
                    </p>
                    <p>Simply combining the existing applications would have carried those inconsistencies into the new platform.</p>
                    <p>
                      The challenge became determining what should be shared, what needed to remain technology-specific,
                      and how both could coexist within one scalable experience system.
                    </p>
                  </>
                }
              />
            </Reveal>
            <Reveal delay={0.06}>
              <div className="mt-12 md:mt-[80px] grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                {challengeAreas.map(area => (
                  <article key={area.n} className="bg-white rounded-xl p-5 md:p-6 flex flex-col">
                    <div
                      className="flex items-center justify-center rounded-[10px] mb-5"
                      style={{ width: 44, height: 44, background: 'rgba(15,15,14,0.04)' }}
                    >
                      {area.icon}
                    </div>
                    <h3 className="text-h4" style={{ color: '#0f0f0e' }}>
                      {area.t}
                    </h3>
                    <p className="text-body-18 mt-2" style={{ color: '#595958' }}>
                      {area.b}
                    </p>
                  </article>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-10 md:mt-[70px]">
          <figure className="flex flex-col">
            <img
              src="/images/legacy-databases-experiences.png"
              alt="Before: independently evolved database control planes — legacy interfaces including Gaia MS SQL, CockroachDB, Gaia Oracle, Gaia MySQL, TigerGraph, and Cassandra, each with different navigation, colors, and layouts."
              className="w-full rounded-[20px] object-cover"
              style={{ aspectRatio: "21 / 9" }}
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

        {/* Interactive diagram — Consolidating the ecosystem */}
        <section className="px-4 sm:px-8 md:px-14 pt-6 pb-16 md:py-[70px]">
          <div className={contentWidth}>
            <Reveal>
              <h2 className="text-h3 mb-8 md:mb-10" style={{ color: '#0f0f0e' }}>
                Consolidating the ecosystem
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <EcosystemDiagram />
            </Reveal>
          </div>
        </section>

        {/* 03 — Defining the System */}
        <section className="px-4 sm:px-8 md:px-14 pt-6 pb-4 md:py-[90px]">
          <div className={contentWidth}>
            <Reveal>
              <SectionEyebrow n="03" label="Defining the System" />
            </Reveal>
            <Reveal>
              <SectionHeading
                title="Finding the common layer"
                body={
                  <>
                    <p>The work began by treating the existing control planes as a dataset.</p>
                    <p>
                      I audited recurring structures and interactions across database products — including navigation,
                      forms, tables, service cards, status indicators, configuration controls, operational actions,
                      notifications, and documentation patterns.
                    </p>
                    <p>This allowed the experience to be separated into four layers.</p>
                  </>
                }
              />
            </Reveal>
          </div>
        </section>

        {/* Interactive diagram — System architecture */}
        <section className="px-4 sm:px-8 md:px-14 pt-6 pb-16 md:py-[70px]">
          <div className={contentWidth}>
            <Reveal>
              <SystemArchitectureDiagram title="System architecture" />
            </Reveal>
          </div>
        </section>

        {/* 04 — Foundations */}
        <section className="px-4 sm:px-8 md:px-14 pt-6 pb-4 md:py-[90px]">
          <div className={contentWidth}>
            <Reveal>
              <SectionEyebrow n="04" label="Foundations" />
            </Reveal>
            <Reveal>
              <SectionHeading
                title="Establishing a shared language"
                body={
                  <>
                    <p>The foundations established the visual and behavioral rules shared across all four database hubs.</p>
                    <p>
                      Their purpose extended beyond visual consistency. Foundations removed repeated design decisions and
                      created predictable interaction behavior across the platform.
                    </p>
                  </>
                }
              />
            </Reveal>
            <Reveal delay={0.06}>
              <div className="mt-10 md:mt-[60px] flex flex-wrap gap-2.5">
                {foundationItems.map(item => (
                  <span
                    key={item}
                    style={{
                      fontSize: 13,
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

        {/* 05 — Component Architecture */}
        <section className="px-4 sm:px-8 md:px-14 pt-6 pb-4 md:py-[90px]">
          <div className={contentWidth}>
            <Reveal>
              <SectionEyebrow n="05" label="Component Architecture" />
            </Reveal>
            <Reveal>
              <SectionHeading
                title="Building reusable components around behavior"
                body={
                  <>
                    <p>The component library translated those foundations into reusable interface building blocks.</p>
                    <p>Components were structured around shared behaviors rather than individual database products.</p>
                    <p>
                      Instead of creating technology-specific versions of basic controls, the system defined flexible
                      components that could accept different labels, helper text, validation, data, states, and
                      configuration requirements.
                    </p>
                  </>
                }
              />
            </Reveal>
            <Reveal delay={0.06}>
              <div className="mt-12 md:mt-[70px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {componentGroups.map(group => (
                  <div
                    key={group.title}
                    className="rounded-xl p-6 flex flex-col gap-4"
                    style={{ border: `1px solid ${IEP.border}`, background: '#fff' }}
                  >
                    <h3 style={{ fontSize: 12, fontWeight: 600, color: IEP.accent, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      {group.title}
                    </h3>
                    <ul className="flex flex-col gap-2">
                      {group.items.map(item => (
                        <li key={item} style={{ fontSize: 14, fontWeight: 300, color: '#595958', lineHeight: '20px' }}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-10 md:mt-[50px]">
                <CaseStudyImagePlaceholder
                  label="IEP Component Library"
                  caption="Representative components, variants, states, and component properties."
                  aspect="16 / 9"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Interactive diagram — From atoms to experiences */}
        <section className="px-4 sm:px-8 md:px-14 pt-6 pb-16 md:py-[70px]">
          <div className={contentWidth}>
            <Reveal>
              <h2 className="text-h3 mb-8 md:mb-10" style={{ color: '#0f0f0e' }}>
                Building experiences from the same primitives
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <AtomsToExperiencesDiagram />
            </Reveal>
          </div>
        </section>

        {/* 06 — Enterprise Forms */}
        <section className="px-4 sm:px-8 md:px-14 pt-6 pb-4 md:py-[90px]">
          <div className={contentWidth}>
            <Reveal>
              <SectionEyebrow n="06" label="Enterprise Forms" />
            </Reveal>
            <Reveal>
              <SectionHeading
                title="Standardizing complex configuration"
                body={
                  <>
                    <p>
                      Provisioning became one of the most important system patterns because creating a database service
                      could require numerous technical parameters.
                    </p>
                    <p>Across legacy control planes, those parameters were presented differently even when the underlying interaction was similar.</p>
                    <p>
                      The system standardized the experience surrounding configuration — including labels, descriptions,
                      defaults, required fields, validation, dependencies, advanced settings, progressive disclosure, and
                      review states — while allowing each database technology to define the parameters themselves.
                    </p>
                  </>
                }
              />
            </Reveal>
            <Reveal delay={0.06}>
              <div className="mt-12 md:mt-[70px] grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                {formStages.map((stage, i) => (
                  <div key={stage.label} className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <span style={{ fontSize: 12, fontWeight: 600, color: IEP.accent }}>{`0${i + 1}`}</span>
                      <span style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: IEP.muted, fontWeight: 500 }}>
                        {stage.label}
                      </span>
                    </div>
                    <CaseStudyImagePlaceholder label={stage.placeholder} aspect="4 / 3" />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* 07 — Reusable Patterns */}
        <section className="px-4 sm:px-8 md:px-14 pt-6 pb-4 md:py-[90px]">
          <div className={contentWidth}>
            <Reveal>
              <SectionEyebrow n="07" label="Reusable Patterns" />
            </Reveal>
            <Reveal>
              <SectionHeading
                title="From components to workflows"
                body={
                  <>
                    <p>Individual components solved interaction problems. Patterns solved workflow problems.</p>
                    <p>
                      Frequently repeated combinations of components became documented patterns that could be reused
                      across the four database hubs.
                    </p>
                  </>
                }
              />
            </Reveal>
            <Reveal delay={0.06}>
              <div className="mt-12 md:mt-[70px] grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                {patterns.map(pattern => (
                  <div
                    key={pattern.title}
                    className="rounded-xl p-6 flex flex-col gap-4"
                    style={{ border: `1px solid ${IEP.border}`, background: '#fff' }}
                  >
                    <h3 className="text-h4" style={{ color: '#0f0f0e' }}>
                      {pattern.title}
                    </h3>
                    <StepChain steps={pattern.steps} />
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-10 md:mt-[50px]">
                <CaseStudyImagePlaceholder label="Representative pattern UI examples" aspect="16 / 9" />
              </div>
            </Reveal>
          </div>
        </section>

        {/* 08 — Designing Variability */}
        <section className="px-4 sm:px-8 md:px-14 pt-6 pb-4 md:py-[90px]">
          <div className={contentWidth}>
            <Reveal>
              <SectionEyebrow n="08" label="Designing Variability" />
            </Reveal>
            <Reveal>
              <SectionHeading
                title="Consistency without forcing sameness"
                body={
                  <>
                    <p>One of the hardest system decisions was determining where consistency should stop.</p>
                    <p>
                      Database technologies could share an interaction model while requiring different configuration
                      options. Standardizing every parameter would have created abstractions that did not accurately
                      reflect the underlying technology.
                    </p>
                    <p>
                      Instead, the system standardized the experience surrounding the data while allowing
                      technology-specific information and controls to change.
                    </p>
                  </>
                }
              />
            </Reveal>
            <Reveal delay={0.06}>
              <div className="mt-12 md:mt-[70px]">
                <VariabilityDiagram />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <blockquote
                className="mt-12 md:mt-[80px] font-light text-balance"
                style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', letterSpacing: '-0.02em', lineHeight: 1.35, color: '#0f0f0e', maxWidth: 900 }}
              >
                &ldquo;A scalable system isn&apos;t one where everything is the same. It&apos;s one where the rules for
                variation are intentional.&rdquo;
              </blockquote>
            </Reveal>
          </div>
        </section>

        {/* 09 — One system, multiple database experiences */}
        <section className="px-4 sm:px-8 md:px-14 pt-6 pb-4 md:py-[90px]">
          <div className={contentWidth}>
            <Reveal>
              <SectionEyebrow n="09" label="One System, Multiple Experiences" />
            </Reveal>
            <Reveal>
              <SectionHeading
                title="One foundation. Multiple technologies."
                body={
                  <>
                    <p>
                      Once the system was established, the same primitives could be composed into experiences appropriate
                      for each database hub.
                    </p>
                    <p>
                      A service card could represent different database technologies while preserving the same hierarchy
                      and interaction behavior. Status could communicate health consistently regardless of the
                      infrastructure underneath it. Provisioning could maintain the same structural model while exposing
                      entirely different database parameters.
                    </p>
                  </>
                }
              />
            </Reveal>
            <Reveal delay={0.06}>
              <div className="mt-12 md:mt-[70px]">
                <ServiceCardShowcase />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-10 md:mt-[50px]">
                <CaseStudyImagePlaceholder label="Final product screenshots across database technologies" aspect="16 / 9" />
              </div>
            </Reveal>
          </div>
        </section>

        {/* 10 — Governance */}
        <section className="px-4 sm:px-8 md:px-14 pt-6 pb-4 md:py-[90px]">
          <div className={contentWidth}>
            <Reveal>
              <SectionEyebrow n="10" label="Governance" />
            </Reveal>
            <Reveal>
              <SectionHeading
                title="Creating a system that could evolve"
                body={
                  <>
                    <p>A design system only creates value when teams can use and evolve it.</p>
                    <p>
                      New requirements were evaluated against the existing system before introducing additional
                      components. This created a framework for balancing consistency with continued product evolution.
                    </p>
                  </>
                }
              />
            </Reveal>
            <Reveal delay={0.06}>
              <div className="mt-12 md:mt-[70px]">
                <GovernanceDiagram />
              </div>
            </Reveal>
          </div>
        </section>

        {/* 11 — Outcome */}
        <section className="px-4 sm:px-8 md:px-14 py-16 md:py-[90px]">
          <div className={contentWidth}>
            <Reveal>
              <SectionEyebrow n="11" label="Outcome" />
            </Reveal>
            <Reveal>
              <SectionHeading
                title="Building for scale"
                body={
                  <>
                    <p>
                      The IEP Design System changed the design problem from creating individual database interfaces to
                      creating a platform capable of supporting an ecosystem.
                    </p>
                    <p>
                      The system provided a shared foundation for four centralized hubs while preserving the flexibility
                      required by individual technologies.
                    </p>
                    <p>
                      Reusable components reduced unnecessary variation, patterns standardized common workflows, and
                      explicit rules for variability prevented consistency from becoming constraint.
                    </p>
                    <p>
                      Most importantly, the system established an experience foundation that could continue evolving as
                      additional database capabilities were brought into IEP.
                    </p>
                  </>
                }
              />
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-10 md:mt-[70px]">
                <CaseStudyImagePlaceholder
                  label="One experience foundation. Multiple database technologies."
                  caption="Database dashboard, Create Database Service workflow, service details, and operational experience."
                  minHeight={474}
                />
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
