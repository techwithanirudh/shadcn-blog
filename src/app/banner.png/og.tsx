import type { ImageResponseOptions } from '@takumi-rs/image-response'
import type { ReactElement } from 'react'

interface GenerateProps {
  title?: string
  subtitle?: string
}

function CodeIcon({ ...props }): ReactElement {
  return (
    <svg
      fill='none'
      height='48'
      stroke='#a8a29e'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      viewBox='0 0 24 24'
      width='48'
      {...props}
    >
      <polyline points='16 18 22 12 16 6' />
      <polyline points='8 6 2 12 8 18' />
    </svg>
  )
}

export function getImageResponseOptions(): ImageResponseOptions {
  return {
    format: 'png',
    width: 1200,
    height: 630,
  }
}

export function generate({
  title = 'John Doe',
  subtitle,
}: GenerateProps): ReactElement {
  const hasSubtitle = Boolean(subtitle && subtitle.length > 0)

  return (
    <div
      style={{ fontFamily: 'Geist Sans' }}
      tw='flex h-full w-full bg-black text-white'
    >
      <div tw='flex border absolute border-stone-900 border-dashed inset-y-0 left-16 w-[1px]' />
      <div tw='flex border absolute border-stone-900 border-dashed inset-y-0 right-16 w-[1px]' />
      <div tw='flex border absolute border-stone-900 inset-x-0 h-[1px] top-16' />
      <div tw='flex border absolute border-stone-900 inset-x-0 h-[1px] bottom-16' />
      <CodeIcon tw='absolute top-22 right-23' />
      <div tw='flex flex-col absolute w-[896px] justify-end inset-24 items-start'>
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
        {hasSubtitle && (
          <div
            style={{
              fontWeight: 500,
              textWrap: 'balance',
            }}
            tw='text-[40px] leading-[1.5] text-stone-400 truncate mt-4'
          >
            {subtitle}
          </div>
        )}
      </div>
    </div>
  )
}
