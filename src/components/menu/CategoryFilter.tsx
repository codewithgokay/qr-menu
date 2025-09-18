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
    { id: 'all', name: 'All Items', icon: '🍽️', order: 0 },
    ...categories
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="w-full"
    >
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-3 pb-2">
          {allCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                variant={activeCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryClick(category.id)}
                className={`
                  min-w-fit h-12 px-4 rounded-full transition-all duration-200
                  ${activeCategory === category.id 
                    ? 'bg-primary text-primary-foreground shadow-md' 
                    : 'hover:bg-muted'
                  }
                `}
              >
                <span className="mr-2 text-lg">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
                {category.id !== 'all' && (
                  <Badge 
                    variant="secondary" 
                    className="ml-2 text-xs"
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
