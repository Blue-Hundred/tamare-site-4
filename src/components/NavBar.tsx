import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'

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

const navLinks = [['/#work', 'Work'], ['/about', 'About'], ['/#contact', 'Resume']] as const

export default function NavBar() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 md:px-14 py-6"
        style={{ background: '#ffffff', borderBottom: '1px solid rgba(15,15,14,0.06)' }}
      >
        <Link
          to="/"
          style={{ letterSpacing: '0.04em', textDecoration: 'none', color: '#0f0f0e', fontSize: '0.95rem', fontWeight: 500 }}
        >
          Tamaré Reese
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(([href, label]) => {
            const isActive = location.pathname === '/about' && label === 'About'
            return <NavItem key={href} href={href} label={label} isActive={isActive} />
          })}
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
            className="fixed inset-0 z-30 flex flex-col justify-center px-8 md:hidden"
            style={{ background: '#ffffff' }}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col gap-8 mt-16">
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
            </div>
            <div className="mt-auto pb-12">
              <p style={{ fontSize: '0.8rem', opacity: 0.3, fontWeight: 300 }}>alex@mercer.studio</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
