import { useState } from 'react'
import { cn } from '@/utils/cn'

const nodes = [
  {
    id: 'erpnext',
    label: 'ERPNext',
    sub: 'Accounting · Stock · Sales · HR',
    text: 'Open-source ERP modules configured and customised around your processes.',
    color: '#0071E3',
  },
  {
    id: 'frappe',
    label: 'Frappe Framework',
    sub: 'Python · JavaScript · MariaDB',
    text: 'The metadata-driven framework underneath ERPNext: DocTypes, permissions, workflows, and REST APIs.',
    color: '#2997FF',
  },
  {
    id: 'apps',
    label: 'Custom Apps',
    sub: 'DocTypes · Workflows · Portals',
    text: 'Business-specific modules, reports, dashboards, and portals built as Frappe applications.',
    color: '#64D2FF',
  },
  {
    id: 'integrations',
    label: 'External Integrations',
    sub: 'Payments · E-commerce · APIs',
    text: 'Webhooks and REST integrations with payment gateways, storefronts, mobile apps, and third-party systems.',
    color: '#A1A1A6',
  },
]

/** Animated, keyboard-accessible SVG architecture visualisation: ERPNext → Frappe → Custom Apps → Integrations. */
export function ArchitectureDiagram() {
  const [active, setActive] = useState(1)
  const current = nodes[active]

  return (
    <div className="rounded-[var(--radius-tile)] bg-white/[0.06] p-5 sm:p-8">
      <div className="relative">
        <svg viewBox="0 0 800 240" className="w-full" role="img" aria-label="Architecture: ERPNext built on the Frappe Framework, extended by custom apps and connected to external integrations">
          <defs>
            <linearGradient id="flow" x1="0" x2="1">
              <stop offset="0" stopColor="#0071E3" />
              <stop offset="1" stopColor="#64D2FF" />
            </linearGradient>
          </defs>
          {/* connection lines */}
          {[0, 1, 2].map((i) => {
            const x1 = 100 + i * 200 + 88
            const x2 = 100 + (i + 1) * 200 - 88
            return (
              <g key={i}>
                <line x1={x1} y1={120} x2={x2} y2={120} stroke="var(--color-line)" strokeWidth={2} />
                <line x1={x1} y1={120} x2={x2} y2={120} stroke="url(#flow)" strokeWidth={2} strokeDasharray="6 8" className="animate-dash motion-reduce:animate-none" />
                <polygon points={`${x2},120 ${x2 - 8},115 ${x2 - 8},125`} fill="var(--color-muted)" />
              </g>
            )
          })}
          {nodes.map((n, i) => {
            const cx = 100 + i * 200
            const isActive = i === active
            return (
              <g
                key={n.id}
                role="button"
                tabIndex={0}
                aria-pressed={isActive}
                aria-label={`${n.label}: ${n.text}`}
                className="cursor-pointer outline-none"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setActive(i)
                  }
                }}
              >
                <circle cx={cx} cy={120} r={isActive ? 92 : 80} fill={n.color} opacity={isActive ? 0.14 : 0.06} className="transition-all duration-300" />
                <rect x={cx - 88} y={78} width={176} height={84} rx={18} fill="var(--color-bg-2)" stroke={isActive ? n.color : 'var(--color-line)'} strokeWidth={isActive ? 2 : 1} className="transition-all duration-300" />
                <text x={cx} y={115} textAnchor="middle" fill="var(--color-text)" fontSize={14} fontWeight={700} fontFamily="inherit">
                  {n.label}
                </text>
                <text x={cx} y={138} textAnchor="middle" fill="var(--color-muted)" fontSize={9.5} fontFamily="Inter, sans-serif">
                  {n.sub}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
      <div className="mt-4 rounded-2xl bg-white/[0.06] p-5" aria-live="polite">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full" style={{ background: current.color }} aria-hidden />
          <h3 className="font-display text-xl font-semibold text-text">{current.label}</h3>
        </div>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">{current.text}</p>
        <div className="mt-3 flex gap-1.5" aria-hidden>
          {nodes.map((n, i) => (
            <button key={n.id} type="button" tabIndex={-1} aria-label={`Show ${n.label}`} onClick={() => setActive(i)} className={cn('h-1.5 rounded-full transition-all', i === active ? 'w-8 bg-accent' : 'w-3 bg-line')} />
          ))}
        </div>
      </div>
    </div>
  )
}
