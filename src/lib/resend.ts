import { Resend } from 'resend';
import NewsletterWelcomeEmail from '../../emails/newsletter-welcome';
import { ActionError } from './safe-action';
import type { getPosts } from './source';

const resend = new Resend(process.env.RESEND_API_KEY);

// export async function getContact({
//   email,
//   audienceId,
// }: {
//   email: string;
//   audienceId: string;
// }) {
//   try {
//     const { data, error } = await resend.contacts.update({
//       email: email,
//       audienceId: audienceId,
//     });

//     if (!data || error) {
//       if (error?.name === 'not_found') {
//         return null;
//       }

//       throw new Error(`Failed to get contact: ${error?.message}`);
//     }

//     return data;
//   } catch (error) {
//     console.error('Error fetching contact:', error);
//     throw new ActionError('Failed to validate contact');
//   }
// }

export async function getContact({
  email,
  audienceId,
}: {
  email: string;
  audienceId: string;
}) {
  try {
    const { data: contacts, error } = await resend.contacts.list({
      audienceId: audienceId,
    });

    if (!contacts || error) {
      throw new Error(`Failed to list contacts: ${error?.message}`);
    }

    const contact = contacts?.data?.find((contact) => contact.email === email);
    if (!contact) {
      return null;
    }

    return contact;
  } catch (error) {
    console.error('Error fetching contact:', error);
    throw new ActionError('Failed to validate contact');
  }
}

export async function sendWelcomeEmail({
  posts,
  name,
  to,
}: {
  posts: ReturnType<typeof getPosts>;
  name: string;
  to: string;
}) {
  const EMAIL_FROM = process.env.EMAIL_FROM as string;

  if (!EMAIL_FROM) {
    throw new Error('Missing environment variables');
  }

  if (!name || !to) {
    throw new Error('Missing required fields');
  }

  const { data: res, error } = await resend.emails.send({
    from: EMAIL_FROM,
    to: to,
    subject: 'Welcome to my newsletter!',
    react: NewsletterWelcomeEmail({
      name: name,
      posts: posts.map((post) => ({
        ...post.data,
        image: `${process.env.VERCEL_PROJECT_PRODUCTION_URL}${post.data.image}`,
        url: `${process.env.VERCEL_PROJECT_PRODUCTION_URL}${post.url}`,
      })),
    }),
  });

  if (error) throw new Error(JSON.stringify(error));
}
