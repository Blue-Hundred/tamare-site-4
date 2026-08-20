import { useState, type MouseEvent } from 'react'
import { Link, useLocation } from 'react-router'
import { motion } from 'framer-motion'
import MobileNavMenu from './MobileNavMenu'

function NavItem({ href, label, isActive, onClick }: { href: string; label: string; isActive: boolean; onClick?: (event: MouseEvent<HTMLAnchorElement>) => void }) {
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
      onClick={onClick}
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
const RESUME_HREF = '/tamare-reese-resume.pdf'

export default function NavBar() {
  const location = useLocation()
  const scrollToContact = (event: MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === '/about') {
      event.preventDefault()
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 md:px-14 py-6"
        style={{ background: '#ffffff', borderBottom: '1px solid rgba(15,15,14,0.06)' }}
      >
        <Link to="/" className="flex items-center" style={{ textDecoration: 'none' }} aria-label="Tamaré Reese — home">
          <img src="/tamare-reese-logo.svg" alt="Tamaré Reese" width={132} height={24} style={{ height: 24, width: 'auto', display: 'block' }} />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(([href, label]) => {
            const isActive = location.pathname === '/about' && label === 'About'
            return <NavItem key={label} href={href} label={label} isActive={isActive} onClick={label === 'Contact' ? scrollToContact : undefined} />
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

        <MobileNavMenu />
      </nav>
    </>
  )
}
