import type { ReactNode } from 'react'
import { Reveal } from './Reveal'
import { cn } from '@/utils/cn'

interface Props {
  title: ReactNode
  text?: ReactNode
  align?: 'left' | 'center'
  as?: 'h1' | 'h2'
  className?: string
}

export function SectionHeading({ title, text, align = 'center', as: Tag = 'h2', className }: Props) {
  return (
    <Reveal className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      <Tag className={cn('h-display text-4xl leading-[1.08] sm:text-5xl lg:text-[3.5rem]', Tag === 'h1' && 'lg:text-[4.25rem]')}>{title}</Tag>
      {text && <p className={cn('mt-6 text-lg leading-relaxed text-muted sm:text-xl', align === 'center' && 'mx-auto max-w-2xl')}>{text}</p>}
    </Reveal>
  )
}
