import { Link } from 'react-router'
import { useSeo } from '@/lib/seo'
import { ncafePrivacy } from '@/data/legal'
import { site } from '@/data/site'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal } from '@/components/ui/Reveal'

const seo = {
  title: 'nCafe Privacy Policy',
  description: 'How the nCafe mobile application by Nepfinder collects, uses, shares, and protects your information.',
  path: '/ncafe/privacy',
}

export default function NcafePrivacy() {
  useSeo(seo)
  return (
    <>
      <PageHero
        title={ncafePrivacy.title}
        text="This policy explains what information the nCafe app collects, how it is used, and the choices you have."
        crumbs={[{ label: 'Products', to: '/products' }, { label: 'nCafe', to: '/products/ncafe' }, { label: 'Privacy Policy' }]}
      />
      <section className="section pt-0">
        <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          <Reveal>
            <article className="max-w-3xl">
              {ncafePrivacy.sections.map((s) => (
                <section key={s.heading} id={s.heading.toLowerCase().replace(/[^a-z]+/g, '-')} className="scroll-mt-24 border-t border-line py-8 first:border-t-0 first:pt-0">
                  <h2 className="font-display text-2xl font-semibold text-text">{s.heading}</h2>
                  {s.text && <p className="mt-3 text-[17px] leading-relaxed text-muted">{s.text}</p>}
                  {s.intro && <p className="mt-3 text-[17px] leading-relaxed text-muted">{s.intro}</p>}
                  {s.items && (
                    <dl className="mt-5 space-y-4">
                      {s.items.map((it) => (
                        <div key={it.title} className="rounded-2xl bg-bg-2 p-5">
                          <dt className="font-semibold text-text">{it.title}</dt>
                          <dd className="mt-1.5 text-[15px] leading-relaxed text-muted">{it.text}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </section>
              ))}
            </article>
          </Reveal>
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <nav aria-label="On this page" className="rounded-2xl bg-bg-2 p-5">
              <p className="text-sm font-semibold text-text">On this page</p>
              <ul className="mt-3 space-y-2">
                {ncafePrivacy.sections.map((s) => (
                  <li key={s.heading}>
                    <a href={`#${s.heading.toLowerCase().replace(/[^a-z]+/g, '-')}`} className="text-sm text-muted hover:text-brand">
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-4 rounded-2xl bg-bg-2 p-5">
              <p className="text-sm font-semibold text-text">Want your data removed?</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">Submit a request and we will delete the data linked to your nCafe account.</p>
              <Link to="/user-data-delete-request" className="btn-primary mt-4 w-full">
                Request data deletion
              </Link>
              <a href={`mailto:${site.email}`} className="mt-3 block text-center text-sm text-brand hover:underline">
                {site.email}
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
