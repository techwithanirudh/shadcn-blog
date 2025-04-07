'use client';
import { getPostViews, incrementPostViews } from '@/app/actions/views';
import Balancer from 'react-wrap-balancer';
import { cn } from '@/lib/utils';
import { TagCard } from '@/components/tags/tag-card';
import { Section } from '@/components/section';
import { useAction } from 'next-safe-action/hooks';
import { useEffect, useRef } from 'react';

export function Header(props: {
  title: string;
  description?: string;
  slugs: string[];
  tags?: string[];
}) {
  const { title, description, slugs, tags } = props;
  const incrementAction = useAction(incrementPostViews);
  const viewsAction = useAction(getPostViews);

  const incremented = useRef(false);
  const fetchedViews = useRef(false);

  useEffect(() => {
    if (!incremented.current) {
      incrementAction.execute({ slug: slugs.join('/') });
      incremented.current = true;
    }
  }, [incrementAction, slugs]);

  useEffect(() => {
    if (!fetchedViews.current) {
      viewsAction.execute({ slug: slugs.join('/') });
      fetchedViews.current = true;
    }
  }, [viewsAction, slugs]);

  return (
    <Section className='p-4 lg:p-6'>
      <div
        className={cn(
          'flex flex-col items-start justify-center gap-4 py-8 md:gap-6',
          'sm:items-center sm:rounded-lg sm:border sm:bg-muted/70 sm:px-8 sm:py-20 sm:shadow-xs sm:dark:bg-muted',
        )}
      >
        <div className='flex flex-col gap-2 sm:text-center md:gap-4'>
          <h1 className='max-w-4xl font-bold text-3xl leading-tight tracking-tight sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight'>
            <Balancer>{title}</Balancer>
          </h1>
          <p className='mx-auto max-w-4xl'>
            <Balancer>{description}</Balancer>
          </p>
          <p className='text-muted-foreground text-sm'>
            {viewsAction?.status === 'hasSucceeded'
              ? viewsAction?.result?.data?.views.toString()
              : '--'}{' '}
            views
          </p>
        </div>
        <div className='flex flex-wrap gap-2'>
          {tags?.map((tag) => (
            <TagCard name={tag} key={tag} className=' border border-border ' />
          ))}
        </div>
      </div>
    </Section>
  );
}
