import { checkBotId } from 'botid/server'
import type { MiddlewareFn } from 'next-safe-action'
import { env } from '@/env'
import { getSession } from '@/server/auth'
import { ActionError } from './client'

type SessionUser = NonNullable<Awaited<ReturnType<typeof getSession>>>['user']

export interface ActionContext {
  user: SessionUser
}

type BotIdMiddleware = MiddlewareFn<string, undefined, object, object>
type UserMiddleware = MiddlewareFn<string, undefined, object, ActionContext>

export const botIdMiddleware: BotIdMiddleware = async ({ next }) => {
  const verification = await checkBotId({
    developmentOptions:
      env.NODE_ENV !== 'production' && env.BOTID_DEV_BYPASS
        ? {
            bypass: env.BOTID_DEV_BYPASS,
          }
        : undefined,
  })

  if (verification.isBot) {
    throw new ActionError(
      'Bot protection blocked this request. Please refresh and try again.'
    )
  }

  return next()
}

export const userMiddleware: UserMiddleware = async ({ ctx, next }) => {
  const session = await getSession()
  const user = session?.user

  if (!user) {
    throw new ActionError('You must be signed in to do that.')
  }

  return next({
    ctx: {
      ...ctx,
      user,
    },
  })
}
