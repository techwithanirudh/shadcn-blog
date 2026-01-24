import { z } from 'zod'

export const ContactSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(30, {
      message: 'Name must not be longer than 30 characters.',
    }),
  email: z.email({
    error: 'Please provide a valid email address.',
  }),
  message: z.string().min(30, {
    message: 'Message must be at least 30 characters.',
  }),
})

export type Contact = z.infer<typeof ContactSchema>
