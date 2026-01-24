import type { ReactNode } from 'react'
import { Balancer } from 'react-wrap-balancer'
import { ViewAnimation } from '@/components/view-animation'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  title: string | ReactNode
  description?: string | ReactNode | null
  className?: string
  titleClassName?: string
  descriptionClassName?: string
  align?: 'left' | 'center'
  size?: 'default' | 'large'
}

export const SectionHeader = ({
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
  align = 'center',
  size = 'default',
}: SectionHeaderProps) => (
  <div
    className={cn(
      'flex flex-col gap-4',
      align === 'center' ? 'items-center text-center' : 'items-start text-left',
      className
    )}
  >
    <ViewAnimation
      initial={{ opacity: 0, translateY: -6 }}
      whileInView={{ opacity: 1, translateY: 0 }}
    >
      <h1
        className={cn(
          'typography-title font-bold leading-tight tracking-tight',
          size === 'large'
            ? 'text-3xl sm:text-4xl md:text-5xl'
            : 'text-2xl sm:text-3xl md:text-4xl',
          titleClassName
        )}
      >
        <Balancer>{title}</Balancer>
      </h1>
    </ViewAnimation>
    {description && (
      <ViewAnimation
        delay={0.1}
        initial={{ opacity: 0, translateY: -6 }}
        whileInView={{ opacity: 1, translateY: 0 }}
      >
        <p
          className={cn(
            'typography-body text-muted-foreground',
            size === 'large' ? 'text-lg' : 'text-base',
            descriptionClassName
          )}
        >
          <Balancer>{description}</Balancer>
        </p>
      </ViewAnimation>
    )}
  </div>
)
