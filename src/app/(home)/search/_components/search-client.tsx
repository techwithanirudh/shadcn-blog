'use client'

import { useDocsSearch } from 'fumadocs-core/search/client'
import {
  SearchDialog,
  SearchDialogList,
  SearchDialogListItem,
} from 'fumadocs-ui/components/dialog/search'
import { useI18n } from 'fumadocs-ui/contexts/i18n'
import { Search } from 'lucide-react'
import { parseAsString, useQueryState } from 'nuqs'
import { useEffect } from 'react'
import { Section } from '@/components/section'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { ViewAnimation } from '@/components/view-animation'
import { cn } from '@/lib/utils'

export function SearchClient() {
  const { locale } = useI18n()
  const [queryParam, setQueryParam] = useQueryState(
    'q',
    parseAsString.withDefault('')
  )

  const { search, setSearch, query } = useDocsSearch({
    type: 'fetch',
    locale,
  })

  const resultCount =
    query.data !== 'empty' && query.data ? query.data.length : 0
  const handleSearchChange = (value: string) => {
    setSearch(value)
    setQueryParam(value.length > 0 ? value : null)
  }

  useEffect(() => {
    if (queryParam) {
      setSearch(queryParam)
    }
  }, [queryParam, setSearch])

  const hasQuery = search.trim().length > 0

  return (
    <SearchDialog
      isLoading={query.isLoading}
      onOpenChange={() => null}
      onSearchChange={handleSearchChange}
      open
      search={search}
    >
      <Section
        className='flex flex-1 flex-col divide-y divide-dashed divide-border'
        sectionClassName='h-full'
      >
        <div className='flex flex-col'>
          <ViewAnimation
            initial={{ opacity: 0, translateY: -6 }}
            whileInView={{ opacity: 1, translateY: 0 }}
          >
            <InputGroup className='!bg-background h-10 rounded-none border-0 shadow-none'>
              <InputGroupAddon className='border-0 text-muted-foreground'>
                <Search className='size-4' />
              </InputGroupAddon>
              <InputGroupInput
                className={cn('text-sm')}
                onChange={(event) => {
                  handleSearchChange(event.target.value)
                }}
                placeholder='Search...'
                value={search}
              />
              {search.length > 0 && (
                <InputGroupAddon align='inline-end'>
                  {resultCount} results
                </InputGroupAddon>
              )}
            </InputGroup>
          </ViewAnimation>
        </div>
        {!hasQuery && (
          <ViewAnimation
            delay={0.1}
            initial={{ opacity: 0, translateY: -6 }}
            whileInView={{ opacity: 1, translateY: 0 }}
          >
            <div className='flex max-h-[460px] w-full flex-col overflow-y-auto p-1'>
              <div className='py-12 text-center text-fd-muted-foreground text-sm'>
                Start typing to search.
              </div>
            </div>
          </ViewAnimation>
        )}
        <SearchDialogList
          className='[&>div]:!p-0'
          data-lenis-prevent
          Item={({ item, onClick }) => (
            <SearchDialogListItem
              className='rounded-none border-border border-b border-dashed px-3 py-3 last:border-b-0'
              item={item}
              onClick={onClick}
            />
          )}
          items={query.data !== 'empty' ? query.data : null}
        />
      </Section>
    </SearchDialog>
  )
}
