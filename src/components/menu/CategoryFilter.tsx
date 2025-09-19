'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';
import { useMenu } from '@/lib/context/MenuContext';

export function CategoryFilter() {
  const { filters, setSelectedCategory, categories } = useMenu();
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="w-full hidden sm:block"
    >
      <ScrollArea className="w-full whitespace-nowrap pb-6">
        <div className="flex space-x-3 px-6">
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
                  flex-shrink-0 h-12 px-6 rounded-full transition-all duration-300
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
      </ScrollArea>
    </motion.div>
  );
}
