import { ImageResponse } from '@takumi-rs/image-response'
import { generate, getImageResponseOptions } from '@/app/banner.png/og'

export const GET = async (): Promise<ImageResponse> => {
  return new ImageResponse(
    generate({
      title: 'Blog',
      subtitle: 'A modern blog built with Next.js',
    }),
    await getImageResponseOptions()
  )
}
