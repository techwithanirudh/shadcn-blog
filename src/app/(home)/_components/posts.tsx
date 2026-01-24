import { Icons } from '@/components/icons/icons'
import { PostCard } from '@/components/blog/post-card'
import { Section } from '@/components/section'
import { buttonVariants } from '@/components/ui/button'
import { ViewAnimation } from '@/components/view-animation'
import type { BlogPage } from '@/lib/source'
import Link from 'next/link'

export default function Posts({ posts }: { posts: BlogPage[] }) {
  return (
    <Section>
      <div className='grid divide-y divide-dashed divide-border/70 text-left dark:divide-border'>
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
                title={post.data.title}
                description={post.data.description ?? ''}
                url={post.url}
                date={date}
                author={post.data.author}
                slugs={post.slugs}
              />
            </ViewAnimation>
          )
        })}
        <ViewAnimation
          delay={0.05 * posts.length}
          initial={{ opacity: 0, translateY: -6 }}
          whileInView={{ opacity: 1, translateY: 0 }}
        >
          <Link
            href='/blog'
            className={buttonVariants({
              variant: 'default',
              className: 'group rounded-none py-4 sm:py-8 min-w-full',
            })}
          >
            View More
            <Icons.arrowRight className='group-hover:-rotate-45 ml-2 size-5 transition-transform' />
          </Link>
        </ViewAnimation>
      </div>
    </Section>
  )
}
