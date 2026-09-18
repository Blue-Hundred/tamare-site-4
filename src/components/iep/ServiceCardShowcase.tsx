import { useState, type ReactNode } from 'react'
import { IEP } from './tokens'

type Service = {
  tech: string
  product: string
  id: string
  env: string
  status: string
  tone: 'ok' | 'warn'
  size: string
  logo: string | null
  meta: [string, string][]
}

const CDN = 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons'

const services: Service[] = [
  {
    tech: 'Graph',
    product: 'TigerGraph',
    id: 'D0002',
    env: 'PROD',
    status: 'Active',
    tone: 'ok',
    size: 'Large',
    logo: null,
    meta: [['Deployment', '900123'], ['Service', '932407'], ['Nodes', '3'], ['Provider', 'AWS'], ['Version', '4.2.0']],
  },
  {
    tech: 'Relational',
    product: 'CockroachDB',
    id: 'D0004',
    env: 'PROD',
    status: 'Active',
    tone: 'ok',
    size: 'Large',
    logo: `${CDN}/cockroachdb/default.svg`,
    meta: [['Deployment', '900123'], ['Service', '932407'], ['Nodes', '3'], ['Provider', 'AWS'], ['Version', '24.2.0']],
  },
  {
    tech: 'Non-relational',
    product: 'Cassandra',
    id: 'D0005',
    env: 'PROD',
    status: 'Degraded',
    tone: 'warn',
    size: 'Medium',
    logo: `${CDN}/cassandra/default.svg`,
    meta: [['Deployment', '900123'], ['Service', '932407'], ['Nodes', '6'], ['Provider', 'AWS'], ['Version', '4.1.3']],
  },
  {
    tech: 'Other',
    product: 'Redis',
    id: 'D0006',
    env: 'PROD',
    status: 'Active',
    tone: 'ok',
    size: 'Medium',
    logo: `${CDN}/redis/default.svg`,
    meta: [['Deployment', '900123'], ['Service', '932407'], ['Nodes', '3'], ['Provider', 'AWS'], ['Version', '7.2.4']],
  },
]

function Region({ label, show, children }: { label: string; show: boolean; children: ReactNode }) {
  return (
    <div
      style={
        show
          ? { border: `1px dashed ${IEP.accent}`, borderRadius: 8, padding: 8, background: 'rgba(54,81,212,0.03)' }
          : undefined
      }
    >
      {show && (
        <div
          className="mb-1.5"
          style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: IEP.accent, fontWeight: 600 }}
        >
          {label}
        </div>
      )}
      {children}
    </div>
  )
}

function ServiceCard({ service, show }: { service: Service; show: boolean }) {
  const statusFg = service.tone === 'ok' ? '#2f9e6b' : '#c07d1a'
  const statusBg = service.tone === 'ok' ? 'rgba(47,158,107,0.1)' : 'rgba(192,125,26,0.12)'
  return (
    <div className="rounded-2xl p-5 flex flex-col gap-4" style={{ border: `1px solid ${IEP.border}`, background: '#fff' }}>
      <Region label="Header" show={show}>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <span
              className="inline-flex items-center justify-center shrink-0"
              style={{ width: 28, height: 28, borderRadius: 100, border: `1px solid ${IEP.border}`, background: '#fff' }}
              aria-hidden="true"
            >
              {service.logo ? (
                <img src={service.logo} alt="" width={18} height={18} style={{ display: 'block' }} />
              ) : (
                <span style={{ fontSize: 10, fontWeight: 600, color: IEP.accent }}>{service.product.slice(0, 2)}</span>
              )}
            </span>
            <span className="truncate" style={{ fontSize: 15, fontWeight: 600, color: IEP.ink }}>
              {service.id} {service.product}
            </span>
          </div>
          <span
            className="shrink-0"
            style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', color: IEP.muted, padding: '3px 9px', borderRadius: 100, border: `1px solid ${IEP.border}` }}
          >
            {service.env}
          </span>
        </div>
      </Region>
      <Region label="Status" show={show}>
        <div className="flex items-center gap-2">
          <span style={{ fontSize: 12, fontWeight: 500, color: statusFg, background: statusBg, padding: '3px 10px', borderRadius: 100 }}>
            {service.status}
          </span>
          <span style={{ fontSize: 12, fontWeight: 500, color: IEP.ink, background: '#f4f4f5', padding: '3px 10px', borderRadius: 100 }}>
            {service.size}
          </span>
        </div>
      </Region>
      <Region label="Metadata" show={show}>
        <div className="flex flex-col gap-2">
          {service.meta.map(([k, v]) => (
            <div key={k} className="flex items-center justify-between gap-2">
              <span style={{ fontSize: 13, color: IEP.muted, fontWeight: 400 }}>{k}</span>
              <span style={{ fontSize: 13, color: IEP.ink, fontWeight: 600 }}>{v}</span>
            </div>
          ))}
        </div>
      </Region>
    </div>
  )
}

export default function ServiceCardShowcase() {
  const [show, setShow] = useState(false)

  return (
    <div className="rounded-[20px] bg-white p-5 md:p-8" style={{ border: `1px solid ${IEP.cardBorder}` }}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <p style={{ fontSize: 13, color: IEP.muted, fontWeight: 300, maxWidth: 460 }}>
          The same service-card component, populated with different database information. Toggle the shared structure to
          see the common anatomy behind every technology.
        </p>
        <button
          type="button"
          aria-pressed={show}
          onClick={() => setShow(v => !v)}
          className="shrink-0 inline-flex items-center gap-2.5 rounded-full outline-none"
          style={{ padding: '8px 14px', border: `1px solid ${show ? IEP.accent : IEP.border}`, background: show ? IEP.accentTint : '#fff' }}
        >
          <span
            className="relative inline-flex items-center"
            style={{ width: 34, height: 18, borderRadius: 100, background: show ? IEP.accent : '#d4d4d8', transition: 'background-color 0.25s ease' }}
            aria-hidden="true"
          >
            <span
              style={{
                position: 'absolute',
                top: 2,
                left: show ? 18 : 2,
                width: 14,
                height: 14,
                borderRadius: 100,
                background: '#fff',
                transition: 'left 0.25s ease',
              }}
            />
          </span>
          <span style={{ fontSize: 13, fontWeight: 500, color: show ? IEP.accent : IEP.ink }}>Show shared structure</span>
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        {services.map(service => (
          <div key={service.tech} className="flex flex-col gap-2">
            <span style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: IEP.muted, fontWeight: 500 }}>
              {service.tech}
            </span>
            <ServiceCard service={service} show={show} />
          </div>
        ))}
      </div>
    </div>
  )
}
