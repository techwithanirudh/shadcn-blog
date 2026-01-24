import {
  type FileObject,
  printErrors,
  scanURLs,
  validateFiles,
} from 'next-validate-link'
import type { BlogPage } from '@/lib/source'
import { getPosts } from '@/lib/source'

async function checkLinks() {
  const posts = getPosts()

  const scanned = await scanURLs({
    populate: {
      '(home)/posts/[slug]': await Promise.all(
        posts.map((page) => ({
          value: {
            slug: page.slugs[0] ?? '',
          },
          hashes: getHeadings(page),
        }))
      ),
    },
  })

  console.log(
    `collected ${scanned.urls.size} URLs, ${scanned.fallbackUrls.length} fallbacks`
  )

  printErrors(
    await validateFiles(await getFiles(posts), {
      scanned,
      markdown: {
        components: {
          Card: { attributes: ['href'] },
        },
      },
      checkRelativePaths: 'as-url',
    }),
    true
  )
}

function getHeadings({ data }: BlogPage): string[] {
  const { _exports, toc } = data
  const headings = toc?.map((item) => item.url.slice(1)) ?? []
  const elementIds = _exports?.elementIds
  if (Array.isArray(elementIds)) {
    headings.push(...elementIds)
  }

  return headings
}

async function getFiles(pages: BlogPage[]) {
  const files: FileObject[] = []
  for (const page of pages) {
    files.push({
      data: page.data,
      url: page.url,
      path: page.data.info.fullPath,
      content: await page.data.getText('raw'),
    })
  }

  return files
}

checkLinks().catch((error) => {
  console.error('Failed to validate links.', error)
  process.exitCode = 1
})
