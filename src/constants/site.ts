import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'
import { owner as ghOwner, repo } from './config/github'

export const title = 'Blog'
export const description = 'A modern blog built with Next.js.'
export const owner = 'John Doe'

export const baseOptions: BaseLayoutProps = {
  nav: {
    title,
  },
  githubUrl: `https://github.com/${ghOwner}/${repo}`,
}
