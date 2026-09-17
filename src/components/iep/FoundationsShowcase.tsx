import { IEP } from './tokens'

const radiusTokens = [
  ['none', '0px', 'Sharp edges, tables, viewports, borders', 0],
  ['xs', '2px', 'Subtle items, status indicators, checkmarks', 2],
  ['sm', '4px', 'Badges, labels, tags, inline pills', 4],
  ['md', '8px', 'Buttons, inputs, selects, standard components', 8],
  ['lg', '12px', 'Cards, popovers, nested layout structures', 12],
  ['xl', '16px', 'Modals, large dialogs, media segments', 16],
  ['2xl', '24px', 'Promo banners, deep dashboard modules', 24],
  ['full', '999px', 'Pills, avatars, completely rounded buttons', 999],
] as const

const spacingTokens = [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96]

const elevationTokens = [
  ['None', 'none', 'Background sections, inline frames'],
  ['Small', 'y4 blur12 spread0 (8%)', 'Active states, clickable cards, filters'],
  ['Medium', 'y8 blur24 spread-4 (12%)', 'Popovers, dropdowns, floating menus'],
  ['Large', 'y16 blur40 spread-8 (18%)', 'Modals, priority focus panels, drawers'],
] as const

function FoundationTitle({ title, body }: { title: string; body: string }) {
  return (
    <div className="mb-8 md:mb-10">
      <h3 className="text-h3" style={{ color: IEP.ink }}>{title}</h3>
      <p className="mt-3 max-w-3xl text-body-18" style={{ color: IEP.muted }}>{body}</p>
    </div>
  )
}

export default function FoundationsShowcase() {
  return (
    <div className="mt-10 md:mt-14 flex flex-col gap-14 md:gap-20">
      <section>
        <FoundationTitle title="Corner Radius" body="The modular radius system ensures structural consistency and visual hierarchy across digital interfaces. Built on a strict geometric scale to map components appropriately to their viewport constraints." />
        <h4 className="mb-5 text-h4" style={{ color: IEP.ink }}>Scale &amp; Token Values</h4>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {radiusTokens.map(([name, value, usage, radius]) => (
            <div key={name} className="rounded-xl border p-4" style={{ borderColor: IEP.border, background: '#f8fafc' }}>
              <div className="flex h-24 items-center justify-center rounded-lg" style={{ background: '#fff' }}>
                <div className="h-16 w-16 border" style={{ borderRadius: radius, borderColor: IEP.accent, background: '#c9dbf8' }} />
              </div>
              <p className="mt-4 font-mono text-[12px] font-medium" style={{ color: IEP.ink }}>corner-radius/{name}</p>
              <p className="mt-1 font-mono text-[13px]" style={{ color: IEP.ink }}>{value}</p>
              <p className="mt-1 text-[12px] leading-5" style={{ color: IEP.muted }}>{usage}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <FoundationTitle title="Elevation" body="Visual depth communicates content hierarchy and focus priorities. Rather than decorative flare, the elevation scale leverages shadow properties to establish semantic layer ordering." />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {elevationTokens.map(([name, value, usage]) => (
            <div key={name} className="rounded-xl border p-5" style={{ borderColor: IEP.border, background: '#f8fafc' }}>
              <h4 className="text-[16px] font-medium" style={{ color: IEP.ink }}>Elevation: {name}</h4>
              <div className="mt-5 flex h-32 items-center justify-center rounded-lg" style={{ background: '#fff' }}>
                <div className="rounded-lg border px-6 py-3 text-[14px] font-medium" style={{ color: IEP.ink, borderColor: IEP.border, boxShadow: name === 'Small' ? '0 4px 12px rgba(2,6,23,.08)' : name === 'Medium' ? '0 8px 24px -4px rgba(2,6,23,.12)' : name === 'Large' ? '0 16px 40px -8px rgba(2,6,23,.18)' : 'none' }}>{name === 'None' ? 'Flat Card' : name === 'Small' ? 'Active Card' : name === 'Medium' ? 'Popover / Tooltip' : 'Modal Dialog'}</div>
              </div>
              <p className="mt-4 font-mono text-[12px]" style={{ color: IEP.muted }}>Value: {value}</p>
              <p className="mt-1 text-[12px] leading-5" style={{ color: IEP.muted }}>Usage: {usage}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <FoundationTitle title="Grid System" body="The IEP Layout foundation is structured around a fluid, responsive 12-column grid. This layout ensures visual alignment and dense structure across administrative screens and database consoles." />
        <div className="rounded-xl border p-5 md:p-6" style={{ borderColor: IEP.border, background: '#fff' }}>
          <h4 className="text-h4" style={{ color: IEP.ink }}>Schematic Layout Visualization</h4>
          <div className="mt-5 grid grid-cols-4 gap-2 md:grid-cols-8 lg:grid-cols-12">
            {Array.from({ length: 12 }, (_, i) => <div key={i} className="flex h-24 items-center justify-center rounded border text-[12px]" style={{ borderColor: '#f0b4b4', background: '#fff2f2', color: '#c0392b' }}>{i + 1}</div>)}
          </div>
          <div className="mt-4 flex flex-wrap justify-between gap-3 font-mono text-[12px]" style={{ color: IEP.muted }}><span>← Margin (80px) →</span><span>← Gutter (24px) →</span><span>12 Columns (Stretch)</span></div>
        </div>
      </section>

      <section>
        <FoundationTitle title="Spacing Foundations" body="The IEP Design System layout methodology is structured strictly around a 4px baseline grid. This ruleset ensures robust visual cadence, predictable responsive flow, and dense layout structures across dashboard screens and technical consoles." />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">
          <div className="overflow-hidden rounded-xl border" style={{ borderColor: IEP.border }}>
            {spacingTokens.map((px) => <div key={px} className="flex items-center gap-5 border-b px-4 py-3 last:border-b-0" style={{ borderColor: IEP.border, background: '#f8fafc' }}><code className="w-24 text-[12px]" style={{ color: IEP.ink }}>space/{px / 4 || 0}</code><span className="w-16 font-mono text-[13px]" style={{ color: IEP.ink }}>{px}px</span><span className="h-2 rounded-full" style={{ width: Math.max(px * 2, 4), background: IEP.accent }} /></div>)}
          </div>
          <img
            src="/images/iep-spacing-interface.png"
            alt="Figma Variables spacing interface showing spacing and corner-radius token groups."
            width={748}
            height={541}
            loading="lazy"
            decoding="async"
            className="w-full rounded-xl border object-cover"
            style={{ borderColor: IEP.border }}
          />
        </div>
      </section>
    </div>
  )
}

