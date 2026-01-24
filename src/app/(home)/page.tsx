import { CTA } from '@/app/(home)/_components/call-to-action'
import Hero from '@/app/(home)/_components/hero'
import Posts from '@/app/(home)/_components/posts'
import { Icons } from '@/components/icons/icons'
import { Section } from '@/components/section'
import Separator from '@/components/separator'
import { ViewAnimation } from '@/components/view-animation'
import { getSortedByDatePosts } from '@/lib/source'

export default function Home() {
  const posts = getSortedByDatePosts().slice(0, 3)

  return (
    <>
      <Hero />
      <Section className='py-8 sm:py-16'>
        <ViewAnimation
          delay={0.05}
          initial={{ opacity: 0, translateY: -6 }}
          whileInView={{ opacity: 1, translateY: 0 }}
        >
          <h2 className='text-center font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl'>
            <span className='inline-flex items-center gap-3'>
              Posts{' '}
              <Icons.posts className='size-10 fill-fd-primary/30 text-fd-primary transition-transform hover:rotate-12 hover:scale-125' />
            </span>
          </h2>
        </ViewAnimation>
      </Section>
      <Separator />
      <Posts posts={posts} />
      <Separator />
      <CTA />
    </>
  )
}
