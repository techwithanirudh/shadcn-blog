import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { getLinks } from 'fumadocs-ui/layouts/shared';
import type { ReactNode } from 'react';
import { baseOptions, linkItems } from '../layout.config';

const Layout = ({ children }: { children: ReactNode }) => {
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
      <main className='divide-y divide-dashed border-dashed sm:border-b'>
        {children}
        <Footer />
      </main>
    </HomeLayout>
  );
};

export default Layout;
