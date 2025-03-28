'use server';

import { ActionError, actionClient } from '@/lib/safe-action';
import { getSortedByDatePosts } from '@/lib/source';
import { NewsletterSchema } from '@/lib/validators';
import NewsletterWelcomeEmail from 'emails/newsletter-welcome';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendWelcomeEmail({
  name,
  to,
}: {
  name: string;
  to: string;
}) {
  const posts = getSortedByDatePosts();

  const EMAIL_FROM = process.env.EMAIL_FROM as string;

  if (!EMAIL_FROM) {
    throw new Error('Missing environment variables');
  }

  if (!name || !to) {
    throw new Error('Missing required fields');
  }

  console.log(posts);
  const { data: res, error } = await resend.emails.send({
    from: EMAIL_FROM,
    to: to,
    subject: 'Welcome to my newsletter!',
    react: NewsletterWelcomeEmail({
      name: name,
      posts: posts.map((post) => ({
        ...post.data,
        url: `${process.env.VERCEL_PROJECT_PRODUCTION_URL}${post.url}`,
      })),
    }),
  });

  if (error) throw new Error(JSON.stringify(error));
}

export const subscribeUser = actionClient
  .schema(NewsletterSchema)
  .action(async ({ parsedInput: { email } }) => {
    try {
      const { data, error } = await resend.contacts.create({
        email,
        audienceId: process.env.RESEND_AUDIENCE_ID as string,
      });

      if (!data || error) {
        throw new ActionError('Failed to subscribe');
      }

      await sendWelcomeEmail({
        to: email,
        name: 'there',
      });

      return { success: true };
    } catch (error) {
      console.error('Failed to subscribe:', error);
      throw new ActionError('Failed to subscribe');
    }
  });
