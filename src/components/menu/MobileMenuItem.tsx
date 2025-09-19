'use client';

import { useState } from 'react';
import { MenuItem as MenuItemType } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Clock, Flame, Leaf, Wheat, Milk, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { ImageOptimized } from '@/components/common/ImageOptimized';

interface MobileMenuItemProps {
  item: MenuItemType;
  index: number;
}

export function MobileMenuItem({ item, index }: MobileMenuItemProps) {
  const [showDetails, setShowDetails] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(price);
  };

  const getDietaryIcon = (type: string) => {
    switch (type) {
      case 'vegetarian': return <Leaf className="h-3 w-3" />;
      case 'vegan': return <Leaf className="h-3 w-3" />;
      case 'gluten-free': return <Wheat className="h-3 w-3" />;
      case 'dairy-free': return <Milk className="h-3 w-3" />;
      case 'spicy': return <Zap className="h-3 w-3" />;
      default: return null;
    }
  };

  const translateDietaryInfo = (type: string) => {
    switch (type) {
      case 'vegetarian': return 'vejetaryen';
      case 'vegan': return 'vegan';
      case 'gluten-free': return 'glütensiz';
      case 'dairy-free': return 'sütsüz';
      case 'spicy': return 'acılı';
      default: return type;
    }
  };

  const translateAllergen = (allergen: string) => {
    switch (allergen) {
      case 'dairy': return 'süt ürünleri';
      case 'eggs': return 'yumurta';
      case 'gluten': return 'glüten';
      case 'nuts': return 'fındık';
      case 'seafood': return 'deniz ürünleri';
      case 'soy': return 'soya';
      default: return allergen;
    }
  };

  const dietaryInfo = [
    item.isVegetarian && 'vegetarian',
    item.isVegan && 'vegan',
    item.isGlutenFree && 'gluten-free',
    item.isDairyFree && 'dairy-free',
    item.isSpicy && 'spicy',
  ].filter(Boolean) as string[];


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
              className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
              fallbackText="No Image"
            />
          </div>
          
          {/* Content Section */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg text-text-primary truncate">
                {item.name}
              </h3>
              <span className="font-bold text-xl text-navy-slate ml-4">
                {formatPrice(item.price)}
              </span>
            </div>
            
            <p className="text-text-secondary text-sm leading-relaxed mb-3 line-clamp-2">
              {item.description}
            </p>
            
            {/* Dietary Badges */}
            <div className="flex flex-wrap gap-2">
              {dietaryInfo.slice(0, 2).map((info, idx) => (
                <Badge 
                  key={`${info}-${idx}`} 
                  variant="outline" 
                  className="text-sage bg-sage/10 text-xs px-2 py-1"
                >
                  {getDietaryIcon(info)}
                  <span className="ml-1">{translateDietaryInfo(info)}</span>
                </Badge>
              ))}
              {dietaryInfo.length > 2 && (
                <Badge variant="outline" className="text-sage bg-sage/10 text-xs px-2 py-1">
                  +{dietaryInfo.length - 2}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Details Sheet */}
      <Sheet open={showDetails} onOpenChange={setShowDetails}>
        <SheetContent className="w-full sm:max-w-lg bg-primary-cream">
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
                className="w-full h-full object-cover"
                fallbackText="No Image"
              />
            </div>

            {/* Price */}
            <div className="text-3xl font-bold text-navy-slate">
              {formatPrice(item.price)}
            </div>

            {/* Description */}
            <p className="text-text-secondary text-lg leading-relaxed">
              {item.description}
            </p>

            {/* Dietary Information */}
            {dietaryInfo.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3 text-text-primary">Beslenme Bilgileri</h4>
                <div className="flex flex-wrap gap-2">
                  {dietaryInfo.map((info, index) => (
                    <Badge 
                      key={`${info}-${index}`} 
                      variant="outline" 
                      className="text-sage bg-sage/10"
                    >
                      {getDietaryIcon(info)}
                      <span className="ml-1">{translateDietaryInfo(info)}</span>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Allergens */}
            {item.allergens && item.allergens.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3 text-text-primary">Alerjenler</h4>
                <div className="flex flex-wrap gap-2">
                  {item.allergens.map((allergen) => (
                    <Badge key={allergen} variant="destructive" className="bg-red-100 text-red-800">
                      {translateAllergen(allergen)}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Details */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              {item.prepTime && (
                <div className="flex items-center text-text-secondary">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Hazırlık: {item.prepTime}dk</span>
                </div>
              )}
              {item.calories && (
                <div className="flex items-center text-text-secondary">
                  <Flame className="h-4 w-4 mr-2" />
                  <span>{item.calories} kalori</span>
                </div>
              )}
            </div>

          </div>
        </SheetContent>
      </Sheet>
    </motion.div>
  );
}
