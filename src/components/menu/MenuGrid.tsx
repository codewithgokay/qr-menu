'use client';

import { useMemo } from 'react';
import { MenuItem as MenuItemType } from '@/lib/types';
import { MobileMenuItem } from './MobileMenuItem';
import { Skeleton } from '@/components/ui/skeleton';
import { LoadingScreen } from '@/components/common/LoadingScreen';
import { motion } from 'framer-motion';
import { useMenu } from '@/lib/context/MenuContext';

export function MenuGrid() {
  const { 
    items, 
    categories, 
    filters,
    isLoading,
    isLoadingProgress,
    isInitialLoad
  } = useMenu();

  const filteredItems = useMemo(() => {
    // Use all items for filtering (no more progressive loading)
    let filtered = items;

    // Filter by category
    if (filters.category !== 'all') {
      filtered = filtered.filter(item => item.category === filters.category);
    }

    // Filter by search query
    if (filters.search.trim()) {
      const query = filters.search.toLowerCase();
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [items, filters.category, filters.search]);

  const groupedItems = useMemo(() => {
    if (filters.category !== 'all') {
      // Sort items by order field within the selected category
      const sortedItems = [...filteredItems].sort((a, b) => (a.order || 0) - (b.order || 0));
      return { [filters.category]: sortedItems };
    }

    const grouped: { [key: string]: MenuItemType[] } = {};
    filteredItems.forEach(item => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push(item);
    });

    // Sort categories by the order defined in categories array
    // and sort items within each category by their order field
    const sortedGrouped: { [key: string]: MenuItemType[] } = {};
    categories.forEach(category => {
      if (grouped[category.id]) {
        // Sort items within each category by their order field
        sortedGrouped[category.id] = grouped[category.id].sort((a, b) => (a.order || 0) - (b.order || 0));
      }
    });

    return sortedGrouped;
  }, [filteredItems, filters.category, categories]);

  // Show full-screen loading for initial load
  if (isLoading && isInitialLoad) {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoadingProgress >= 100 ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <LoadingScreen />
      </motion.div>
    );
  }

  // Show skeleton loading for subsequent loads or when progress is complete but still loading
  if (isLoading) {
    return (
      <div className="space-y-8">
        {/* Progress Indicator */}
        <div className="px-6 py-4 bg-white/50 rounded-2xl border border-warm-beige/20">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-text-secondary">Menü yükleniyor...</span>
            <span className="text-sm font-medium text-sage">{isLoadingProgress}%</span>
          </div>
          <div className="w-full bg-warm-beige/20 rounded-full h-2">
            <motion.div
              className="bg-sage h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${isLoadingProgress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Enhanced Skeleton Loading */}
        {Array.from({ length: Math.min(3, Math.ceil(categories.length || 3)) }).map((_, categoryIndex) => (
          <div key={categoryIndex} className="space-y-6">
            <div className="px-6 py-8 border-b border-warm-beige/30">
              <div className="flex items-center space-x-4">
                <Skeleton className="w-12 h-12 rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              {Array.from({ length: Math.min(6, 4 + Math.floor(isLoadingProgress / 20)) }).map((_, itemIndex) => (
                <motion.div
                  key={itemIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: itemIndex * 0.1 }}
                  className="animate-pulse"
                >
                  <div className="flex p-6 space-x-4 bg-white rounded-2xl shadow-soft">
                    <Skeleton className="w-24 h-24 rounded-xl flex-shrink-0" />
                    <div className="flex-1 space-y-3">
                      <div className="flex justify-between">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-6 w-16" />
                      </div>
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                          <Skeleton className="h-6 w-16" />
                          <Skeleton className="h-6 w-20" />
                        </div>
                        <div className="flex space-x-2">
                          <Skeleton className="h-8 w-8 rounded-full" />
                          <Skeleton className="h-8 w-8 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Only show "no items" message if we're not loading and not in initial load state
  if (!isLoading && !isInitialLoad && filteredItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16"
      >
        <div className="text-8xl mb-6">🔍</div>
        <h3 className="text-2xl font-bold text-text-primary mb-3 font-heading">Ürün bulunamadı</h3>
        <p className="text-text-secondary text-lg">
          Arama veya filtre kriterlerinizi ayarlamayı deneyin
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      {Object.entries(groupedItems).map(([categoryId, items], categoryIndex) => {
        const category = categories.find(cat => cat.id === categoryId);
        
        return (
          <motion.section
            key={categoryId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
            className="space-y-6"
          >
            {/* Category Header - Elegant Section Headers */}
            {filters.category === 'all' && (
              <div className="px-6 py-8 border-b border-warm-beige/30">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-sage/10 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">{category?.icon}</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-text-primary font-heading">
                      {category?.name}
                    </h2>
                    <p className="text-text-secondary">
                      {category?.description} • {items.length} ürün
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Menu Items Grid - Mobile First */}
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              {items.map((item, itemIndex) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: isInitialLoad ? Math.min(itemIndex * 0.02, 0.3) : 0,
                    duration: 0.2,
                    ease: "easeOut"
                  }}
                >
                  <MobileMenuItem
                    item={item}
                    index={itemIndex}
                  />
                </motion.div>
              ))}
            </div>
          </motion.section>
        );
      })}
    </div>
  );
}
