import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'

/**
 * Guided AI recommendation. Answers stay in the browser: nothing is sent or stored.
 * Rules are simple and transparent so the suggestions can be explained to the visitor.
 */

type Q = { id: 'system' | 'goal' | 'size'; label: string; options: { value: string; label: string }[] }

const questions: Q[] = [
  {
    id: 'system',
    label: 'Which system runs most of your business today?',
    options: [
      { value: 'erp', label: 'An ERP such as ERPNext' },
      { value: 'other', label: 'Other software or spreadsheets' },
      { value: 'none', label: 'Mostly paper and manual work' },
    ],
  },
  {
    id: 'goal',
    label: 'What do you want AI to do first?',
    options: [
      { value: 'ask', label: 'Answer questions from our data' },
      { value: 'docs', label: 'Read invoices and documents' },
      { value: 'workflow', label: 'Automate approvals and follow-ups' },
      { value: 'connect', label: 'Connect our systems together' },
    ],
  },
  {
    id: 'size',
    label: 'How big is your team?',
    options: [
      { value: 'small', label: 'Under 20 people' },
      { value: 'mid', label: '20 to 200 people' },
      { value: 'large', label: 'More than 200 people' },
    ],
  },
]

interface Rec {
  title: string
  why: string
  to: string
}

function recommend(a: Record<Q['id'], string>): Rec[] {
  const recs: Rec[] = []
  const erp = a.system === 'erp'

  if (a.goal === 'ask') {
    recs.push({
      title: 'AI assistant for your ERP',
      why: erp ? 'Connects an assistant to your live ERPNext data through an MCP server, with the same permissions your users already have.' : 'Starts with an assistant over your key data, and connects to your ERP when you are ready.',
      to: '/ai-implementation#mcp',
    })
  }
  if (a.goal === 'docs') {
    recs.push({
      title: 'Document & invoice processing',
      why: 'Reads supplier invoices and forms, then prepares draft entries for a person to approve. Saves typing and reduces errors.',
      to: '/ai-implementation',
    })
  }
  if (a.goal === 'workflow') {
    recs.push({
      title: 'AI agents & workflow automation',
      why: 'Agents handle follow-ups, reminders, and routine approvals, with human sign-off on anything that matters.',
      to: '/services/business-process-automation',
    })
  }
  if (a.goal === 'connect') {
    recs.push({
      title: 'MCP and system integration',
      why: 'An MCP server gives AI safe, controlled access to several systems at once, with logging for every action.',
      to: '/services/api-system-integration',
    })
  }

  if (!erp) {
    recs.push({
      title: 'ERP implementation first',
      why: 'AI works best on structured data. A core ERP such as ERPNext gives the assistant clean records to work with.',
      to: '/services/erpnext-implementation',
    })
  } else {
    recs.push({
      title: 'Enterprise ERP Support',
      why: 'A fixed monthly team of technical and functional ERP experts keeps AI integrations maintained after launch.',
      to: '/products/enterprise-support',
    })
  }

  if (a.size === 'large') {
    recs.push({
      title: 'Company-wide AI roadmap',
      why: 'Larger teams benefit from a staged plan across departments, with governance, permissions, and monitoring from the start.',
      to: '/ai-implementation#mcp',
    })
  }

  // De-duplicate by link and keep the list short.
  const seen = new Set<string>()
  return recs.filter((r) => (seen.has(r.to) ? false : (seen.add(r.to), true))).slice(0, 3)
}

export function AiRecommender() {
  const [answers, setAnswers] = useState<Partial<Record<Q['id'], string>>>({})
  const done = questions.every((q) => answers[q.id])
  const recs = useMemo(() => (done ? recommend(answers as Record<Q['id'], string>) : []), [done, answers])

  return (
    <section id="recommend" className="section scroll-mt-14 pt-0">
      <div className="container-x">
        <div className="card mx-auto max-w-4xl !p-6 sm:!p-10">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="icon-tile">
                <Sparkles className="size-5" aria-hidden />
              </span>
              <div>
                <h2 className="font-display text-2xl font-semibold text-text sm:text-3xl">Find the right AI starting point</h2>
                <p className="mt-1 text-sm text-muted">Answer three questions. Suggestions appear instantly and nothing is sent to us.</p>
              </div>
            </div>
          </Reveal>

          <div className="mt-8 space-y-7">
            {questions.map((q, qi) => (
              <fieldset key={q.id}>
                <legend className="text-[15px] font-semibold text-text">
                  {qi + 1}. {q.label}
                </legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {q.options.map((o) => {
                    const active = answers[q.id] === o.value
                    return (
                      <button
                        key={o.value}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setAnswers((a) => ({ ...a, [q.id]: o.value }))}
                        className={cn(
                          'rounded-full border px-4 py-2 text-[14px] font-medium transition-colors',
                          active ? 'border-brand bg-brand text-white' : 'border-line bg-surface text-text hover:border-brand',
                        )}
                      >
                        {o.label}
                      </button>
                    )
                  })}
                </div>
              </fieldset>
            ))}
          </div>

          {done ? (
            <div className="mt-10" role="status" aria-live="polite">
              <h3 className="font-display text-xl font-semibold text-text">Our suggestions for you</h3>
              <ul className="mt-5 grid gap-4 md:grid-cols-2">
                {recs.map((r) => (
                  <li key={r.to}>
                    <Link to={r.to} className="group flex h-full flex-col rounded-[var(--radius-tile)] bg-bg-2 p-5 transition-colors hover:bg-brand/5">
                      <span className="font-display text-xl font-semibold text-text">{r.title}</span>
                      <span className="mt-2 text-[15px] leading-relaxed text-muted">{r.why}</span>
                      <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-accent">
                        Learn more <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button to="/contact" data-track="consultation_cta">Book an AI assessment</Button>
                <button type="button" onClick={() => setAnswers({})} className="btn-ghost">
                  Start again
                </button>
              </div>
            </div>
          ) : (
            <p className="mt-8 text-sm text-muted">Answer all three questions to see suggestions.</p>
          )}
        </div>
      </div>
    </section>
  )
}
