import { HomeLayout } from 'fumadocs-ui/layouts/home'
import type { ReactNode } from 'react'
import { Header } from '@/components/sections/header'
import { linkItems } from '@/constants/navigation'
import { baseOptions } from '@/constants/site'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <HomeLayout
      {...baseOptions}
      className='pt-0'
      links={linkItems}
      nav={{
        component: (
          <Header
            links={linkItems}
            {...baseOptions}
            themeSwitch={{ enabled: false }}
          />
        ),
      }}
    >
      <main className='container relative flex min-h-full flex-1 border-border border-x border-b border-dashed'>
        {children}
      </main>
    </HomeLayout>
  )
}

export default Layout
