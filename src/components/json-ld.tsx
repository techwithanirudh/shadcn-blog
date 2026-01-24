import type { BlogPosting, BreadcrumbList, Graph } from 'schema-dts'
import { baseUrl } from '@/constants'
import { title as homeTitle, owner } from '@/constants/site'
import type { BlogPage } from '@/lib/source'

export const PostJsonLd = ({ page }: { page: BlogPage }) => {
  if (!page) {
    return null
  }

  const url = new URL(page.url, baseUrl.href).href

  const post: BlogPosting = {
    '@type': 'BlogPosting',
    headline: page.data.title,
    description: page.data.description,
    image: new URL(`/og/${page.slugs.join('/')}/image.webp`, baseUrl.href).href,
    datePublished: new Date(page.data.date).toISOString(),
    dateModified: page.data.lastModified
      ? new Date(page.data.lastModified).toISOString()
      : undefined,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    author: {
      '@type': 'Person',
      name: page.data.author,
      // url: 'https://techwithanirudh.com/',
    },
    publisher: {
      '@type': 'Person',
      name: owner,
      url: 'https://techwithanirudh.com/',
    },
  }

  const breadcrumbList: BreadcrumbList = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: homeTitle,
        item: baseUrl.href,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: `${homeTitle} | Posts`,
        item: new URL('/blog', baseUrl.href).href,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: page.data.title,
        item: url,
      },
    ],
  }

  const graph: Graph = {
    '@context': 'https://schema.org',
    '@graph': [post, breadcrumbList],
  }

  return (
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires inline script content
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      type='application/ld+json'
    />
  )
}

export const TagJsonLd = ({ tag }: { tag: string }) => {
  const breadcrumbList: BreadcrumbList = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: homeTitle,
        item: baseUrl.href,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: `${homeTitle} | Tags`,
        item: new URL('/blog/tags', baseUrl.href).href,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${homeTitle} | Posts tagged with ${tag}`,
        item: new URL(`/blog/tags/${tag}`, baseUrl.href).href,
      },
    ],
  }

  const graph: Graph = {
    '@context': 'https://schema.org',
    '@graph': [breadcrumbList],
  }

  return (
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires inline script content
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      type='application/ld+json'
    />
  )
}
