'use client';

import { MenuItem as MenuItemType } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { motion } from 'framer-motion';
import { ImageOptimized } from '@/components/common/ImageOptimized';

interface MenuItemProps {
  item: MenuItemType;
  index: number;
}

export function MenuItem({ item, index }: MenuItemProps) {

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="w-full"
    >
      <Sheet>
        <SheetTrigger asChild>
          <Card className="group overflow-hidden bg-white shadow-soft hover:shadow-elevated transition-all duration-300 border-0 rounded-2xl cursor-pointer">
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
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg text-text-primary leading-tight flex-1 mr-3">
                    {item.name}
                  </h3>
                  <span className="font-bold text-xl text-republic-dark-green flex-shrink-0">
                    {formatPrice(item.price)}
                  </span>
                </div>

                <p className="text-text-secondary text-sm leading-relaxed mb-3 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          </Card>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-lg bg-republic-cream">
          <SheetHeader>
            <SheetTitle className="text-2xl font-heading text-text-primary">{item.name}</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-6">
            {/* Large Image */}
            <div className="relative h-64 w-full overflow-hidden rounded-2xl">
              <ImageOptimized
                src={item.image}
                alt={item.name}
                width={600}
                height={400}
                cloudinaryPublicId={item.imagePublicId}
                className="w-full h-full object-cover"
                fallbackText="No Image"
                lazy={false} // Don't lazy load in modal
                priority={true}
              />
            </div>

            {/* Price */}
            <div className="text-3xl font-bold text-republic-dark-green">
              {formatPrice(item.price)}
            </div>

            {/* Description */}
            <p className="text-text-secondary text-lg leading-relaxed">
              {item.description}
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </motion.div>
  );
}
