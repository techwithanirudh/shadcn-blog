import type { Metadata } from 'next'
import { Section } from '@/components/section'
import { TagCard } from '@/components/tags/tag-card'
import { ViewAnimation } from '@/components/view-animation'
import { Wrapper } from '@/components/wrapper'
import { title as homeTitle } from '@/constants/site'
import { createMetadata } from '@/lib/metadata'
import { getTags } from '@/lib/source'
import { cn } from '@/lib/utils'
import { Hero } from './_components/hero'

export default function Page() {
  const tags = getTags()

  return (
    <Wrapper>
      <Hero />
      <Section className='h-full' sectionClassName='flex flex-1'>
        <div className='grid grid-cols-1 divide-y divide-dashed divide-border sm:grid-cols-2 lg:grid-cols-4'>
          {tags.map((tag, index) => (
            <ViewAnimation
              className='size-full'
              delay={0.05 * index}
              initial={{ opacity: 0 }}
              key={tag}
              whileInView={{ opacity: 1 }}
            >
              <TagCard
                className={cn(
                  'size-full items-center justify-start gap-2 rounded-none border-r bg-card/50 p-6 hover:bg-card/80'
                )}
                displayCount={true}
                name={tag}
              />
            </ViewAnimation>
          ))}
          {tags.length % 2 === 1 && (
            <ViewAnimation
              delay={0.05 * tags.length}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
            >
              <div className='size-full border-border border-dashed bg-dashed sm:border-b' />
            </ViewAnimation>
          )}
        </div>
      </Section>
    </Wrapper>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>
}): Promise<Metadata> {
  const _params = await props.params
  const description = `Explore all the tags on ${homeTitle}.`

  return createMetadata({
    title: 'Tags',
    description,
    openGraph: {
      url: '/blog/tags',
    },
    alternates: {
      canonical: '/blog/tags',
    },
  })
}
