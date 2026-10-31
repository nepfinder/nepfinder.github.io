import { useId, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { CheckCircle2, Loader2, Mail, AlertCircle } from 'lucide-react'
import { site } from '@/data/site'
import { cn } from '@/utils/cn'
import { useT } from '@/i18n'
import { track } from '@/lib/analytics'
import type { TKey } from '@/i18n/en'

const serviceOptions = [
  'Custom Software Development',
  'AI Implementation & MCP',
  'ERP Implementation',
  'ERP Support & Maintenance (monthly plan)',
  'ERPNext Implementation',
  'Frappe Framework Development',
  'Web Development',
  'Mobile Application Development',
  'API Integration',
  'Other',
]

interface Values {
  name: string
  company: string
  email: string
  phone: string
  service: string
  message: string
  website: string // honeypot
}

const empty: Values = { name: '', company: '', email: '', phone: '', service: '', message: '', website: '' }

type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent'; via: 'endpoint' | 'mail' } | { kind: 'error'; message: string }

function validate(v: Values) {
  const errors: Partial<Record<keyof Values, TKey>> = {}
  if (v.name.trim().length < 2) errors.name = 'form.err.name'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) errors.email = 'form.err.email'
  if (v.phone && !/^[+\d][\d\s().-]{5,}$/.test(v.phone)) errors.phone = 'form.err.phone'
  if (!v.service) errors.service = 'form.err.service'
  if (v.message.trim().length < 20) errors.message = 'form.err.message'
  return errors
}

const inputClass =
  'w-full rounded-xl border border-transparent bg-white px-4 py-3 text-[15px] text-text placeholder:text-muted transition-colors focus:border-brand focus:outline-none aria-[invalid=true]:border-red-500'

export function ContactForm() {
  const id = useId()
  const t = useT()
  const navigate = useNavigate()
  const [values, setValues] = useState<Values>(empty)
  const [errors, setErrors] = useState<Partial<Record<keyof Values, TKey>>>({})
  const [status, setStatus] = useState<Status>({ kind: 'idle' })

  const update = (k: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  const buildMailto = () => {
    const subject = `Project inquiry: ${values.service} — ${values.name}`
    const body = [
      `Full Name: ${values.name}`,
      `Company: ${values.company || '-'}`,
      `Email: ${values.email}`,
      `Phone: ${values.phone || '-'}`,
      `Service Interested In: ${values.service}`,
      '',
      'Project Description:',
      values.message,
    ].join('\n')
    return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (values.website) return // bot filled the honeypot; silently ignore
    const errs = validate(values)
    setErrors(errs)
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0]
      document.getElementById(`${id}-${first}`)?.focus()
      return
    }
    setStatus({ kind: 'sending' })

    if (site.contactEndpoint) {
      try {
        const res = await fetch(site.contactEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: values.name,
            company: values.company,
            email: values.email,
            phone: values.phone,
            service: values.service,
            message: values.message,
            _subject: `Project inquiry: ${values.service} — ${values.name}`,
            // Web3Forms fields (ignored by other services)
            ...(site.contactAccessKey
              ? { access_key: site.contactAccessKey, subject: `Project inquiry: ${values.service} — ${values.name}`, from_name: 'Nepfinder website', botcheck: '' }
              : {}),
          }),
        })
        if (!res.ok) throw new Error(`Request failed (${res.status})`)
        track('generate_lead', { form_name: 'contact', service: values.service, service_interest: values.service, lead_type: 'form_submission', lead_channel: 'form_endpoint' })
        setStatus({ kind: 'sent', via: 'endpoint' })
        setValues(empty)
        // Client-side navigation keeps the page alive so the lead hit is sent; Google Ads
        // records the conversion on /contact/thank-you from the generate_lead event.
        navigate('/contact/thank-you')
        return
      } catch (err) {
        setStatus({ kind: 'error', message: err instanceof Error ? err.message : 'Something went wrong.' })
        return
      }
    }

    // No form endpoint configured: hand the message to the visitor's email client.
    // Not a confirmed lead (the visitor may never press send), so it is tracked separately from generate_lead.
    track('contact_email_handoff', { form_name: 'contact', service: values.service, service_interest: values.service, lead_type: 'email_handoff', lead_channel: 'mailto_fallback' })
    window.location.href = buildMailto()
    setStatus({ kind: 'sent', via: 'mail' })
  }

  if (status.kind === 'sent') {
    return (
      <div role="status" className="flex flex-col items-center rounded-[var(--radius-tile)] bg-bg-2 p-10 text-center">
        <span className="inline-flex size-14 items-center justify-center rounded-full bg-accent/10 text-accent">
          <CheckCircle2 className="size-7" aria-hidden />
        </span>
        <h3 className="h-display mt-5 text-2xl">{t('form.thanks')}</h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
          {status.via === 'endpoint' ? t('form.sent.endpoint') : t('form.sent.mail', { email: site.email })}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {status.via === 'mail' && (
            <a href={buildMailto()} className="btn-primary">
              <Mail className="size-4" aria-hidden /> {t('form.open.again')}
            </a>
          )}
          <button type="button" className="btn-secondary" onClick={() => setStatus({ kind: 'idle' })}>
            {t('form.another')}
          </button>
        </div>
      </div>
    )
  }

  const field = (k: keyof Values, label: string, el: React.ReactNode, required = true) => (
    <div>
      <label htmlFor={`${id}-${k}`} className="mb-1.5 block text-xs font-semibold tracking-wide text-text/75">
        {label} {required && <span className="text-accent" aria-hidden>*</span>}
      </label>
      {el}
      {errors[k] && (
        <p id={`${id}-${k}-error`} className="mt-1.5 flex items-center gap-1 text-xs text-red-700" role="alert">
          <AlertCircle className="size-3.5" aria-hidden /> {t(errors[k]!)}
        </p>
      )}
    </div>
  )

  const a11y = (k: keyof Values) => ({
    id: `${id}-${k}`,
    'aria-invalid': !!errors[k],
    'aria-describedby': errors[k] ? `${id}-${k}-error` : undefined,
  })

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-[var(--radius-tile)] bg-bg-2 p-6 sm:p-8" aria-describedby={`${id}-note`}>
      <div className="grid gap-5 sm:grid-cols-2">
        {field('name', t('form.name'), <input {...a11y('name')} className={inputClass} autoComplete="name" value={values.name} onChange={update('name')} placeholder={t('form.name.placeholder')} required />)}
        {field('company', t('form.company'), <input {...a11y('company')} className={inputClass} autoComplete="organization" value={values.company} onChange={update('company')} placeholder={t('form.company.placeholder')} />, false)}
        {field('email', t('form.email'), <input {...a11y('email')} type="email" className={inputClass} autoComplete="email" value={values.email} onChange={update('email')} placeholder="you@company.com" required />)}
        {field('phone', t('form.phone'), <input {...a11y('phone')} type="tel" className={inputClass} autoComplete="tel" value={values.phone} onChange={update('phone')} placeholder="+977" />, false)}
        <div className="sm:col-span-2">
          {field(
            'service',
            t('form.service'),
            <select {...a11y('service')} className={cn(inputClass, 'appearance-none')} value={values.service} onChange={update('service')} required>
              <option value="" disabled>
                {t('form.service.placeholder')}
              </option>
              {serviceOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>,
          )}
        </div>
        <div className="sm:col-span-2">
          {field('message', t('form.message'), <textarea {...a11y('message')} className={cn(inputClass, 'min-h-[140px] resize-y')} value={values.message} onChange={update('message')} placeholder={t('form.message.placeholder')} required />)}
        </div>
        {/* Honeypot: hidden from humans and assistive tech, bots tend to fill it. */}
        <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor={`${id}-website`}>Website</label>
          <input id={`${id}-website`} tabIndex={-1} autoComplete="off" value={values.website} onChange={update('website')} />
        </div>
      </div>

      {status.kind === 'error' && (
        <p role="alert" className="mt-5 flex items-start gap-2 rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-800">
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
          <span>
            {t('form.err.send', { reason: status.message })}{' '}
            <a className="underline" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            .
          </span>
        </p>
      )}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p id={`${id}-note`} className="text-xs text-muted">
          {t('form.note')}
        </p>
        <button type="submit" className="btn-primary min-w-[180px]" disabled={status.kind === 'sending'}>
          {status.kind === 'sending' ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden /> {t('form.sending')}
            </>
          ) : (
            t('form.submit')
          )}
        </button>
      </div>
    </form>
  )
}
