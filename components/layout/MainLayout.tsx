'use client';

import { useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { ScrollToTop } from '@/components/ui/ScrollToTop';

interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollProgress />
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export { MainLayout };
