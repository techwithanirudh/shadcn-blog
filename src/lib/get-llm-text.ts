import { format } from 'date-fns'
import { owner, repo } from '@/constants/config'
import type { BlogPage } from '@/lib/source'

type ContentPage = BlogPage
type ContentType = 'blog'
interface LLMTextOptions {
  level?: 'page' | 'section' | 'subsection'
}

function getHeadingPrefix(level: 'page' | 'section' | 'subsection') {
  switch (level) {
    case 'page': {
      return '#'
    }
    case 'section': {
      return '##'
    }
    case 'subsection': {
      return '###'
    }
    default: {
      throw new Error(`Unknown heading level: ${level}`)
    }
  }
}

async function getLLMText(
  page: ContentPage,
  contentType: ContentType,
  options: LLMTextOptions = {}
) {
  const level = options.level ?? 'page'
  const processed = await page.data.getText('processed')
  const path = `content/${contentType}/${page.path}`

  const tagsLine =
    contentType === 'blog'
      ? `Tags: ${(page as BlogPage).data.tags?.join(', ') ?? ''}\n`
      : ''

  return `${getHeadingPrefix(level)} ${page.data.title}
URL: ${page.url}
Source: https://raw.githubusercontent.com/${owner}/${repo}/refs/heads/main/${path}
${tagsLine}
${page.data.description ?? ''}

${processed}

${page.data.lastModified ? `Last updated on ${format(new Date(page.data.lastModified), 'MMMM d, yyyy')}` : ''}`
}

export async function getBlogLLMText(
  page: BlogPage,
  options: LLMTextOptions = {}
) {
  return await getLLMText(page, 'blog', options)
}
