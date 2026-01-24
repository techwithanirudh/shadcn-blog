import { HomeLayout } from 'fumadocs-ui/layouts/home'
import type { ReactNode } from 'react'
import { Footer } from '@/components/sections/footer'
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
      <main className='relative flex flex-1 flex-col divide-y divide-dashed divide-border border-border border-dashed after:pointer-events-none after:sticky after:bottom-0 after:z-10 after:mt-[-3rem] after:h-24 after:select-none after:bg-gradient-to-t after:from-background after:to-transparent after:backdrop-blur-sm sm:border-b after:[mask:linear-gradient(to_top,_rgba(0,_0,_0,_1)_0%,_rgba(0,_0,_0,_0)_100%)]'>
        {children}
        <Footer />
      </main>
    </HomeLayout>
  )
}

export default Layout
