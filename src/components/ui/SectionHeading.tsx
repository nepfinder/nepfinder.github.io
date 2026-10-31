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
      <Tag className={cn('h-display text-3xl leading-[1.1] sm:text-4xl lg:text-[2.75rem]', Tag === 'h1' && 'lg:text-[3.5rem]')}>{title}</Tag>
      {text && <p className={cn('mt-5 text-base leading-relaxed text-muted sm:text-lg', align === 'center' && 'mx-auto max-w-2xl')}>{text}</p>}
    </Reveal>
  )
}
