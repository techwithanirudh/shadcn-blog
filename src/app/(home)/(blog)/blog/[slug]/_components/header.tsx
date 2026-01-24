// adapted from https://github.com/braydoncoyer/braydoncoyer.dev/
import * as motion from 'motion/react-client'
import Balancer from 'react-wrap-balancer'
import { BlurImage } from '@/components/blur-image'
import { Section } from '@/components/section'
import { TagCard } from '@/components/tags/tag-card'
import { ViewAnimation } from '@/components/view-animation'
import type { BlogPage as MDXPage } from '@/lib/source'

const formatPostDate = (date: Date) =>
  date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

interface HeaderProps {
  page: MDXPage
  tags?: string[]
}

export const Header = ({ page, tags }: HeaderProps) => {
  const image = page.data.image
  const formattedDate = formatPostDate(page.data.date)

  return (
    <Section>
      <FrameDecoration />
      <div className='relative h-[350px] overflow-clip md:h-[600px]'>
        <div className='relative flex h-full w-full flex-col justify-end overflow-hidden rounded-2xl bg-primary/80 shadow-xl'>
          {image && (
            <BlurImage
              alt={page.data.title ?? 'Blog cover image'}
              className='absolute inset-0 h-full w-full rounded-2xl'
              fill
              imageClassName='object-cover rounded-2xl'
              sizes='(min-width: 1024px) 800px, 100vw'
              src={image}
            />
          )}
          <div
            className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent'
            style={{ viewTransitionName: 'none' }}
          />
          <motion.div
            animate={{ opacity: 1 }}
            className='relative z-10 mt-auto p-8 md:p-16'
            initial={{ opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            {tags?.length ? (
              <div className='mb-4 hidden gap-2 md:flex md:flex-wrap'>
                {tags.map((tag, index) => (
                  <ViewAnimation
                    delay={0.1 + index * 0.05}
                    initial={{ opacity: 0, translateY: -6 }}
                    key={tag}
                    whileInView={{ opacity: 1, translateY: 0 }}
                  >
                    <TagCard
                      className='border border-white/60 bg-white/10 text-white hover:bg-white/20 [&_span]:text-white [&_svg]:text-white/70'
                      name={tag}
                    />
                  </ViewAnimation>
                ))}
              </div>
            ) : null}
            <div className='mb-4 space-y-4 text-balance'>
              <h1 className='typography-hero max-w-2xl font-medium text-4xl text-white leading-[45px] tracking-tight md:text-5xl md:leading-[60px]'>
                <Balancer>{page.data.title ?? 'Untitled'}</Balancer>
              </h1>
              <p className='typography-body hidden max-w-3xl text-slate-100 leading-8 md:block'>
                <Balancer>{page.data.description ?? ''}</Balancer>
              </p>
            </div>
            <div className='flex items-center gap-6 text-slate-200 text-xs'>
              <span>{formattedDate}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}

const FrameDecoration = () => (
  <>
    <span className='absolute top-6 z-10 h-px w-full bg-zinc-500/75 mix-blend-screen md:top-12' />
    <span className='absolute bottom-6 z-10 h-px w-full bg-zinc-500/75 mix-blend-screen md:bottom-12' />
    <span className='absolute left-6 z-10 h-full w-px bg-zinc-500/75 mix-blend-screen md:left-12' />
    <span className='absolute right-6 z-10 h-full w-px bg-zinc-500/75 mix-blend-screen md:right-12' />
    <span className='absolute top-12 left-[44.5px] z-20 hidden h-px w-2 bg-white md:block' />
    <span className='absolute top-[44.5px] left-[48px] z-20 hidden h-2 w-px bg-white md:block' />
    <span className='absolute top-12 right-[44.5px] z-20 hidden h-px w-2 bg-white md:block' />
    <span className='absolute top-[44.5px] right-[48px] z-20 hidden h-2 w-px bg-white md:block' />
    <span className='absolute bottom-12 left-[44.5px] z-20 hidden h-px w-2 bg-white md:block' />
    <span className='absolute bottom-[44.5px] left-[48px] z-20 hidden h-2 w-px bg-white md:block' />
    <span className='absolute right-[44.5px] bottom-12 z-20 hidden h-px w-2 bg-white md:block' />
    <span className='absolute right-[48px] bottom-[44.5px] z-20 hidden h-2 w-px bg-white md:block' />
  </>
)
