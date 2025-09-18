'use client';

import { Suspense } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MenuGrid } from '@/components/menu/MenuGrid';
import { CategoryFilter } from '@/components/menu/CategoryFilter';
import { SearchBar } from '@/components/menu/SearchBar';
import { MobileCategoryDropdown } from '@/components/menu/MobileCategoryDropdown';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { MenuProvider } from '@/lib/context/MenuContext';
import { restaurant, menuItems, categories } from '@/data/menu';

export default function MenuPage() {
  return (
    <MenuProvider initialItems={menuItems} initialCategories={categories}>
      <div className="min-h-screen bg-background">
        <Header restaurant={restaurant} />
        
        <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
          {/* Search and Filter Section */}
          <div className="space-y-3 sm:space-y-4">
            <SearchBar />
            {/* Mobile Dropdown */}
            <MobileCategoryDropdown />
            {/* Desktop Category Filter */}
            <CategoryFilter />
          </div>

          {/* Menu Grid */}
          <Suspense fallback={<LoadingSpinner />}>
            <MenuGrid />
          </Suspense>
        </main>

        <Footer restaurant={restaurant} />
      </div>
    </MenuProvider>
  );
}
