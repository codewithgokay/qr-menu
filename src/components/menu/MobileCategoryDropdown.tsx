'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { useMenu } from '@/lib/context/MenuContext';

export function MobileCategoryDropdown() {
  const { filters, setSelectedCategory, categories } = useMenu();
  const [isOpen, setIsOpen] = useState(false);

  const allCategories = [
    { id: 'all', name: 'All Items', icon: '🍽️', order: 0 },
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
      className="w-full sm:hidden"
    >
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full h-10 justify-between text-sm font-medium"
          >
            <div className="flex items-center space-x-2">
              <span className="text-base">{activeCategory.icon}</span>
              <span>{activeCategory.name}</span>
            </div>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full min-w-[200px]" align="start">
          {allCategories.map((category) => (
            <DropdownMenuItem
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`flex items-center space-x-2 cursor-pointer ${
                filters.category === category.id ? 'bg-accent' : ''
              }`}
            >
              <span className="text-base">{category.icon}</span>
              <span className="flex-1">{category.name}</span>
              {filters.category === category.id && (
                <div className="w-2 h-2 bg-primary rounded-full" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  );
}
