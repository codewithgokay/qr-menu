'use client';

import { useState, useEffect, useMemo } from 'react';
import { MenuItem as MenuItemType } from '@/lib/types';
import { MobileMenuItem } from './MobileMenuItem';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { useMenu } from '@/lib/context/MenuContext';

export function MenuGrid() {
  const { 
    items, 
    categories, 
    filters, 
    isLoading
  } = useMenu();

  const filteredItems = useMemo(() => {
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
      return { [filters.category]: filteredItems };
    }

    const grouped: { [key: string]: MenuItemType[] } = {};
    filteredItems.forEach(item => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push(item);
    });

    // Sort categories by the order defined in categories array
    const sortedGrouped: { [key: string]: MenuItemType[] } = {};
    categories.forEach(category => {
      if (grouped[category.id]) {
        sortedGrouped[category.id] = grouped[category.id];
      }
    });

    return sortedGrouped;
  }, [filteredItems, filters.category, categories]);

  if (isLoading) {
    return (
      <div className="space-y-8">
        {Array.from({ length: 3 }).map((_, categoryIndex) => (
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
            <div className="grid grid-cols-1 gap-4">
              {Array.from({ length: 6 }).map((_, itemIndex) => (
                <div key={itemIndex} className="animate-pulse">
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
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (filteredItems.length === 0) {
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
                <MobileMenuItem
                  key={item.id}
                  item={item}
                  index={itemIndex}
                />
              ))}
            </div>
          </motion.section>
        );
      })}
    </div>
  );
}
