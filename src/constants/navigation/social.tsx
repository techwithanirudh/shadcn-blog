import { Icons } from '@/components/icons/icons'
import type { Social } from '@/types'

export const socials: Social[] = [
  {
    icon: <Icons.gitHub />,
    name: 'GitHub',
    url: 'https://github.com/techwithanirudh',
    description: 'Check out my open source projects and contributions',
  },
  {
    icon: <Icons.twitter />,
    name: 'X (Twitter)',
    url: 'https://x.com/AnirudhWith',
    description: 'Follow me for tech updates and project announcements',
  },
  {
    icon: <Icons.linkedin />,
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/anirudhsriramb',
    description: 'Connect with me professionally',
  },
  {
    name: 'YouTube',
    description: 'Subscribe for tech tutorials and project showcases',
    url: 'https://www.youtube.com/@techwithanirudh',
    icon: <Icons.youtube />,
  },
  {
    icon: <Icons.mail />,
    name: 'Email',
    url: 'mailto:hello@techwithanirudh.com',
    description: 'Get in touch via email',
  },
]
