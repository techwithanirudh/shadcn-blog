import type { Metadata } from 'next'
import Link from 'next/link'
import { Icons } from '@/components/icons/icons'
import { buttonVariants } from '@/components/ui/button'
import { createMetadata } from '@/lib/metadata'

export default function NotFound() {
  return (
    <main className='flex flex-1'>
      <div className='container relative mx-auto flex min-h-full flex-1 items-center justify-center border-border border-x border-dashed'>
        <div className='flex w-fit flex-col items-center justify-center gap-4 px-4'>
          <div className='flex flex-col items-center text-center sm:flex-row'>
            <h1 className='border-border font-extrabold text-2xl text-foreground tracking-tight sm:mr-6 sm:border-r sm:pr-6 sm:text-3xl'>
              404
            </h1>
            <h2 className='mt-2 text-muted-foreground sm:mt-0'>
              This page could not be found.
            </h2>
          </div>
          <Link
            className={buttonVariants({
              className: 'group/button w-full',
            })}
            href='/'
          >
            Go Home
            <Icons.arrowRight className='size-4 transition-transform group-hover/button:-rotate-45' />
          </Link>
        </div>
      </div>
    </main>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>
}): Promise<Metadata> {
  const _params = await props.params
  const description = 'The page you are looking for could not be found.'

  return createMetadata({
    title: 'Not Found',
    description,
  })
}
