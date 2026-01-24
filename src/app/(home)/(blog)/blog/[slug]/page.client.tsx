'use client'
import { useAuthenticate } from '@daveyplate/better-auth-ui'
import { Comments } from '@fuma-comment/react'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
import { useCopyToClipboard } from 'usehooks-ts'
import {
  UploadIcon as ShareIcon,
  type UploadIconHandle as ShareIconHandle,
} from '@/components/icons/animated/upload'
import { Icons } from '@/components/icons/icons'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function Share({
  url,
  label = 'Share Post',
}: {
  url: string
  label?: string
}): React.ReactElement {
  const iconRef = useRef<ShareIconHandle>(null)
  const [_, copyToClipboard] = useCopyToClipboard()

  const onClick = async (): Promise<void> => {
    await copyToClipboard(`${window.location.origin}${url}`)
    toast.success('Copied to clipboard!', {
      icon: <Icons.copied className='size-4' />,
      description: 'The post link has been copied to your clipboard.',
    })
  }

  return (
    <Button
      className={cn('group gap-2')}
      onClick={onClick}
      onMouseEnter={() => iconRef.current?.startAnimation?.()}
      onMouseLeave={() => iconRef.current?.stopAnimation?.()}
      variant={'secondary'}
    >
      <ShareIcon className='size-4 hover:bg-transparent' ref={iconRef} />
      {label}
    </Button>
  )
}

export function PostComments({
  slug,
  className,
}: {
  slug: string
  className?: string
}) {
  const [authenticate, setAuthenticate] = useState(false)

  useAuthenticate({
    enabled: authenticate,
  })

  return (
    <Comments
      auth={{
        type: 'api',
        signIn: () => {
          setAuthenticate(true)
        },
      }}
      className={cn('w-full', className)}
      page={slug}
    />
  )
}
