'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { owner, repo } from '@/constants/config'
import { cn } from '@/lib/utils'

const ISSUE_URL = `https://github.com/${owner}/${repo}/issues/new`

const ErrorPage = ({ error }: { error: Error }) => {
  // biome-ignore lint/performance/useTopLevelRegex: small stack parsing on render
  const errorStack = error.stack?.split(/\r?\n/).slice(1) ?? []

  return (
    <main className='flex flex-1'>
      <div className='container relative mx-auto min-h-full border-border border-x border-dashed'>
        <div className='flex w-full flex-col gap-4 self-center px-4 py-12 sm:px-8'>
          <h1 className='typography-hero text-destructive'>
            Something went wrong
          </h1>
          <p className='text-muted-foreground'>
            <span className='font-medium text-foreground'>Whoops!</span>{' '}
            Unfortunately an unexpected error occurred.
          </p>
          <p className='-mt-2 text-muted-foreground'>
            Please{' '}
            <Link
              className='text-primary underline-offset-4 hover:underline'
              href={ISSUE_URL}
              rel='noopener noreferrer'
              target='_blank'
            >
              share the details
            </Link>{' '}
            of this issue, so I can fix it for you.
          </p>
          <details className='rounded-md border border-border'>
            <summary className='select-none px-3 py-2 font-medium'>
              Error details
            </summary>
            <div className='border-border border-t'>
              <code
                className={cn(
                  'flex flex-col gap-1 p-3',
                  'overflow-x-auto text-nowrap',
                  'whitespace-pre-line font-mono text-2xs',
                  'bg-primary/5 dark:bg-primary/10'
                )}
              >
                <span className='font-medium text-foreground'>
                  {error.name || 'Error'}: {error.message || 'Unknown error'}
                </span>
                {errorStack.map((line, index) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: stack order is stable
                  <span className='pl-3' key={`${line}-${index}`}>
                    {line}
                  </span>
                ))}
              </code>
            </div>
          </details>
          <Button asChild className='mt-2 w-fit'>
            <Link aria-label='Go back home' href='/'>
              Go home
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}

export default ErrorPage
