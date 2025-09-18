'use client';

import { useState } from 'react';
import { Restaurant } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, MapPin, Clock, Globe, Instagram, Facebook, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  restaurant: Restaurant;
}

export function Header({ restaurant }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const currentHour = new Date().getHours();
  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase() as keyof typeof restaurant.operatingHours;
  const isOpenNow = restaurant.operatingHours[currentDay] && 
    !restaurant.operatingHours[currentDay].isClosed &&
    currentHour >= parseInt(restaurant.operatingHours[currentDay].open.split(':')[0]) &&
    currentHour < parseInt(restaurant.operatingHours[currentDay].close.split(':')[0]);

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Restaurant Info */}
          <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
            <div className="flex flex-col min-w-0 flex-1">
              <h1 className="text-lg sm:text-2xl font-bold text-foreground truncate">
                {restaurant.name}
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground truncate">
                {restaurant.description}
              </p>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <Badge 
              variant={isOpenNow ? "default" : "secondary"}
              className={`text-xs px-2 py-1 ${isOpenNow ? "bg-green-500 hover:bg-green-600" : ""}`}
            >
              {isOpenNow ? "Open" : "Closed"}
            </Badge>
          </div>
        </div>

        {/* Contact Info - Collapsible on Mobile */}
        <motion.div 
          initial={false}
          animate={{ height: isOpen ? "auto" : 0 }}
          className="overflow-hidden"
        >
          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm">
              <div className="flex items-center space-x-2 min-w-0">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground truncate">{restaurant.address}</span>
              </div>
              <div className="flex items-center space-x-2 min-w-0">
                <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                <a 
                  href={`tel:${restaurant.phone}`}
                  className="text-muted-foreground hover:text-foreground transition-colors truncate"
                >
                  {restaurant.phone}
                </a>
              </div>
              <div className="flex items-center space-x-2 min-w-0 sm:col-span-2 lg:col-span-1">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground truncate">
                  {restaurant.operatingHours[currentDay]?.isClosed 
                    ? "Closed Today" 
                    : `${restaurant.operatingHours[currentDay]?.open} - ${restaurant.operatingHours[currentDay]?.close}`
                  }
                </span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center space-x-3 sm:space-x-4 pt-2">
              {restaurant.socialMedia?.instagram && (
                <a 
                  href={`https://instagram.com/${restaurant.socialMedia.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Instagram className="h-3 w-3 sm:h-4 sm:w-4" />
                </a>
              )}
              {restaurant.socialMedia?.facebook && (
                <a 
                  href={`https://facebook.com/${restaurant.socialMedia.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Facebook className="h-3 w-3 sm:h-4 sm:w-4" />
                </a>
              )}
              {restaurant.socialMedia?.twitter && (
                <a 
                  href={`https://twitter.com/${restaurant.socialMedia.twitter.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Twitter className="h-3 w-3 sm:h-4 sm:w-4" />
                </a>
              )}
              {restaurant.website && (
                <a 
                  href={restaurant.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Globe className="h-3 w-3 sm:h-4 sm:w-4" />
                </a>
              )}
            </div>
          </div>
        </motion.div>

        {/* Toggle Button for Mobile */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden mt-2 w-full h-8 text-xs"
        >
          {isOpen ? "Hide Details" : "Show Details"}
        </Button>
      </div>
    </motion.header>
  );
}
