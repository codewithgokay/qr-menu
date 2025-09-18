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
    isLoading, 
    toggleFavorite, 
    userPreferences 
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
          <div key={categoryIndex} className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              {Array.from({ length: 6 }).map((_, itemIndex) => (
                <div key={itemIndex} className="flex space-x-3">
                  <Skeleton className="h-24 w-24 sm:h-32 sm:w-32 rounded-lg flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-2/3" />
                    <div className="flex space-x-2">
                      <Skeleton className="h-5 w-12" />
                      <Skeleton className="h-5 w-16" />
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
        className="text-center py-12"
      >
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold mb-2">No items found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filter criteria
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
            {/* Category Header */}
            {filters.category === 'all' && (
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{category?.icon}</span>
                <div>
                  <h2 className="text-2xl font-bold">{category?.name}</h2>
                  {category?.description && (
                    <p className="text-muted-foreground">{category.description}</p>
                  )}
                </div>
                <div className="flex-1 h-px bg-border" />
                <span className="text-sm text-muted-foreground">
                  {items.length} item{items.length !== 1 ? 's' : ''}
                </span>
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
