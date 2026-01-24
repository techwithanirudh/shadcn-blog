import { Feed } from 'feed'
import { baseUrl } from '@/constants'
import { description, owner, title } from '@/constants/site'
import { getPosts } from '@/lib/source'

export const dynamic = 'force-static'

const escapeForXML = (str: string) => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export const GET = () => {
  const feed = createFeed()

  return new Response(feed.atom1(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}

function createFeed(): Feed {
  const feed = new Feed({
    title,
    description,
    id: baseUrl.href,
    language: 'en',
    copyright: `All rights reserved ${new Date().getFullYear()}, ${owner}`,
    image: new URL('/banner.png', baseUrl).href,
    favicon: new URL('/favicon.ico', baseUrl).href,
    link: baseUrl.href,
    feed: new URL('/api/rss.xml', baseUrl).href,
    updated: new Date(),
  })

  const posts = getPosts()
  for (const post of posts) {
    feed.addItem({
      title: post.data.title,
      description: post.data.description,
      link: new URL(post.url, baseUrl).href,
      image: {
        title: post.data.title,
        type: 'image/webp',
        url: escapeForXML(
          new URL(`/og/${post.slugs.join('/')}/image.webp`, baseUrl.href).href
        ),
      },
      date: post.data.date,
      author: [
        {
          name: post.data.author,
          // link: new URL('/about', baseUrl).href,
        },
      ],
    })
  }

  return feed
}
