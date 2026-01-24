import { description, title } from '@/constants/site'
import { getSortedByDatePosts } from '@/lib/source'
import { url } from '@/lib/url'

const allPosts = getSortedByDatePosts()

const content = `# ${title}
> ${description}

**Note:** For a comprehensive single-file version with all content, see [llms-full.txt](${url('/llms-full.txt')})

## About

- [About](${url('/about.md')}): Information about this blog

## Blog

${allPosts.map((item) => `- [${item.data.title}](${url(['blog.mdx', ...item.slugs])}): ${item.data.description ?? ''}`).join('\n')}
`

export const dynamic = 'force-static'

export function GET() {
  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
  })
}
