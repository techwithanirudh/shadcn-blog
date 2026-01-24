import { baseUrl } from '@/constants'
import { socials } from '@/constants/navigation'
import { description, owner, title } from '@/constants/site'

export function getAboutText() {
  return `# About

${description}

## Personal Information

- Name: ${owner}
- Display Name: ${title}
- Website: ${baseUrl.toString()}

## Social Links

${socials.map((item) => `- [${item.name}](${item.url})${item.description ? ` - ${item.description}` : ''}`).join('\n')}
`
}
