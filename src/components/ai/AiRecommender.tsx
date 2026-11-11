import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'
import { useI18n } from '@/i18n'
import type { TKey } from '@/i18n/en'

/**
 * Guided AI recommendation. Answers stay in the browser: nothing is sent or stored.
 * Rules are simple and transparent so the suggestions can be explained to the visitor.
 */

type Q = { id: 'system' | 'goal' | 'size'; label: TKey; options: { value: string; label: TKey }[] }

const questions: Q[] = [
  {
    id: 'system',
    label: 'rec.q.system',
    options: [
      { value: 'erp', label: 'rec.q.system.erp' },
      { value: 'other', label: 'rec.q.system.other' },
      { value: 'none', label: 'rec.q.system.none' },
    ],
  },
  {
    id: 'goal',
    label: 'rec.q.goal',
    options: [
      { value: 'ask', label: 'rec.q.goal.ask' },
      { value: 'docs', label: 'rec.q.goal.docs' },
      { value: 'workflow', label: 'rec.q.goal.workflow' },
      { value: 'connect', label: 'rec.q.goal.connect' },
    ],
  },
  {
    id: 'size',
    label: 'rec.q.size',
    options: [
      { value: 'small', label: 'rec.q.size.small' },
      { value: 'mid', label: 'rec.q.size.mid' },
      { value: 'large', label: 'rec.q.size.large' },
    ],
  },
]

interface Rec {
  title: TKey
  why: TKey
  to: string
}

function recommend(a: Record<Q['id'], string>): Rec[] {
  const recs: Rec[] = []
  const erp = a.system === 'erp'

  if (a.goal === 'ask') {
    recs.push({
      title: 'rec.t.ask',
      why: erp ? 'rec.w.ask.erp' : 'rec.w.ask.other',
      to: '/ai-implementation#mcp',
    })
  }
  if (a.goal === 'docs') {
    recs.push({
      title: 'rec.t.docs',
      why: 'rec.w.docs',
      to: '/ai-implementation',
    })
  }
  if (a.goal === 'workflow') {
    recs.push({
      title: 'rec.t.wf',
      why: 'rec.w.wf',
      to: '/services/business-process-automation',
    })
  }
  if (a.goal === 'connect') {
    recs.push({
      title: 'rec.t.connect',
      why: 'rec.w.connect',
      to: '/services/api-system-integration',
    })
  }

  if (!erp) {
    recs.push({
      title: 'rec.t.erpfirst',
      why: 'rec.w.erpfirst',
      to: '/services/erpnext-implementation',
    })
  } else {
    recs.push({
      title: 'rec.t.support',
      why: 'rec.w.support',
      to: '/products/enterprise-support',
    })
  }

  if (a.size === 'large') {
    recs.push({
      title: 'rec.t.roadmap',
      why: 'rec.w.roadmap',
      to: '/ai-implementation#mcp',
    })
  }

  // De-duplicate by link and keep the list short.
  const seen = new Set<string>()
  return recs.filter((r) => (seen.has(r.to) ? false : (seen.add(r.to), true))).slice(0, 3)
}

export function AiRecommender() {
  const { t } = useI18n()
  const [answers, setAnswers] = useState<Partial<Record<Q['id'], string>>>({})
  const done = questions.every((q) => answers[q.id])
  const recs = useMemo(() => (done ? recommend(answers as Record<Q['id'], string>) : []), [done, answers])

  return (
    <section id="recommend" className="section scroll-mt-16 pt-0">
      <div className="container-x">
        <div className="card mx-auto max-w-4xl !p-6 sm:!p-10">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="icon-tile">
                <Sparkles className="size-5" aria-hidden />
              </span>
              <div>
                <h2 className="font-display text-2xl font-semibold text-text sm:text-3xl">{t('rec.title')}</h2>
                <p className="mt-1 text-sm text-muted">{t('rec.sub')}</p>
              </div>
            </div>
          </Reveal>

          <div className="mt-8 space-y-7">
            {questions.map((q, qi) => (
              <fieldset key={q.id}>
                <legend className="text-[15px] font-semibold text-text">
                  {qi + 1}. {t(q.label)}
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
                        {t(o.label)}
                      </button>
                    )
                  })}
                </div>
              </fieldset>
            ))}
          </div>

          {done ? (
            <div className="mt-10" role="status" aria-live="polite">
              <h3 className="font-display text-xl font-semibold text-text">{t('rec.ours')}</h3>
              <ul className="mt-5 grid gap-4 md:grid-cols-2">
                {recs.map((r) => (
                  <li key={r.to}>
                    <Link to={r.to} className="group flex h-full flex-col rounded-[var(--radius-tile)] bg-bg-2 p-5 transition-colors hover:bg-brand/5">
                      <span className="font-display text-xl font-semibold text-text">{t(r.title)}</span>
                      <span className="mt-2 text-[15px] leading-relaxed text-muted">{t(r.why)}</span>
                      <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-accent">
                        {t('services.learn')} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button to="/contact" data-track="consultation_cta">{t('ai.cta2')}</Button>
                <button type="button" onClick={() => setAnswers({})} className="btn-ghost">
                  {t('rec.again')}
                </button>
              </div>
            </div>
          ) : (
            <p className="mt-8 text-sm text-muted">{t('rec.waiting')}</p>
          )}
        </div>
      </div>
    </section>
  )
}
