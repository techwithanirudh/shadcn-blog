import { CalendarIcon, UserIcon } from 'lucide-react'
import Link from 'next/link'
import type React from 'react'

interface PostCardProps {
  title: string
  description: string
  url: string
  date: string
  author: string
  slugs: string[]
}

export const PostCard: React.FC<PostCardProps> = ({
  title,
  description,
  url,
  date,
  author,
  slugs: _slugs,
}) => {
  return (
    <Link
      className='block bg-card/50 px-6 py-6 transition-colors hover:bg-card/80'
      href={url}
    >
      <div className='flex flex-col gap-2'>
        <h2 className='font-medium text-lg md:text-xl lg:text-2xl'>{title}</h2>
        <p className='line-clamp-3 overflow-hidden text-ellipsis text-medium text-muted-foreground'>
          {description}
        </p>
        <div className='group mt-8 inline-flex items-center gap-2 text-muted-foreground text-sm'>
          <span className='inline-flex items-center gap-1 capitalize'>
            <UserIcon className='size-4 transition-transform hover:scale-125' />
            {author}
          </span>
          <span>•</span>
          <span className='inline-flex items-center gap-1'>
            <CalendarIcon className='size-4 transition-transform hover:scale-125' />
            {date}
          </span>
        </div>
      </div>
    </Link>
  )
}
