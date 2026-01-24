import { Icons } from '@/components/icons/icons'
import { Section } from '@/components/section'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import * as motion from 'motion/react-client'
import Link from 'next/link'
import Balancer from 'react-wrap-balancer'

const Hero = () => {
  return (
    <Section className='relative flex flex-col items-center justify-center gap-6 overflow-hidden bg-dashed px-4 py-16 sm:px-16 sm:py-24 md:py-32'>
      <div className='flex items-center justify-center space-x-2'>
        <Icons.code className='h-6 w-6 text-primary transition-transform hover:scale-125' />
        <span className='font-medium text-muted-foreground text-sm'>
          Full-Stack Developer & Tech Writer
        </span>
      </div>
      <h1 className='max-w-3xl text-center font-bold text-4xl leading-tight tracking-tighter sm:text-5xl md:max-w-4xl md:text-6xl lg:leading-[1.1]'>
        <Balancer>{"I'm John Doe, a Full-Stack Developer."}</Balancer>
      </h1>
      <p className='max-w-xl text-center text-muted-foreground md:max-w-2xl md:text-lg'>
        <Balancer>
          I write about web development, software engineering, and the latest
          technologies. I also create fun projects and tutorials to help you
          learn and grow as a developer.
        </Balancer>
      </p>

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
          <Icons.arrowUpRight className='group-hover:-rotate-12 ml-2 size-5 transition-transform' />
        </Link>
      </div>
    </Section>
  )
}

export default Hero
