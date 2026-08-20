import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { useInView } from 'framer-motion'

function formatZero(value: string) {
  const match = value.match(/^(-?[\d.]+)/)
  if (!match) return value
  const decimals = match[1].includes('.') ? match[1].split('.')[1].length : 0
  return value.replace(match[1], (0).toFixed(decimals))
}

export default function CountUp({
  value,
  duration = 1.4,
  className,
  style,
}: {
  value: string
  duration?: number
  className?: string
  style?: CSSProperties
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })
  const [display, setDisplay] = useState(() => formatZero(value))

  useEffect(() => {
    if (!inView) return
    const match = value.match(/^(-?[\d.]+)/)
    if (!match) {
      setDisplay(value)
      return
    }
    const target = parseFloat(match[1])
    const decimals = match[1].includes('.') ? match[1].split('.')[1].length : 0
    const suffix = value.slice(match[1].length)
    const start = performance.now()
    let frame: number

    const tick = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = target * eased
      setDisplay(`${current.toFixed(decimals)}${suffix}`)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, value, duration])

  return (
    <span ref={ref} className={className} style={style}>
      {display}
    </span>
  )
}
