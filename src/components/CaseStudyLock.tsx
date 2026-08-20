import { useState } from 'react'
import { motion } from 'framer-motion'
import svgPaths from '../imports/Databases/svg-4toy70dlwj'

const PASSWORD = 'tamare2026'

export default function CaseStudyLock({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  const submit = () => {
    if (value.trim() === PASSWORD) {
      setError(false)
      onUnlock()
    } else {
      setError(true)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center px-6"
      style={{ background: '#ffffff' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center w-full"
        style={{ maxWidth: 380 }}
      >
        <svg width="34" height="45" viewBox="0 0 31.5145 42.0193" fill="none" aria-label="Tamaré Reese" role="img">
          <path d={svgPaths.p1b65ed80} fill="#0f0f0e" />
          <path d={svgPaths.p11c45c00} fill="#0f0f0e" />
          <path d={svgPaths.pd915a80} fill="#0f0f0e" />
          <path d={svgPaths.p2e1b9140} fill="#0f0f0e" />
          <path d={svgPaths.p32ecd500} fill="#0f0f0e" />
        </svg>

        <h1
          className="mt-8 text-center"
          style={{ fontSize: 22, fontWeight: 500, color: '#0f0f0e', letterSpacing: '-0.02em' }}
        >
          Protected Work
        </h1>
        <p
          className="mt-3 text-center"
          style={{ fontSize: 14, fontWeight: 300, color: '#595958', lineHeight: '22px' }}
        >
          These case studies are password protected. Enter the password to continue.
        </p>

        <div className="mt-8 w-full flex items-stretch" style={{ gap: 8 }}>
          <input
            type="password"
            value={value}
            autoFocus
            aria-label="Password"
            placeholder="Password"
            onChange={(e) => { setValue(e.target.value); if (error) setError(false) }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.nativeEvent.isComposing && e.keyCode !== 229) submit()
            }}
            className="flex-1 outline-none"
            style={{
              fontSize: 16,
              fontWeight: 300,
              color: '#0f0f0e',
              padding: '12px 14px',
              borderRadius: 6,
              border: `1px solid ${error ? '#c0392b' : '#dadada'}`,
              background: '#ffffff',
              transition: 'border-color 0.2s',
            }}
          />
          <button
            type="button"
            onClick={submit}
            aria-label="Unlock case studies"
            style={{
              flexShrink: 0,
              padding: '0 18px',
              borderRadius: 6,
              border: 'none',
              background: '#0f0f0e',
              color: '#ffffff',
              fontSize: 14,
              fontWeight: 400,
            }}
          >
            Enter
          </button>
        </div>

        <div className="mt-3 h-4 w-full text-center">
          {error && (
            <span style={{ fontSize: 13, fontWeight: 300, color: '#c0392b' }}>
              Incorrect password. Please try again.
            </span>
          )}
        </div>
      </motion.div>
    </div>
  )
}
