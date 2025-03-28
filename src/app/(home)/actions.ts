'use server';

import { getContact, sendWelcomeEmail } from '@/lib/resend';
import { ActionError, actionClient } from '@/lib/safe-action';
import { getSortedByDatePosts } from '@/lib/source';
import { NewsletterSchema } from '@/lib/validators';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const subscribeUser = actionClient
  .schema(NewsletterSchema)
  .action(async ({ parsedInput: { email } }) => {
    try {
      const contact = await getContact({
        email,
        audienceId: process.env.RESEND_AUDIENCE_ID as string,
      });

      if (contact) {
        return {
          success: true,
          message: 'You are already subscribed to our newsletter!',
        };
      }

      const { data, error } = await resend.contacts.create({
        email,
        audienceId: process.env.RESEND_AUDIENCE_ID as string,
      });

      if (!data || error) {
        throw new ActionError("Oops, we couldn't add you to our newsletter");
      }

      const posts = getSortedByDatePosts();
      await sendWelcomeEmail({
        posts,
        to: email,
        name: 'there',
      });

      return {
        success: true,
        message: 'You are now subscribed to our newsletter!',
      };
    } catch (error) {
      console.error('Failed to subscribe:', error);
      if (error instanceof ActionError) {
        throw error;
      }
      throw new ActionError('Oops, something went wrong');
    }
  });
