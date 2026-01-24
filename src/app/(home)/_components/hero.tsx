import Link from 'next/link'
import Balancer from 'react-wrap-balancer'
import { Icons } from '@/components/icons/icons'
import { Section } from '@/components/section'
import { buttonVariants } from '@/components/ui/button'
import { ViewAnimation } from '@/components/view-animation'
import { owner } from '@/constants/site'
import { cn } from '@/lib/utils'

const Hero = () => {
  return (
    <Section className='relative flex flex-col items-center justify-center gap-6 overflow-hidden px-4 py-16 sm:px-16 sm:py-24 md:py-32'>
      <ViewAnimation
        delay={0.05}
        initial={{ opacity: 0, translateY: -6 }}
        whileInView={{ opacity: 1, translateY: 0 }}
      >
        <div className='flex items-center justify-center space-x-2'>
          <Icons.code className='h-6 w-6 text-primary transition-transform hover:scale-125' />
          <span className='font-medium text-muted-foreground text-sm'>
            Full-Stack Developer & Tech Writer
          </span>
        </div>
      </ViewAnimation>

      <ViewAnimation
        delay={0.1}
        initial={{ opacity: 0, translateY: -6 }}
        whileInView={{ opacity: 1, translateY: 0 }}
      >
        <h1 className='max-w-3xl text-center font-bold text-4xl leading-tight tracking-tighter sm:text-5xl md:max-w-4xl md:text-6xl lg:leading-[1.1]'>
          <Balancer>I'm {owner}!</Balancer>
        </h1>
      </ViewAnimation>

      <ViewAnimation
        delay={0.15}
        initial={{ opacity: 0, translateY: -6 }}
        whileInView={{ opacity: 1, translateY: 0 }}
      >
        <p className='max-w-xl text-center text-muted-foreground md:max-w-2xl md:text-lg'>
          <Balancer>
            I write about web development, software engineering, and the latest
            technologies. I also create fun projects and tutorials to help you
            learn and grow as a developer.
          </Balancer>
        </p>
      </ViewAnimation>

      <ViewAnimation
        delay={0.2}
        initial={{ opacity: 0, translateY: -6 }}
        whileInView={{ opacity: 1, translateY: 0 }}
      >
        <div className='flex flex-wrap items-center justify-center gap-4'>
          <Link
            className={cn(
              buttonVariants({
                variant: 'default',
                size: 'lg',
              }),
              'group rounded-full bg-primary hover:bg-primary/90'
            )}
            href='/blog'
          >
            Browse Posts
            <Icons.arrowRight className='ml-2 size-5 transition-transform group-hover:-rotate-45' />
          </Link>
        </div>
      </ViewAnimation>
    </Section>
  )
}

export default Hero
