import { z } from 'zod'

export const NewsletterSchema = z.object({
  email: z.email(),
})
export type Newsletter = z.infer<typeof NewsletterSchema>
