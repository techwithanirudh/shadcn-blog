import { Rss } from 'lucide-react'
import Link from 'next/link'
import { HeroSection } from '@/components/sections/hero'

const CurrentPostsCount = ({
  startIndex,
  endIndex,
  totalPosts = 0,
}: {
  startIndex: number
  endIndex: number
  totalPosts?: number
}) => {
  const start = startIndex + 1
  const end = endIndex < totalPosts ? endIndex : totalPosts
  if (start === end) {
    return <span>({start})</span>
  }
  return (
    <span>
      ({start}-{end})
    </span>
  )
}

export const Hero = ({
  totalPosts,
  startIndex,
  endIndex,
}: {
  totalPosts: number
  startIndex: number
  endIndex: number
}) => (
  <HeroSection
    align={'start'}
    title={
      <div className='flex items-center justify-between gap-4'>
        <span className='flex items-center gap-2'>
          All {totalPosts} Posts{' '}
          <CurrentPostsCount endIndex={endIndex} startIndex={startIndex} />
        </span>

        <Link
          aria-label='Subscribe to RSS feed'
          className='inline-flex items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground'
          href='/blog/rss.xml'
        >
          <Rss className='size-5' />
        </Link>
      </div>
    }
    variant={'compact'}
  />
)
