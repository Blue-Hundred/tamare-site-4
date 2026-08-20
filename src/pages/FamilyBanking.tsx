import { useRef, useState, useEffect, type ReactNode } from 'react'
import { Link, useOutletContext } from 'react-router'
import { motion, useInView } from 'framer-motion'
import PixelBlast from '../components/PixelBlast'
import ContactSection from '../components/ContactSection'
import CaseStudyCard from '../components/CaseStudyCard'
import CaseStudyParagraph from '../components/CaseStudyParagraph'
import CountUp from '../components/CountUp'
import svgPaths from '../imports/Databases/svg-4toy70dlwj'

const contentWidth = 'max-w-[1156px] mx-auto'

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
        <span className="hidden sm:inline" style={linkText}>Back to Portfolio</span>
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
        <span style={linkText}>Next Project</span>
        <BackArrow flip />
      </Link>
    </div>
  )
}

const meta = [
  { label: 'CLIENT', value: 'JPMorgan Chase & Co.' },
  { label: 'ROLE', value: 'Lead Experience Designer' },
  { label: 'YEAR', value: '2025' },
  { label: 'DURATION', value: '6 months' },
  { label: 'RESPONSIBILITIES', value: 'UI Design' },
]

const stripImages = [
  { src: '/images/family-banking-strip-1.png', alt: "Child's account dashboard showing spending and savings balances with quick actions" },
  { src: '/images/family-banking-strip-2.png', alt: 'Savings screen showing a $15.00 balance and general savings goal' },
  { src: '/images/family-banking-strip-3.png', alt: 'Create savings goal form with a headphones goal name and $150.00 amount' },
  { src: '/images/family-banking-strip-4.png', alt: 'Confirmation screen after creating the headphones savings goal' },
  { src: '/images/family-banking-strip-5.png', alt: 'Savings screen showing an updated $165.00 balance with the headphones goal progress' },
]

const outcomeColumns = [
  {
    title: 'Summary',
    body: 'The Savings Goals workflow shipped as part of a platform-wide migration affecting 1.5 million Chase First Banking accounts. The delivered experience preserved the research-validated usability outcomes: 100% task completion and a 4.58/5 ease-of-use score. The broader dashboard achieved a 4.77/5 satisfaction rating and was consistently described by participants as intuitive, straightforward, and user-friendly.',
  },
  {
    title: 'Business Impact',
    body: "The migration contributed to a platform modernization expected to save Chase millions annually by eliminating third-party vendor dependence. Delivering production-ready designs informed by research — rather than assumptions — helped reduce engineering ambiguity and kept implementation aligned with the validated user experience. The work directly supported one of Chase's highest-priority product infrastructure investments.",
  },
  {
    title: 'Reflection',
    body: 'This project reinforced the importance of understanding the business strategy behind a feature, not just the interface. By grounding implementation in research and systems thinking, I was able to bridge design and engineering while helping deliver a high-priority modernization initiative with significant customer and business impact. Immersing in the full usability findings — beyond my assigned feature — was the decision that made the work meaningfully better.',
  },
]

const outcomeStats = [
  { value: '4.77/5', label: 'Overall dashboard satisfaction score' },
  { value: '4.58/5', label: 'Savings Goals ease-of-use score' },
  { value: '100%', label: 'Task completion rate for Savings Goals' },
  { value: '1.5M', label: 'Chase First Banking accounts migrated' },
]

type OutletCtx = { loaded: boolean; hoverOn: () => void; hoverOff: () => void }

export default function FamilyBanking() {
  const pixelSize = usePixelSize(3)
  const { hoverOn, hoverOff } = useOutletContext<OutletCtx>()
  const [nextHover, setNextHover] = useState(false)

  return (
    <div style={{ background: '#f9f9f9' }}>
      <CaseStudyTopBar />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-white px-4 sm:px-8 md:px-14 pt-28 md:pt-[178px] pb-14 md:pb-20 md:min-h-[608px] flex flex-col justify-center">
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <PixelBlast color="#d8d8d8" pixelSize={pixelSize} patternDensity={0.75} patternScale={1.5}
              edgeFade={0.08} speed={2} enableRipples={true} transparent />
          </div>
          <div className={`relative z-10 ${contentWidth} grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start`}>
            <Reveal className="lg:col-span-6 lg:col-start-1">
              <div className="bg-white p-4 md:p-5">
                <h1 className="text-h1" style={{ color: '#0f0f0e' }}>
                  Modernizing Family Banking
                </h1>
                <p className="text-body-18 mt-4 md:mt-6" style={{ color: '#595958' }}>
                  Delivering customer-focused outcomes through transformation and replatform.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-5 lg:col-start-8">
              <aside className="bg-white rounded p-4 md:p-5">
                {meta.map(({ label, value }) => (
                  <div key={label} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-0 border-b border-[rgba(15,15,14,0.15)] py-3">
                    <div className="text-xs font-light tracking-widest sm:w-[150px] shrink-0" style={{ color: '#0f0f0e', letterSpacing: '0.15em', lineHeight: 1.5 }}>
                      {label}
                    </div>
                    <div className="text-body-14 flex-1" style={{ color: '#0f0f0e' }}>
                      {value}
                    </div>
                  </div>
                ))}
              </aside>
            </Reveal>
          </div>
        </section>

        {/* Hero visual */}
        <section className="px-4 sm:px-8 md:px-14 pt-10 md:pt-[70px]">
          <Reveal className={`block ${contentWidth}`}>
            <div className="rounded-[20px] overflow-hidden relative flex items-center justify-center h-[280px] sm:h-[360px] md:h-[474px]" style={{ background: '#014ba6' }}>
              <img
                src="/images/family-banking-hero.png"
                alt="Family Banking parent dashboard showing a child's spending and savings balances on an iPhone"
                className="w-full h-full object-cover block"
                loading="lazy"
              />
            </div>
          </Reveal>
        </section>

        {/* Summary */}
        <section className="px-4 sm:px-8 md:px-14 pt-16 pb-4 md:py-[88px]">
          <div className={contentWidth}>
            <Reveal>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                <h2 className="text-h2 lg:col-span-5" style={{ color: '#0f0f0e' }}>Summary</h2>
                <div className="text-body-18 lg:col-span-6 lg:col-start-7 flex flex-col gap-5" style={{ color: '#595958' }}>
                  <p>Chase initiated a strategic modernization effort to migrate Chase First Banking from a third-party platform to an in-house solution. The initiative reduced long-term vendor costs, gave Chase ownership of the customer experience, and laid the foundation for faster product innovation.</p>
                  <p>The migration impacted approximately 1.5 million Chase First Banking accounts and required maintaining customer trust while introducing a redesigned experience.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Discovery */}
        <section className="px-4 sm:px-8 md:px-14 pt-8 pb-4 md:py-[70px]">
          <div className={contentWidth}>
            <Reveal>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                <div className="lg:col-span-5 flex flex-col gap-5">
                  <h2 className="text-h2" style={{ color: '#0f0f0e' }}>Discovery</h2>
                  <div className="text-body-18 flex flex-col gap-5" style={{ color: '#595958' }}>
                    <p>Research across 62 participants showed that the redesigned dashboard was intuitive and well received, with an overall satisfaction score of 4.77/5. A consistent pattern emerged: users rarely struggled with completing tasks once they located the correct feature. Instead, discoverability and mental models created friction.</p>
                    <p>For Savings Goals specifically: 100% task completion and a 4.58/5 ease-of-use score. Many participants initially looked under &apos;More&apos; before navigating to Savings. Researchers recommended strengthening dashboard signifiers rather than redesigning the workflow.</p>
                  </div>
                </div>
                <div className="lg:col-span-6 lg:col-start-7 flex flex-col gap-4">
                  <CaseStudyCard className="overflow-hidden">
                    <img src="/images/family-banking-research-1.png" alt="Usability research findings on overall satisfaction with the Family Banking experience" className="w-full h-auto block" loading="lazy" />
                  </CaseStudyCard>
                  <CaseStudyCard className="overflow-hidden">
                    <img src="/images/family-banking-research-2.png" alt="Usability research findings on creating savings goals" className="w-full h-auto block" loading="lazy" />
                  </CaseStudyCard>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Define */}
        <section className="px-4 sm:px-8 md:px-14 pt-8 pb-4 md:py-[70px]">
          <div className={contentWidth}>
            <Reveal>
              <h2 className="text-h2" style={{ color: '#0f0f0e' }}>Define</h2>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="mt-4 mb-10 md:mb-14 flex flex-col gap-5" style={{ color: '#595958' }}>
                <CaseStudyParagraph>The existing Chase First Banking experience relied on an external vendor to power core money management capabilities, including spending controls, savings goals, allowances, chores, and transaction history. Moving these capabilities in-house represented a multi-million-dollar strategic investment, but success depended on more than rebuilding features — it required helping over a million customers transition without confusion or increased support calls.</CaseStudyParagraph>
                <CaseStudyParagraph>The redesign also needed to improve engagement with key financial management features while preserving familiar mental models for existing customers.</CaseStudyParagraph>
              </div>
            </Reveal>
            <Reveal>
              <CaseStudyCard className="overflow-hidden p-4 md:p-10">
                <img
                  src="/images/family-banking-define.png"
                  alt="Usability findings on overall satisfaction and creating savings goals, with supporting phone mockups"
                  className="w-full h-auto block"
                  loading="lazy"
                />
              </CaseStudyCard>
            </Reveal>
          </div>
        </section>

        {/* Design */}
        <section className="px-4 sm:px-8 md:px-14 pt-8 pb-4 md:py-[70px]">
          <div className={contentWidth}>
            <Reveal>
              <h2 className="text-h2" style={{ color: '#0f0f0e' }}>Design</h2>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="mt-4 mb-10 md:mb-14 flex flex-col gap-5" style={{ color: '#595958' }}>
                <CaseStudyParagraph>I joined the project during implementation as a UX Designer responsible for translating validated concepts into production-ready experiences. My primary ownership was the Savings Goals workflow, but I first immersed myself in the usability findings to understand the broader product strategy, customer behaviors, and interaction patterns.</CaseStudyParagraph>
                <CaseStudyParagraph>Rather than simply recreating screens, I reviewed usability findings beyond my assigned feature to understand how Savings Goals fit into the overall information architecture. This systems-level understanding allowed me to preserve research-validated interaction patterns, produce implementation-ready designs with clear specifications, anticipate engineering questions before development, and align the delivered experience with the team&apos;s long-term migration strategy.</CaseStudyParagraph>
              </div>
            </Reveal>
            <Reveal>
              <CaseStudyCard className="overflow-hidden p-4 md:p-10">
                <img
                  src="/images/family-banking-design-flow.png"
                  alt="Create Savings Goal flow shown side by side for parent and child experiences"
                  className="w-full h-auto block"
                  loading="lazy"
                />
              </CaseStudyCard>
            </Reveal>
          </div>
        </section>

        {/* Deliver */}
        <section className="px-4 sm:px-8 md:px-14 pt-8 pb-4 md:py-[70px]">
          <div className={contentWidth}>
            <Reveal>
              <h2 className="text-h2" style={{ color: '#0f0f0e' }}>Deliver</h2>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="mt-4 mb-10 md:mb-14 flex flex-col gap-5" style={{ color: '#595958' }}>
                <CaseStudyParagraph>The final implementation integrated Savings Goals into the redesigned parent dashboard, supporting Chase&apos;s broader goal of centralizing money management while maintaining a simple, approachable experience. The design balanced familiarity for existing customers with clearer organization for new users, supporting the transition from the legacy platform.</CaseStudyParagraph>
                <CaseStudyParagraph>The work supported a strategic migration affecting approximately 1.5 million Chase First Banking accounts and contributed to a platform modernization expected to save Chase millions by eliminating third-party vendor dependence.</CaseStudyParagraph>
              </div>
            </Reveal>
            <Reveal>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 md:gap-4">
                {stripImages.map((img) => (
                  <img
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="h-auto block w-full rounded-[12px]"
                  />
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Outcome */}
        <section className="px-4 sm:px-8 md:px-14 py-16 md:py-[100px]">
          <div className={contentWidth}>
            <Reveal>
              <CaseStudyCard className="p-6 md:p-10">
                <h2 className="text-h2 mb-8 md:mb-10" style={{ color: '#0f0f0e' }}>Outcome</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
                  {outcomeColumns.map((col, i) => (
                    <Reveal key={col.title} delay={i * 0.06}>
                      <div className="flex flex-col gap-3">
                        <h3 className="text-h4" style={{ color: '#0f0f0e' }}>{col.title}</h3>
                        <p className="text-body-18" style={{ color: '#595958' }}>{col.body}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 mt-12 md:mt-14 pt-8">
                  {outcomeStats.map((stat, i) => (
                    <Reveal key={stat.label} delay={i * 0.06}>
                <div className="flex flex-col gap-2 md:px-6">
                  <CountUp value={stat.value} className="text-h1" style={{ color: '#0f0f0e', fontSize: 'clamp(2rem, 3.4vw, 3.375rem)', lineHeight: 1 }} />
                  <span className="text-body-14" style={{ color: '#595958' }}>{stat.label}</span>
                </div>
                    </Reveal>
                  ))}
                </div>
              </CaseStudyCard>
            </Reveal>
          </div>
        </section>

        {/* Next case study */}
        <section>
          <Reveal>
            <div style={{ borderTop: '1px solid #dadada' }}>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="hidden md:block" aria-hidden="true" />
                <Link
                  to="/work/databases"
                  aria-label="Next case study: Creating a Unified Database Management Platform"
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
                    <h3 className="mt-3" style={{ color: '#0f0f0e', fontWeight: 600, fontSize: 18, lineHeight: '26px', letterSpacing: '-0.3px' }}>Creating a Unified Database Management Platform</h3>
                    <p className="mt-2 ml-auto" style={{ color: 'rgb(89, 89, 88)', fontSize: 14, fontWeight: 300, lineHeight: '24px', maxWidth: 520 }}>A scalable enterprise platform that standardized database onboarding, provisioning, and service management.</p>
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
