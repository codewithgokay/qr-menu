'use client';

import { useState, memo, useCallback } from 'react';
import { MenuItem as MenuItemType } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { motion } from 'framer-motion';
import { ImageOptimized } from '@/components/common/ImageOptimized';

interface MobileMenuItemProps {
  item: MenuItemType;
  index: number;
}

const MobileMenuItem = memo(function MobileMenuItem({ item, index }: MobileMenuItemProps) {
  const [showDetails, setShowDetails] = useState(false);

  const formatPrice = useCallback((price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(price);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="w-full"
    >
      <Card
        className="group overflow-hidden bg-white shadow-soft hover:shadow-elevated transition-all duration-300 border-0 rounded-2xl cursor-pointer"
        onClick={() => setShowDetails(true)}
      >
        <div className="flex p-6 space-x-4">
          {/* Image Section */}
          <div className="relative w-24 h-24 flex-shrink-0">
            <ImageOptimized
              src={item.image}
              alt={item.name}
              width={96}
              height={96}
              cloudinaryPublicId={item.imagePublicId}
              className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
              fallbackText="No Image"
              lazy={true}
              priority={index < 3} // Prioritize first 3 items
            />
          </div>

          {/* Content Section */}
          <div className="flex-1 min-w-0 flex flex-col justify-between min-h-[6rem]">
            <div>
              <h3 className="font-semibold text-lg text-text-primary leading-tight break-words mb-1">
                {item.name}
              </h3>

              {item.description && (
                <p className="text-gray-600 text-sm leading-relaxed mb-1 line-clamp-2">
                  {item.description}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <span className="font-bold text-xl text-republic-dark-green whitespace-nowrap">
                {formatPrice(item.price)}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Details Sheet */}
      <Sheet open={showDetails} onOpenChange={setShowDetails}>
        <SheetContent className="w-full sm:max-w-lg bg-republic-cream p-0">
          {/* Fixed Header */}
          <div className="p-6 border-b border-republic-gold/30">
            <SheetTitle className="text-2xl font-heading text-text-primary mb-2">{item.name}</SheetTitle>
            <SheetDescription className="text-text-secondary">
              {item.description}
            </SheetDescription>
          </div>

          {/* Scrollable Content */}
          <div
            className="overflow-y-auto p-6 space-y-6"
            style={{
              height: 'calc(100vh - 250px)',
              maxHeight: '500px',
              overflowY: 'auto'
            }}
          >
            {/* Large Image */}
            <div className="relative h-64 w-full overflow-hidden rounded-2xl">
              <ImageOptimized
                src={item.image}
                alt={item.name}
                width={600}
                height={400}
                cloudinaryPublicId={item.imagePublicId}
                className="w-full h-full object-contain bg-black/5"
                fallbackText="No Image"
                lazy={false} // Don't lazy load in modal
                priority={true}
                objectFit="contain"
              />
            </div>

            {/* Price */}
            <div className="text-3xl font-bold text-republic-dark-green">
              {formatPrice(item.price)}
            </div>

            {/* Bottom padding for better scrolling */}
            <div className="h-8"></div>
          </div>
        </SheetContent>
      </Sheet>
    </motion.div>
  );
});

export { MobileMenuItem };
