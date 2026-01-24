import type { Metadata } from 'next'
import { owner, title } from '@/constants/site'
import { env } from '@/env'
import type { BlogPage } from './source/blog'
import type { WorkPage } from './source/work'

export function createMetadata(override: Metadata): Metadata {
  return {
    ...override,
    creator: owner,
    publisher: owner,
    formatDetection: {
      telephone: false,
      ...override.formatDetection,
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
    },
    openGraph: {
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      url: baseUrl.href,
      images: '/banner.png',
      siteName: title,
      ...override.openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@AnirudhWith',
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      images: '/banner.png',
      ...override.twitter,
    },
    alternates: {
      canonical: '/',
      types: {
        'application/rss+xml': '/api/rss.xml',
      },
      ...override.alternates,
    },
  }
}

export function getBlogPageImage(page: BlogPage) {
  const segments = [...page.slugs, 'image.webp']
  return {
    segments,
    url: `/og/blog/${segments.join('/')}`,
  }
}

export function getWorkPageImage(page: WorkPage) {
  const segments = [...page.slugs, 'image.webp']
  return {
    segments,
    url: `/og/work/${segments.join('/')}`,
  }
}

export const baseUrl =
  env.NODE_ENV === 'development' || !env.NEXT_PUBLIC_BASE_URL
    ? new URL('http://localhost:3000')
    : new URL(env.NEXT_PUBLIC_BASE_URL)
