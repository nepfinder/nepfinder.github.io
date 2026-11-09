import { ChartColumn, Factory, FolderKanban, Handshake, Landmark, Package, ShoppingCart, Store, Users, type LucideIcon } from 'lucide-react'
import { cn } from '@/utils/cn'
import { useT } from '@/i18n'

/**
 * Lightweight SVG infographics that explain each service visually.
 * Pure SVG with theme-aware colours; no runtime cost.
 */
export type InfographicKind = 'modules' | 'stack' | 'hub' | 'flow' | 'devices' | 'blueprint'

const blue = '#0071E3'
const light = '#2997FF'

function Modules() {
  const t = useT()
  // Lucide icons (ISC). These are the same icon names ERPNext uses for its workspace sidebar.
  const cells: { label: string; Icon: LucideIcon }[] = [
    { label: t('info.mod.accounting'), Icon: Landmark },
    { label: t('info.mod.stock'), Icon: Package },
    { label: t('info.mod.selling'), Icon: Store },
    { label: t('info.mod.buying'), Icon: ShoppingCart },
    { label: t('info.mod.crm'), Icon: Handshake },
    { label: t('info.mod.hr'), Icon: Users },
    { label: t('info.mod.projects'), Icon: FolderKanban },
    { label: t('info.mod.manufacturing'), Icon: Factory },
    { label: t('info.mod.reports'), Icon: ChartColumn },
  ]
  return (
    <svg viewBox="0 0 420 300" className="h-full w-full" role="img" aria-label={t('info.mod.aria')}>
      {cells.map(({ label, Icon }, i) => {
        const x = 30 + (i % 3) * 125
        const y = 12 + Math.floor(i / 3) * 74
        return (
          <g key={label}>
            <rect x={x} y={y} width={110} height={64} rx={14} fill="var(--color-surface)" stroke="var(--color-line)" />
            <rect x={x + 41} y={y + 8} width={28} height={28} rx={8} fill="#E5F1FE" />
            <Icon x={x + 47} y={y + 14} width={16} height={16} color={blue} strokeWidth={2} aria-hidden />
            <text x={x + 55} y={y + 52} textAnchor="middle" fontSize={11} fontWeight={600} fill="var(--color-text)">
              {label}
            </text>
          </g>
        )
      })}
      {[0, 1, 2].map((i) => (
        <line key={i} x1={85 + i * 125} y1={224} x2={85 + i * 125} y2={248} stroke="var(--color-line)" strokeWidth={2} strokeDasharray="3 4" />
      ))}
      <rect x={30} y={248} width={360} height={36} rx={12} fill={blue} />
      <text x={210} y={271} textAnchor="middle" fontSize={12} fontWeight={600} fill="#fff">
        {t('info.mod.db')}
      </text>
    </svg>
  )
}

function Stack() {
  const t = useT()
  const layers = [
    { label: t('info.stack.portals'), sub: t('info.stack.portals.sub'), c: 'var(--color-surface)', dark: false },
    { label: t('info.stack.custom'), sub: t('info.stack.custom.sub'), c: light, dark: true },
    { label: 'ERPNext', sub: t('info.stack.erpnext.sub'), c: blue, dark: true },
    { label: 'Frappe Framework', sub: t('info.stack.frappe.sub'), c: '#1d1d1f', dark: true },
    { label: t('info.stack.infra'), sub: t('info.stack.infra.sub'), c: '#424245', dark: true },
  ]
  const top = 20
  const h = 44
  const gap = 5
  const widths = [380, 326, 272, 218, 164]
  return (
    <svg viewBox="0 0 420 300" className="h-full w-full" role="img" aria-label={t('info.stack.aria')}>
      {layers.map((l, i) => {
        const y = top + i * (h + gap)
        const wTop = widths[i]
        const wBottom = widths[i + 1] ?? widths[i] - 40
        const x1 = 210 - wTop / 2
        const x2 = 210 + wTop / 2
        const x3 = 210 + wBottom / 2
        const x4 = 210 - wBottom / 2
        return (
          <g key={l.label}>
            <path d={`M${x1} ${y} H${x2} L${x3} ${y + h} H${x4} Z`} fill={l.c} stroke={l.dark ? 'none' : 'var(--color-line)'} />
            <text x={210} y={y + 19} textAnchor="middle" fontSize={12} fontWeight={600} fill={l.dark ? '#fff' : 'var(--color-text)'}>
              {l.label}
            </text>
            <text x={210} y={y + 33} textAnchor="middle" fontSize={9.5} fill={l.dark ? 'rgba(255,255,255,0.75)' : 'var(--color-muted)'}>
              {l.sub}
            </text>
          </g>
        )
      })}
      <text x={210} y={292} textAnchor="middle" fontSize={11} fill="var(--color-muted)">
        {t('info.stack.foot')}
      </text>
    </svg>
  )
}

function Hub() {
  const t = useT()
  const nodes = [t('info.hub.erp'), t('info.hub.payments'), t('info.hub.ecom'), t('info.hub.mobile'), t('info.hub.bank'), t('info.hub.partners')]
  return (
    <svg viewBox="0 0 420 300" className="h-full w-full" role="img" aria-label={t('info.hub.aria')}>
      {nodes.map((n, i) => {
        const a = (i / nodes.length) * Math.PI * 2 - Math.PI / 2
        const x = 210 + Math.cos(a) * 130
        const y = 150 + Math.sin(a) * 100
        return (
          <g key={n}>
            <line x1={210} y1={150} x2={x} y2={y} stroke="var(--color-line)" strokeWidth={2} />
            <circle cx={(210 + x) / 2} cy={(150 + y) / 2} r={3} fill={light} />
            <rect x={x - 44} y={y - 16} width={88} height={32} rx={10} fill="var(--color-surface)" stroke="var(--color-line)" />
            <text x={x} y={y + 4} textAnchor="middle" fontSize={11} fontWeight={600} fill="var(--color-text)">
              {n}
            </text>
          </g>
        )
      })}
      <circle cx={210} cy={150} r={38} fill={blue} />
      <text x={210} y={146} textAnchor="middle" fontSize={11} fontWeight={700} fill="#fff">
        REST API
      </text>
      <text x={210} y={161} textAnchor="middle" fontSize={9} fill="rgba(255,255,255,0.8)">
        {t('info.hub.webhooks')}
      </text>
    </svg>
  )
}

function Flow() {
  const t = useT()
  const steps = [t('info.flow.request'), t('info.flow.approve'), t('info.flow.notify'), t('info.flow.report')]
  return (
    <svg viewBox="0 0 420 300" className="h-full w-full" role="img" aria-label={t('info.flow.aria')}>
      {steps.map((s, i) => {
        const x = 20 + i * 100
        return (
          <g key={s}>
            <rect x={x} y={120} width={80} height={60} rx={14} fill={i === 1 ? blue : 'var(--color-surface)'} stroke="var(--color-line)" />
            <text x={x + 40} y={155} textAnchor="middle" fontSize={12} fontWeight={600} fill={i === 1 ? '#fff' : 'var(--color-text)'}>
              {s}
            </text>
            {i < steps.length - 1 && <path d={`M${x + 82} 150 L${x + 98} 150`} stroke={light} strokeWidth={2} markerEnd="url(#ar)" />}
          </g>
        )
      })}
      <defs>
        <marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill={light} />
        </marker>
      </defs>
      <text x={210} y={70} textAnchor="middle" fontSize={12} fill="var(--color-muted)">
        {t('info.flow.top')}
      </text>
      <text x={210} y={230} textAnchor="middle" fontSize={12} fill="var(--color-muted)">
        {t('info.flow.bottom')}
      </text>
    </svg>
  )
}

function Devices() {
  const t = useT()
  return (
    <svg viewBox="0 0 420 300" className="h-full w-full" role="img" aria-label={t('info.dev.aria')}>
      <rect x={40} y={60} width={200} height={130} rx={14} fill="var(--color-surface)" stroke="var(--color-line)" />
      <rect x={40} y={60} width={200} height={22} rx={14} fill="var(--color-bg-2)" />
      <rect x={60} y={100} width={120} height={10} rx={5} fill="var(--color-bg-2)" />
      <rect x={60} y={120} width={160} height={10} rx={5} fill="var(--color-bg-2)" />
      <rect x={60} y={150} width={70} height={22} rx={11} fill={blue} />
      <rect x={290} y={40} width={90} height={180} rx={18} fill="var(--color-surface)" stroke="var(--color-line)" />
      <rect x={302} y={60} width={66} height={120} rx={8} fill="var(--color-bg-2)" />
      <rect x={312} y={72} width={46} height={8} rx={4} fill={light} />
      <rect x={312} y={88} width={46} height={30} rx={6} fill="#fff" />
      <rect x={312} y={126} width={46} height={30} rx={6} fill="#fff" />
      <rect x={110} y={244} width={200} height={36} rx={12} fill="#1d1d1f" />
      <text x={210} y={267} textAnchor="middle" fontSize={12} fontWeight={600} fill="#fff">
        {t('info.dev.backend')}
      </text>
      <line x1={140} y1={190} x2={190} y2={244} stroke="var(--color-line)" strokeWidth={2} />
      <line x1={335} y1={220} x2={250} y2={244} stroke="var(--color-line)" strokeWidth={2} />
    </svg>
  )
}

function Blueprint() {
  const t = useT()
  const rows = [t('info.bp.processes'), t('info.bp.data'), t('info.bp.users')]
  return (
    <svg viewBox="0 0 420 300" className="h-full w-full" role="img" aria-label={t('info.bp.aria')}>
      {rows.map((r, i) => (
        <g key={r}>
          <rect x={30} y={40 + i * 60} width={150} height={44} rx={12} fill="var(--color-surface)" stroke="var(--color-line)" />
          <text x={105} y={67 + i * 60} textAnchor="middle" fontSize={12} fontWeight={600} fill="var(--color-text)">
            {r}
          </text>
          <path d={`M182 ${62 + i * 60} C 220 ${62 + i * 60}, 220 150, 250 150`} fill="none" stroke="var(--color-line)" strokeWidth={2} />
        </g>
      ))}
      <rect x={250} y={100} width={140} height={100} rx={16} fill={blue} />
      <text x={320} y={142} textAnchor="middle" fontSize={13} fontWeight={700} fill="#fff">
        {t('info.bp.software')}
      </text>
      <text x={320} y={162} textAnchor="middle" fontSize={10} fill="rgba(255,255,255,0.8)">
        {t('info.bp.fit')}
      </text>
      <text x={210} y={262} textAnchor="middle" fontSize={12} fill="var(--color-muted)">
        {t('info.bp.foot')}
      </text>
    </svg>
  )
}

const map: Record<InfographicKind, () => React.JSX.Element> = { modules: Modules, stack: Stack, hub: Hub, flow: Flow, devices: Devices, blueprint: Blueprint }

export function Infographic({ kind, className }: { kind: InfographicKind; className?: string }) {
  const Comp = map[kind]
  return (
    <div className={cn('rounded-[var(--radius-tile)] bg-bg-2 p-4 sm:p-6', className)}>
      <Comp />
    </div>
  )
}
