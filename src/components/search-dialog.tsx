'use client'

import { useDocsSearch } from 'fumadocs-core/search/client'
import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogFooter,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
  type SharedProps,
} from 'fumadocs-ui/components/dialog/search'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'fumadocs-ui/components/ui/popover'
import { useI18n } from 'fumadocs-ui/contexts/i18n'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { buttonVariants } from '@/components/ui/button'
import { tags } from '@/constants/config'
import { cn } from '@/lib/utils'

const filterLabel = 'Filter'

export default function CustomSearchDialog(props: SharedProps) {
  const { locale } = useI18n()
  const [isOpen, setIsOpen] = useState(false)
  const [tag, setTag] = useState<string | undefined>()

  const { search, setSearch, query } = useDocsSearch({
    type: 'fetch',
    tag,
    locale,
  })

  const activeTagLabel = tags.find((item) => item.value === tag)?.name ?? 'All'

  return (
    <SearchDialog
      isLoading={query.isLoading}
      onSearchChange={setSearch}
      search={search}
      {...props}
    >
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList items={query.data !== 'empty' ? query.data : null} />
        <SearchDialogFooter className='flex flex-row flex-wrap items-center gap-2'>
          <Popover onOpenChange={setIsOpen} open={isOpen}>
            <PopoverTrigger
              className={buttonVariants({
                size: 'sm',
                variant: 'ghost',
                className: '-m-1.5 me-auto',
              })}
            >
              <span className='me-2 text-fd-muted-foreground/80'>
                {filterLabel}
              </span>
              {activeTagLabel}
              <ChevronDown className='size-3.5 text-fd-muted-foreground' />
            </PopoverTrigger>
            <PopoverContent align='start' className='flex flex-col gap-1 p-1'>
              {tags.map((item) => {
                const isSelected = item.value === tag
                const key = item.value ?? 'all'

                return (
                  <button
                    className={cn(
                      'rounded-lg px-2 py-1.5 text-start',
                      isSelected
                        ? 'bg-fd-primary/10 text-fd-primary'
                        : 'hover:bg-fd-accent hover:text-fd-accent-foreground'
                    )}
                    key={key}
                    onClick={() => {
                      setTag(item.value)
                      setIsOpen(false)
                    }}
                    type='button'
                  >
                    <p className='mb-0.5 font-medium'>{item.name}</p>
                  </button>
                )
              })}
            </PopoverContent>
          </Popover>
        </SearchDialogFooter>
      </SearchDialogContent>
    </SearchDialog>
  )
}
