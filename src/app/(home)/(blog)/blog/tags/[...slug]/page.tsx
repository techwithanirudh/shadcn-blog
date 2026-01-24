import type { Metadata, ResolvingMetadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { PostCard } from '@/components/blog/post-card'
import { Icons } from '@/components/icons/icons'
import { TagJsonLd } from '@/components/json-ld'
import { NumberedPagination } from '@/components/numbered-pagination'
import { Section } from '@/components/section'
import { HeroSection } from '@/components/sections/hero'
import { ViewAnimation } from '@/components/view-animation'
import { postsPerPage } from '@/constants/config'
import { createMetadata } from '@/lib/metadata'
import { getPostsByTag, getTags } from '@/lib/source'

export const dynamicParams = false

const totalPosts = (title: string) => getPostsByTag(title).length
const pageCount = (title: string) => Math.ceil(totalPosts(title) / postsPerPage)

const CurrentPostsCount = ({
  startIndex,
  endIndex,
  tag,
}: {
  startIndex: number
  endIndex: number
  tag: string
}) => {
  const total = totalPosts(tag)
  const start = startIndex + 1
  const end = endIndex < total ? endIndex : total
  if (start === end) {
    return <span>({start})</span>
  }
  return (
    <span>
      ({start}-{end})
    </span>
  )
}

const Header = ({
  tag,
  startIndex,
  endIndex,
}: {
  tag: string
  startIndex: number
  endIndex: number
}) => (
  <HeroSection
    align='start'
    title={
      <div className='flex items-center justify-between gap-4'>
        <span className='flex items-center gap-2'>
          <Icons.tag
            className='text-muted-foreground transition-transform hover:rotate-12 hover:scale-125'
            size={20}
          />
          {tag} <span className='text-muted-foreground'>Posts</span>{' '}
          <CurrentPostsCount
            endIndex={endIndex}
            startIndex={startIndex}
            tag={tag}
          />
        </span>
      </div>
    }
    variant='compact'
  />
)

const Pagination = ({ pageIndex, tag }: { pageIndex: number; tag: string }) => {
  const handlePageChange = async (page: number) => {
    'use server'
    redirect(`/blog/tags/${tag}?page=${page}`)
  }

  return (
    <Section className='bg-dashed'>
      <NumberedPagination
        currentPage={pageIndex + 1}
        onPageChange={handlePageChange}
        paginationItemsToDisplay={5}
        totalPages={pageCount(tag)}
      />
    </Section>
  )
}

export default async function Page(props: {
  params: Promise<{ slug: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await props.params
  const searchParams = await props.searchParams

  const tag = params.slug[0]
  if (!tag) {
    return notFound()
  }

  const pageIndex = searchParams.page
    ? Number.parseInt(searchParams.page[0] ?? '', 10) - 1
    : 0

  if (pageIndex < 0 || pageIndex >= pageCount(tag)) {
    notFound()
  }

  const startIndex = pageIndex * postsPerPage
  const endIndex = startIndex + postsPerPage
  const posts = getPostsByTag(tag).slice(startIndex, endIndex)

  return (
    <>
      <Header endIndex={endIndex} startIndex={startIndex} tag={tag} />
      <Section className='h-full' sectionClassName='flex flex-1'>
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
                  author={post.data.author ?? 'Unknown'}
                  date={date}
                  description={post.data.description ?? ''}
                  slugs={post.slugs}
                  title={post.data.title ?? 'Untitled'}
                  url={post.url}
                />
              </ViewAnimation>
            )
          })}
        </div>
      </Section>
      {pageCount(tag) > 1 && <Pagination pageIndex={pageIndex} tag={tag} />}
      <TagJsonLd tag={tag} />
    </>
  )
}

export const generateStaticParams = () => {
  const tags = getTags()
  return [
    ...tags.map((tag) => ({ slug: [tag] })),
    ...tags.flatMap((tag) =>
      Array.from({ length: pageCount(tag) }, (_, index) => ({
        slug: [tag, (index + 1).toString()],
      }))
    ),
  ]
}

interface Props {
  params: Promise<{ slug: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  props: Props,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params
  const searchParams = await props.searchParams

  const tag = params.slug[0]
  const pageIndex = searchParams.page
    ? Number.parseInt(searchParams.page.toString(), 10)
    : 1

  const isFirstPage = pageIndex === 1 || !searchParams.page
  const pageTitle = isFirstPage
    ? `${tag} Posts`
    : `${tag} Posts - Page ${pageIndex}`
  const canonicalUrl = isFirstPage
    ? `/blog/tags/${tag}`
    : `/blog/tags/${tag}?page=${pageIndex}`

  return createMetadata({
    title: pageTitle,
    description: `Posts tagged with ${tag}${
      isFirstPage ? '' : ` - Page ${pageIndex}`
    }`,
    openGraph: {
      url: canonicalUrl,
    },
    alternates: {
      canonical: canonicalUrl,
    },
  })
}
