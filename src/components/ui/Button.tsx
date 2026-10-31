import type { ComponentProps, ReactNode } from 'react'
import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/utils/cn'

type Variant = 'primary' | 'secondary' | 'ghost'

interface BaseProps {
  variant?: Variant
  children: ReactNode
  className?: string
  arrow?: boolean
}

type ButtonLinkProps = BaseProps & { to: string; external?: boolean } & Omit<ComponentProps<'a'>, 'href' | 'children' | 'className'>
type ButtonProps = BaseProps & { to?: undefined } & Omit<ComponentProps<'button'>, 'children' | 'className'>

const variantClass: Record<Variant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
}

export function Button(props: ButtonLinkProps | ButtonProps) {
  const { variant = 'primary', children, className, arrow } = props
  const content = (
    <>
      {children}
      {arrow && <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />}
    </>
  )
  const classes = cn('group', variantClass[variant], className)

  if (props.to !== undefined) {
    const { to, external, variant: _v, arrow: _a, className: _c, children: _ch, ...rest } = props
    if (external || to.startsWith('http') || to.startsWith('mailto:')) {
      return (
        <a href={to} className={classes} target={to.startsWith('http') ? '_blank' : undefined} rel={to.startsWith('http') ? 'noopener noreferrer' : undefined} {...rest}>
          {content}
        </a>
      )
    }
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    )
  }
  const { variant: _v, arrow: _a, className: _c, children: _ch, to: _t, ...rest } = props
  return (
    <button className={classes} {...rest}>
      {content}
    </button>
  )
}
