import { useParams } from 'react-router'
import { CheckCircle2, ExternalLink } from 'lucide-react'
import { useSeo } from '@/lib/seo'
import { getProject } from '@/data/projects'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { Pill } from '@/components/ui/Card'
import { CtaSection } from '@/components/home/CtaSection'
import NotFound from './NotFound'

export default function ProjectDetail() {
  const { slug = '' } = useParams()
  const project = getProject(slug)
  if (!project) return <NotFound />
  return <ProjectView slug={slug} />
}

function ProjectView({ slug }: { slug: string }) {
  const project = getProject(slug)!
  useSeo({ title: project.title, description: project.summary, path: `/projects/${project.slug}`, image: project.image?.src.replace('.webp', '.png'), type: 'article' })

  return (
    <>
      <PageHero eyebrow={project.category} title={project.title} text={project.summary} crumbs={[{ label: 'Projects', to: '/projects' }, { label: project.title }]}>
        <Reveal className="mt-8 flex flex-wrap gap-3" delay={0.1}>
          {project.links.map((l, i) => (
            <Button key={l.href} to={l.href} variant={i === 0 ? 'primary' : 'secondary'}>
              {l.label} {l.href.startsWith('http') && <ExternalLink className="size-4" aria-hidden />}
            </Button>
          ))}
        </Reveal>
      </PageHero>

      <section className="section pt-0">
        <div className="container-x grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-10">
            <Reveal className="prose-dark">
              <h2 className="h-display text-2xl">The challenge</h2>
              <p className="mt-3">{project.challenge}</p>
            </Reveal>
            <Reveal className="prose-dark">
              <h2 className="h-display text-2xl">The solution</h2>
              <p className="mt-3">{project.solution}</p>
            </Reveal>
            <Reveal>
              <h2 className="h-display text-2xl">Outcomes</h2>
              <ul className="mt-4 space-y-2.5">
                {project.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-3 text-sm text-text/80 sm:text-base">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden /> {o}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal>
              <h2 className="h-display text-2xl">Technologies</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <Pill key={t}>{t}</Pill>
                ))}
              </div>
            </Reveal>
          </div>
          {project.image && (
            <Reveal delay={0.1}>
              <div className="glass relative overflow-hidden rounded-3xl bg-bg-2 p-8">
                <div className="absolute inset-0 grid-fade opacity-60" />
                <img src={project.image.src} alt={project.image.alt} width={1344} height={1920} decoding="async" className="relative mx-auto w-[60%] drop-shadow-[0_24px_40px_rgba(24,38,33,0.25)]" />
              </div>
            </Reveal>
          )}
        </div>
      </section>
      <CtaSection />
    </>
  )
}
