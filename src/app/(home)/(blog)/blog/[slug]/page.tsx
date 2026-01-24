import { File, Files, Folder } from 'fumadocs-ui/components/files'
import { InlineTOC } from 'fumadocs-ui/components/inline-toc'
import { Tab, Tabs } from 'fumadocs-ui/components/tabs'
import defaultMdxComponents from 'fumadocs-ui/mdx'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  PostComments,
  Share,
} from '@/app/(home)/(blog)/blog/[slug]/page.client'
import BlogProgressBar from '@/components/blog/progress-bar'
import { PostJsonLd } from '@/components/json-ld'
import { Section } from '@/components/section'
import { description as homeDescription } from '@/constants/site'
import { createMetadata, getBlogPageImage } from '@/lib/metadata'
import { getPost, getPosts } from '@/lib/source'
import { Header } from './_components/header'

export default async function Page(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  const page = getPost([params.slug])

  if (!page) {
    notFound()
  }
  const { body: Mdx, toc, tags, lastModified } = page.data

  const lastUpdate = lastModified ? new Date(lastModified) : undefined

  return (
    <>
      <BlogProgressBar />
      <Header page={page} tags={tags} />

      <Section className='h-full' sectionClassName='flex flex-1'>
        <article className='flex min-h-full flex-col lg:flex-row'>
          <div className='flex flex-1 flex-col gap-4'>
            {toc?.length ? (
              <InlineTOC
                className='rounded-none border-0 border-border border-b border-dashed'
                items={toc}
              />
            ) : (
              <div />
            )}
            <div className='prose min-w-0 flex-1 px-4'>
              <Mdx
                components={{
                  ...defaultMdxComponents,
                  File,
                  Files,
                  Folder,
                  Tabs,
                  Tab,
                }}
              />
            </div>
            <PostComments
              className='[&_form>div]:!rounded-none rounded-none border-0 border-border border-t border-dashed'
              slug={params.slug}
            />
          </div>
          <div className='flex flex-col gap-4 p-4 text-sm lg:sticky lg:top-[4rem] lg:h-[calc(100vh-4rem)] lg:w-[250px] lg:self-start lg:overflow-y-auto lg:border-border lg:border-l lg:border-dashed'>
            <div>
              <p className='mb-1 text-fd-muted-foreground'>Written by</p>
              <p className='font-medium'>{page.data.author ?? 'Unknown'}</p>
            </div>
            <div>
              <p className='mb-1 text-fd-muted-foreground text-sm'>
                Created At
              </p>
              <p className='font-medium'>
                {new Date(page.data.date).toDateString()}
              </p>
            </div>
            {lastUpdate && (
              <div>
                <p className='mb-1 text-fd-muted-foreground text-sm'>
                  Updated At
                </p>
                <p className='font-medium'>{lastUpdate.toDateString()}</p>
              </div>
            )}
            <Share url={page.url} />
          </div>
        </article>
      </Section>
      <PostJsonLd page={page} />
    </>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const params = await props.params
  const page = getPost([params.slug])

  if (!page) {
    notFound()
  }

  const title = page.data.title ?? 'Untitled'
  const description = page.data.description ?? homeDescription

  const image = getBlogPageImage(page)

  return createMetadata({
    title,
    description,
    openGraph: {
      url: `/blog/${page.slugs.join('/')}`,
      images: image.url,
    },
    twitter: {
      images: image.url,
    },
    alternates: {
      canonical: page.url,
    },
  })
}

export function generateStaticParams(): { slug: string | undefined }[] {
  return getPosts().map((page) => ({
    slug: page.slugs[0],
  }))
}
