import type { LinkItemType } from 'fumadocs-ui/layouts/shared'
import { Icons } from '@/components/icons/icons'

export const linkItems: LinkItemType[] = [
  {
    text: 'Posts',
    icon: <Icons.posts />,
    url: '/posts',
    active: 'nested-url',
  },
  {
    text: 'About',
    icon: <Icons.user />,
    url: '/about',
  },
]
