import { Check, Lock, Network, Sparkles } from 'lucide-react'

/**
 * Product-style illustration: an AI assistant answering from live ERP data through an MCP server,
 * then asking for approval before acting. Sample data only.
 */
export function AiHeroVisual() {
  const rows = [
    { c: 'Customer A', d: '45 days', a: 'Rs 2,40,000' },
    { c: 'Customer B', d: '38 days', a: 'Rs 1,15,500' },
    { c: 'Customer C', d: '31 days', a: 'Rs 86,200' },
  ]
  return (
    <div className="relative" aria-label="Example: an AI assistant answering a question from ERP data through an MCP server" role="img">
      <div className="rounded-[var(--radius-tile)] bg-[#1d1d1f] p-5 text-[#f5f5f7] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.45)] sm:p-6">
        <div className="flex items-center gap-2 border-b border-white/10 pb-4">
          <span className="inline-flex size-7 items-center justify-center rounded-lg bg-brand">
            <Sparkles className="size-4" aria-hidden />
          </span>
          <span className="text-sm font-semibold">ERP Assistant</span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[11px] text-[#a1a1a6]">
            <Lock className="size-3" aria-hidden /> Accounts User
          </span>
        </div>

        <div className="mt-4 flex justify-end">
          <p className="max-w-[85%] rounded-2xl rounded-br-md bg-brand px-4 py-2.5 text-[13px] leading-snug">
            Which customers have invoices overdue by more than 30 days?
          </p>
        </div>

        <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/[0.07] px-3 py-1.5 text-[11px] text-[#a1a1a6]">
          <Network className="size-3.5 text-[#2997ff]" aria-hidden />
          <span>
            MCP · <span className="text-[#f5f5f7]">erp.get_overdue_invoices</span>
          </span>
          <Check className="size-3.5 text-[#30d158]" aria-hidden />
        </div>

        <div className="mt-3 rounded-2xl rounded-bl-md bg-white/[0.07] p-4 text-[13px]">
          <p className="leading-snug">Three customers are more than 30 days overdue, totalling Rs 4,41,700:</p>
          <table className="mt-3 w-full text-left text-[12px]">
            <tbody>
              {rows.map((r) => (
                <tr key={r.c} className="border-t border-white/10">
                  <td className="py-1.5">{r.c}</td>
                  <td className="py-1.5 text-[#a1a1a6]">{r.d}</td>
                  <td className="py-1.5 text-right font-medium">{r.a}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 leading-snug">Shall I draft reminder emails for your approval?</p>
          <div className="mt-3 flex gap-2">
            <span className="rounded-full bg-brand px-3 py-1 text-[12px] font-medium">Draft reminders</span>
            <span className="rounded-full border border-white/20 px-3 py-1 text-[12px]">Not now</span>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-5 -left-3 hidden rounded-2xl bg-white px-4 py-3 text-[12px] shadow-[0_20px_40px_-20px_rgba(29,29,31,0.35)] ring-1 ring-line sm:block">
        <p className="font-semibold text-text">Every action is logged</p>
        <p className="text-muted">Who asked · what ran · what changed</p>
      </div>
      <p className="mt-3 text-right text-[11px] text-muted">Illustration with sample data</p>
    </div>
  )
}
