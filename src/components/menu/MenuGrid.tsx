'use client';

import { useMemo, useState } from 'react';
import { MenuItem as MenuItemType } from '@/lib/types';
import { MobileMenuItem } from './MobileMenuItem';
import { Skeleton } from '@/components/ui/skeleton';
import { LoadingScreen } from '@/components/common/LoadingScreen';
import { motion, AnimatePresence } from 'framer-motion';
import { useMenu } from '@/lib/context/MenuContext';
import { ChevronDown } from 'lucide-react';

export function MenuGrid() {
  const {
    items,
    categories,
    filters,
    isLoading,
    isLoadingProgress,
    isInitialLoad
  } = useMenu();

  // State to track expanded category
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (categoryId: string) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryId);

      // Scroll to the category header after a brief delay to allow expansion
      setTimeout(() => {
        const element = document.getElementById(`category-${categoryId}`);
        if (element) {
          const headerOffset = 140; // Approx height of sticky header + search
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 100);
    }
  };

  const filteredItems = useMemo(() => {
    let filtered = items;

    // Filter by search query if exists
    // Note: We ignore category filter from context since we show all categories in accordion
    if (filters.search.trim()) {
      const query = filters.search.toLowerCase();
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(query) ||
        (item.description ? item.description.toLowerCase().includes(query) : false) ||
        item.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [items, filters.search]);

  const groupedItems = useMemo(() => {
    const grouped: { [key: string]: MenuItemType[] } = {};

    // Initialize groups for all categories to ensure they appear even if empty (optional, depending on preference)
    // For now we only show categories that have items matching the search

    filteredItems.forEach(item => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push(item);
    });

    const sortedGrouped: { [key: string]: MenuItemType[] } = {};
    categories.forEach(category => {
      if (grouped[category.id]) {
        sortedGrouped[category.id] = grouped[category.id].sort((a, b) => (a.order || 0) - (b.order || 0));
      }
    });

    return sortedGrouped;
  }, [filteredItems, categories]);


  // Effect to auto-expand if searching or if only one category has items
  useMemo(() => {
    if (filters.search.trim()) {
      // specific behavior during search: maybe expand all? or keep user control
      // For now, let's expand the first one if it's not set, or leave it.
      // Actually, if searching, it's better to show results. 
      // Let's rely on user click for now to keep it clean, or auto-expand all matches?
      // Let's Expand ALL if searching, otherwise collapsed.
      setExpandedCategory('ALL_EXPANDED');
    } else {
      if (expandedCategory === 'ALL_EXPANDED') {
        setExpandedCategory(null);
      }
    }
  }, [filters.search]);


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

  if (isLoading) {
    // Keep existing skeleton structure but simplified for accordion if needed
    // For now reusing the list skeleton
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-xl" />
        ))}
      </div>
    )
  }

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
          Arama kriterlerinizi değiştirmeyi deneyin
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-3 pb-20">
      {categories.map((category, index) => {
        const items = groupedItems[category.id] || [];
        if (items.length === 0 && !filters.search.trim()) {
          return null; // Don't show empty categories unless searching (handled by groupedItems logic actually)
        }
        if (items.length === 0) return null;

        const isExpanded = expandedCategory === category.id || expandedCategory === 'ALL_EXPANDED';

        return (
          <motion.div
            key={category.id}
            id={`category-${category.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="overflow-hidden"
          >
            <motion.button
              onClick={() => toggleCategory(category.id)}
              className={`
                w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300
                ${isExpanded
                  ? 'bg-republic-green text-republic-gold shadow-md'
                  : 'bg-white text-republic-charcoal shadow-sm hover:bg-gray-50'}
              `}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{category.icon}</span>
                <span className="font-heading font-bold text-lg">{category.name}</span>
                <span className={`text-sm ${isExpanded ? 'text-republic-gold/80' : 'text-gray-400'}`}>
                  ({items.length})
                </span>
              </div>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className={`w-5 h-5 ${isExpanded ? 'text-republic-gold' : 'text-gray-400'}`} />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pt-2 pl-2 pr-2 space-y-3">
                    {items.map((item, itemIndex) => (
                      <MobileMenuItem
                        key={item.id}
                        item={item}
                        index={itemIndex}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
