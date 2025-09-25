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
import { PerformanceMonitor } from '@/components/common/PerformanceMonitor';

// Preload critical resources
if (typeof window !== 'undefined') {
  // Preload API endpoints immediately
  const preloadApi = (url: string) => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  };
  
  preloadApi('/api/menu-items');
  preloadApi('/api/categories');
  
  // Preload critical images for better performance
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
            <Suspense fallback={
              <div className="space-y-8">
                <div className="animate-pulse">
                  <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="space-y-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="flex space-x-4">
                        <div className="w-24 h-24 bg-gray-200 rounded-xl"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-4 bg-gray-200 rounded w-full"></div>
                          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            }>
              <MenuGrid />
            </Suspense>
          </div>
        </main>

        <Footer restaurant={restaurant} />
      </div>
    </MenuProvider>
  );
}
