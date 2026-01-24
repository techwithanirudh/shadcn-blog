import { cva, type VariantProps } from 'class-variance-authority'
import { Children, type ReactNode } from 'react'
import { Balancer } from 'react-wrap-balancer'
import { ViewAnimation } from '@/components/view-animation'
import { cn } from '@/lib/utils'
import { Section } from '../section'

const heroVariants = cva('flex flex-col', {
  variants: {
    variant: {
      default:
        'gap-8 py-8 sm:rounded-lg sm:border sm:bg-background sm:px-8 sm:py-20 sm:shadow-sm',
      compact: 'gap-4 lg:p-2',
    },
    align: {
      center: 'items-start justify-center sm:items-center',
      start: 'items-start justify-center sm:items-start',
      end: 'items-start justify-center sm:items-end',
    },
  },
  defaultVariants: {
    variant: 'default',
    align: 'center',
  },
})

interface HeroProps {
  image?: ReactNode
  caption?: string | ReactNode | null
  title: string | ReactNode
  description?: string | ReactNode | null
  children?: ReactNode
  className?: string
}

export const HeroSection = ({
  image,
  caption,
  title,
  description,
  children,
  className,
  variant,
  align,
}: HeroProps &
  VariantProps<typeof heroVariants> & {
    asChild?: boolean
  }) => (
  <Section className='p-4'>
    <div className={cn(heroVariants({ variant, align, className }))}>
      {image && (
        <ViewAnimation
          initial={{ opacity: 0, translateY: -6 }}
          whileInView={{ opacity: 1, translateY: 0 }}
        >
          {image}
        </ViewAnimation>
      )}
      <div className='flex flex-col gap-4 sm:items-center'>
        {caption && (
          <ViewAnimation
            initial={{ opacity: 0, translateY: -6 }}
            whileInView={{ opacity: 1, translateY: 0 }}
          >
            <small className='block text-muted-foreground text-sm sm:text-base'>
              <Balancer>{caption}</Balancer>
            </small>
          </ViewAnimation>
        )}
        <ViewAnimation
          delay={0.1}
          initial={{ opacity: 0, translateY: -6 }}
          whileInView={{ opacity: 1, translateY: 0 }}
        >
          <h1
            className={cn(
              'typography-hero font-bold text-3xl leading-tight tracking-tight',
              'sm:text-center sm:text-4xl sm:leading-tight',
              'md:text-5xl md:leading-tight',
              variant === 'compact' &&
                'text-left font-normal font-regular tracking-tighter sm:text-left'
            )}
          >
            <Balancer>{title}</Balancer>
          </h1>
        </ViewAnimation>
        {description && (
          <ViewAnimation
            delay={0.15}
            initial={{ opacity: 0, translateY: -6 }}
            whileInView={{ opacity: 1, translateY: 0 }}
          >
            <p
              className={cn(
                'text-muted-foreground text-sm sm:text-base',
                variant === 'compact' &&
                  'text-left text-lg leading-relaxed tracking-tight'
              )}
            >
              <Balancer>{description}</Balancer>
            </p>
          </ViewAnimation>
        )}
      </div>
      {Children.map(children, (child, index) => (
        <ViewAnimation
          delay={0.1 + index * 0.05}
          initial={{ opacity: 0, translateY: -6 }}
          whileInView={{ opacity: 1, translateY: 0 }}
        >
          {child}
        </ViewAnimation>
      ))}
    </div>
  </Section>
)
