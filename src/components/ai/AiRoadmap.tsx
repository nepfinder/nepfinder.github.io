import { aiRoadmap } from '@/data/ai'
import { Reveal } from '@/components/ui/Reveal'

/** Five-step rollout shown as connected stages that grow in scope from left to right. */
export function AiRoadmap() {
  return (
    <ol className="grid gap-3 md:grid-cols-5">
      {aiRoadmap.map((s, i) => (
        <Reveal as="li" key={s.title} delay={i * 0.06} className="h-full">
          <div className="relative flex h-full flex-col rounded-[var(--radius-tile)] bg-surface p-5">
            <div className="flex items-center gap-2">
              <span className="inline-flex size-7 items-center justify-center rounded-full bg-brand text-[13px] font-semibold text-white">{i + 1}</span>
              <span className="h-1.5 flex-1 rounded-full bg-bg-2">
                <span className="block h-full rounded-full bg-brand" style={{ width: `${(i + 1) * 20}%` }} />
              </span>
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold text-text">{s.title}</h3>
            <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{s.text}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  )
}
