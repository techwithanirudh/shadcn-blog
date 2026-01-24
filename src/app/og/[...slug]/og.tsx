import type { ImageResponseOptions } from '@takumi-rs/image-response'
import type { ReactElement } from 'react'

interface GenerateProps {
  title: string
  description?: string
  backgroundImage?: string | null
}

export function getImageResponseOptions(): ImageResponseOptions {
  return {
    format: 'webp',
    width: 1200,
    height: 630,
  }
}

export function generate({
  title,
  description = 'Learn more about this post by visiting the website.',
  backgroundImage,
}: GenerateProps): ReactElement {
  return (
    <div
      style={{ fontFamily: 'Geist Sans' }}
      tw='flex h-full w-full text-white relative'
    >
      {backgroundImage ? (
        <div
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
          tw='absolute inset-0'
        />
      ) : (
        <div tw='absolute inset-0 bg-black' />
      )}
      <div tw='absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-black/10' />
      <div tw='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent' />
      <div tw='flex border absolute border-white/20 border-dashed inset-y-0 left-16 w-[1px]' />
      <div tw='flex border absolute border-white/20 border-dashed inset-y-0 right-16 w-[1px]' />
      <div tw='flex border absolute border-white/20 inset-x-0 h-[1px] top-16' />
      <div tw='flex border absolute border-white/20 inset-x-0 h-[1px] bottom-16' />
      <div tw='flex flex-col justify-end items-start absolute inset-24 gap-4'>
        <span tw='text-[22px] font-bold uppercase text-stone-200 ml-1'>
          Blog
        </span>
        <div
          style={{
            textWrap: 'balance',
            fontWeight: 600,
            fontSize: title && title.length > 20 ? 64 : 80,
            letterSpacing: '-0.04em',
          }}
          tw='tracking-tight flex flex-col justify-center leading-[1.1]'
        >
          {title}
        </div>
        <div
          style={{
            fontWeight: 500,
          }}
          tw='text-[38px] leading-[1.5] text-white/70 h-[120px] overflow-hidden truncate'
        >
          {description}
        </div>
      </div>
    </div>
  )
}
