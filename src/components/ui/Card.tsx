import type { ComponentProps } from 'react'
import { cn } from '@/utils/cn'

export function Card({ className, children, ...rest }: ComponentProps<'div'>) {
  return (
    <div className={cn('card card-border hover:-translate-y-1', className)} {...rest}>
      {children}
    </div>
  )
}

export function IconBadge({ className, children }: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'icon-tile',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function Pill({ className, children }: ComponentProps<'span'>) {
  return (
    <span className={cn('inline-flex items-center rounded-full border border-line bg-bg-2 px-3 py-1 text-xs font-medium text-text', className)}>
      {children}
    </span>
  )
}
