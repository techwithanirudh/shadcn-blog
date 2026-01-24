import { AccountView } from '@daveyplate/better-auth-ui'
import { accountViewPaths } from '@daveyplate/better-auth-ui/server'

export const dynamicParams = false

export function generateStaticParams() {
  return Object.values(accountViewPaths).map((pathname) => ({
    pathname,
  }))
}

export default async function AccountPage({
  params,
}: PageProps<'/auth/[pathname]'>) {
  const { pathname } = await params

  return (
    <div className='flex-1 p-4 md:p-6'>
      <AccountView
        classNames={{
          sidebar: {
            base: 'sticky top-20',
            button: 'border',
            buttonActive: 'bg-accent/50',
          },
        }}
        pathname={pathname}
      />
    </div>
  )
}
