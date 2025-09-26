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
  
  // Preload common placeholder image (using data URL to avoid 404)
  preloadImage('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00OCA0MEw1NiA0OEw0OCA1Nkw0MCA0OEw0OCA0MFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+');
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
