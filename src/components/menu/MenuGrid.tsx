'use client';

import { useMemo } from 'react';
import { MenuItem as MenuItemType } from '@/lib/types';
import { MobileMenuItem } from './MobileMenuItem';
import { motion } from 'framer-motion';
import { useMenu } from '@/lib/context/MenuContext';

export function MenuGrid() {
  const { 
    items, 
    categories, 
    filters
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
