import type { Metadata } from 'next'
import { Suspense } from 'react'
import { BackButton } from '@/components/back-button'
import { HeroSection } from '@/components/sections/hero'
import { Skeleton } from '@/components/ui/skeleton'
import { Wrapper } from '@/components/wrapper'
import { title as homeTitle } from '@/constants/site'
import { createMetadata } from '@/lib/metadata'
import { SearchClient } from './_components/search-client'

export default function Page() {
  return (
    <Wrapper>
      <HeroSection
        align='center'
        description='Search across blog posts and work.'
        title='Search'
      >
        <BackButton />
      </HeroSection>
      <Suspense
        fallback={
          <div className='flex flex-1 flex-col gap-4 px-4 pb-10 sm:px-6'>
            <Skeleton className='h-9 w-full' />
            <div className='grid gap-2'>
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton className='h-14 w-full' key={index.toString()} />
              ))}
            </div>
          </div>
        }
      >
        <SearchClient />
      </Suspense>
    </Wrapper>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return createMetadata({
    title: 'Search',
    description: `Search posts and projects on ${homeTitle}.`,
    openGraph: {
      url: '/search',
    },
    alternates: {
      canonical: '/search',
    },
  })
}
