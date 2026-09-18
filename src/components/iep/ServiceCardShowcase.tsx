import { useState, type ReactNode } from 'react'
import { IEP } from './tokens'

type Service = {
  tech: string
  product: string
  name: string
  status: string
  tone: 'ok' | 'warn'
  meta: [string, string][]
}

const services: Service[] = [
  { tech: 'Graph', product: 'TigerGraph', name: 'graph-prod-01', status: 'Healthy', tone: 'ok', meta: [['Environment', 'Production'], ['Region', 'us-east-1'], ['Nodes', '3']] },
  { tech: 'Relational', product: 'CockroachDB', name: 'sql-core-02', status: 'Healthy', tone: 'ok', meta: [['Environment', 'Production'], ['Region', 'us-east-1'], ['Storage', '512 GB']] },
  { tech: 'Non-relational', product: 'Cassandra', name: 'docstore-07', status: 'Degraded', tone: 'warn', meta: [['Environment', 'Production'], ['Region', 'eu-west-1'], ['Nodes', '6']] },
  { tech: 'Other', product: 'Redis', name: 'cache-11', status: 'Healthy', tone: 'ok', meta: [['Environment', 'Production'], ['Region', 'us-west-2'], ['Memory', '32 GB']] },
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
  const statusColor = service.tone === 'ok' ? '#2f9e6b' : '#c07d1a'
  return (
    <div className="rounded-xl p-4 flex flex-col gap-3" style={{ border: `1px solid ${IEP.border}`, background: '#fff' }}>
      <Region label="Header" show={show}>
        <div className="flex items-center justify-between gap-2">
          <span style={{ fontSize: 14, fontWeight: 600, color: IEP.ink }}>{service.name}</span>
          <span
            style={{ fontSize: 10, fontWeight: 500, color: IEP.body, padding: '2px 8px', borderRadius: 100, border: `1px solid ${IEP.border}` }}
          >
            {service.product}
          </span>
        </div>
      </Region>
      <Region label="Status" show={show}>
        <span className="flex items-center gap-1.5" style={{ fontSize: 12, color: statusColor, fontWeight: 500 }}>
          <span style={{ width: 8, height: 8, borderRadius: 100, background: statusColor }} aria-hidden="true" />
          {service.status}
        </span>
      </Region>
      <Region label="Metadata" show={show}>
        <div className="flex flex-col gap-1.5">
          {service.meta.map(([k, v]) => (
            <div key={k} className="flex items-center justify-between gap-2">
              <span style={{ fontSize: 12, color: IEP.muted, fontWeight: 300 }}>{k}</span>
              <span style={{ fontSize: 12, color: IEP.ink, fontWeight: 400 }}>{v}</span>
            </div>
          ))}
        </div>
      </Region>
      <Region label="Actions" show={show}>
        <span
          className="inline-flex items-center gap-1.5 self-start"
          style={{ fontSize: 11, fontWeight: 500, color: IEP.ink, padding: '5px 12px', borderRadius: 8, border: `1px solid ${IEP.border}` }}
        >
          View service
          <span aria-hidden="true">→</span>
        </span>
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
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
