import type { LinkItemType } from 'fumadocs-ui/layouts/shared'
import { Icons } from '@/components/icons/icons'

export const linkItems: LinkItemType[] = [
  {
    text: 'Blog',
    icon: <Icons.posts />,
    url: '/blog',
    active: 'nested-url',
  },
]
