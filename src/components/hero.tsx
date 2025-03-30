import { cn } from '@/lib/utils';
import { Children, type ReactNode } from 'react';
import { Section } from '@/components/section';

type HeroProps = {
  caption?: string | null;
  title: string;
  children?: ReactNode;
};

export const HeroSection = ({ caption, title, children }: HeroProps) => (
  <Section className='p-4'>
    <div
      className={cn(
        'flex flex-col items-start justify-center gap-8 py-8',
        'sm:items-center sm:rounded-lg sm:border sm:bg-background sm:px-8 sm:py-20 sm:shadow-sm',
      )}
    >
      <div className='flex flex-col gap-4 sm:items-center'>
        {caption && (
          <small className='block text-muted-foreground text-sm sm:text-base'>
            {caption}
          </small>
        )}
        <h1
          className={cn(
            'max-w-4xl font-bold text-3xl leading-tight tracking-tight',
            'sm:text-center sm:text-4xl sm:leading-tight',
            'md:text-5xl md:leading-tight',
          )}
        >
          {title}
        </h1>
      </div>
      {Children.map(children, (child, index) => (child))}
    </div>
  </Section>
);
