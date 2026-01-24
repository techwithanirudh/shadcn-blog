import type { HTMLAttributes } from 'react'
import { PostCard } from '@/components/blog/post-card'
import { SearchRedirectInput } from '@/components/search-redirect-input'
import { Section } from '@/components/section'
import { ViewAnimation } from '@/components/view-animation'
import type { BlogPage } from '@/lib/source'
import { cn } from '@/lib/utils'

export default function Posts({
  posts,
  className,
  ...props
}: { posts: BlogPage[] } & {
  sectionClassName?: string
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <Section
      {...props}
      className={cn(
        'flex flex-col divide-y divide-dashed divide-border',
        className
      )}
    >
      <ViewAnimation
        delay={0.05}
        initial={{ opacity: 0, translateY: -6 }}
        whileInView={{ opacity: 1, translateY: 0 }}
      >
        <SearchRedirectInput
          className='min-w-full'
          placeholder='Search posts...'
          tag='blog'
        />
      </ViewAnimation>
      <div className='grid divide-y divide-dashed divide-border text-left'>
        {posts.map((post, index) => {
          const date = new Date(post.data.date).toDateString()
          return (
            <ViewAnimation
              delay={0.05 * index}
              initial={{ opacity: 0, translateY: -6 }}
              key={post.url}
              whileInView={{ opacity: 1, translateY: 0 }}
            >
              <PostCard
                author={post.data.author}
                date={date}
                description={post.data.description ?? ''}
                slugs={post.slugs}
                title={post.data.title}
                url={post.url}
              />
            </ViewAnimation>
          )
        })}
      </div>
    </Section>
  )
}
