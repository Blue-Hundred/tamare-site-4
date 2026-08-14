import React, { useState, useEffect, useRef } from 'react'
import { Outlet, Link } from 'react-router'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import NavBar from '../components/NavBar'

// ─── Cursor context ────────────────────────────────────────────────────────
export type CursorCtx = { setHovered: (v: boolean) => void }
export const CursorContext = React.createContext<CursorCtx>({ setHovered: () => {} })

// Elements anywhere on the site that should trigger the enlarged "hover" cursor.
const INTERACTIVE_SELECTOR = 'a, button, [role="button"], [role="link"], input, textarea, select, label, summary, [data-cursor-hover]'

function Cursor({ ctxRef }: { ctxRef: React.MutableRefObject<CursorCtx> }) {
  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)
  // Hover can be driven from two sources: explicit context calls (e.g. the
  // homepage project cards) and automatic detection of interactive elements
  // anywhere on the site. We track them separately so one turning off does
  // not cancel the other.
  const [ctxHovered, setCtxHovered] = useState(false)
  const [autoHovered, setAutoHovered] = useState(false)
  const hovered = ctxHovered || autoHovered

  useEffect(() => { ctxRef.current.setHovered = setCtxHovered }, [ctxRef])

  const rx = useSpring(mx, { stiffness: 90, damping: 20, mass: 0.4 })
  const ry = useSpring(my, { stiffness: 90, damping: 20, mass: 0.4 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => { mx.set(e.clientX); my.set(e.clientY) }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mx, my])

  // Globally enlarge the cursor when the pointer is over any interactive
  // element, on every page — using event delegation so no per-page wiring
  // is required.
  useEffect(() => {
    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null
      if (t && t.closest?.(INTERACTIVE_SELECTOR)) setAutoHovered(true)
    }
    const onOut = (e: MouseEvent) => {
      const from = e.target as Element | null
      const to = (e.relatedTarget as Element | null)
      const leftInteractive = from?.closest?.(INTERACTIVE_SELECTOR)
      const enteredInteractive = to?.closest?.(INTERACTIVE_SELECTOR)
      if (leftInteractive && !enteredInteractive) setAutoHovered(false)
    }
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    return () => {
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [])

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[200] hidden md:flex items-center justify-center"
      style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%', borderRadius: '50%' }}
      animate={{
        width: hovered ? 68 : 44,
        height: hovered ? 68 : 44,
        background: hovered ? 'rgba(100,100,100,0.72)' : 'rgba(180,180,180,0.45)',
      }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.16 }}
            style={{ color: '#fff', fontSize: '1.1rem', lineHeight: 1, userSelect: 'none' }}
          >
            →
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Loader ────────────────────────────────────────────────────────────────
function Loader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let v = 0
    const step = () => {
      v += Math.random() * 18 + 4
      if (v >= 100) { setCount(100); setTimeout(onDone, 500); return }
      setCount(Math.floor(v))
      setTimeout(step, 60 + Math.random() * 80)
    }
    step()
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ background: '#0f0f0e' }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex flex-col items-center gap-8"
      >
        <span style={{ fontFamily: "'Aeonik','DM Sans',sans-serif", fontSize: 'clamp(2.5rem,6vw,5rem)', fontWeight: 300, color: '#ffffff', letterSpacing: '-0.03em', lineHeight: 1 }}>
          Tamaré Reese
        </span>
        <div style={{ width: 240, height: 1, background: 'rgba(255,255,255,0.12)', position: 'relative', overflow: 'hidden' }}>
          <motion.div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, background: '#ffffff', width: `${count}%`, transition: 'width 0.1s linear' }} />
        </div>
        <span style={{ fontSize: '0.7rem', color: '#ffffff', opacity: 0.25, fontWeight: 300, letterSpacing: '0.15em' }}>
          {String(count).padStart(3, '0')}
        </span>
      </motion.div>
    </motion.div>
  )
}

// ─── NavItem ──────────────────────────────────────────────────────────────
function NavItem({ href, label, isActive, hoverOn, hoverOff }: {
  href: string; label: string; isActive: boolean; hoverOn: () => void; hoverOff: () => void
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link
      to={href}
      style={{
        textDecoration: 'none',
        fontSize: '1rem',
        fontWeight: isActive ? 600 : 400,
        color: '#0f0f0e',
        letterSpacing: '-0.01em',
        position: 'relative',
        paddingBottom: '2px',
        opacity: isActive ? 1 : hovered ? 1 : 0.45,
        transition: 'opacity 0.18s, font-weight 0.18s',
      }}
      onMouseEnter={() => { setHovered(true); hoverOn() }}
      onMouseLeave={() => { setHovered(false); hoverOff() }}
    >
      {label}
      {(isActive || hovered) && (
        <motion.span
          layoutId={isActive ? `nav-underline-${label}` : undefined}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          exit={{ scaleX: 0 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            height: isActive ? 2 : 1,
            background: '#0f0f0e',
            transformOrigin: 'left',
            borderRadius: 1,
          }}
        />
      )}
    </Link>
  )
}

// ─── Root ──────────────────────────────────────────────────────────────────
export default function Root() {
  const [loaded, setLoaded] = useState(false)
  const cursorCtx = useRef<CursorCtx>({ setHovered: () => {} })
  const hoverOn = () => cursorCtx.current.setHovered(true)
  const hoverOff = () => cursorCtx.current.setHovered(false)

  return (
    <CursorContext.Provider value={cursorCtx.current}>
      <AnimatePresence>{!loaded && <Loader onDone={() => setLoaded(true)} />}</AnimatePresence>

      <motion.div
        className="min-h-screen"
        style={{ background: '#ffffff', color: '#0f0f0e', cursor: 'none' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Cursor ctxRef={cursorCtx} />

        <NavBar />

        <Outlet context={{ loaded, hoverOn, hoverOff }} />
      </motion.div>
    </CursorContext.Provider>
  )
}
