import { useState, useEffect, useRef, type ChangeEvent } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Sun, Moon } from 'lucide-react'
import { IEP } from './tokens'

type FontWeight = 300 | 400 | 500 | 600 | 700
type Theme = 'light' | 'dark'

const WEIGHT_OPTIONS: { label: string; value: FontWeight }[] = [
  { label: 'Light', value: 300 },
  { label: 'Regular', value: 400 },
  { label: 'Medium', value: 500 },
  { label: 'Semibold', value: 600 },
  { label: 'Bold', value: 700 },
]

const WEIGHT_LABELS: Record<FontWeight, string> = {
  300: 'Light 300',
  400: 'Regular 400',
  500: 'Medium 500',
  600: 'Semibold 600',
  700: 'Bold 700',
}

const SPECIMEN_TEXT =
  'Figtree is a clean, modern sans serif designed for clarity across digital experiences. Its open forms, balanced proportions, and flexible weight range make it well suited for complex interfaces where hierarchy, readability, and consistency matter.'

const getRoleForSize = (size: number): string => {
  if (size >= 72) return 'Display'
  if (size >= 40) return 'Headline'
  if (size >= 24) return 'Title'
  if (size >= 18) return 'Body Large'
  if (size >= 14) return 'Body'
  return 'Caption'
}

const getLineHeight = (size: number): number => {
  if (size >= 48) return 1.2
  if (size >= 32) return 1.3
  if (size >= 18) return 1.4
  return 1.5
}

const getLetterSpacing = (size: number): number => {
  if (size >= 48) return -0.3
  if (size >= 32) return -0.1
  return 0
}

const estimateWordsInView = (size: number, specimenHeight: number = 400): number => {
  const lineHeight = getLineHeight(size)
  const linesVisible = Math.floor(specimenHeight / (size * lineHeight))
  const avgWordsPerLine = Math.max(2, Math.floor(48 / (size * 0.6)))
  return Math.max(1, Math.floor(linesVisible * avgWordsPerLine))
}

export default function InteractiveTypeScale() {
  const [fontSize, setFontSize] = useState(96)
  const [weight, setWeight] = useState<FontWeight>(400)
  const [isPlaying, setIsPlaying] = useState(true)
  const [theme, setTheme] = useState<Theme>('light')
  const animationRef = useRef<NodeJS.Timeout | null>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Detect reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Autoplay animation
  useEffect(() => {
    if (!isPlaying || prefersReducedMotion) {
      if (animationRef.current) clearTimeout(animationRef.current)
      return
    }

    const animate = () => {
      const startTime = Date.now()
      const duration = 7000 // 7 seconds per direction

      const animate_frame = () => {
        const elapsed = Date.now() - startTime
        if (elapsed < duration) {
          const progress = elapsed / duration
          setFontSize(96 - progress * 84) // 96 to 12
          animationRef.current = setTimeout(animate_frame, 16)
        } else {
          setFontSize(12)
          animationRef.current = setTimeout(() => {
            const startTime2 = Date.now()
            const animate_reverse = () => {
              const elapsed = Date.now() - startTime2
              if (elapsed < duration) {
                const progress = elapsed / duration
                setFontSize(12 + progress * 84) // 12 to 96
                animationRef.current = setTimeout(animate_reverse, 16)
              } else {
                setFontSize(96)
                animationRef.current = setTimeout(animate, 1000) // 1s pause
              }
            }
            animate_reverse()
          }, 1000) // 1s pause
        }
      }
      animate_frame()
    }

    animationRef.current = setTimeout(animate, 100)
    return () => {
      if (animationRef.current) clearTimeout(animationRef.current)
    }
  }, [isPlaying, prefersReducedMotion])

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFontSize(parseFloat(e.target.value))
    setIsPlaying(false)
  }

  const role = getRoleForSize(fontSize)
  const lh = getLineHeight(fontSize)
  const ls = getLetterSpacing(fontSize)
  const wordsInView = estimateWordsInView(fontSize)

  const isDark = theme === 'dark'
  const bgColor = isDark ? '#1a1a1a' : '#ffffff'
  const textColor = isDark ? '#ffffff' : '#0f0f0e'
  const mutedColor = isDark ? '#999999' : '#767675'
  const borderColor = isDark ? '#333333' : IEP.border

  return (
    <div
      className="w-full h-[400px] max-h-[400px] rounded-2xl p-4 md:p-6 flex flex-col gap-4 md:gap-5 overflow-hidden"
      style={{
        border: `1px solid ${borderColor}`,
        background: bgColor,
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}
    >
      {/* Header */}
      <div className="flex items-baseline justify-between gap-4 flex-wrap">
        <div style={{ fontSize: 14, color: mutedColor, fontWeight: 400 }}>
          Figtree · {WEIGHT_LABELS[weight]}
        </div>
        <div style={{ fontSize: 14, color: mutedColor, fontWeight: 400 }}>
          {Math.round(fontSize)} px · {role}
        </div>
      </div>

      {/* Specimen Area */}
      <div
        className="relative min-h-0 flex-1 w-full overflow-hidden rounded-lg flex items-start p-4 md:p-6"
        style={{
          minHeight: 0,
          background: isDark ? '#0f0f0e' : '#f8f8f8',
          fontFamily: 'Figtree, sans-serif',
        }}
      >
        <motion.div
          animate={{ fontSize }}
          transition={{ type: 'tween', duration: 0.3 }}
          style={{
            fontWeight: weight,
            lineHeight: lh,
            letterSpacing: `${ls}px`,
            color: textColor,
            maxWidth: '100%',
            maxHeight: '100%',
            overflow: 'hidden',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {SPECIMEN_TEXT.repeat(Math.max(1, Math.ceil(400 / (fontSize * lh))))}
        </motion.div>

        {/* Gradient fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, rgba(${isDark ? '15,15,14' : '248,248,248'},0), rgba(${isDark ? '15,15,14' : '248,248,248'},1))`,
          }}
        />
      </div>

      {/* Size Control */}
      <div className="flex items-center gap-4 md:gap-6 flex-wrap">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          disabled={prefersReducedMotion}
          aria-label={isPlaying ? 'Pause animation' : 'Play animation'}
          className="p-2 rounded-full"
          style={{
            border: `1px solid ${borderColor}`,
            background: bgColor,
            color: textColor,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = isDark ? '#2a2a2a' : '#f0f0f0'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = bgColor
          }}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>

        <input
          type="range"
          min="12"
          max="96"
          step="0.1"
          value={fontSize}
          onChange={handleSliderChange}
          className="flex-1 min-w-48"
          aria-label="Font size control"
          style={{
            accentColor: IEP.accent,
          }}
        />

        <div style={{ fontSize: 13, color: mutedColor, fontWeight: 400, whiteSpace: 'nowrap' }}>
          ≈ {wordsInView} words
        </div>
      </div>

      {/* Weight Controls */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex gap-2 flex-wrap">
          {WEIGHT_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => setWeight(opt.value)}
              className="px-4 py-2 rounded-full transition-all text-sm"
              style={{
                fontWeight: opt.value,
                fontFamily: 'Figtree, sans-serif',
                border: weight === opt.value ? 'none' : `1px solid ${borderColor}`,
                background: weight === opt.value ? IEP.accent : bgColor,
                color: weight === opt.value ? '#ffffff' : textColor,
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          className="p-2 rounded-full"
          style={{
            border: `1px solid ${borderColor}`,
            background: bgColor,
            color: textColor,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = isDark ? '#2a2a2a' : '#f0f0f0'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = bgColor
          }}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </div>
  )
}
