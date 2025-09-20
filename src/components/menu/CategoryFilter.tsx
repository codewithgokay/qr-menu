'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useMenu } from '@/lib/context/MenuContext';

export function CategoryFilter() {
  const { filters, setSelectedCategory, categories, isLoading } = useMenu();
  const [activeCategory, setActiveCategory] = useState(filters.category);

  // Update active category when filters change
  useEffect(() => {
    setActiveCategory(filters.category);
  }, [filters.category]);

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    setSelectedCategory(categoryId);
  };

  const allCategories = [
    { id: 'all', name: 'Tüm Ürünler', icon: '🍽️', order: 0 },
    ...categories
  ];

  if (isLoading) {
    return (
      <div className="w-full hidden sm:block">
        <div className="px-6 pb-6">
          <div className="flex flex-wrap gap-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-12 w-24 bg-gray-200 rounded-full animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="w-full hidden sm:block"
    >
      <div className="px-6 pb-6">
        <div className="flex flex-wrap gap-3">
          {allCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCategoryClick(category.id)}
                className={`
                  h-12 px-6 rounded-full transition-all duration-300
                  ${activeCategory === category.id 
                    ? 'bg-navy-slate text-white shadow-lg transform scale-105' 
                    : 'bg-white/60 backdrop-blur-sm hover:bg-white/80 text-text-primary border border-warm-beige'
                  }
                `}
              >
                <span className="mr-2 text-lg">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
                {category.id !== 'all' && (
                  <Badge 
                    variant="secondary" 
                    className={`ml-2 text-xs px-2 py-1 h-5 ${
                      activeCategory === category.id 
                        ? 'bg-white/20 text-white' 
                        : 'bg-sage/10 text-sage'
                    }`}
                  >
                    {/* This would show item count in a real app */}
                  </Badge>
                )}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
