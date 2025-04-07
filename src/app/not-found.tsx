'use client';
import { Icons } from '@/components/icons/icons';
import { Section } from '@/components/section';
import { Footer } from '@/components/sections/footer';
import { Header } from '@/components/sections/header';
import { buttonVariants } from '@/components/ui/button';
import { getSortedByDatePosts } from '@/lib/source';
import { cn } from '@/lib/utils';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { getLinks } from 'fumadocs-ui/layouts/shared';
import * as motion from 'motion/react-client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Balancer from 'react-wrap-balancer';
import heroImage from '../../public/images/gradient-noise-purple-azure-light.png';
import Posts from './(home)/_components/posts';
import { baseOptions, linkItems } from './layout.config';

export default function NotFound() {
  const pathname = usePathname();
  const posts = getSortedByDatePosts().slice(0, 3);

  return (
    <HomeLayout
      {...baseOptions}
      links={linkItems}
      nav={{
        component: (
          <Header
            finalLinks={getLinks(linkItems, baseOptions.githubUrl)}
            {...baseOptions}
          />
        ),
      }}
      className='pt-0'
    >
      <main className='flex flex-1 flex-col divide-y divide-dashed divide-border/70 border-border/70 border-dashed sm:border-b dark:divide-border dark:border-border'>
        <Section className='relative flex flex-col gap-6 overflow-hidden overflow-hidden bg-dashed px-6 py-12'>
          <h1 className='max-w-2xl font-medium text-4xl'>
            The page "{pathname}" could not be found.
          </h1>
          <p className='text-muted-foreground'>
            <Balancer>
              The page you are looking for might have been removed or is
              temporarily unavailable.
            </Balancer>
          </p>
          <Link
            className={cn(
              buttonVariants({
                variant: 'default',
                size: 'lg',
              }),
              'group w-min rounded-full',
            )}
            href='/'
          >
            <Icons.back className='group-hover:-rotate-12 size-4 transition-transform' />
            Go Back Home
          </Link>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.4,
              scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
            }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className='-z-10 absolute inset-0 h-full w-full'
          >
            <Image
              src={heroImage}
              alt='Hero Background'
              height={600}
              width={704}
              className='pointer-events-none absolute right-0 bottom-0 h-[900px] w-[1004px] max-w-[1004px] translate-x-1/2 translate-y-1/2 select-none opacity-80 dark:opacity-100'
              priority
            />
          </motion.div>
        </Section>
        <Section className='p-6'>
          <h2 className='max-w-xl font-medium text-2xl'>
            Or check out some of our latest posts
          </h2>
        </Section>
        <Posts posts={posts} />
        <Footer />
      </main>
    </HomeLayout>
  );
}

// export async function generateMetadata(props: {
//   params: Promise<{ slug?: string[] }>;
// }): Promise<Metadata> {
//   const params = await props.params;
//   const description = 'The page you are looking for could not be found.';

//   return createMetadata({
//     title: 'Not Found',
//     description,
//   });
// }
