import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import svgPaths from '../imports/Databases/svg-4toy70dlwj'

function NavItem({ href, label, isActive }: { href: string; label: string; isActive: boolean }) {
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
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
      {(isActive || hovered) && (
        <motion.span
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

function NavExternalItem({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        textDecoration: 'none',
        fontSize: '1rem',
        fontWeight: 400,
        color: '#0f0f0e',
        letterSpacing: '-0.01em',
        position: 'relative',
        paddingBottom: '2px',
        opacity: hovered ? 1 : 0.45,
        transition: 'opacity 0.18s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
      {hovered && (
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          exit={{ scaleX: 0 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            height: 1,
            background: '#0f0f0e',
            transformOrigin: 'left',
            borderRadius: 1,
          }}
        />
      )}
    </a>
  )
}

const navLinks = [['/#work', 'Work'], ['/about', 'About'], ['/#contact', 'Contact']] as const
const RESUME_HREF = '/resume.pdf'

export default function NavBar() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 md:px-14 py-6"
        style={{ background: '#ffffff', borderBottom: '1px solid rgba(15,15,14,0.06)' }}
      >
        <Link to="/" className="flex items-center" style={{ textDecoration: 'none' }} aria-label="Tamaré Reese — home">
          <svg width="24" height="32" viewBox="0 0 31.5145 42.0193" fill="none" aria-hidden="true">
            <path d={svgPaths.p1b65ed80} fill="#0f0f0e" />
            <path d={svgPaths.p11c45c00} fill="#0f0f0e" />
            <path d={svgPaths.pd915a80} fill="#0f0f0e" />
            <path d={svgPaths.p2e1b9140} fill="#0f0f0e" />
            <path d={svgPaths.p32ecd500} fill="#0f0f0e" />
          </svg>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(([href, label]) => {
            const isActive = location.pathname === '/about' && label === 'About'
            return <NavItem key={label} href={href} label={label} isActive={isActive} />
          })}
          <NavExternalItem href={RESUME_HREF} label="Resume" />
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex items-center justify-center"
            style={{ width: 36, height: 36, borderRadius: 9999, border: '1px solid #0f0f0e', color: '#0f0f0e', background: '#ffffff', transition: 'opacity 0.18s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.6' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
            </svg>
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col items-center justify-center gap-[5px] w-8 h-8"
          onClick={() => setMenuOpen(o => !o)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'block', width: 22, height: 1.5, background: '#0f0f0e', borderRadius: 2, transformOrigin: 'center' }}
          />
          <motion.span
            animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
            transition={{ duration: 0.15 }}
            style={{ display: 'block', width: 22, height: 1.5, background: '#0f0f0e', borderRadius: 2 }}
          />
          <motion.span
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'block', width: 22, height: 1.5, background: '#0f0f0e', borderRadius: 2, transformOrigin: 'center' }}
          />
        </button>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-30 flex flex-col justify-start px-8 pt-28 md:hidden"
            style={{ background: '#ffffff' }}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col gap-8 mt-8">
              {navLinks.map(([href, label], i) => {
                const isActive = location.pathname === '/about' && label === 'About'
                return (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      to={href}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        textDecoration: 'none',
                        fontSize: 'clamp(2.5rem, 10vw, 3.5rem)',
                        fontWeight: isActive ? 500 : 300,
                        color: isActive ? '#0f0f0e' : 'rgba(15,15,14,0.45)',
                        letterSpacing: '-0.02em',
                        lineHeight: 1,
                        display: 'block',
                        transition: 'color 0.2s',
                      }}
                    >
                      {label}
                    </Link>
                  </motion.div>
                )
              })}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: navLinks.length * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <a
                  href={RESUME_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    textDecoration: 'none',
                    fontSize: 'clamp(2.5rem, 10vw, 3.5rem)',
                    fontWeight: 300,
                    color: 'rgba(15,15,14,0.45)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                    display: 'block',
                    transition: 'color 0.2s',
                  }}
                >
                  Resume
                </a>
              </motion.div>
            </div>
            <div className="mt-auto pb-12">
              <p style={{ fontSize: '0.8rem', opacity: 0.3, fontWeight: 300 }}>tamaredesign@outlook.com</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
