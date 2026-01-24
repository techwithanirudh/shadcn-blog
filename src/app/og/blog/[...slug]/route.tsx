import { ImageResponse } from '@takumi-rs/image-response'
import { generate, getImageResponseOptions } from '@/app/og/blog/[...slug]/og'
import { getBlogPageImage } from '@/lib/metadata'
import { getLocalImageDataUrl } from '@/lib/og'
import { getPost, getPosts } from '@/lib/source'

export const GET = async (
  _request: Request,
  context: { params: Promise<{ slug?: string[] }> }
): Promise<ImageResponse | Response> => {
  const params = await context.params
  const slug = params.slug ?? []
  const page = getPost(slug.slice(0, -1))

  if (!page) {
    return new Response('Not Found', { status: 404 })
  }

  const backgroundImage = await getLocalImageDataUrl(page.data.image)

  return new ImageResponse(
    generate({
      title: page.data.title ?? 'Untitled',
      description: page.data.description ?? '',
      backgroundImage,
    }),
    await getImageResponseOptions()
  )
}

export function generateStaticParams(): {
  slug: string[]
}[] {
  return getPosts().map((page) => ({
    slug: getBlogPageImage(page).segments,
  }))
}
