import { resolveLinkItems } from 'fumadocs-ui/layouts/shared'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { ActiveLink } from '@/components/active-link'
import { ViewAnimation } from '@/components/view-animation'
import { postsPerPage } from '@/constants/config'
import { linkItems, socials } from '@/constants/navigation'
import { baseOptions } from '@/constants/site'
import { getSortedByDatePosts, getTags } from '@/lib/source'

interface ListItem {
  title: string
  href?: string
  external?: boolean
  items: {
    href: string
    children: ReactNode
  }[]
}

export const Links = () => {
  const links = resolveLinkItems({
    links: linkItems,
    githubUrl: baseOptions.githubUrl,
  })
  const navItems = links.filter((item) =>
    ['nav', 'all'].includes(item.on ?? 'all')
  )

  const posts = getSortedByDatePosts()
  const tags = getTags()

  const lists: ListItem[] = [
    {
      title: 'Navigate',
      items: [
        { href: '/', children: 'Home' },
        ...navItems
          .filter(
            (item) =>
              item.type !== 'menu' &&
              item.type !== 'custom' &&
              item.type !== 'icon'
          )
          .map((item) => ({
            href: item.url,
            children: item.text,
          })),
      ],
    },
    {
      title: 'Posts',
      items: posts.slice(0, postsPerPage).map((post, _i) => ({
        href: post.url,
        children: post.data.title,
      })),
    },
    {
      title: 'Tags',
      items: tags.slice(0, postsPerPage).map((tag) => ({
        href: `/tags/${tag}`,
        children: <span className='capitalize'>{tag}</span>,
      })),
    },
    {
      title: 'Socials',
      items: socials.map((social) => ({
        href: social.url,
        external: true,
        children: (
          <span className='inline-flex items-center gap-1.5 [&_svg]:size-4'>
            {social.icon}
            {social.name}
          </span>
        ),
      })),
    },
  ]

  return (
    <div className='grid gap-8 text-muted-foreground text-sm sm:grid-cols-4'>
      {lists.map((list, index) => (
        <ViewAnimation
          className='flex flex-col gap-6'
          delay={0.05 * index}
          initial={{ opacity: 0, translateY: -6 }}
          key={list.title}
          whileInView={{ opacity: 1, translateY: 0 }}
        >
          <div className='font-medium text-foreground'>
            {list.href ? (
              <Link href={list.href}>{list.title}</Link>
            ) : (
              <p>{list.title}</p>
            )}
          </div>
          <ul className='flex flex-col gap-3'>
            {list.items.map((item) => (
              <li key={item.href}>
                <ActiveLink
                  href={item.href}
                  rel={list.external ? 'noopener noreferrer' : undefined}
                  target={list.external ? '_blank' : undefined}
                >
                  {item.children}
                </ActiveLink>
              </li>
            ))}
          </ul>
        </ViewAnimation>
      ))}
    </div>
  )
}
