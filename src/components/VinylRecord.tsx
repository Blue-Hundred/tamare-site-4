import { useState } from 'react'
import { motion } from 'framer-motion'

type VinylRecordProps = {
  coverImage: string
  /** Full vinyl-record image (disc + label) that slides out and spins. */
  recordImage: string
  /** 'hover' reveals the record on hover; 'revealed' keeps it slid out. */
  variant?: 'hover' | 'revealed'
  showLighting?: boolean
  href?: string
  title?: string
  className?: string
}

// Recreation of the Framer "Vinyl Record" component (Vinyl-Record-yUlqIh):
// an album sleeve with a vinyl disc that slides out to the right and spins on
// hover. Tween, 0.3s, ease [.19, 0, .39, 1] — matching the original module.
const EASE: [number, number, number, number] = [0.19, 0, 0.39, 1]

export default function VinylRecord({
  coverImage,
  recordImage,
  variant = 'hover',
  showLighting = true,
  href,
  title,
  className = '',
}: VinylRecordProps) {
  const [hovered, setHovered] = useState(false)
  const revealed = variant === 'revealed' || hovered

  const content = (
    <motion.div
      className={className}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '1 / 1',
        cursor: href ? 'pointer' : 'default',
        // Lift the hovered card so its slid-out disc paints above neighbors
        zIndex: revealed ? 10 : 1,
      }}
    >
      {/* Vinyl disc — sits behind the sleeve and slides out to the right */}
      <motion.div
        aria-hidden="true"
        initial={false}
        animate={{ x: revealed ? '32%' : '2%' }}
        transition={{ type: 'tween', duration: 0.3, ease: EASE }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
        }}
      >
        <motion.img
          src={recordImage}
          alt=""
          aria-hidden="true"
          loading="lazy"
          initial={false}
          animate={{ rotate: revealed ? 360 : 0 }}
          transition={
            revealed
              ? { rotate: { repeat: Infinity, ease: 'linear', duration: 4 } }
              : { rotate: { duration: 0.3, ease: EASE } }
          }
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
            filter: 'drop-shadow(0 12px 30px rgba(0,0,0,0.35))',
          }}
        />
      </motion.div>

      {/* Album cover sleeve — sits on top of the disc */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 4,
          overflow: 'hidden',
          zIndex: 2,
          boxShadow: revealed
            ? '0 18px 40px rgba(0,0,0,0.28)'
            : '0 8px 20px rgba(0,0,0,0.16)',
          transition: 'box-shadow 0.3s',
        }}
      >
        <img
          src={coverImage}
          alt={title ? `${title} album cover` : 'Album cover'}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          loading="lazy"
        />
        {showLighting && (
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(100% 96% at 0% 0%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)',
              pointerEvents: 'none',
            }}
          />
        )}
      </div>
    </motion.div>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textDecoration: 'none' }}>
        {content}
      </a>
    )
  }
  return content
}
