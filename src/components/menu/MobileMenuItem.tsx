'use client';

import { useState } from 'react';
import { MenuItem as MenuItemType } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Heart, Clock, Flame, Star, Leaf, Wheat, Milk, Zap, MoreVertical, Eye, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { ImageOptimized } from '@/components/common/ImageOptimized';
import { useMenu } from '@/lib/context/MenuContext';

interface MobileMenuItemProps {
  item: MenuItemType;
  index: number;
}

export function MobileMenuItem({ item, index }: MobileMenuItemProps) {
  const { toggleFavorite, userPreferences } = useMenu();
  const isFavorite = userPreferences.favorites.includes(item.id);
  const [showDetails, setShowDetails] = useState(false);

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
  ].filter(Boolean) as string[];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.name,
          text: item.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`${item.name} - ${item.description} - ${formatPrice(item.price)}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="w-full"
    >
      <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
        <div className="flex">
          {/* Image - Mobile optimized */}
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
            <ImageOptimized
              src={item.image}
              alt={item.name}
              width={128}
              height={128}
              className="w-full h-full object-cover"
              fallbackText="No Image"
            />
            
            {/* Popular Badge */}
            {item.isPopular && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-1 left-1"
              >
                <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-1 py-0">
                  <Star className="h-2 w-2 mr-0.5" />
                  Hot
                </Badge>
              </motion.div>
            )}
          </div>

          {/* Content */}
          <CardContent className="flex-1 p-3 sm:p-4 flex flex-col justify-between">
            <div className="space-y-2">
              {/* Title and Price */}
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-sm sm:text-base leading-tight pr-2 line-clamp-2">
                  {item.name}
                </h3>
                <span className="text-sm sm:text-base font-bold text-primary flex-shrink-0">
                  {formatPrice(item.price)}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                {item.description}
              </p>

              {/* Dietary Info - Compact */}
              {dietaryInfo.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {dietaryInfo.slice(0, 3).map((info, idx) => (
                    <Badge key={`${info}-${idx}`} variant="secondary" className="text-xs px-1 py-0 h-5">
                      {getDietaryIcon(info)}
                      <span className="ml-1 text-xs">{info}</span>
                    </Badge>
                  ))}
                  {dietaryInfo.length > 3 && (
                    <Badge variant="secondary" className="text-xs px-1 py-0 h-5">
                      +{dietaryInfo.length - 3}
                    </Badge>
                  )}
                </div>
              )}

              {/* Additional Info - Compact */}
              <div className="flex items-center space-x-3 text-xs text-muted-foreground">
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

            {/* Actions - Mobile optimized */}
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center space-x-2">
                {/* Favorite Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleFavorite(item.id)}
                  className="h-8 w-8 p-0"
                >
                  <Heart 
                    className={`h-4 w-4 transition-colors ${
                      isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
                    }`} 
                  />
                </Button>

                {/* View Details Button */}
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowDetails(true)}
                  className="h-8 text-xs"
                >
                  <Eye className="h-3 w-3 mr-1" />
                  View
                </Button>
              </div>

              {/* Dropdown Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => setShowDetails(true)}>
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleShare}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Item
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => toggleFavorite(item.id)}>
                    <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                    {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Details Sheet */}
      <Sheet open={showDetails} onOpenChange={setShowDetails}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="text-xl">{item.name}</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            {/* Large Image */}
            <div className="relative h-48 w-full overflow-hidden rounded-lg">
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
                  {dietaryInfo.map((info, index) => (
                    <Badge key={`${info}-${index}`} variant="secondary">
                      {getDietaryIcon(info)}
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

            {/* Action Buttons */}
            <div className="flex space-x-2 pt-4">
              <Button 
                onClick={() => toggleFavorite(item.id)}
                variant={isFavorite ? "default" : "outline"}
                className="flex-1"
              >
                <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-white' : ''}`} />
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </Button>
              <Button onClick={handleShare} variant="outline" className="flex-1">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </motion.div>
  );
}
