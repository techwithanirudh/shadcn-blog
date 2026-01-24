'use client'

import Link from 'next/link'
import { Icons } from '@/components/icons/icons'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ViewAnimation } from '@/components/view-animation'
import { cn } from '@/lib/utils'

const MAX_TAGS = 8

interface TagsSidebarProps {
  tags: Array<{ name: string; count: number }>
}

export function TagsAccordion({ tags }: TagsSidebarProps) {
  const displayedTags = tags.slice(0, MAX_TAGS)
  const hasMoreTags = tags.length > MAX_TAGS

  return (
    <Accordion collapsible type='single'>
      <AccordionItem className='border-0' value='tags'>
        <AccordionTrigger className='py-0 hover:no-underline'>
          <span className='flex items-center gap-2 text-sm'>
            <Icons.tag className='size-4' />
            Browse by Tag
          </span>
        </AccordionTrigger>
        <AccordionContent className='pt-3 pb-0'>
          <div className='grid grid-cols-2 gap-px border border-border border-dashed bg-border'>
            {displayedTags.map((tag, index) => (
              <ViewAnimation
                delay={0.05 * index}
                initial={{ opacity: 0 }}
                key={tag.name}
                whileInView={{ opacity: 1 }}
              >
                <Link
                  className='flex items-center justify-between bg-background p-3 text-muted-foreground text-sm transition-colors hover:bg-card/80'
                  href={`/blog/tags/${tag.name}`}
                >
                  <span>{tag.name}</span>
                  <span className='text-xs'>({tag.count})</span>
                </Link>
              </ViewAnimation>
            ))}
          </div>
          <Link
            className='group mt-3 flex items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground'
            href='/blog/tags'
          >
            {hasMoreTags ? `View all ${tags.length} tags` : 'View all tags'}
            <Icons.arrowRight className='size-4 transition-transform group-hover:-rotate-45' />
          </Link>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export function TagsSidebar({ tags }: TagsSidebarProps) {
  const displayedTags = tags.slice(0, MAX_TAGS)
  const hasMoreTags = tags.length > MAX_TAGS

  return (
    <div className='sticky top-14 flex w-full flex-col divide-y divide-dashed divide-border self-start lg:min-h-[calc(100vh-22rem)]'>
      <ViewAnimation initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
        <div className='flex h-10 items-center gap-2 px-4'>
          <Icons.tag className='size-4 text-muted-foreground transition-transform hover:scale-125' />
          <span className='font-medium text-sm'>Tags</span>
        </div>
      </ViewAnimation>
      <div className='flex flex-col divide-y divide-dashed divide-border'>
        {displayedTags.map((tag, index) => (
          <ViewAnimation
            delay={0.05 * index}
            initial={{ opacity: 0 }}
            key={tag.name}
            whileInView={{ opacity: 1 }}
          >
            <Link
              className={cn(
                'group flex items-center justify-between px-4 py-2 text-sm transition-colors',
                'text-muted-foreground hover:bg-card/80'
              )}
              href={`/blog/tags/${tag.name}`}
            >
              <span className='transition-transform group-hover:translate-x-0.5'>
                {tag.name}
              </span>
              <span className='text-xs'>({tag.count})</span>
            </Link>
          </ViewAnimation>
        ))}
        <ViewAnimation
          delay={0.05 * displayedTags.length}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <Link
            className='group flex items-center gap-2 px-4 py-2 text-muted-foreground text-sm transition-colors hover:bg-card/80 hover:text-foreground'
            href='/blog/tags'
          >
            {hasMoreTags ? `View all ${tags.length} tags` : 'View all tags'}
            <Icons.arrowRight className='size-4 transition-transform group-hover:-rotate-45' />
          </Link>
        </ViewAnimation>
      </div>
    </div>
  )
}
