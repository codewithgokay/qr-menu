'use client';

import { useState } from 'react';
import { MenuItem as MenuItemType } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Heart, Clock, Flame, Star, Leaf, Wheat, Milk, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { ImageOptimized } from '@/components/common/ImageOptimized';
import { useMenu } from '@/lib/context/MenuContext';

interface MenuItemProps {
  item: MenuItemType;
  index: number;
}

export function MenuItem({ item, index }: MenuItemProps) {
  const { toggleFavorite, userPreferences } = useMenu();
  const isFavorite = userPreferences.favorites.includes(item.id);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
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

  const dietaryInfo = [
    item.isVegetarian && 'vegetarian',
    item.isVegan && 'vegan',
    item.isGlutenFree && 'gluten-free',
    item.isDairyFree && 'dairy-free',
    item.isSpicy && 'spicy',
  ].filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="w-full"
    >
      <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
        <div className="relative">
          {/* Image */}
          <div className="relative h-48 w-full overflow-hidden group-hover:scale-105 transition-transform duration-300">
            <ImageOptimized
              src={item.image}
              alt={item.name}
              width={400}
              height={300}
              className="w-full h-full"
              fallbackText="No Image"
            />
            
            {/* Popular Badge */}
            {item.isPopular && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 left-2"
              >
                <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">
                  <Star className="h-3 w-3 mr-1" />
                  Popular
                </Badge>
              </motion.div>
            )}

            {/* Favorite Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleFavorite(item.id)}
              className="absolute top-2 right-2 h-8 w-8 p-0 bg-background/80 hover:bg-background"
            >
              <Heart 
                className={`h-4 w-4 transition-colors ${
                  isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
                }`} 
              />
            </Button>
          </div>

          <CardContent className="p-4">
            {/* Title and Price */}
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg leading-tight">{item.name}</h3>
              <span className="text-lg font-bold text-primary ml-2">
                {formatPrice(item.price)}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {item.description}
            </p>

            {/* Dietary Info */}
            {dietaryInfo.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {dietaryInfo.map((info) => (
                  <Badge key={info} variant="secondary" className="text-xs">
                    {getDietaryIcon(info as string)}
                    <span className="ml-1 capitalize">{info}</span>
                  </Badge>
                ))}
              </div>
            )}

            {/* Additional Info */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center space-x-3">
                {item.prepTime && (
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {item.prepTime}min
                  </div>
                )}
                {item.calories && (
                  <div className="flex items-center">
                    <Flame className="h-3 w-3 mr-1" />
                    {item.calories}cal
                  </div>
                )}
              </div>
            </div>

            {/* View Details Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full mt-3"
                  size="sm"
                >
                  View Details
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle className="text-xl">{item.name}</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {/* Large Image */}
                  <div className="relative h-64 w-full overflow-hidden rounded-lg">
                    <ImageOptimized
                      src={item.image}
                      alt={item.name}
                      width={600}
                      height={400}
                      className="w-full h-full"
                      fallbackText="No Image"
                    />
                  </div>

                  {/* Price */}
                  <div className="text-2xl font-bold text-primary">
                    {formatPrice(item.price)}
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground">
                    {item.description}
                  </p>

                  {/* Dietary Information */}
                  {dietaryInfo.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Dietary Information</h4>
                      <div className="flex flex-wrap gap-2">
                        {dietaryInfo.map((info) => (
                          <Badge key={info} variant="secondary">
                            {getDietaryIcon(info as string)}
                            <span className="ml-1 capitalize">{info}</span>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Allergens */}
                  {item.allergens && item.allergens.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Allergens</h4>
                      <div className="flex flex-wrap gap-2">
                        {item.allergens.map((allergen) => (
                          <Badge key={allergen} variant="destructive">
                            {allergen}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Additional Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {item.prepTime && (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Prep: {item.prepTime}min</span>
                      </div>
                    )}
                    {item.calories && (
                      <div className="flex items-center">
                        <Flame className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{item.calories} calories</span>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
}
