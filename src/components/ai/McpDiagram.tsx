import { mcpSystems } from '@/data/ai'
import { useT } from '@/i18n'
import type { TKey } from '@/i18n/en'

/** Translation keys for mcpSystems, in the same order. */
const systemKeys: TKey[] = ['mcp.sys.erp', 'mcp.sys.crm', 'mcp.sys.docs', 'mcp.sys.mail', 'mcp.sys.db', 'mcp.sys.custom']

/** AI assistant → MCP server (tools, permissions, audit) → business systems. Theme-aware SVG. */
export function McpDiagram({ className }: { className?: string }) {
  const t = useT()
  const blue = '#0071E3'
  const light = '#2997FF'
  return (
    <svg viewBox="0 0 640 340" className={className} role="img" aria-label={t('mcp.aria')}>
      <defs>
        <marker id="mcp-ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill={light} />
        </marker>
      </defs>

      {/* AI assistant */}
      <rect x="10" y="120" width="150" height="100" rx="18" fill="var(--color-surface)" stroke="var(--color-line)" />
      <circle cx="40" cy="150" r="12" fill={blue} />
      <path d="M34 150 l4 4 8-8" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="60" y="155" fontSize="14" fontWeight="700" fill="var(--color-text)">{t('mcp.ai')}</text>
      <text x="26" y="184" fontSize="11" fill="var(--color-muted)">{t('mcp.ai.l1')}</text>
      <text x="26" y="200" fontSize="11" fill="var(--color-muted)">{t('mcp.ai.l2')}</text>

      {/* arrows to MCP */}
      <path d="M162 160 H226" stroke={light} strokeWidth="2" markerEnd="url(#mcp-ar)" />
      <path d="M228 182 H164" stroke="var(--color-line)" strokeWidth="2" markerEnd="url(#mcp-ar)" />

      {/* MCP server */}
      <rect x="232" y="70" width="176" height="200" rx="20" fill={blue} />
      <text x="320" y="104" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff">{t('mcp.server')}</text>
      <text x="320" y="122" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.8)">{t('mcp.server.sub')}</text>
      {(['mcp.tools', 'mcp.perm', 'mcp.approval', 'mcp.audit'] as const).map((k, i) => (
        <g key={k}>
          <rect x="250" y={138 + i * 31} width="140" height="24" rx="8" fill="rgba(255,255,255,0.14)" />
          <text x="320" y={154 + i * 31} textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">{t(k)}</text>
        </g>
      ))}

      {/* systems */}
      {mcpSystems.map((sys, i) => {
        const y = 22 + i * 52
        return (
          <g key={sys}>
            <path d={`M410 170 C 450 170, 450 ${y + 20}, 486 ${y + 20}`} fill="none" stroke="var(--color-line)" strokeWidth="2" />
            <rect x="488" y={y} width="142" height="40" rx="12" fill="var(--color-surface)" stroke="var(--color-line)" />
            <text x="559" y={y + 25} textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--color-text)">{t(systemKeys[i])}</text>
          </g>
        )
      })}
    </svg>
  )
}
