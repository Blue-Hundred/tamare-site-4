import type { ReactNode } from 'react'
import { ImageIcon } from 'lucide-react'

// Neutral, easy-to-replace image slot that follows the existing case study
// image widths and treatment. Renders a labelled placeholder instead of a
// fabricated screenshot so real project assets can be dropped in later.
export default function CaseStudyImagePlaceholder({
  label,
  caption,
  aspect = '16 / 9',
  minHeight,
  className = '',
}: {
  label: string
  caption?: ReactNode
  aspect?: string
  minHeight?: number
  className?: string
}) {
  return (
    <figure className={`flex flex-col gap-3 ${className}`}>
      <div
        className="w-full rounded-[20px] flex items-center justify-center text-center px-6"
        style={{
          aspectRatio: minHeight ? undefined : aspect,
          minHeight,
          background: '#f4f4f5',
          border: '1px dashed rgba(15,15,14,0.18)',
        }}
      >
        <div className="flex flex-col items-center gap-3 max-w-[440px] py-10">
          <span
            className="flex items-center justify-center rounded-full"
            style={{ width: 44, height: 44, background: '#ffffff', border: '1px solid rgba(15,15,14,0.08)' }}
          >
            <ImageIcon size={20} strokeWidth={1.5} style={{ color: '#767675' }} aria-hidden="true" />
          </span>
          <span style={{ color: '#595958', fontSize: 14, fontWeight: 400, lineHeight: '22px' }}>{label}</span>
          <span
            style={{ color: '#a3a3a3', fontSize: 12, fontWeight: 300, letterSpacing: '0.14em', textTransform: 'uppercase' }}
          >
            Image placeholder
          </span>
        </div>
      </div>
      {caption ? (
        <figcaption style={{ color: '#767675', fontSize: 14, lineHeight: '24px' }}>{caption}</figcaption>
      ) : null}
    </figure>
  )
}
