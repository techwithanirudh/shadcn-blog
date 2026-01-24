import Link from 'next/link'
import { PostCard } from '@/components/blog/post-card'
import { Icons } from '@/components/icons/icons'
import { Section } from '@/components/section'
import { buttonVariants } from '@/components/ui/button'
import { ViewAnimation } from '@/components/view-animation'
import type { BlogPage } from '@/lib/source'

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
                author={post.data.author}
                date={date}
                description={post.data.description ?? ''}
                image={post.data.image}
                index={index}
                slugs={post.slugs}
                tags={post.data.tags}
                title={post.data.title}
                url={post.url}
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
            className={buttonVariants({
              variant: 'default',
              className: 'group min-w-full rounded-none py-4 sm:py-8',
            })}
            href='/posts'
          >
            View More
            <Icons.arrowRight className='ml-2 size-5 transition-transform group-hover:-rotate-45' />
          </Link>
        </ViewAnimation>
      </div>
    </Section>
  )
}
