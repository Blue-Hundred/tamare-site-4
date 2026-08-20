import { useState, type MouseEvent } from 'react'
import { Link, useLocation } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [['/#work', 'Work'], ['/about', 'About'], ['/#contact', 'Contact']] as const
const RESUME_HREF = '/tamare-reese-resume.pdf'

// Full-site mobile nav (hamburger button + drawer). Shared by the homepage
// NavBar and every case study page's top bar, so the mobile menu content is
// identical everywhere it appears.
export default function MobileNavMenu() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const scrollToContact = (event: MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === '/about') {
      event.preventDefault()
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
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
                      onClick={event => {
                        setMenuOpen(false)
                        if (label === 'Contact') scrollToContact(event)
                      }}
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
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: (navLinks.length + 1) * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <a
                  href="https://www.linkedin.com/in/tamarereese/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center"
                  style={{ width: 40, height: 40, borderRadius: 9999, border: '1px solid #0f0f0e', color: '#0f0f0e', background: '#ffffff' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                  </svg>
                </a>
              </motion.div>
            </div>
            <div className="mt-auto pb-12">
              <a href="mailto:tamaredesign@outlook.com" style={{ fontSize: '0.8rem', opacity: 0.3, fontWeight: 300 }}>tamaredesign@outlook.com</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
