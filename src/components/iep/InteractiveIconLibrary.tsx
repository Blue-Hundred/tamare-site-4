import { useMemo, useState } from 'react'
import { IEP } from './tokens'

type IconItem = { label: string; symbol: string; token: string }

const groups: Record<string, IconItem[]> = {
  General: [
    { label: 'Settings', symbol: 'settings', token: 'Icon/General/Settings' },
    { label: 'Search', symbol: 'search', token: 'Icon/General/Search' },
    { label: 'Help', symbol: 'help', token: 'Icon/General/Help' },
    { label: 'Info', symbol: 'info', token: 'Icon/General/Info' },
    { label: 'Filter', symbol: 'filter_list', token: 'Icon/General/Filter' },
    { label: 'More', symbol: 'more_horiz', token: 'Icon/General/More' },
  ],
  Navigation: [
    { label: 'Recent services', symbol: 'history', token: 'Icon/Navigation/RecentServices' },
    { label: 'Home', symbol: 'home', token: 'Icon/Navigation/Home' },
    { label: 'Menu', symbol: 'menu', token: 'Icon/Navigation/Menu' },
    { label: 'Back', symbol: 'arrow_back', token: 'Icon/Navigation/Back' },
    { label: 'Forward', symbol: 'arrow_forward', token: 'Icon/Navigation/Forward' },
    { label: 'Expand', symbol: 'expand_more', token: 'Icon/Navigation/Expand' },
  ],
  Actions: [
    { label: 'Create service', symbol: 'add_circle', token: 'Icon/Actions/CreateService' },
    { label: 'Configuration', symbol: 'tune', token: 'Icon/Actions/Configuration' },
    { label: 'Add', symbol: 'add', token: 'Icon/Actions/Add' },
    { label: 'Close', symbol: 'close', token: 'Icon/Actions/Close' },
    { label: 'Refresh', symbol: 'refresh', token: 'Icon/Actions/Refresh' },
    { label: 'Download', symbol: 'download', token: 'Icon/Actions/Download' },
  ],
  Status: [
    { label: 'Healthy', symbol: 'check_circle', token: 'Icon/Status/Healthy' },
    { label: 'Warning', symbol: 'warning', token: 'Icon/Status/Warning' },
    { label: 'Error', symbol: 'error', token: 'Icon/Status/Error' },
    { label: 'Information', symbol: 'info', token: 'Icon/Status/Information' },
    { label: 'Pending', symbol: 'pending', token: 'Icon/Status/Pending' },
    { label: 'Offline', symbol: 'cloud_off', token: 'Icon/Status/Offline' },
  ],
  Database: [
    { label: 'Graph database', symbol: 'hub', token: 'Icon/Database/Graph' },
    { label: 'Database instance', symbol: 'database', token: 'Icon/Database/Instance' },
    { label: 'Storage', symbol: 'storage', token: 'Icon/Database/Storage' },
    { label: 'Table', symbol: 'table_chart', token: 'Icon/Database/Table' },
    { label: 'Schema', symbol: 'schema', token: 'Icon/Database/Schema' },
    { label: 'Backup', symbol: 'backup', token: 'Icon/Database/Backup' },
  ],
  Applications: [
    { label: 'Applications', symbol: 'apps', token: 'Icon/Infrastructure/Application' },
    { label: 'Web', symbol: 'web', token: 'Icon/Applications/Web' },
    { label: 'Terminal', symbol: 'terminal', token: 'Icon/Applications/Terminal' },
    { label: 'Code', symbol: 'code', token: 'Icon/Applications/Code' },
    { label: 'API', symbol: 'api', token: 'Icon/Applications/API' },
    { label: 'Extension', symbol: 'extension', token: 'Icon/Applications/Extension' },
  ],
  Performance: [
    { label: 'Performance & health', symbol: 'monitoring', token: 'Icon/Performance/Health' },
    { label: 'Speed', symbol: 'speed', token: 'Icon/Performance/Speed' },
    { label: 'Analytics', symbol: 'analytics', token: 'Icon/Performance/Analytics' },
    { label: 'Timeline', symbol: 'timeline', token: 'Icon/Performance/Timeline' },
    { label: 'Insights', symbol: 'insights', token: 'Icon/Performance/Insights' },
    { label: 'Query stats', symbol: 'query_stats', token: 'Icon/Performance/QueryStats' },
  ],
  Infrastructure: [
    { label: 'Connection', symbol: 'link', token: 'Icon/Infrastructure/Connection' },
    { label: 'Provisioning', symbol: 'layers', token: 'Icon/Infrastructure/Provisioning' },
    { label: 'DNS', symbol: 'dns', token: 'Icon/Infrastructure/DNS' },
    { label: 'Cloud', symbol: 'cloud', token: 'Icon/Infrastructure/Cloud' },
    { label: 'Containers', symbol: 'deployed_code', token: 'Icon/Infrastructure/Containers' },
    { label: 'Security', symbol: 'shield', token: 'Icon/Infrastructure/Security' },
  ],
  Pricing: [
    { label: 'Pricing', symbol: 'sell', token: 'Icon/Pricing/Pricing' },
    { label: 'Payments', symbol: 'payments', token: 'Icon/Pricing/Payments' },
    { label: 'Receipt', symbol: 'receipt_long', token: 'Icon/Pricing/Receipt' },
    { label: 'Credit card', symbol: 'credit_card', token: 'Icon/Pricing/CreditCard' },
    { label: 'Savings', symbol: 'savings', token: 'Icon/Pricing/Savings' },
    { label: 'Trend', symbol: 'trending_up', token: 'Icon/Pricing/Trend' },
  ],
}

export default function InteractiveIconLibrary() {
  const [query, setQuery] = useState('')
  const [size, setSize] = useState<20 | 24>(24)
  const filteredGroups = useMemo(() => Object.entries(groups).map(([name, icons]) => [name, icons.filter((icon) => `${icon.label} ${icon.symbol} ${icon.token}`.toLowerCase().includes(query.toLowerCase()))] as const).filter(([, icons]) => icons.length), [query])

  return (
    <section className="border-t pt-10 md:pt-14" style={{ borderColor: IEP.border }} aria-labelledby="icon-library-title">
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: IEP.accent }}>Icons</p>
          <h3 id="icon-library-title" className="mt-2 text-h3" style={{ color: IEP.ink }}>Material Symbols Icon Library</h3>
          <p className="mt-3 max-w-3xl text-body-18" style={{ color: IEP.muted }}>Rounded Material Symbols for database and infrastructure workflows. Hover or focus any icon to inspect its semantic token.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <label className="sr-only" htmlFor="icon-search">Search icons</label>
          <input id="icon-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search icons" className="h-10 rounded-lg border px-3 text-[13px] outline-none focus:ring-2" style={{ borderColor: IEP.border, color: IEP.ink }} />
          <div className="flex rounded-lg border p-1" style={{ borderColor: IEP.border }} aria-label="Icon preview size">
            {[24, 20].map((value) => <button key={value} type="button" onClick={() => setSize(value as 20 | 24)} className="rounded-md px-3 py-1.5 text-[12px]" style={{ background: size === value ? IEP.ink : 'transparent', color: size === value ? '#fff' : IEP.muted }}>{value}×{value}</button>)}
          </div>
        </div>
      </div>
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[['24 × 24', 'Base icon size for navigation, actions, cards, and default controls.'], ['20 × 20', 'Dense-interface size for tables, compact controls, and metadata rows.']].map(([title, body]) => <div key={title} className="rounded-xl border p-4" style={{ borderColor: IEP.border, background: '#f8fafc' }}><p className="text-h4" style={{ color: IEP.ink }}>{title}</p><p className="mt-2 text-[12px]" style={{ color: IEP.muted }}>{body}</p></div>)}
      </div>
      <div className="flex flex-col gap-10">
        {filteredGroups.map(([name, icons]) => <div key={name}><h4 className="mb-4 text-h4" style={{ color: IEP.ink }}>{name}</h4><div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">{icons.map((icon) => <button key={icon.token} type="button" className="group rounded-xl border p-4 text-left transition-colors hover:border-[#8db5f0] focus:outline-none focus:ring-2" style={{ borderColor: IEP.border, background: '#f8fafc' }}><span className="flex h-16 items-center rounded-lg bg-white px-3" style={{ color: name === 'Status' && icon.label === 'Healthy' ? '#08a650' : name === 'Status' && icon.label === 'Warning' ? '#c85d00' : name === 'Status' && icon.label === 'Error' ? '#e32636' : IEP.ink }}><span className="material-symbols-rounded" style={{ fontSize: size }}>{icon.symbol}</span></span><span className="mt-4 block text-[14px] font-medium" style={{ color: IEP.ink }}>{icon.label}</span><span className="mt-1 block font-mono text-[11px]" style={{ color: IEP.muted }}>{icon.symbol}</span><span className="mt-2 block max-h-0 overflow-hidden font-mono text-[10px] opacity-0 transition-all group-hover:max-h-6 group-hover:opacity-100 group-focus:max-h-6 group-focus:opacity-100" style={{ color: IEP.accent }}>{icon.token}</span></button>)}</div></div>)}
      </div>
    </section>
  )
}
