'use client'

import { ProgressProvider } from '@bprogress/next/app'
import { AuthUIProvider } from '@daveyplate/better-auth-ui'
import { TooltipProvider } from '@radix-ui/react-tooltip'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import type { ReactNode } from 'react'
import Analytics from '@/components/analytics'
import { SmoothCursor } from '@/components/smooth-cursor'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { authClient } from '@/lib/auth-client'

export function Provider({
  children,
}: {
  children: ReactNode
}): React.ReactElement {
  const router = useRouter()

  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      disableTransitionOnChange
      enableSystem
    >
      <NuqsAdapter>
        <AuthUIProvider
          authClient={authClient}
          credentials={false}
          Link={Link}
          localizeErrors={false}
          multiSession
          navigate={router.push}
          onSessionChange={() => {
            router.refresh()
          }}
          replace={router.replace}
          social={{
            providers: ['github', 'google'],
          }}
          viewPaths={{
            SIGN_IN: 'login',
            SIGN_OUT: 'logout',
            SIGN_UP: 'register',
            FORGOT_PASSWORD: 'forgot-password',
            RESET_PASSWORD: 'reset-password',
            MAGIC_LINK: 'magic',
          }}
          account={{
            basePath: '/account',
          }}
        >
          <ProgressProvider
            color='var(--color-primary)'
            delay={200}
            height='2px'
            options={{
              showSpinner: false,
            }}
            shallowRouting
            startOnLoad
            stopDelay={200}
          >
            <TooltipProvider>{children}</TooltipProvider>
          </ProgressProvider>
        </AuthUIProvider>
        <Analytics />
        <Toaster />
        <TailwindIndicator />
        <SmoothCursor />
      </NuqsAdapter>
    </ThemeProvider>
  )
}
