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
  return (
    <section className="border-t pt-10 md:pt-14" style={{ borderColor: IEP.border }} aria-labelledby="icon-library-title">
      <div className="mb-7">
        <h3 id="icon-library-title" className="text-h3" style={{ color: IEP.ink }}>Material Symbols Icon Library</h3>
        <p className="mt-2 max-w-2xl text-body-18" style={{ color: IEP.muted }}>A compact set of rounded symbols for database and infrastructure workflows.</p>
      </div>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
        {Object.entries(groups).flatMap(([name, icons]) => icons.map((icon) => (
          <button key={icon.token} type="button" aria-label={`${icon.label}, ${name}`} className="group relative flex aspect-square items-center justify-center rounded-xl border transition-all duration-200 hover:-translate-y-1 hover:border-[#8db5f0] hover:bg-[#eef5ff] hover:shadow-[0_8px_20px_rgba(32,88,170,0.14)] focus:outline-none focus:ring-2" style={{ borderColor: IEP.border, background: '#f8fafc', color: IEP.ink }}>
            <span className="material-symbols-rounded text-[24px] transition-transform duration-200 group-hover:scale-110">{icon.symbol}</span>
            <span className="pointer-events-none absolute inset-x-1 bottom-1 truncate rounded-md bg-[#162033] px-1 py-1 text-center text-[9px] text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus:opacity-100">{icon.label}</span>
          </button>
        ))) }
      </div>
    </section>
  )
}
