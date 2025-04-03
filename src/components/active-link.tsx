'use client';

import { isActive } from '@/lib/is-active';
import { cn } from '@/lib/utils';
import Link, { type LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

type ActiveLinkProps = LinkProps & {
  children: ReactNode;
  href: string;
  target?: string;
  rel?: string;
};

export const ActiveLink = ({ href, children }: ActiveLinkProps) => {
  const pathname = usePathname();
  const active = isActive(href, pathname, false);

  return (
    <Link
      href={href}
      className={cn(
        'text-muted-foreground text-sm transition-colors',
        'hover:text-foreground',
        active && 'font-medium text-foreground'
      )}
    >
      {children}
    </Link>
  );
};