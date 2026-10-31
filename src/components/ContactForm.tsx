import { useId, useState, type FormEvent } from 'react'
import { CheckCircle2, Loader2, Mail, AlertCircle } from 'lucide-react'
import { site } from '@/data/site'
import { cn } from '@/utils/cn'

const serviceOptions = [
  'Custom Software Development',
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
  const errors: Partial<Record<keyof Values, string>> = {}
  if (v.name.trim().length < 2) errors.name = 'Please enter your full name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) errors.email = 'Please enter a valid email address.'
  if (v.phone && !/^[+\d][\d\s().-]{5,}$/.test(v.phone)) errors.phone = 'Please enter a valid phone number.'
  if (!v.service) errors.service = 'Please choose the service you are interested in.'
  if (v.message.trim().length < 20) errors.message = 'Please describe your project in at least 20 characters.'
  return errors
}

const inputClass =
  'w-full rounded-xl border border-transparent bg-white px-4 py-3 text-[15px] text-text placeholder:text-muted transition-colors focus:border-brand focus:outline-none aria-[invalid=true]:border-red-500'

export function ContactForm() {
  const id = useId()
  const [values, setValues] = useState<Values>(empty)
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({})
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
          }),
        })
        if (!res.ok) throw new Error(`Request failed (${res.status})`)
        setStatus({ kind: 'sent', via: 'endpoint' })
        setValues(empty)
        return
      } catch (err) {
        setStatus({ kind: 'error', message: err instanceof Error ? err.message : 'Something went wrong.' })
        return
      }
    }

    // No form endpoint configured: hand the message to the visitor's email client.
    window.location.href = buildMailto()
    setStatus({ kind: 'sent', via: 'mail' })
  }

  if (status.kind === 'sent') {
    return (
      <div role="status" className="flex flex-col items-center rounded-[var(--radius-tile)] bg-bg-2 p-10 text-center">
        <span className="inline-flex size-14 items-center justify-center rounded-full bg-accent/10 text-accent">
          <CheckCircle2 className="size-7" aria-hidden />
        </span>
        <h3 className="h-display mt-5 text-2xl">Thank you!</h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
          {status.via === 'endpoint'
            ? 'Your message has been sent. We will get back to you shortly.'
            : `Your email client should now open with your message addressed to ${site.email}. If it did not open, please email us directly.`}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {status.via === 'mail' && (
            <a href={buildMailto()} className="btn-primary">
              <Mail className="size-4" aria-hidden /> Open email again
            </a>
          )}
          <button type="button" className="btn-secondary" onClick={() => setStatus({ kind: 'idle' })}>
            Send another message
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
          <AlertCircle className="size-3.5" aria-hidden /> {errors[k]}
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
        {field('name', 'Full Name', <input {...a11y('name')} className={inputClass} autoComplete="name" value={values.name} onChange={update('name')} placeholder="Your name" required />)}
        {field('company', 'Company Name', <input {...a11y('company')} className={inputClass} autoComplete="organization" value={values.company} onChange={update('company')} placeholder="Company or organisation" />, false)}
        {field('email', 'Email Address', <input {...a11y('email')} type="email" className={inputClass} autoComplete="email" value={values.email} onChange={update('email')} placeholder="you@company.com" required />)}
        {field('phone', 'Phone Number', <input {...a11y('phone')} type="tel" className={inputClass} autoComplete="tel" value={values.phone} onChange={update('phone')} placeholder="+977" />, false)}
        <div className="sm:col-span-2">
          {field(
            'service',
            'Service Interested In',
            <select {...a11y('service')} className={cn(inputClass, 'appearance-none')} value={values.service} onChange={update('service')} required>
              <option value="" disabled>
                Select a service
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
          {field('message', 'Project Description', <textarea {...a11y('message')} className={cn(inputClass, 'min-h-[140px] resize-y')} value={values.message} onChange={update('message')} placeholder="Tell us about your business, the problem you want to solve, and any timeline." required />)}
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
            We could not send your message ({status.message}). Please try again or email us at{' '}
            <a className="underline" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            .
          </span>
        </p>
      )}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p id={`${id}-note`} className="text-xs text-muted">
          Your details are used only to respond to your inquiry.
        </p>
        <button type="submit" className="btn-primary min-w-[180px]" disabled={status.kind === 'sending'}>
          {status.kind === 'sending' ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden /> Sending…
            </>
          ) : (
            'Send Inquiry'
          )}
        </button>
      </div>
    </form>
  )
}
