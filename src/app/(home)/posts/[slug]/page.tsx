import { PostComments, Share } from '@/app/(home)/posts/[slug]/page.client';
import { PostJsonLd } from '@/components/json-ld';
import { Section } from '@/components/section';
import { createMetadata } from '@/lib/metadata';
import { metadataImage } from '@/lib/metadata-image';
import { getPost, getPosts } from '@/lib/source';
import { File, Files, Folder } from 'fumadocs-ui/components/files';
import { InlineTOC } from 'fumadocs-ui/components/inline-toc';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { Steps, Step } from 'fumadocs-ui/components/steps';
import { Card } from 'fumadocs-ui/components/card';
import { Callout } from 'fumadocs-ui/components/callout';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { description as homeDescription } from 'src/app/layout.config';
import { Header } from './_components/header';

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = getPost([params.slug]);

  if (!page) notFound();
  const { body: Mdx, toc, tags, lastModified } = page.data;

  const lastUpdate = lastModified ? new Date(lastModified) : undefined;

  return (
    <>
      <Header title={page.data.title} description={page.data.description} slugs={page.slugs} tags={tags} />

      <Section className='h-full' sectionClassName='flex flex-1'>
        <article className='flex min-h-full flex-col lg:flex-row'>
          <div className='flex flex-1 flex-col gap-4'>
            <InlineTOC
              items={toc}
              className='rounded-none border-0 border-border/70 border-b border-dashed dark:border-border'
            />
            <div className='prose min-w-0 flex-1 px-4'>
              <Mdx
                components={{
                  ...defaultMdxComponents,
                  File,
                  Files,
                  Folder,
                  Tabs,
                  Tab,
                  Steps,
                  Step,
                  Card,
                  Callout
                }}
              />
            </div>
            <PostComments
              slug={params.slug}
              className='[&_form>div]:!rounded-none rounded-none border-0 border-border/70 border-t border-dashed dark:border-border'
            />
          </div>
          <div className='flex flex-col gap-4 p-4 text-sm lg:sticky lg:top-[4rem] lg:h-[calc(100vh-4rem)] lg:w-[250px] lg:self-start lg:overflow-y-auto lg:border-border/70 lg:border-l lg:border-dashed lg:dark:border-border'>
            <div>
              <p className='mb-1 text-fd-muted-foreground'>Written by</p>
              <p className='font-medium'>{page.data.author}</p>
            </div>
            <div>
              <p className='mb-1 text-fd-muted-foreground text-sm'>
                Created At
              </p>
              <p className='font-medium'>
                {new Date(page.data.date ?? page.file.name).toDateString()}
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
  );
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = getPost([params.slug]);

  if (!page) notFound();

  const title = page.data.title;
  const description = page.data.description ?? homeDescription;

  return createMetadata(
    metadataImage.withImage(page.slugs, {
      title,
      description,
      openGraph: {
        url: `/posts/${page.slugs.join('/')}`,
      },
      alternates: {
        canonical: page.url,
      },
    }),
  );
}

export function generateStaticParams(): { slug: string | undefined }[] {
  return getPosts().map((page) => ({
    slug: page.slugs[0],
  }));
}
