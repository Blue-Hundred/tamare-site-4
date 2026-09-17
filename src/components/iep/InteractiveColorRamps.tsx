import { useState } from 'react'
import { IEP } from './tokens'

type Swatch = {
  step: string
  hex: string
  wcag?: string
}

type Ramp = {
  name: string
  token: string
  swatches: Swatch[]
}

const ramps: Ramp[] = [
  {
    name: 'Blue',
    token: 'color/blue/*',
    swatches: [
      { step: '50', hex: '#EFF6FF' }, { step: '100', hex: '#DBEAFE' }, { step: '200', hex: '#BFDBFE' },
      { step: '300', hex: '#93C5FD' }, { step: '400', hex: '#60A5FA' }, { step: '500', hex: '#2F7DF4', wcag: 'AA-L 3.92:1' },
      { step: '600', hex: '#0060F0', wcag: 'AA 5.34:1' }, { step: '700', hex: '#004CC0', wcag: 'AA 7.51:1' },
      { step: '800', hex: '#003A91', wcag: 'AAA 10.43:1' }, { step: '900', hex: '#002A6B', wcag: 'AAA 13.61:1' }, { step: '950', hex: '#001A45', wcag: 'AAA 17.02:1' },
    ],
  },
  {
    name: 'Gray',
    token: 'color/gray/*',
    swatches: [
      { step: '0', hex: '#FFFFFF' }, { step: '50', hex: '#F8FAFC' }, { step: '100', hex: '#F1F5F9' }, { step: '200', hex: '#E2E8F0' },
      { step: '300', hex: '#CBD5E1' }, { step: '400', hex: '#94A3B8' }, { step: '500', hex: '#64748B', wcag: 'AA 4.76:1' },
      { step: '600', hex: '#475569', wcag: 'AAA 7.58:1' }, { step: '700', hex: '#334155', wcag: 'AAA 10.35:1' }, { step: '800', hex: '#1E293B', wcag: 'AAA 14.63:1' },
      { step: '900', hex: '#0F172A', wcag: 'AAA 17.85:1' }, { step: '950', hex: '#020617', wcag: 'AAA 20.17:1' },
    ],
  },
  {
    name: 'Red',
    token: 'color/red/*',
    swatches: [
      { step: '50', hex: '#FEF2F2' }, { step: '100', hex: '#FEE2E2' }, { step: '200', hex: '#FECACA' }, { step: '300', hex: '#FCA5A5' },
      { step: '400', hex: '#F87171' }, { step: '500', hex: '#EF4444', wcag: 'AA-L 3.76:1' }, { step: '600', hex: '#DC2626', wcag: 'AA 4.83:1' },
      { step: '700', hex: '#B91C1C', wcag: 'AA 6.47:1' }, { step: '800', hex: '#991B1B', wcag: 'AAA 8.31:1' }, { step: '900', hex: '#7F1D1D', wcag: 'AAA 10.02:1' }, { step: '950', hex: '#450A0A', wcag: 'AAA 16.14:1' },
    ],
  },
  {
    name: 'Green',
    token: 'color/green/*',
    swatches: [
      { step: '50', hex: '#F0FDF4' }, { step: '100', hex: '#DCFCE7' }, { step: '200', hex: '#BBF7D0' }, { step: '300', hex: '#86EFAC' },
      { step: '400', hex: '#4ADE80' }, { step: '500', hex: '#22C55E', wcag: 'AA-L 3.30:1' }, { step: '600', hex: '#16A34A', wcag: 'AA 5.02:1' },
      { step: '700', hex: '#15803D', wcag: 'AAA 7.13:1' }, { step: '800', hex: '#166534', wcag: 'AAA 9.11:1' }, { step: '900', hex: '#14532D', wcag: 'AAA 9.11:1' }, { step: '950', hex: '#052E16', wcag: 'AAA 14.91:1' },
    ],
  },
  {
    name: 'Amber',
    token: 'color/amber/*',
    swatches: [
      { step: '50', hex: '#FFFBEB' }, { step: '100', hex: '#FEF3C7' }, { step: '200', hex: '#FDE68A' }, { step: '300', hex: '#FCD34D' },
      { step: '400', hex: '#FBBF24' }, { step: '500', hex: '#F59E0B', wcag: 'AA-L 3.19:1' }, { step: '600', hex: '#D97706', wcag: 'AA 5.02:1' },
      { step: '700', hex: '#B45309', wcag: 'AAA 7.09:1' }, { step: '800', hex: '#92400E', wcag: 'AAA 9.07:1' }, { step: '900', hex: '#78350F', wcag: 'AAA 9.07:1' }, { step: '950', hex: '#451A03', wcag: 'AAA 14.98:1' },
    ],
  },
  {
    name: 'Purple',
    token: 'color/purple/*',
    swatches: [
      { step: '50', hex: '#FAF5FF' }, { step: '100', hex: '#F3E8FF' }, { step: '200', hex: '#E9D5FF' }, { step: '300', hex: '#D8B4FE' },
      { step: '400', hex: '#C084FC' }, { step: '500', hex: '#A855F7', wcag: 'AA-L 3.96:1' }, { step: '600', hex: '#9333EA', wcag: 'AA 5.38:1' },
      { step: '700', hex: '#7E22CE', wcag: 'AA 6.98:1' }, { step: '800', hex: '#6B21A8', wcag: 'AAA 8.72:1' }, { step: '900', hex: '#581C87', wcag: 'AAA 10.88:1' }, { step: '950', hex: '#3B0764', wcag: 'AAA 15.00:1' },
    ],
  },
]

export default function InteractiveColorRamps() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <section className="w-full overflow-hidden rounded-[20px] border p-5 md:p-8" style={{ borderColor: IEP.cardBorder, background: IEP.surface }} aria-label="Primitive color ramps">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <h2 className="text-h3" style={{ color: IEP.ink }}>Primitive Colors</h2>
        <p className="text-body-14" style={{ color: IEP.muted }}>Hover over a swatch for its HEX and WCAG contrast.</p>
      </div>
      <div className="flex flex-col divide-y" style={{ borderColor: IEP.border }}>
        {ramps.map((ramp) => (
          <div key={ramp.name} className="py-5 first:pt-0 last:pb-0">
            <div className="mb-3 flex items-baseline gap-4">
              <h3 className="w-24 shrink-0 text-h4" style={{ color: IEP.ink }}>{ramp.name}</h3>
              <code className="text-body-14" style={{ color: IEP.muted }}>{ramp.token}</code>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11">
              {ramp.swatches.map((swatch) => {
                const id = `${ramp.name}-${swatch.step}`
                const isActive = active === id
                return (
                  <button
                    key={id}
                    type="button"
                    className="group relative min-w-0 rounded-xl border p-2 text-left transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                    style={{ borderColor: isActive ? IEP.accent : IEP.border, boxShadow: isActive ? `0 0 0 1px ${IEP.accent}` : undefined }}
                    onMouseEnter={() => setActive(id)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(id)}
                    onBlur={() => setActive(null)}
                    aria-label={`${ramp.name} ${swatch.step}, ${swatch.hex}${swatch.wcag ? `, ${swatch.wcag}` : ''}`}
                  >
                    <span className="mb-2 block aspect-[1.7] w-full rounded-md border" style={{ background: swatch.hex, borderColor: 'rgba(15,15,14,0.08)' }} />
                    <span className="block text-body-14 font-medium" style={{ color: IEP.ink }}>{swatch.step}</span>
                    <span className="mt-1 block min-h-4" aria-hidden="true" />
                    {isActive && (
                      <span className="pointer-events-none absolute inset-x-2 bottom-2 rounded bg-[rgba(15,15,14,0.92)] px-2 py-1 text-center text-[11px] text-white shadow-lg">
                        {swatch.hex}{swatch.wcag ? ` · ${swatch.wcag}` : ''}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
