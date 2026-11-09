import { Link } from 'react-router'
import { ExternalLink } from 'lucide-react'
import { useSeo } from '@/lib/seo'
import { dataDeletionFormUrl } from '@/data/legal'
import { site } from '@/data/site'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal } from '@/components/ui/Reveal'

const seo = {
  title: 'User Data Deletion Request',
  description: 'Request deletion of the personal data linked to your account in a Nepfinder mobile application such as nCafe.',
  path: '/user-data-delete-request',
}

const steps = [
  { title: 'Fill in the form', text: 'Tell us which app you used and the email address or account you signed in with.' },
  { title: 'We verify the request', text: 'We confirm the request came from the account owner before removing anything.' },
  { title: 'Your data is deleted', text: 'Account details, profile information, and usage data linked to your account are removed, and we confirm by email.' },
]

export default function DataDeletion() {
  useSeo(seo)
  return (
    <>
      <PageHero
        title="Request deletion of your data"
        text="Use this form to ask Nepfinder to delete the personal data linked to your account in one of our mobile applications, such as nCafe."
        crumbs={[{ label: 'Products', to: '/products' }, { label: 'Data Deletion Request' }]}
      />
      <section className="section pt-0">
        <div className="container-x grid gap-10 lg:grid-cols-[320px_minmax(0,1fr)]">
          <Reveal>
            <ol className="space-y-4">
              {steps.map((s, i) => (
                <li key={s.title} className="flex gap-4 rounded-2xl bg-bg-2 p-5">
                  <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white" aria-hidden>
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-text">{s.title}</p>
                    <p className="mt-1 text-[15px] leading-relaxed text-muted">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-4 rounded-2xl bg-bg-2 p-5 text-[15px] leading-relaxed text-muted">
              <p>
                Prefer email? Write to{' '}
                <a href={`mailto:${site.email}?subject=${encodeURIComponent('User data deletion request')}`} className="text-brand hover:underline">
                  {site.email}
                </a>{' '}
                with the app name and the account email.
              </p>
              <p className="mt-3">
                See the{' '}
                <Link to="/ncafe/privacy" className="text-brand hover:underline">
                  nCafe privacy policy
                </Link>{' '}
                for what we collect and how it is used.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="overflow-hidden rounded-[var(--radius-tile)] bg-bg-2 p-2 sm:p-4">
              <iframe
                src={`${dataDeletionFormUrl}?embedded=true`}
                title="User data deletion request form"
                className="h-[900px] w-full rounded-2xl bg-white"
                loading="lazy"
              >
                Loading…
              </iframe>
              <p className="px-3 py-3 text-center text-xs text-muted">
                The form is hosted on Google Forms.{' '}
                <a href={dataDeletionFormUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-brand hover:underline">
                  Open it in a new tab <ExternalLink className="size-3" aria-hidden />
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
