import { env } from '@/env'

export { baseUrl } from '@/lib/metadata'
export const isProduction = env.NODE_ENV === 'production'
