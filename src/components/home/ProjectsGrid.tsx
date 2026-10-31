import { Link } from 'react-router'
import { ArrowUpRight, FolderKanban } from 'lucide-react'
import { projects } from '@/data/projects'
import { Reveal } from '@/components/ui/Reveal'
import { Pill } from '@/components/ui/Card'
import { useT } from '@/i18n'

export function ProjectsGrid() {
  const t = useT()
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((p, i) => (
        <Reveal key={p.slug} delay={i * 0.06} className="h-full">
          <Link to={`/projects/${p.slug}`} className="card card-border group flex h-full flex-col overflow-hidden !p-0">
            <div className="relative aspect-[16/10] overflow-hidden bg-[#e8e8ed]">
                            {p.image ? (
                p.image.wide ? (
                  <img src={p.image.src} alt={p.image.alt} loading="lazy" decoding="async" width={1360} height={768} className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <img src={p.image.src} alt={p.image.alt} loading="lazy" decoding="async" width={1344} height={1920} className="absolute left-1/2 top-6 w-[42%] -translate-x-1/2 drop-shadow-2xl transition-transform duration-500 group-hover:scale-105" />
                )
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-accent/60">
                  <FolderKanban className="size-14" aria-hidden />
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col p-6">
              <Pill className="self-start">{p.category}</Pill>
              <h3 className="mt-4 font-display text-xl font-semibold text-text">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.summary}</p>
              <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-accent">
                {t('projects.view')} <ArrowUpRight className="size-4" aria-hidden />
              </span>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  )
}
