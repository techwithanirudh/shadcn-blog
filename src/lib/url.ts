import { baseUrl } from './metadata'

export const url = (path: string | string[]): string => {
  const pathname = Array.isArray(path) ? `/${path.join('/')}` : path
  return new URL(pathname, baseUrl).toString()
}
