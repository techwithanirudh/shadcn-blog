'use client'

import { ArrowRight, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import { cn } from '@/lib/utils'

interface SearchRedirectInputProps {
  tag: string
  placeholder?: string
  className?: string
}

export function SearchRedirectInput({
  tag,
  placeholder = 'Search...',
  className,
}: SearchRedirectInputProps) {
  const router = useRouter()
  const [value, setValue] = useState('')
  const hasValue = value.trim().length > 0

  const handleSubmit = useCallback(
    (nextValue: string) => {
      const trimmedValue = nextValue.trim()
      if (!trimmedValue) {
        return
      }

      const params = new URLSearchParams({ tag, q: trimmedValue })
      router.push(`/search?${params.toString()}`)
    },
    [router, tag]
  )

  return (
    <InputGroup
      className={cn(
        '!bg-background h-10 max-w-xs rounded-none border-0 shadow-none',
        className
      )}
    >
      <InputGroupAddon className='border-0 text-muted-foreground'>
        <Search className='size-4' />
      </InputGroupAddon>
      <InputGroupInput
        className='text-sm'
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault()
            handleSubmit(event.currentTarget.value)
          }
        }}
        placeholder={placeholder}
        value={value}
      />
      <InputGroupAddon
        align='inline-end'
        className={cn(
          'transition-all duration-150 ease-out',
          hasValue
            ? 'scale-100 opacity-100'
            : 'pointer-events-none scale-95 opacity-0'
        )}
      >
        <InputGroupButton
          aria-label='Submit search'
          className='group/button rounded-none'
          onClick={() => handleSubmit(value)}
          size='icon-sm'
          variant={'default'}
        >
          <ArrowRight className='size-3.5 transition-transform group-hover/button:-rotate-45' />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}
