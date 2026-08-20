import { useRef, useState, useEffect, type ReactNode } from 'react'
import { Link, useOutletContext } from 'react-router'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import PixelBlast from '../components/PixelBlast'
import ContactSection from '../components/ContactSection'
import { PostItGrid } from '../components/PostItGrid'
import ObjectiveCard from '../components/ObjectiveCard'
import CaseStudyParagraph from '../components/CaseStudyParagraph'
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
      <Link to="/work/databases" className="flex items-center gap-[10px] ml-auto" style={{ textDecoration: 'none' }}>
        <span style={linkText}>Next Project</span>
        <BackArrow flip />
      </Link>
    </div>
  )
}

// Section subheading — matches the 26px light #464646 style used across the Figma design.
function SubHead({ children }: { children: ReactNode }) {
  return (
    <p style={{ color: '#464646', fontWeight: 300, fontSize: 'clamp(1.25rem, 2.4vw, 1.625rem)', lineHeight: 1.45, letterSpacing: '-0.02em' }}>
      {children}
    </p>
  )
}

const meta = [
  { label: 'CLIENT', value: 'Bath & Body Works' },
  { label: 'ROLE', value: 'Lead Experience Designer' },
  { label: 'YEAR', value: '2019' },
  { label: 'DURATION', value: '1 Year' },
  { label: 'RESPONSIBILITIES', value: 'Experience Design, Service Design, Clickable Prototype' },
]

const objectives = [
  { n: '1', title: 'Increase Convenience', body: 'Give customers greater flexibility in how and where they receive their purchases.' },
  { n: '2', title: 'Connect Digital + Physical', body: 'Create a more seamless relationship between ecommerce and the store experience.' },
  { n: '3', title: 'Increase Store Engagement', body: 'Use digital commerce to create another pathway into physical stores.' },
  { n: '4', title: 'Build for Scale', body: 'Create an experience capable of expanding beyond the initial rollout and supporting a much larger store network.' },
]

const themes = [
  {
    tint: '#ecf8ff',
    title: 'Digital and Physical Need to Feel Like One Journey',
    body: 'BOPIS begins online but ends inside a store. Customers needed enough information digitally to understand what would happen when they arrived.',
  },
  {
    tint: '#fff5f5',
    title: 'Store Selection Is Part of Shopping',
    body: "Choosing a pickup location wasn't simply a checkout decision. The selected store affected product availability and therefore needed to become part of the broader shopping experience.",
  },
  {
    tint: '#fffade',
    title: 'Confidence in Local Availability',
    body: "Pickup only works if customers feel confident that the products they're shopping for are available at their selected store. The experience needed to make store context and product availability visible throughout the shopping journey.",
  },
  {
    tint: '#fffade',
    title: 'Fulfillment Choice Needs to Be Clear',
    body: 'Introducing pickup alongside traditional shipping created another decision customers needed to understand. The distinction between fulfillment methods needed to remain clear without adding unnecessary complexity.',
  },
  {
    tint: '#fff5f5',
    title: 'The Experience Needs to Account for Fulfillment Complexity',
    body: "Inventory conditions don't always produce an ideal journey. Products may have different availability or fulfillment options, creating scenarios where an order can't simply be treated as one uniform transaction.",
  },
  {
    tint: '#ecf8ff',
    title: 'Customers Need Visibility After Purchase',
    body: "Submitting an order doesn't mean it's immediately available. The experience needed to communicate the transition from order placement to store preparation and readiness.",
  },
]

const experienceSteps = [
  {
    badge: 'Step 1: Store Selection',
    title: 'Making Store Selection Part of Shopping',
    body: 'One of the foundational interactions was establishing where customers wanted to shop. We introduced store selection into the digital journey so customers could connect product discovery with local availability and make more informed purchasing decisions. Customers could search nearby locations, review relevant store information, and establish a preferred store that would carry through the shopping experience.',
    images: ['/images/bbw-mobile-1.png', '/images/bbw-mobile-2.png'],
    alt: 'Mobile store selection — a Pick Up In Store modal where customers set their location and choose a preferred store',
  },
  {
    badge: 'Step 2: Product Discovery',
    title: 'Bringing Pickup Availability Into Product Discovery',
    body: 'Once customers selected a store, pickup availability became part of the shopping experience. We surfaced fulfillment information on product pages so customers could understand whether an item was available for pickup before committing to the purchase. Bringing this information forward connected product discovery with fulfillment rather than waiting until checkout to introduce pickup constraints.',
    images: ['/images/bbw-mobile-3.png', '/images/bbw-mobile-4.png'],
    alt: 'Mobile product listing and product detail screens showing in-store pickup availability at the selected store',
  },
  {
    badge: 'Step 3: Shopping Bag',
    title: 'Pickup needed to remain understandable as customers continued shopping.',
    body: 'We developed patterns for communicating selected-store information and fulfillment availability across product listings, product details, the shopping bag, and checkout. Maintaining this context helped create continuity as customers moved deeper into the purchase journey.',
    images: ['/images/bbw-mobile-5.png', '/images/bbw-mobile-6.png'],
    alt: 'Mobile shopping bag screens confirming items added for pickup and the shipping and pickup choices before checkout',
  },
]

const results = [
  {
    prefix: '',
    value: 1300,
    decimals: 0,
    suffix: '+',
    label: 'Stores adopted BOPIS experience',
    body: '',
  },
  {
    prefix: '$',
    value: 5.71,
    decimals: 2,
    suffix: 'B',
    label: 'U.S. & Canada Store Sales',
    body: 'Store sales reached approximately $5.71 billion in FY2021, increasing 35.7% year over year.',
  },
  {
    prefix: '$',
    value: 7.88,
    decimals: 2,
    suffix: 'B',
    label: 'FY2021 Net Sales',
    body: 'Bath & Body Works generated approximately $7.88 billion in net sales during FY2021.',
  },
  {
    prefix: '+',
    value: 22.5,
    decimals: 1,
    suffix: '%',
    label: 'Year-over-Year Growth',
    body: 'Net sales increased 22.5% compared with FY2020 and approximately 45.8% compared with 2019.',
  },
]

function CountUp({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 1800,
  className,
  style,
}: {
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      // easeOutExpo for a lively, decelerating count
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
      setDisplay(value * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
      else setDisplay(value)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration])

  const formatted = display.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}

const sources = [
  {
    title: 'Bath & Body Works / L Brands 2020 Annual Report',
    body: "Documents the early BOPIS rollout and Bath & Body Works' investment in digital and omnichannel capabilities.",
  },
  {
    title: 'L Brands Q1 2021 Earnings Call',
    body: 'Provides leadership commentary on the BOPIS pilot, early customer feedback, operational learnings, financial performance, and expansion.',
  },
  {
    title: 'Bath & Body Works FY2021 Annual Report',
    body: 'Source for FY2021 net sales, store sales, and company financial performance.',
  },
  {
    title: 'Bath & Body Works FY2022 Form 10-K',
    body: 'Documents the addition of BOPIS to more than 800 stores, availability across more than 1,300 locations, and customer adoption of BOPIS.',
  },
  {
    title: 'Bath & Body Works FY2023 Form 10-K',
    body: 'Documents completion of the U.S. BOPIS rollout in Q1 2023.',
  },
  {
    title: '',
    body: 'Public company metrics describe the subsequent scale, adoption, and business context of the BOPIS capability. They are not presented as outcomes solely attributable to my individual design contribution.',
  },
]

const journeyStages = [
  {
    name: 'Discovery',
    color: '#0a7d9e',
    frictions: [
      'Online experience disconnected from physical stores',
      'No indication of nearby availability or faster fulfillment options',
      'Customers outside metro areas already anticipate delays',
    ],
  },
  {
    name: 'Consideration',
    color: '#1a93b3',
    frictions: [
      'Only free fulfillment option is standard shipping',
      'No ability to compare delivery speed vs. pickup',
      'Uncertainty around delivery dates',
    ],
  },
  {
    name: 'Purchase',
    color: '#34a8c8',
    frictions: [
      'High friction checkout with limited fulfillment flexibility',
      'Shipping fees feel unjustified for everyday products',
      'No option to expedite without high cost',
    ],
  },
  {
    name: 'Fulfillment',
    color: '#6fc4da',
    frictions: [
      'Long delivery windows (often 5–10+ days)',
      'No way to leverage nearby store inventory',
      'Delays during peak seasons',
    ],
  },
  {
    name: 'Post Purchase',
    color: '#b7dfe9',
    textDark: true,
    frictions: [
      'Missed gifting or time-sensitive needs',
      'Frustration turns into reduced repeat purchase behavior',
      'Customer support burden increases',
    ],
  },
]

function JourneyMap() {
  const [active, setActive] = useState(0)
  return (
    <div>
      {/* Desktop: horizontal expanding accordion */}
      <div className="hidden md:flex gap-3" style={{ height: 440 }}>
        {journeyStages.map((stage, i) => {
          const isActive = i === active
          const fg = stage.textDark ? '#0a3d4c' : '#ffffff'
          return (
            <div
              key={stage.name}
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              className="relative rounded-[20px] overflow-hidden cursor-pointer"
              style={{
                flexGrow: isActive ? 4.2 : 1,
                flexBasis: 0,
                background: stage.color,
                transition: 'flex-grow 0.55s cubic-bezier(0.22,1,0.36,1)',
              }}
            >
              <span className="absolute top-6 left-7" style={{ color: fg, opacity: 0.5, fontWeight: 600, fontSize: 14, letterSpacing: '0.1em' }}>
                {`0${i + 1}`}
              </span>
              {!isActive && (
                <div className="absolute inset-0 flex items-end justify-center pb-7">
                  <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', color: fg, fontWeight: 600, fontSize: 18, letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>
                    {stage.name}
                  </span>
                </div>
              )}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, delay: 0.12 }}
                    className="absolute inset-0 p-7 md:p-9 flex flex-col justify-center"
                  >
                    <h4 style={{ color: fg, fontWeight: 600, fontSize: 'clamp(1.4rem, 2.1vw, 2rem)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                      {stage.name}
                    </h4>
                    <ul className="mt-6 flex flex-col gap-4 max-w-[420px]">
                      {stage.frictions.map((f, fi) => (
                        <motion.li
                          key={f}
                          initial={{ opacity: 0, x: 14 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.18 + fi * 0.08 }}
                          className="flex gap-3"
                        >
                          <span style={{ color: fg, opacity: 0.55 }}>—</span>
                          <span style={{ color: fg, fontSize: 16, lineHeight: 1.5, opacity: 0.95 }}>{f}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      {/* Mobile: vertical accordion */}
      <div className="md:hidden flex flex-col gap-3">
        {journeyStages.map((stage, i) => {
          const isActive = i === active
          const fg = stage.textDark ? '#0a3d4c' : '#ffffff'
          return (
            <div key={stage.name} className="rounded-[16px] overflow-hidden" style={{ background: stage.color }}>
              <button
                type="button"
                onClick={() => setActive(isActive ? -1 : i)}
                className="w-full flex items-center justify-between px-5 py-4"
                style={{ color: fg }}
                aria-expanded={isActive}
              >
                <span className="flex items-center gap-3">
                  <span style={{ opacity: 0.6, fontWeight: 600, fontSize: 13, letterSpacing: '0.1em' }}>{`0${i + 1}`}</span>
                  <span style={{ fontWeight: 600, fontSize: 17 }}>{stage.name}</span>
                </span>
                <span style={{ fontSize: 22, lineHeight: 1, transform: isActive ? 'rotate(45deg)' : 'none', transition: 'transform 0.25s ease' }}>+</span>
              </button>
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="px-5 pb-5 flex flex-col gap-3 overflow-hidden"
                  >
                    {stage.frictions.map(f => (
                      <li key={f} className="flex gap-2">
                        <span style={{ color: fg, opacity: 0.6 }}>—</span>
                        <span style={{ color: fg, fontSize: 15, lineHeight: 1.5, opacity: 0.95 }}>{f}</span>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      <p className="mt-5 text-body-14 hidden md:block" style={{ color: '#767675' }}>
        Hover a stage to explore the friction customers experienced at each step of the journey.
      </p>
    </div>
  )
}

type OutletCtx = { loaded: boolean; hoverOn: () => void; hoverOff: () => void }

export default function BathBodyWorks() {
  const pixelSize = usePixelSize(3)
  const { hoverOn, hoverOff } = useOutletContext<OutletCtx>()
  const [nextHover, setNextHover] = useState(false)

  return (
    <div style={{ background: '#f9f9f9' }}>
      <CaseStudyTopBar />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-white px-4 sm:px-8 md:px-14 pt-28 md:pt-[178px] pb-14 md:pb-20 md:min-h-[723px] flex flex-col justify-center">
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <PixelBlast color="#d8d8d8" pixelSize={pixelSize} patternDensity={0.6} patternScale={1.5}
              edgeFade={0.18} speed={2} enableRipples={true} transparent />
          </div>
          <div className={`relative z-10 ${contentWidth} grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start`}>
            <Reveal className="lg:col-span-6 lg:col-start-1">
              <div className="bg-white rounded p-4 md:p-5">
                <h1 className="text-h1" style={{ color: '#0f0f0e' }}>
                  Creating an Omnichannel Pickup Experience
                </h1>
                <p className="text-body-18 mt-4 md:mt-6" style={{ color: '#595958' }}>
                  Bath &amp; Body Works set out to introduce Buy Online, Pick Up In Store (BOPIS), giving customers the convenience of shopping online while fulfilling their purchase through a nearby store.
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
            <div className="rounded-[20px] overflow-hidden relative" style={{ background: '#ecf8ff' }}>
              <img
                src="/images/bbw-hero-dashboard.png"
                alt="Bath & Body Works Buy Online, Pick Up In Store experience shown across desktop and mobile"
                className="w-full h-auto block"
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
                  <p>Bath &amp; Body Works set out to introduce Buy Online, Pick Up In Store (BOPIS), giving customers the convenience of shopping online while fulfilling their purchase through a nearby store.</p>
                  <p>While the proposition was simple, delivering it required connecting e-commerce, store inventory, order management, fulfillment, customer communications, associate workflows, and the physical pickup experience.</p>
                  <p>As a Lead Experience Designer, I helped translate this new service model into an end-to-end digital experience that connected online shopping with physical retail.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Opportunity visual */}
        <section className="px-4 sm:px-8 md:px-14 pt-8 md:pt-[70px]">
          <Reveal className={`block ${contentWidth}`}>
            <div className="rounded-[20px] overflow-hidden bg-white" style={{ border: '1px solid rgba(15,15,14,0.08)' }}>
              <img
                src="/images/bbw-store-photo.png"
                alt="Inside a Bath & Body Works store where online pickup orders are staged and handed to customers"
                className="w-full h-auto block"
                style={{ maxHeight: 560, objectFit: 'cover', objectPosition: 'center' }}
                loading="lazy"
              />
            </div>
          </Reveal>
        </section>

        {/* The Opportunity */}
        <section className="px-4 sm:px-8 md:px-14 pt-8 pb-4 md:py-[70px]">
          <div className={contentWidth}>
            <Reveal>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                <h2 className="text-h2 lg:col-span-5" style={{ color: '#0f0f0e' }}>The Opportunity</h2>
                <div className="lg:col-span-6 lg:col-start-7 flex flex-col gap-5">
                  <SubHead>Connecting Digital Commerce With Physical Retail</SubHead>
                  <div className="text-body-18 flex flex-col gap-5" style={{ color: '#595958' }}>
                    <p>BOPIS created a new way for Bath &amp; Body Works customers to move between digital and physical shopping. Customers needed to discover which products were available nearby, select a store, choose pickup during their purchase, understand when their order was ready, and confidently complete the experience in store.</p>
                    <p>Behind those interactions was a much larger challenge: coordinating the systems and operational processes responsible for inventory, orders, fulfillment, communications, and pickup.</p>
                    <p>The opportunity wasn&apos;t simply to add another checkout option. It was to create a connected service across digital commerce and the store experience.</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Business Objectives */}
        <section className="px-4 sm:px-8 md:px-14 py-16 md:py-[90px]">
          <div className={contentWidth}>
            <Reveal>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-10 md:mb-[70px]">
                <h2 className="text-h2 lg:col-span-5" style={{ color: '#0f0f0e' }}>Business Objectives</h2>
                <p className="text-body-18 lg:col-span-6 lg:col-start-7" style={{ color: '#595958' }}>
                  BOPIS had to serve customers and the business at the same time — adding convenience while creating a durable connection between e-commerce and the physical store network.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
  {objectives.map(obj => (
  <ObjectiveCard key={obj.n} number={obj.n} title={obj.title} body={obj.body} />
  ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Research & Discovery */}
        <section className="px-4 sm:px-8 md:px-14 pt-6 pb-16 md:py-[90px]">
          <div className={contentWidth}>
            <Reveal>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                <h2 className="text-h2 lg:col-span-5" style={{ color: '#0f0f0e' }}>Research &amp; Discovery</h2>
                <div className="lg:col-span-6 lg:col-start-7 flex flex-col gap-5">
                  <SubHead>Learning Directly From Customers</SubHead>
                  <div className="text-body-18 flex flex-col gap-5" style={{ color: '#595958' }}>
                    <p>Research was led by our UX research partners, with design closely involved throughout the process. I observed 20+ customer research sessions in New York City, where we presented the proposed BOPIS experience and gathered feedback on how customers understood and responded to the new shopping model.</p>
                    <p>Being present for the sessions gave me direct exposure to customer reactions, questions, and expectations as they moved through the prototype. I used those observations alongside the research team&apos;s findings to inform subsequent design decisions and iterations.</p>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="mt-10 md:mt-[70px] grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                <div className="md:col-span-2 rounded-[20px] overflow-hidden bg-white" style={{ border: '1px solid rgba(15,15,14,0.08)' }}>
                  <img src="/images/bbw-key-visual.png" alt="Concept visual illustrating the connected BOPIS shopping and pickup journey" className="w-full h-auto block" loading="lazy" />
                </div>
                <div className="rounded-[20px] overflow-hidden bg-white" style={{ border: '1px solid rgba(15,15,14,0.08)' }}>
                  <img src="/images/bbw-key-visual-side.png" alt="Mobile view of the Bath & Body Works pickup experience" className="w-full h-full object-cover block" loading="lazy" />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Key Themes */}
        <section className="px-4 sm:px-8 md:px-14 pb-16 md:pb-[90px]">
          <div className={contentWidth}>
            <Reveal>
              <div className="flex flex-col gap-3 mb-8 md:mb-12">
                <h3 className="text-h3" style={{ color: '#0f0f0e' }}>Translating Feedback Into Design Decisions</h3>
  <CaseStudyParagraph>
  The sessions helped us understand where the proposed experience aligned with customer expectations and where additional clarity was needed. We used qualitative feedback to evaluate how customers responded to important moments throughout the journey—from finding pickup availability and selecting a store to choosing fulfillment and understanding what would happen after an order was placed. These observations helped us refine the experience and establish clearer patterns for pickup and delivery.
  </CaseStudyParagraph>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="text-xs font-light tracking-widest mb-5" style={{ color: '#0f0f0e', letterSpacing: '0.15em' }}>KEY THEMES</p>
              <PostItGrid items={themes} />
            </Reveal>
          </div>
        </section>

        {/* Designing Beyond the Interface — journey map */}
        <section className="px-4 sm:px-8 md:px-14 pt-6 pb-16 md:py-[90px]">
          <div className={contentWidth}>
            <Reveal>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                <h2 className="text-h2 lg:col-span-5" style={{ color: '#0f0f0e' }}>Designing Beyond the Interface</h2>
                <div className="lg:col-span-6 lg:col-start-7 flex flex-col gap-5">
                  <SubHead>BOPIS crossed the boundary between e-commerce and physical retail.</SubHead>
                  <div className="text-body-18 flex flex-col gap-5" style={{ color: '#595958' }}>
                    <p>A customer might interact with only a handful of screens, but successfully completing an order depended on inventory, location services, order management, fulfillment, communications, store operations, and associate workflows working together.</p>
                    <p>We mapped the experience from product discovery through pickup to understand how those interactions connected. Mapping the journey helped us understand where customer interactions depended on operational processes and technology behind the scenes.</p>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="mt-10 md:mt-[70px]">
                <JourneyMap />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Designing the Experience */}
        <section className="px-4 sm:px-8 md:px-14 pt-6 pb-16 md:py-[90px]">
          <div className={contentWidth}>
            <Reveal>
              <h2 className="text-h2 mb-10 md:mb-[70px]" style={{ color: '#0f0f0e' }}>Designing the Experience</h2>
            </Reveal>
            <div className="flex flex-col gap-16 md:gap-[120px]">
              {experienceSteps.map((step, i) => (
                <Reveal key={step.title} delay={0.04}>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    <div className={`lg:col-span-5 flex flex-col gap-5 ${i % 2 === 1 ? 'lg:order-2 lg:col-start-8' : 'lg:col-start-1'}`}>
                      <span className="w-fit rounded-full px-4 py-2 text-sm" style={{ background: '#e2f3f8', color: '#0f0f0e' }}>{step.badge}</span>
                      <h3 className="text-h3" style={{ color: '#0f0f0e' }}>{step.title}</h3>
                      <p className="text-body-18" style={{ color: '#595958' }}>{step.body}</p>
                    </div>
                    <div className={`lg:col-span-6 ${i % 2 === 1 ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-7'}`}>
                      <div className="grid grid-cols-2 gap-4 md:gap-5">
                        {step.images.map(src => (
                          <div key={src} className="rounded-[20px] overflow-hidden" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.12)' }}>
                            <img src={src} alt={step.alt} className="w-full h-auto block" loading="lazy" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}

              {/* Fulfillment choice — desktop checkout */}
              <Reveal delay={0.04}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  <div className="lg:col-span-5 flex flex-col gap-5">
                    <span className="w-fit rounded-full px-4 py-2 text-sm" style={{ background: '#e2f3f8', color: '#0f0f0e' }}>Step 4: Checkout</span>
                    <h3 className="text-h3" style={{ color: '#0f0f0e' }}>Introducing a New Fulfillment Choice</h3>
                    <div className="text-body-18 flex flex-col gap-4" style={{ color: '#595958' }}>
                      <p>Checkout introduced a fundamental change to the existing ecommerce experience: customers could now decide not only what they wanted to purchase, but how they wanted to receive it.</p>
                      <p>We designed the experience so customers could distinguish between shipping and pickup, confirm their selected store, understand fulfillment expectations, and review their choices before placing the order. The goal was to integrate pickup naturally into the existing purchasing experience rather than create an entirely separate checkout process.</p>
                    </div>
                  </div>
                  <div className="lg:col-span-6 lg:col-start-7">
                    <div className="grid grid-cols-2 gap-4 md:gap-5">
                      <div className="rounded-[20px] overflow-hidden bg-white" style={{ border: '1px solid rgba(15,15,14,0.08)' }}>
                        <img src="/images/bbw-order-summary-v2.png" alt="Order summary showing a mixed fulfillment cart — items being shipped alongside items being picked up at the Taylor Square store — with subtotals and a $70.09 order total" className="w-full h-auto block" loading="lazy" />
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Complex orders — cart states */}
              <Reveal delay={0.04}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  <div className="lg:col-span-5 flex flex-col gap-5 lg:order-2 lg:col-start-8">
                    <span className="w-fit rounded-full px-4 py-2 text-sm" style={{ background: '#e2f3f8', color: '#0f0f0e' }}>Edge cases</span>
                    <h3 className="text-h3" style={{ color: '#0f0f0e' }}>Designing for Complex Orders</h3>
                    <div className="text-body-18 flex flex-col gap-4" style={{ color: '#595958' }}>
                      <p>Real-world fulfillment introduced additional complexity. Product eligibility and store inventory could result in orders containing different fulfillment methods.</p>
                      <p>We explored how these conditions could be communicated without making the overall purchase difficult to understand.</p>
                    </div>
                  </div>
                  <div className="lg:col-span-6 lg:order-1 lg:col-start-1">
                    <div className="rounded-[20px] overflow-hidden bg-white" style={{ border: '1px solid rgba(15,15,14,0.08)' }}>
                      <img src="/images/bbw-cart-fulfillment.png" alt="Cart line items showing ship-it and pick-up-in-store options, including order-limit and unavailable-for-pickup states" className="w-full h-auto block" loading="lazy" />
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Beyond Checkout */}
        <section className="px-4 sm:px-8 md:px-14 pt-6 pb-16 md:py-[90px]">
          <div className={contentWidth}>
            <Reveal>
              <h2 className="text-h2" style={{ color: '#0f0f0e' }}>Beyond Checkout</h2>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="mt-6 md:mt-8">
                <SubHead>Placing the order wasn&apos;t the end of the BOPIS experience.</SubHead>
              </div>
              <div className="text-body-18 flex flex-col gap-5 mt-7 max-w-[960px]" style={{ color: '#595958' }}>
                <p>Store associates still needed to receive, locate, prepare, and stage the customer&apos;s products before pickup. The customer therefore needed to understand the difference between an order being received and actually being ready.</p>
                <p>We designed post-purchase experiences that communicated order status and helped customers understand when they should travel to the store. Pickup communications provided the information customers needed to transition from the online experience to the store and successfully retrieve their purchase.</p>
                <p>The experience didn&apos;t end when the browser closed—it ended when the customer had their products.</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 items-start">
                {[
                  { src: '/images/bbw-email-1.png', alt: 'Order confirmation email — "Thanks for your order!" — with an order-status stepper and Taylor Square pickup details' },
                  { src: '/images/bbw-email-2.png', alt: 'Ready-for-pickup email — "Stop in and see an associate!" — with the status stepper advanced to Ready for Pickup' },
                  { src: '/images/bbw-email-3.png', alt: 'Pickup-complete email — "Thanks for stopping in." — with picked-up items, receipt, and billing details' },
                ].map(e => (
                  <div key={e.src} className="rounded-[12px] overflow-hidden bg-white" style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.10)' }}>
                    <img src={e.src} alt={e.alt} className="w-full h-auto block" loading="lazy" />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Mobile Layouts */}
        <section className="px-4 sm:px-8 md:px-14 pb-16 md:pb-[90px]">
          <div className={contentWidth}>
            <Reveal>
              <h3 className="text-h3 mb-8 md:mb-10" style={{ color: '#0f0f0e' }}>Mobile Layouts</h3>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
                {[1, 2, 3, 4, 5, 6].map(n => (
                  <div key={n} className="rounded-[16px] overflow-hidden" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.12)' }}>
                    <img src={`/images/bbw-mobile-${n}.png`} alt={`Mobile BOPIS screen ${n} of 6 from the pickup shopping flow`} className="w-full h-auto block" loading="lazy" />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Results */}
        <section className="px-4 sm:px-8 md:px-14 py-16 md:py-[90px]" style={{ backgroundColor: '#f4f4f3' }}>
          <div className={contentWidth}>
            <Reveal>
              <h2 className="text-h2" style={{ color: '#0f0f0e' }}>Results</h2>
            </Reveal>
            <Reveal delay={0.05}>
              <h3 className="text-h3 mt-6 md:mt-8" style={{ color: '#3f3f3f' }}>From New Experience to National Capability</h3>
              <p className="text-body-18 mt-5 max-w-[760px]" style={{ color: '#595958' }}>
                BOPIS ultimately grew far beyond its initial rollout, becoming a core component of Bath &amp; Body Works&apos; omnichannel experience.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                {results.map(r => (
                  <div
                    key={r.label}
                    className="rounded-[20px] bg-white p-7 md:p-8 flex flex-col sm:min-h-[300px]"
                    style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}
                  >
                    <CountUp
                      value={r.value}
                      decimals={r.decimals}
                      prefix={r.prefix}
                      suffix={r.suffix}
                      style={{ color: '#0f0f0e', fontWeight: 500, fontSize: 'clamp(2.25rem, 3.6vw, 3.25rem)', letterSpacing: '-0.03em', lineHeight: 1 }}
                    />
                    <div className="mt-4 flex flex-col gap-2">
                      <p className="text-h4" style={{ color: '#0f0f0e' }}>{r.label}</p>
                      {r.body && (
                        <p className="text-body-14" style={{ color: '#595958', lineHeight: 1.6 }}>{r.body}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-12 md:mt-16" style={{ fontSize: 12, fontWeight: 300, color: 'rgb(89, 89, 88)', lineHeight: 1.6 }}>
                <p style={{ fontWeight: 600 }}>Sources</p>
                <ol className="mt-2 flex flex-col gap-2">
                  {sources.map((s, i) => (
                    <li key={s.title || i} className="flex gap-2">
                      <span style={{ minWidth: 16, textAlign: 'right' }}>{`${i + 1}.`}</span>
                      <span>
                        {s.title && <span className="block">{s.title}</span>}
                        <span className="block">{s.body}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
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
