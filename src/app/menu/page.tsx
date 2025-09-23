'use client';

import { Suspense } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MenuGrid } from '@/components/menu/MenuGrid';
import { CategoryFilter } from '@/components/menu/CategoryFilter';
import { SearchBar } from '@/components/menu/SearchBar';
import { MobileCategoryDropdown } from '@/components/menu/MobileCategoryDropdown';
import { MenuProvider } from '@/lib/context/MenuContext';
import { restaurant } from '@/data/menu';
import { LoadingScreen } from '@/components/common/LoadingScreen';
import { PerformanceMonitor } from '@/components/common/PerformanceMonitor';

// Preload critical resources
if (typeof window !== 'undefined') {
  // Preload Cloudinary images for better performance
  const preloadImage = (src: string) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  };
  
  // Preload common Cloudinary transformations
  const cloudinaryBase = 'https://res.cloudinary.com/dmudabrcn/image/upload';
  preloadImage(`${cloudinaryBase}/f_auto,q_auto,w_96,h_96,c_fill/placeholder.jpg`);
}

export default function MenuPage() {
  return (
    <MenuProvider>
      <PerformanceMonitor />
      <div className="min-h-screen bg-primary-cream">
        <Header restaurant={restaurant} />
        
        <main className="space-y-0">
          {/* Search and Filter Section */}
          <div className="space-y-0">
            <SearchBar />
            {/* Mobile Dropdown */}
            <MobileCategoryDropdown />
            {/* Desktop Category Filter */}
            <CategoryFilter />
          </div>

          {/* Menu Grid with Suspense */}
          <div className="px-6 py-8">
            <Suspense fallback={<LoadingScreen />}>
              <MenuGrid />
            </Suspense>
          </div>
        </main>

        <Footer restaurant={restaurant} />
      </div>
    </MenuProvider>
  );
}
