import type { Metadata, ResolvingMetadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { NumberedPagination } from '@/components/numbered-pagination'
import { Section } from '@/components/section'
import { Wrapper } from '@/components/wrapper'
import { postsPerPage } from '@/constants/config'
import { createMetadata } from '@/lib/metadata'
import { getPostsByTag, getSortedByDatePosts, getTags } from '@/lib/source'
import { Hero } from './_components/hero'
import { NewsletterSection } from './_components/newsletter-section'
import Posts from './_components/posts'
import { TagsAccordion, TagsSidebar } from './_components/tags-sidebar'

export const dynamicParams = false

const totalPosts = getSortedByDatePosts().length
const pageCount = Math.ceil(totalPosts / postsPerPage)

const getTagsWithCount = () => {
  const tagNames = getTags()
  return tagNames.map((name) => ({
    name,
    count: getPostsByTag(name).length,
  }))
}

const Pagination = ({ pageIndex }: { pageIndex: number }) => {
  const handlePageChange = async (page: number) => {
    'use server'
    redirect(`/posts?page=${page}`)
  }

  return (
    <Section className='bg-dashed'>
      <NumberedPagination
        currentPage={pageIndex + 1}
        onPageChange={handlePageChange}
        paginationItemsToDisplay={5}
        totalPages={pageCount}
      />
    </Section>
  )
}

export default async function Page(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams
  const pageIndex = searchParams.page
    ? Number.parseInt(searchParams.page[0] ?? '', 10) - 1
    : 0
  if (pageIndex < 0 || pageIndex >= pageCount) {
    notFound()
  }

  const startIndex = pageIndex * postsPerPage
  const endIndex = startIndex + postsPerPage
  const posts = getSortedByDatePosts().slice(startIndex, endIndex)
  const tags = getTagsWithCount()

  return (
    <Wrapper>
      <Hero
        endIndex={endIndex}
        startIndex={startIndex}
        totalPosts={totalPosts}
      />
      <Section className='h-full' sectionClassName='flex flex-1'>
        <div className='grid h-full lg:grid-cols-[1fr_280px]'>
          <div className='min-w-0 lg:border-border lg:border-r lg:border-dashed'>
            <div className='border-border border-b border-dashed px-4 py-2.5 lg:hidden'>
              <TagsAccordion tags={tags} />
            </div>
            <Posts
              className='h-full border-none'
              posts={posts}
              sectionClassName='flex flex-1'
            />
          </div>
          <aside className='hidden lg:block'>
            <TagsSidebar tags={tags} />
          </aside>
        </div>
      </Section>
      {pageCount > 1 && <Pagination pageIndex={pageIndex} />}
      <NewsletterSection />
    </Wrapper>
  )
}

export const generateStaticParams = () => {
  const slugs = Array.from({ length: pageCount }, (_, index) => ({
    slug: [(index + 1).toString()],
  }))

  return [{ slug: [] }, ...slugs]
}

interface Props {
  params: Promise<{ slug: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  props: Props,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const searchParams = await props.searchParams

  const pageIndex = searchParams.page
    ? Number.parseInt(searchParams.page as string, 10)
    : 1

  const isFirstPage = pageIndex === 1 || !searchParams.page
  const pageTitle = isFirstPage ? 'Posts' : `Posts - Page ${pageIndex}`
  const canonicalUrl = isFirstPage ? '/posts' : `/posts?page=${pageIndex}`

  return createMetadata({
    title: pageTitle,
    description: `Posts${isFirstPage ? '' : ` - Page ${pageIndex}`}`,
    openGraph: {
      url: canonicalUrl,
    },
    alternates: {
      canonical: canonicalUrl,
    },
  })
}
