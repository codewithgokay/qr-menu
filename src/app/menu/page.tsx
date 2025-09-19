'use client';

import { Suspense } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MenuGrid } from '@/components/menu/MenuGrid';
import { CategoryFilter } from '@/components/menu/CategoryFilter';
import { SearchBar } from '@/components/menu/SearchBar';
import { MobileCategoryDropdown } from '@/components/menu/MobileCategoryDropdown';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { AdminButton } from '@/components/admin/AdminButton';
import { MenuProvider } from '@/lib/context/MenuContext';
import { restaurant } from '@/data/menu';

export default function MenuPage() {
  return (
    <MenuProvider>
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

          {/* Menu Grid */}
          <div className="px-6 py-8">
            <Suspense fallback={<LoadingSpinner />}>
              <MenuGrid />
            </Suspense>
          </div>
        </main>

        <Footer restaurant={restaurant} />
        <AdminButton />
      </div>
    </MenuProvider>
  );
}
