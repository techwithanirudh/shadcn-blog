'use client'

import type { HighlightedText } from 'fumadocs-core/search'
import { useDocsSearch } from 'fumadocs-core/search/client'
import {
  SearchDialog,
  SearchDialogList,
  SearchDialogListItem,
} from 'fumadocs-ui/components/dialog/search'
import { useI18n } from 'fumadocs-ui/contexts/i18n'
import { Search } from 'lucide-react'
import { parseAsString, parseAsStringLiteral, useQueryState } from 'nuqs'
import { Fragment, type ReactNode, useEffect } from 'react'
import { Section } from '@/components/section'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { ViewAnimation } from '@/components/view-animation'
import { tags } from '@/constants/config'
import { cn } from '@/lib/utils'

const renderHighlights = (
  highlights: HighlightedText<ReactNode>[],
  badge?: string
) => (
  <span className='inline-flex w-full items-center justify-between'>
    <span>
      {highlights.map((node, index) => {
        if (node.styles?.highlight) {
          return (
            <span className='text-primary underline' key={index.toString()}>
              {node.content}
            </span>
          )
        }

        return <Fragment key={index.toString()}>{node.content}</Fragment>
      })}
    </span>

    {badge ? (
      <span className='mr-2 rounded-full border border-border px-2 py-0.5 text-muted-foreground text-xs uppercase tracking-wide'>
        {badge}
      </span>
    ) : null}
  </span>
)

const getItemTag = (url: string) => {
  if (url.startsWith('/work')) {
    return 'work'
  }
  if (url.startsWith('/blog')) {
    return 'blog'
  }
  return 'page'
}

const tagValues = tags
  .map((tag) => tag.value)
  .filter((value): value is Exclude<typeof value, undefined> => Boolean(value))

const scopeParser = parseAsStringLiteral(['all', ...tagValues])

export function SearchClient() {
  const { locale } = useI18n()
  const [queryParam, setQueryParam] = useQueryState(
    'q',
    parseAsString.withDefault('')
  )
  const [scopeParam, setScopeParam] = useQueryState(
    'tag',
    scopeParser.withDefault('all')
  )

  const tag = scopeParam === 'all' ? undefined : scopeParam

  const { search, setSearch, query } = useDocsSearch({
    type: 'fetch',
    tag,
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
      <Section className='flex flex-1 flex-col' sectionClassName='h-full'>
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
                placeholder='Search posts and work...'
                value={search}
              />
              {search.length > 0 && (
                <InputGroupAddon align='inline-end'>
                  {resultCount} results
                </InputGroupAddon>
              )}
            </InputGroup>
          </ViewAnimation>
          <ViewAnimation
            delay={0.05}
            initial={{ opacity: 0, translateY: -6 }}
            whileInView={{ opacity: 1, translateY: 0 }}
          >
            <div className='flex w-full flex-wrap justify-between divide-x divide-dashed divide-border border-border border-y border-dashed'>
              {tags.map((scopeOption) => {
                const value = scopeOption.value ?? 'all'
                const isActive = scopeParam === value
                return (
                  <button
                    aria-pressed={isActive}
                    className={cn(
                      'inline-flex flex-1 items-center gap-2 p-2 px-3 text-sm transition-colors',
                      isActive
                        ? 'bg-card text-card-foreground'
                        : 'bg-transparent text-muted-foreground hover:text-card-foreground'
                    )}
                    key={value}
                    onClick={() => {
                      setScopeParam(value)
                    }}
                    type='button'
                  >
                    {scopeOption.name}
                  </button>
                )
              })}
            </div>
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
              renderHighlights={(highlights) =>
                renderHighlights(
                  highlights,
                  item.type === 'page' ? getItemTag(item.url) : undefined
                )
              }
            />
          )}
          items={query.data !== 'empty' ? query.data : null}
        />
      </Section>
    </SearchDialog>
  )
}
