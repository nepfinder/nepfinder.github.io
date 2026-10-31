import { Link } from 'react-router'
import { Clock, Code2, SlidersHorizontal, Wallet } from 'lucide-react'
import { getProduct } from '@/data/products'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'

const pillars = [
  { icon: Wallet, title: 'One fixed monthly price', text: 'Predictable cost sized to your users and modules.' },
  { icon: Code2, title: 'Technical experts', text: 'Customisations, integrations, upgrades, and server health.' },
  { icon: SlidersHorizontal, title: 'Functional experts', text: 'Process, configuration, and user guidance across modules.' },
  { icon: Clock, title: 'Office hours 10:00 to 18:00', text: 'Reach the team on working days by email, phone, or tickets.' },
]

export function SupportPlan() {
  const plan = getProduct('enterprise-support')!
  return (
    <section id="support" className="theme-dark section bg-evergreen">
      <div className="container-x">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="h-display text-3xl leading-[1.1] sm:text-4xl lg:text-[2.5rem]">Enterprise ERP Support</h2>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            A dedicated team of ERP experts for your business, every month, for one fixed price.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button to="/contact">Request a quote</Button>
            <Button to={`/products/${plan.slug}`} variant="secondary">
              See what is included
            </Button>
          </div>
        </Reveal>
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05} className="h-full">
              <div className="card h-full">
                <span className="icon-tile">
                  <p.icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-text">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center text-sm text-muted">
          <p>
            Covers ERPNext and other ERP systems we implement.{' '}
            <Link to={`/products/${plan.slug}`} className="text-accent hover:underline">
              Full plan details
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
