import type { ReactNode } from 'react'

// Real case study screenshot slot. Mirrors the widths, rounding, and caption
// treatment of CaseStudyImagePlaceholder but renders an optimized, lazy-loaded
// image so the page below the fold does not block on decoding large PNGs.
export default function CaseStudyImage({
  src,
  alt,
  caption,
  aspect = '16 / 9',
  width,
  height,
  className = '',
}: {
  src: string
  alt: string
  caption?: ReactNode
  aspect?: string
  width?: number
  height?: number
  className?: string
}) {
  return (
    <figure className={`flex flex-col gap-3 ${className}`}>
      <img
        src={src || '/placeholder.svg'}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className="w-full rounded-[20px]"
        style={{
          aspectRatio: aspect,
          objectFit: 'cover',
          objectPosition: 'top',
          border: '1px solid rgba(15,15,14,0.08)',
          background: '#f4f4f5',
        }}
      />
      {caption ? (
        <figcaption style={{ color: '#767675', fontSize: 14, lineHeight: '24px' }}>{caption}</figcaption>
      ) : null}
    </figure>
  )
}
