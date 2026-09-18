import { IEP } from './tokens'

type Variant = 'primary' | 'neutralSolid' | 'neutralLight' | 'inverseSolid' | 'inverseLight'
type Size = 'XL' | 'L' | 'M' | 'S' | 'XS'

const sizes: Size[] = ['XL', 'L', 'M', 'S', 'XS']
const variants: { key: Variant; label: string }[] = [
  { key: 'primary', label: 'Primary' },
  { key: 'neutralSolid', label: 'Neutral solid' },
  { key: 'neutralLight', label: 'Neutral light' },
  { key: 'inverseSolid', label: 'Inverse solid' },
  { key: 'inverseLight', label: 'Inverse light' },
]

const sizeStyle: Record<Size, { padding: string; fontSize: number; dot: number }> = {
  XL: { padding: '11px 18px', fontSize: 15, dot: 9 },
  L: { padding: '9px 16px', fontSize: 14, dot: 8 },
  M: { padding: '7px 14px', fontSize: 13, dot: 7 },
  S: { padding: '6px 12px', fontSize: 12, dot: 6 },
  XS: { padding: '5px 10px', fontSize: 11, dot: 6 },
}

function variantStyle(variant: Variant, dark: boolean): { background: string; color: string; border: string; dot: string } {
  switch (variant) {
    case 'primary':
      return { background: IEP.accent, color: '#fff', border: 'transparent', dot: '#fff' }
    case 'neutralSolid':
      return { background: dark ? '#3a3a40' : '#1c1c1e', color: '#fff', border: 'transparent', dot: '#8a8a92' }
    case 'neutralLight':
      return {
        background: dark ? 'rgba(255,255,255,0.1)' : 'rgba(15,15,14,0.06)',
        color: dark ? '#fff' : IEP.ink,
        border: 'transparent',
        dot: dark ? '#c9c9cc' : '#8a8a92',
      }
    case 'inverseSolid':
      return {
        background: '#fff',
        color: IEP.ink,
        border: dark ? 'transparent' : `1px solid ${IEP.border}`,
        dot: IEP.ink,
      }
    case 'inverseLight':
      return { background: 'transparent', color: dark ? '#fff' : IEP.ink, border: 'transparent', dot: dark ? '#c9c9cc' : '#8a8a92' }
  }
}

function Btn({ size, variant, dark }: { size: Size; variant: Variant; dark: boolean }) {
  const s = sizeStyle[size]
  const v = variantStyle(variant, dark)
  const withAffix = variant === 'neutralSolid' || variant === 'neutralLight'
  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-full font-medium outline-none"
      style={{ padding: s.padding, fontSize: s.fontSize, background: v.background, color: v.color, border: v.border || 'transparent' }}
      tabIndex={-1}
    >
      <span style={{ width: s.dot, height: s.dot, borderRadius: 100, background: v.dot }} aria-hidden="true" />
      Button
      {withAffix && (
        <span aria-hidden="true" style={{ fontSize: s.fontSize, opacity: 0.9 }}>
          +
        </span>
      )}
    </button>
  )
}

function Panel({ dark }: { dark: boolean }) {
  const headColor = dark ? 'rgba(255,255,255,0.55)' : IEP.muted
  const rowBorder = dark ? 'rgba(255,255,255,0.08)' : IEP.border
  return (
    <div
      className="overflow-x-auto rounded-2xl"
      style={{ background: dark ? '#111114' : '#fff', border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : IEP.cardBorder}` }}
    >
      <div className="min-w-[720px]">
        <div
          className="grid items-center px-5 py-3"
          style={{ gridTemplateColumns: '64px repeat(5, 1fr)', borderBottom: `1px solid ${rowBorder}` }}
        >
          <span style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: headColor, fontWeight: 500 }}>Size</span>
          {variants.map(v => (
            <span key={v.key} style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: headColor, fontWeight: 500 }}>
              {v.label}
            </span>
          ))}
        </div>
        {sizes.map((size, i) => (
          <div
            key={size}
            className="grid items-center px-5 py-4"
            style={{ gridTemplateColumns: '64px repeat(5, 1fr)', borderBottom: i < sizes.length - 1 ? `1px solid ${rowBorder}` : 'none' }}
          >
            <span style={{ fontSize: 13, fontWeight: 600, color: dark ? '#fff' : IEP.ink }}>{size}</span>
            {variants.map(v => (
              <div key={v.key} className="flex items-center">
                <Btn size={size} variant={v.key} dark={dark} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ButtonMatrix() {
  return (
    <div className="flex flex-col gap-5">
      <Panel dark={false} />
      <Panel dark={true} />
    </div>
  )
}
