import { useT } from '@/i18n'

/**
 * Illustration for the Enterprise ERP Support hero: a dedicated team card, a fixed monthly price tag,
 * and the office-hours badge. Pure SVG so it stays crisp and themeable.
 */
export function SupportHeroVisual({ className }: { className?: string }) {
  const t = useT()
  const team = [
    { x: 86, label: 'Functional', c: '#0071E3' },
    { x: 150, label: 'Technical', c: '#1d1d1f' },
    { x: 214, label: 'Functional', c: '#2997FF' },
    { x: 278, label: 'Technical', c: '#424245' },
  ]
  return (
    <div className={className}>
      <svg viewBox="0 0 520 420" className="h-full w-full" role="img" aria-label={`${t('support.p2.title')}, ${t('support.p3.title')}, ${t('support.p1.title')}, ${t('support.p4.title')}`}>
        <defs>
          <filter id="sh" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="#1d1d1f" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* Team card */}
        <g filter="url(#sh)">
          <rect x="30" y="40" width="330" height="200" rx="24" fill="#ffffff" />
        </g>
        <text x="54" y="76" fontSize="13" fontWeight="600" fill="#6e6e73">
          Your dedicated ERP team
        </text>
        {team.map((m, i) => (
          <g key={i}>
            <circle cx={m.x} cy="130" r="28" fill={m.c} />
            <circle cx={m.x} cy="120" r="10" fill="rgba(255,255,255,0.9)" />
            <path d={`M${m.x - 17} 150 a17 12 0 0 1 34 0`} fill="rgba(255,255,255,0.9)" />
            <text x={m.x} y="180" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1d1d1f">
              {m.label}
            </text>
          </g>
        ))}
        <rect x="54" y="200" width="282" height="22" rx="11" fill="#f5f5f7" />
        <text x="195" y="215" textAnchor="middle" fontSize="11" fill="#6e6e73">
          Technical + functional experts, every month
        </text>

        {/* Price tag */}
        <g filter="url(#sh)">
          <path d="M250 230 h200 a24 24 0 0 1 24 24 v110 a24 24 0 0 1 -24 24 h-200 a24 24 0 0 1 -24 -24 v-110 a24 24 0 0 1 24 -24 z" fill="#0071E3" />
        </g>
        <circle cx="262" cy="258" r="6" fill="rgba(255,255,255,0.5)" />
        <text x="285" y="268" fontSize="12" fontWeight="600" fill="rgba(255,255,255,0.8)">
          One fixed price
        </text>
        <text x="250" y="316" fontSize="38" fontWeight="700" fill="#ffffff" letterSpacing="-1">
          / month
        </text>
        <text x="252" y="346" fontSize="12" fill="rgba(255,255,255,0.85)">
          Sized to your users and modules
        </text>
        <text x="252" y="366" fontSize="12" fill="rgba(255,255,255,0.85)">
          No hourly surprises
        </text>

        {/* Office hours badge */}
        <g filter="url(#sh)">
          <rect x="40" y="280" width="180" height="92" rx="20" fill="#1d1d1f" />
        </g>
        <circle cx="72" cy="326" r="16" fill="none" stroke="#ffffff" strokeWidth="2.5" />
        <path d="M72 316 v10 l7 5" fill="none" stroke="#2997FF" strokeWidth="2.5" strokeLinecap="round" />
        <text x="100" y="321" fontSize="12" fontWeight="600" fill="#ffffff">
          Office hours
        </text>
        <text x="100" y="342" fontSize="16" fontWeight="700" fill="#ffffff">
          10:00 – 18:00
        </text>
        <text x="100" y="360" fontSize="10.5" fill="#a1a1a6">
          working days
        </text>
      </svg>
    </div>
  )
}
