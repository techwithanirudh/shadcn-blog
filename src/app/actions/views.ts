'use server';

import { ActionError, actionClient } from '@/lib/safe-action';
import { getIp } from '@/lib/utils';
import { db } from '@/server/db';
import { posts } from '@/server/db/schema';
import { ratelimit, redis, redisKeys } from '@/server/kv';
import { eq, sql, sum } from 'drizzle-orm';
import { headers } from 'next/headers';
import { z } from 'zod';

const getKey = (id: string) => `views:${id}`;

export const getTotalViews = actionClient.action(async () => {
  const headersList = await headers();
  const ip = getIp(headersList);

  const { success } = await ratelimit.limit(getKey(`getCount:${ip}`));

  if (!success) throw new ActionError('Rate limit exceeded');

  const cachedViewCount = await redis.get<number>(redisKeys.postViewCount);

  if (cachedViewCount) {
    return {
      data: {
        views: cachedViewCount,
      },
    };
  }

  const result = await db
    .select({
      value: sum(posts.views),
    })
    .from(posts);

  const value = result[0]?.value ? Number(result[0].value) : 0;
  await redis.set(redisKeys.postViewCount, value);

  return {
    views: value,
  };
});

export const getPostViews = actionClient
  .schema(
    z.object({
      slug: z.string().min(1),
    }),
  )
  .action(async ({ parsedInput: { slug }, ctx }) => {
    const headersList = await headers();
    const ip = getIp(headersList);
    const { success } = await ratelimit.limit(getKey(`get:${ip}`));

    if (!success) throw new ActionError('Rate limit exceeded');

    const cachedViews = await redis.get<number>(redisKeys.postViews(slug));

    if (cachedViews) {
      return {
        views: cachedViews,
      };
    }

    const post = await db
      .select({ views: posts.views })
      .from(posts)
      .where(eq(posts.slug, slug));

    if (!post[0]) {
      throw new ActionError('Post not found');
    }

    await redis.set(redisKeys.postViews(slug), post[0].views);

    return {
      views: post[0].views,
    };
  });

export const incrementPostViews = actionClient
  .schema(
    z.object({
      slug: z.string().min(1),
    }),
  )
  .action(async ({ parsedInput: { slug }, ctx }) => {
    const headersList = await headers();
    const ip = getIp(headersList);
    const { success } = await ratelimit.limit(getKey(`increment:${ip}`));

    if (!success) throw new ActionError('Rate limit exceeded');

    const views = await db
      .insert(posts)
      .values({
        slug: slug,
        views: 1,
      })
      .onConflictDoUpdate({
        target: posts.slug,
        set: {
          views: sql<number>`${posts.views} + 1`,
        },
      })
      .returning();

    await redis.set(redisKeys.postViews(slug), views[0]?.views);

    return {
      success: true,
      views: views[0]?.views,
    };
  });
