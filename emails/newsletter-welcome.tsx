import {
  Body,
  Button,
  Column,
  Container,
  Font,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

interface NewsletterWelcomeEmailProps {
  name: string;
  posts: {
    title: string;
    description?: string;
    date: Date;
    tags?: string[];
    image?: string;
    author: string;
    url: string;
  }[];
}

const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'http://localhost:3000';

function PostCard({
  title,
  description,
  date,
  tags,
  image,
  author,
  url,
}: NewsletterWelcomeEmailProps['posts'][0]) {
  return (
    <Section className='my-[16px]'>
      <Link href={url}>
        <Img
          alt='Post image'
          className='w-full rounded-[12px] object-cover'
          height='320'
          src={image ?? `${baseUrl}/images/placeholder.png`}
        />
      </Link>
      <Section className='mt-[24px]'>
        <Link
          href={url}
          className='m-0 mt-[8px] font-semibold text-[32px] text-zinc-900 leading-[36px]'
        >
          {title}
        </Link>
        <Text className='text-[16px] text-zinc-500 leading-[24px]'>
          {description ||
            'Click on the blog post to learn more about this topic.'}
        </Text>
      </Section>
    </Section>
  );
}

export default function NewsletterWelcomeEmail({
  name,
  posts,
}: NewsletterWelcomeEmailProps) {
  return (
    <Html>
      <Head>
        <Font
          fontFamily='Alex Brush'
          fallbackFontFamily='Georgia'
          webFont={{
            url: 'https://fonts.gstatic.com/s/alexbrush/v22/SZc83FzrJKuqFbwMKk6EhUXz7RlNiCY.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle='normal'
        />
        <Font
          fontFamily='Bricolage Grotesque'
          fallbackFontFamily='Helvetica'
          webFont={{
            url: 'https://fonts.gstatic.com/s/bricolagegrotesque/v8/3y9K6as8bTXq_nANBjzKo3IeZx8z6up5BeSl9D4dj_x9PpZBMlGIInHWVyNJ.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle='normal'
        />
      </Head>
      <Preview>
        Thanks for joining my newsletter! This email is to welcome you.
      </Preview>
      <Tailwind>
        <Body className='bg-white font-sans'>
          <Container className='mx-auto w-full max-w-[600px] p-8'>
            <Section>
              <Text className='mx-0 mt-4 mb-8 p-0 text-center font-normal text-2xl'>
                <span className='font-bold tracking-tighter'>Blog</span>
              </Text>
              <Heading className='my-4 font-medium text-4xl leading-tight'>
                Welcome!
              </Heading>
              <Text className='text-lg leading-8'>Hey {name},</Text>
              <Text className='text-lg leading-8'>
                Thanks for subscribing to my newsletter! I&apos;m excited to
                share my thoughts and ideas with you. You can expect an email
                every few weeks, and I might occasionally share newsletter-only
                content as well—so stay tuned!
              </Text>
              <Text className='text-lg leading-8'>
                Here are a few popular posts from the past few months that you
                might find interesting:
              </Text>
            </Section>

            <Hr className='my-4' />

            <Section className='my-[16px]'>
              {posts.map((post) => (
                <PostCard key={post.url} {...post} />
              ))}
            </Section>

            <Hr className='my-4' />

            <Section>
              <Text className='text-lg text-zinc-900 leading-8'>
                Thank you for being a part of my community! I appreciate your
                support and look forward to connecting with you.
              </Text>
              <Text
                className='select-none text-4xl text-zinc-900 leading-8'
                style={{ fontFamily: 'Alex Brush' }}
              >
                John Doe
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

NewsletterWelcomeEmail.PreviewProps = {
  name: 'Jane',
  posts: [
    {
      title: 'How to build a website with Next.js',
      description:
        'Learn how to build a website using Next.js, a popular React framework.',
      date: new Date('2023-09-01'),
      tags: ['Next.js', 'React', 'Web Development'],
      image: 'https://misc-assets.raycast.com/wallpapers/autumnal-peach.png',
      author: 'John Doe',
      url: 'https://example.com/how-to-build-a-website-with-nextjs',
    },
    {
      title: 'Understanding React Hooks',
      description:
        'A deep dive into React Hooks and how to use them effectively in your projects.',
      date: new Date('2023-08-15'),
      tags: ['React', 'JavaScript'],
      image: 'https://misc-assets.raycast.com/wallpapers/blossom-2.png',
      author: 'John Doe',
      url: 'https://example.com/understanding-react-hooks',
    },
    {
      title: 'CSS Grid vs Flexbox: When to Use Each',
      description:
        'A comprehensive guide on when to use CSS Grid and when to use Flexbox for layout.',
      date: new Date('2023-07-20'),
      tags: ['CSS', 'Web Design'],
      image: 'https://misc-assets.raycast.com/wallpapers/blushing-fire.png',
      author: 'John Doe',
      url: 'https://example.com/css-grid-vs-flexbox-when-to-use-each',
    },
  ],
} satisfies NewsletterWelcomeEmailProps;
