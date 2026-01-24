import { AuthView } from '@daveyplate/better-auth-ui'
import { authViewPaths } from '@daveyplate/better-auth-ui/server'

export const dynamicParams = false

export function generateStaticParams() {
  return Object.values({
    ...authViewPaths,
    SIGN_IN: 'login',
    SIGN_OUT: 'logout',
    SIGN_UP: 'register',
    FORGOT_PASSWORD: 'forgot-password',
    RESET_PASSWORD: 'reset-password',
    MAGIC_LINK: 'magic',
  }).map((pathname) => ({ pathname }))
}

export default async function AuthPage({
  params,
}: PageProps<'/auth/[pathname]'>) {
  const { pathname } = await params

  return (
    <div className='flex grow flex-col items-center justify-center self-center p-4 md:p-6'>
      <AuthView
        classNames={{
          base: 'border border-border border-dashed max-w-md rounded-none shadow-none',
          content: '[&>div>div]:gap-2',
        }}
        pathname={pathname}
      />
    </div>
  )
}
