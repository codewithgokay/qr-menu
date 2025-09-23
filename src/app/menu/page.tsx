'use client';

import { Suspense, useEffect } from 'react';
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
import { ResourceHints, initializeResourceHints } from '@/components/common/ResourceHints';
import { cacheUtils } from '@/lib/cache';

// Initialize resource hints and caching
if (typeof window !== 'undefined') {
  // Initialize resource hints
  initializeResourceHints();
  
  // Preload critical data
  cacheUtils.preloadMenuData();
  
  // Register service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('Service Worker registered:', registration);
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
  }
}

export default function MenuPage() {
  return (
    <MenuProvider>
      <PerformanceMonitor />
      <ResourceHints />
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
