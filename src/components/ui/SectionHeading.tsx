import type { ReactNode } from 'react'
import { Reveal } from './Reveal'
import { cn } from '@/utils/cn'

interface Props {
  eyebrow?: string
  title: ReactNode
  text?: ReactNode
  align?: 'left' | 'center'
  as?: 'h1' | 'h2'
  className?: string
}

export function SectionHeading({ eyebrow, title, text, align = 'left', as: Tag = 'h2', className }: Props) {
  return (
    <Reveal className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && <span className="eyebrow mb-4">{eyebrow}</span>}
      <Tag className={cn('h-display text-3xl sm:text-4xl lg:text-5xl leading-[1.1]', Tag === 'h1' && 'lg:text-6xl')}>{title}</Tag>
      {text && <p className="mt-5 text-base sm:text-lg text-muted leading-relaxed">{text}</p>}
    </Reveal>
  )
}
