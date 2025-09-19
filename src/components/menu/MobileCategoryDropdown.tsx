'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useMenu } from '@/lib/context/MenuContext';

export function MobileCategoryDropdown() {
  const { filters, setSelectedCategory, categories } = useMenu();
  const [isOpen, setIsOpen] = useState(false);

  const allCategories = [
    { id: 'all', name: 'Tüm Ürünler', icon: '🍽️', order: 0 },
    ...categories
  ];

  const activeCategory = allCategories.find(cat => cat.id === filters.category) || allCategories[0];

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setIsOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="w-full sm:hidden px-6 py-4"
    >
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full h-12 justify-between text-sm font-medium bg-white/60 backdrop-blur-sm border-warm-beige hover:bg-white/80 rounded-xl"
          >
            <div className="flex items-center space-x-3">
              <span className="text-lg">{activeCategory.icon}</span>
              <span className="text-text-primary">{activeCategory.name}</span>
            </div>
            <ChevronDown className="h-4 w-4 text-text-secondary" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full min-w-[200px] bg-white/95 backdrop-blur-sm border-warm-beige rounded-xl" align="start">
          {allCategories.map((category) => (
            <DropdownMenuItem
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`flex items-center space-x-3 cursor-pointer py-3 px-4 ${
                filters.category === category.id ? 'bg-sage/10 text-sage' : 'text-text-primary hover:bg-warm-beige/50'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span className="flex-1 font-medium">{category.name}</span>
              {filters.category === category.id && (
                <div className="w-2 h-2 bg-sage rounded-full" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  );
}
