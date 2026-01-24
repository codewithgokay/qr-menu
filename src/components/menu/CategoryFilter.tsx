'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useMenu } from '@/lib/context/MenuContext';
import { Coffee, Pizza, Beer, Wine, CakeSlice, Utensils, Egg, Zap, UtensilsCrossed } from 'lucide-react';

export function CategoryFilter() {
  const { filters, setSelectedCategory, categories, isLoading } = useMenu();
  const [activeCategory, setActiveCategory] = useState(filters.category);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Update active category when filters change
  useEffect(() => {
    setActiveCategory(filters.category);
  }, [filters.category]);

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    setSelectedCategory(categoryId);
  };

  // Icon mapping
  const getIcon = (iconName: string | undefined) => {
    const className = "w-4 h-4 mr-2";
    switch (iconName) {
      case '☕': return <Coffee className={className} />;
      case '🧊': return <Beer className={className} />; // Cold drinks
      case '🧁': return <CakeSlice className={className} />;
      case '🥪': return <Utensils className={className} />;
      case '🍳': return <Egg className={className} />;
      case '🥜': return <Zap className={className} />;
      case '🍷': return <Wine className={className} />;
      default: return <UtensilsCrossed className={className} />;
    }
  };

  const allCategories = [
    { id: 'all', name: 'Tüm Ürünler', icon: 'default', order: 0 },
    ...categories
  ];

  if (isLoading) {
    return (
      <div className="w-full px-4 overflow-x-hidden">
        <div className="flex space-x-3 pb-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-10 w-28 bg-gray-200 rounded-full animate-pulse flex-shrink-0" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full sticky top-[72px] z-40 bg-republic-cream/95 backdrop-blur-md pt-2 pb-4 border-b border-republic-gold/10">
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto px-4 pb-2 space-x-3 scrollbar-hide snap-x"
        style={{ scrollBehavior: 'smooth' }}
      >
        {allCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="snap-start"
          >
            <Button
              variant="ghost"
              onClick={() => handleCategoryClick(category.id)}
              className={`
                h-10 px-5 rounded-full whitespace-nowrap transition-all duration-300 border font-medium text-sm
                ${activeCategory === category.id
                  ? 'bg-republic-green text-republic-gold border-republic-gold shadow-md transform scale-[1.02]'
                  : 'bg-white text-republic-charcoal border-gray-200 hover:border-republic-gold/50 hover:bg-white'
                }
              `}
            >
              {getIcon(category.icon)}
              {category.name}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
