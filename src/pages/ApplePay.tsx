import { useRef, useState, useEffect, type ReactNode } from 'react'
import { Link, useOutletContext } from 'react-router'
import { motion, useInView } from 'framer-motion'
import { Users, Smartphone, UserRound, FlaskConical } from 'lucide-react'
import PixelBlast from '../components/PixelBlast'
import ContactSection from '../components/ContactSection'
import { PostItGrid } from '../components/PostItGrid'
import KeyUXDiagram from '../components/KeyUXDiagram'
import CaseStudyCard from '../components/CaseStudyCard'
import ParticipantCriteriaCard from '../components/ParticipantCriteriaCard'
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
      <Link to="/work/Buy-Online-Pickup-in-Store" className="flex items-center gap-[10px] ml-auto" style={{ textDecoration: 'none' }}>
        <span style={linkText}>Next Project</span>
        <BackArrow flip />
      </Link>
    </div>
  )
}

function SubHead({ children }: { children: ReactNode }) {
  return (
    <p style={{ color: '#464646', fontWeight: 300, fontSize: 'clamp(1.25rem, 2.4vw, 1.625rem)', lineHeight: 1.45, letterSpacing: '-0.02em' }}>
      {children}
    </p>
  )
}

const meta = [
  { label: 'CLIENT', value: 'Bath & Body Works' },
  { label: 'ROLE', value: 'Lead UX Designer' },
  { label: 'YEAR', value: '2019' },
  { label: 'DURATION', value: '6 months' },
  { label: 'RESPONSIBILITIES', value: 'UX Design, Experience Map' },
]

const frictionPoints = [
  'Confusion around “Secure Checkout” vs. lock icon trust signals',
  'Loyalty members not receiving credit due to tokenized email mismatches',
  'Overwhelming CTAs scattered across scroll depths',
  '“Loyalty limbo” users—partially enrolled but not confirmed—facing account recognition gaps',
]

const participants = [
  '25 Bath and Body Works Customers who shop on a regular basis online and in store',
  "Customer's who have used ApplePay or were open to using in the future",
  'Females ages 16-59',
  '10 mini-groups (1:3 ratio) conducted in a research lab',
]

const insights = [
  {
    tint: '#ecf8ff',
    title: 'Familiar patterns made express checkout intuitive',
    body: "Customers quickly understood Apple Pay and responded positively to a faster checkout path, including customers who hadn't previously used the payment method.",
  },
  {
    tint: '#fff5f5',
    title: 'Apple Pay increased trust and modernized the experience',
    body: "Customers associated the new checkout with greater security, convenience, and modernization. Apple Pay's prominence reinforced the perception that BBW was keeping pace with evolving payment behaviors.",
  },
  {
    tint: '#fffade',
    title: 'Faster checkout still required transparency',
    body: 'Customers wanted the efficiency of express checkout without losing critical purchase details such as subtotal, shipping, tax, promotions, and itemization. This established an important design principle: reduce friction without reducing confidence.',
  },
]

const outcomes = [
  'Contributed to a **12% YoY increase in net sales**, with significant growth in digital and mobile conversion rates.',
  'Reinforced customer trust and satisfaction, with **CSAT scores exceeding 90%** across demographic groups.',
  'Created a **flexible design foundation** for future wallet and loyalty integrations.',
  'Received **full approval from executive leadership teams**, validating the scalable mobile UI system introduced during the Apple Pay MVP launch.',
]

function renderBold(text: string) {
  return text.split('**').map((part, i) =>
    i % 2 === 1 ? <strong key={i} style={{ fontWeight: 700 }}>{part}</strong> : part
  )
}

type OutletCtx = { loaded: boolean; hoverOn: () => void; hoverOff: () => void }

export default function ApplePay() {
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
              <div className="bg-white rounded p-4 md:p-5">
                <h1 className="text-h1" style={{ color: '#0f0f0e' }}>
                  Bath &amp; Body Works Apple Pay Integration
                </h1>
                <p className="text-body-18 mt-4 md:mt-6" style={{ color: '#595958' }}>
                  Bath &amp; Body Works needed to enhance payment options to support digital wallets.
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
            <div className="rounded-[20px] overflow-hidden relative flex items-center justify-center" style={{ background: '#014ba6' }}>
              <img
                src="/images/applepay-hero.png"
                alt="Bath & Body Works desktop checkout showing the Apple Pay 'Scan Code with iPhone' modal"
                className="w-full h-auto block"
                loading="lazy"
              />
            </div>
          </Reveal>
        </section>

        {/* The Challenge */}
        <section className="px-4 sm:px-8 md:px-14 pt-16 pb-4 md:py-[88px]">
          <div className={contentWidth}>
            <Reveal>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                <h2 className="text-h2 lg:col-span-5" style={{ color: '#0f0f0e' }}>The Challenge</h2>
                <div className="text-body-18 lg:col-span-6 lg:col-start-7 flex flex-col gap-5" style={{ color: '#595958' }}>
                  <p>In 2019, Bath &amp; Body Works prioritized the integration of Apple Pay as part of its broader Path to Purchase digital transformation strategy. The mobile checkout experience was dated and unable to support multiple payment options efficiently.</p>
                  <p>As Apple Pay gained traction with mobile-first users, it became a strategic necessity to modernize the checkout UI, support secure wallet payments, and reduce friction across guest, registered, and loyalty user flows.</p>
                  <p>The initiative presented a unique challenge: how do we introduce Apple Pay while simultaneously rethinking the mobile checkout experience for scale, trust, and clarity?</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* The Solution */}
        <section className="px-4 sm:px-8 md:px-14 pt-8 pb-4 md:py-[70px]">
          <div className={contentWidth}>
            <Reveal>
              <h2 className="text-h2" style={{ color: '#0f0f0e' }}>The Solution</h2>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="mt-4 mb-10 md:mb-14 flex flex-col gap-5 max-w-[960px]">
                <SubHead>Uncovering the friction in mobile checkout</SubHead>
                <div className="text-body-18 flex flex-col gap-5" style={{ color: '#595958' }}>
                  <p>As Lead UX Designer, I led the co-led collaboration with research, design, and validation of a new, mobile-optimized checkout experience anchored by the Apple Pay MVP. Our team conducted qualitative research with VIP panels and usability testing to uncover key friction points:</p>
                </div>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {frictionPoints.map((point, i) => (
                <Reveal key={point} delay={i * 0.06}>
<CaseStudyCard className="h-full flex items-start gap-4 p-5 md:p-6">
                  <span className="shrink-0 flex items-center justify-center rounded-full text-white" style={{ width: 40, height: 40, background: '#014ba6', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16 }}>
                    {i + 1}
                  </span>
                  <p className="text-body-18" style={{ color: '#0f0f0e' }}>{point}</p>
                </CaseStudyCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Research Strategy */}
        <section className="px-4 sm:px-8 md:px-14 pt-8 pb-4 md:py-[70px]">
          <div className={contentWidth}>
            <Reveal>
              <h2 className="text-h2" style={{ color: '#0f0f0e' }}>Research Strategy</h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="text-body-18 mt-4 mb-10 md:mb-14 max-w-[960px]" style={{ color: '#595958' }}>
                Customer interviews were conducted at Home Office in Reynoldsburg, OH to understand reactions to the placement of the ApplePay checkout button on the website for desktop and mobile experiences and to determine intuitiveness and ease of use of the secure checkout feature on mobile checkout. We spoke with:
              </p>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
  {participants.map((p, i) => {
  const icons = [Users, Smartphone, UserRound, FlaskConical]
  const Icon = icons[i]
  return (
  <Reveal key={p} delay={i * 0.06}>
  <ParticipantCriteriaCard text={p} icon={Icon} />
  </Reveal>
  )
  })}
            </div>
          </div>
        </section>

        {/* Key Insights */}
        <section className="px-4 sm:px-8 md:px-14 py-16 md:py-[90px]">
          <div className={contentWidth}>
            <Reveal>
              <h2 className="text-h2 mb-10 md:mb-14" style={{ color: '#0f0f0e' }}>Key Insights</h2>
            </Reveal>
            <PostItGrid items={insights} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 pt-4" />
          </div>
        </section>

        {/* Checkout Experience Modernization */}
        <section className="px-4 sm:px-8 md:px-14 pt-8 pb-4 md:py-[70px]">
          <div className={contentWidth}>
            <Reveal>
              <h2 className="text-h2 mb-8 md:mb-12" style={{ color: '#0f0f0e' }}>Checkout Experience Modernization</h2>
            </Reveal>
            <Reveal>
<CaseStudyCard className="overflow-hidden px-6 py-4 md:px-14 md:py-8">
              <KeyUXDiagram />
            </CaseStudyCard>
            </Reveal>
          </div>
        </section>

        {/* Multi-Flow Optimization */}
        <section className="px-4 sm:px-8 md:px-14 py-8 md:py-[70px]">
          <div className={contentWidth}>
            <Reveal>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-10 md:mb-14">
                <h2 className="text-h2 lg:col-span-5" style={{ color: '#0f0f0e' }}>Multi-Flow Optimization</h2>
                <div className="text-body-18 lg:col-span-6 lg:col-start-7 flex flex-col gap-5" style={{ color: '#595958' }}>
                  <p>We mapped and validated four distinct user flows: Guest Checkout, Registered User (by email), Loyalty Member, Loyalty Limbo. Each flow was crafted to ensure users received the right level of personalization, speed, and loyalty recognition—no matter how they paid.</p>
                </div>
              </div>
            </Reveal>
            <Reveal>
              <CaseStudyCard className="overflow-hidden p-4 md:p-10">
                <img
                  src="/images/applepay-flows.png"
                  alt="Experience map of the four validated checkout flows across shopping, bag, and receipt stages"
                  className="w-full h-auto block"
                  loading="lazy"
                />
                </CaseStudyCard>
            </Reveal>
          </div>
        </section>

        {/* Payment Flow */}
        <section className="px-4 sm:px-8 md:px-14 pt-8 pb-4 md:py-[70px]">
          <div className={contentWidth}>
            <Reveal>
              <h2 className="text-h2 mb-8 md:mb-12" style={{ color: '#0f0f0e' }}>Payment Flow</h2>
            </Reveal>
            <Reveal>
              <CaseStudyCard className="overflow-hidden p-4 md:p-10">
                <img
                  src="/images/applepay-payment-flow.png"
                  alt="Apple Pay payment flow across customer experience, iOS, device security, Apple Pay services, and merchant layers"
                  className="w-full h-auto block"
                  loading="lazy"
                  />
                </CaseStudyCard>
            </Reveal>
          </div>
        </section>

        {/* Outcomes */}
        <section className="px-4 sm:px-8 md:px-14 py-16 md:py-[100px]" style={{ background: '#0b3d91' }}>
          <div className={contentWidth}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <Reveal>
                <div className="rounded-[20px] overflow-hidden flex items-center justify-center">
                  <img
                    src="/images/applepay-results.png"
                    alt="Bath & Body Works secure checkout on an iPhone with Apple Pay and PayPal options"
                    className="w-full h-auto block"
                    loading="lazy"
                  />
                </div>
              </Reveal>
              <div className="flex flex-col gap-8">
                <Reveal>
                  <div className="flex flex-col gap-5">
                    <h2 className="text-h2" style={{ color: '#ffffff' }}>Outcomes</h2>
                    <p className="text-body-18" style={{ color: 'rgba(255,255,255,0.78)' }}>
                      The Apple Pay MVP shipped as a scalable, mobile-first foundation for secure checkout—one that
                      built customer trust, simplified fulfillment across payment types, and earned buy-in for the
                      broader digital wallet roadmap.
                    </p>
                  </div>
                </Reveal>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                  {outcomes.map((outcome, i) => (
                    <Reveal key={outcome} delay={i * 0.06}>
                      <div className="h-full rounded-[16px] p-5 md:p-6" style={{ background: 'rgba(255,255,255,0.08)' }}>
                        <p className="text-body-18" style={{ color: '#ffffff' }}>{renderBold(outcome)}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Next case study */}
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
