import { owner, title } from '@/constants/site'
import { getBlogLLMText } from '@/lib/get-llm-text'
import { getSortedByDatePosts, post } from '@/lib/source'
import { getAboutText } from '../utils'

async function getFullText() {
  const allPosts = getSortedByDatePosts()

  const blogContent = await Promise.all(
    allPosts.map(async (item) => {
      const page = post.getPage(item.slugs)
      if (!page) {
        return ''
      }

      const content = await getBlogLLMText(page, { level: 'section' })
      return content
    })
  )

  return `<SYSTEM>This document contains comprehensive information about ${owner}'s blog. It includes blog posts and content. This data is formatted for consumption by Large Language Models (LLMs).</SYSTEM>

# ${title}

${getAboutText()}

## Blog

${blogContent.filter(Boolean).join('\n\n')}`
}

export const dynamic = 'force-static'

export async function GET() {
  return new Response(await getFullText(), {
    headers: {
      'Content-Type': 'text/markdown;charset=utf-8',
    },
  })
}
