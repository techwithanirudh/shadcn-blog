'use client';

import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { Airplay, Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from 'next-themes';
import { type HTMLAttributes, useLayoutEffect, useState } from 'react';

const themes = [
  {
    key: 'light',
    icon: Sun,
    label: 'Light theme',
  },
  {
    key: 'dark',
    icon: Moon,
    label: 'Dark theme',
  },
  {
    key: 'system',
    icon: Airplay,
    label: 'System theme',
  },
];

const itemVariants = cva(
  'relative size-6.5 rounded-full p-1.5 text-fd-muted-foreground',
  {
    variants: {
      active: {
        true: 'text-fd-accent-foreground',
        false: 'text-fd-muted-foreground',
      },
    },
  },
);

type Theme = 'light' | 'dark' | 'system';

export function ThemeToggle({
  className,
  mode = 'light-dark',
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  mode?: 'light-dark' | 'light-dark-system';
}) {
  const { setTheme, theme: currentTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const container = cn(
    'relative inline-flex items-center rounded-full p-1 ring-1 ring-border',
    className,
  );

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  const handleChangeTheme = (theme: Theme) => {
    if (theme === currentTheme) return;

    if (!document.startViewTransition) return setTheme(theme);
    document.startViewTransition(() => setTheme(theme));
  };

  const value = mounted
    ? mode === 'light-dark'
      ? resolvedTheme
      : currentTheme
    : null;

  const handleSwitcherClick = (e: React.MouseEvent) => {
    if (mode !== 'light-dark') return;
    handleChangeTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div
      className={container}
      onClick={handleSwitcherClick}
      data-theme-toggle=''
      aria-label={mode === 'light-dark' ? 'Toggle Theme' : undefined}
      {...props}
    >
      {themes.map(({ key, icon: Icon, label }) => {
        const isActive = value === key;
        if (mode === 'light-dark' && key === 'system') return;

        return (
          <button
            type='button'
            key={key}
            className={itemVariants({ active: isActive })}
            onClick={() => handleChangeTheme(key as Theme)}
            aria-label={label}
          >
            {isActive && (
              <motion.div
                layoutId='activeTheme'
                className='absolute inset-0 rounded-full bg-accent'
                transition={{ type: 'spring', duration: mode === 'light-dark' ? 1.5 : 1 }}
              />
            )}
            <Icon
              className={'relative m-auto size-full'}
              fill={'currentColor'}
            />
          </button>
        );
      })}
    </div>
  );
}
