import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'

export const title = 'My Blog'
export const description =
  'A modern blog built with Next.js, featuring articles about web development, technology, and more.'
export const owner = 'Blog Author'

export const baseOptions: BaseLayoutProps = {
  nav: {
    title,
  },
  githubUrl: 'https://github.com/yourusername/your-repo',
}
