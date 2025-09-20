'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Restaurant } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Phone, MapPin, Clock, Globe, Instagram, Facebook, Twitter, ChevronDown, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  restaurant: Restaurant;
}

export function Header({ restaurant }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase() as keyof typeof restaurant.operatingHours;


  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`sticky top-0 z-50 w-full border-b border-warm-beige bg-primary-cream/95 backdrop-blur supports-[backdrop-filter]:bg-primary-cream/60 transition-all duration-300 ${
        isScrolled ? 'shadow-lg' : ''
      }`}
    >
      <div className={`px-6 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-8'}`}>
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <h1 className={`font-bold text-text-primary tracking-tight font-heading transition-all duration-300 ${
              isScrolled ? 'text-2xl' : 'text-3xl'
            }`}>
              {restaurant.name}
            </h1>
          </div>
          
          {/* Navigation Menu */}
          <div className="flex items-center space-x-4">
            <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={`transition-all duration-300 text-text-primary hover:text-text-primary hover:bg-warm-beige/50 ${
                    isScrolled ? 'h-12 px-4 bg-sage/10 hover:bg-sage/20' : 'h-10 px-3'
                  }`}
                >
                  <Menu className={`mr-2 ${isScrolled ? 'h-6 w-6' : 'h-5 w-5'}`} />
                  <span className={`font-medium ${isScrolled ? 'text-base' : 'text-sm'} hidden sm:inline`}>
                    Menü
                  </span>
                  <ChevronDown className={`ml-1 ${isScrolled ? 'h-5 w-5' : 'h-4 w-4'}`} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-48 bg-white/95 backdrop-blur-sm border-warm-beige rounded-xl shadow-lg" 
                align="end"
              >
                <DropdownMenuItem 
                  onClick={() => {
                    setIsMenuOpen(false);
                    router.push('/');
                  }}
                  className="cursor-pointer py-3 px-4 text-text-primary hover:bg-warm-beige/50"
                >
                  <span className="mr-3">🏠</span>
                  <span className="font-medium">Ana Sayfa</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => {
                    setIsMenuOpen(false);
                    router.push('/menu');
                  }}
                  className="cursor-pointer py-3 px-4 text-text-primary hover:bg-warm-beige/50"
                >
                  <span className="mr-3">🍽️</span>
                  <span className="font-medium">Menü</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => {
                    setIsMenuOpen(false);
                    router.push('/about');
                  }}
                  className="cursor-pointer py-3 px-4 text-text-primary hover:bg-warm-beige/50"
                >
                  <span className="mr-3">ℹ️</span>
                  <span className="font-medium">Hakkımızda</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            </div>
        </div>

        {/* Contact Info - Collapsible on Mobile */}
        <motion.div 
          initial={false}
          animate={{ 
            height: isOpen && !isScrolled ? "auto" : 0,
            opacity: isScrolled ? 0 : 1
          }}
          className="overflow-hidden"
          transition={{ duration: 0.3 }}
        >
          <div className="mt-6 pt-6 border-t border-warm-beige/30 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-3 min-w-0">
                <MapPin className="h-4 w-4 text-text-secondary flex-shrink-0" />
                <span className="text-text-secondary truncate">{restaurant.address}</span>
              </div>
              <div className="flex items-center space-x-3 min-w-0">
                <Phone className="h-4 w-4 text-text-secondary flex-shrink-0" />
                <a 
                  href={`tel:${restaurant.phone}`}
                  className="text-text-secondary hover:text-text-primary transition-colors truncate"
                >
                  {restaurant.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3 min-w-0 sm:col-span-2 lg:col-span-1">
                <Clock className="h-4 w-4 text-text-secondary flex-shrink-0" />
                <span className="text-text-secondary truncate">
                  {restaurant.operatingHours[currentDay]?.isClosed 
                    ? "Bugün Kapalı" 
                    : `${restaurant.operatingHours[currentDay]?.open} - ${restaurant.operatingHours[currentDay]?.close}`
                  }
                </span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center space-x-4 pt-2">
              {restaurant.socialMedia?.instagram && (
                <a 
                  href={`https://instagram.com/${restaurant.socialMedia.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-sage transition-colors p-2 rounded-full hover:bg-sage/10"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {restaurant.socialMedia?.facebook && (
                <a 
                  href={`https://facebook.com/${restaurant.socialMedia.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-sage transition-colors p-2 rounded-full hover:bg-sage/10"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {restaurant.socialMedia?.twitter && (
                <a 
                  href={`https://twitter.com/${restaurant.socialMedia.twitter.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-sage transition-colors p-2 rounded-full hover:bg-sage/10"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              )}
              {restaurant.website && (
                <a 
                  href={restaurant.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-sage transition-colors p-2 rounded-full hover:bg-sage/10"
                >
                  <Globe className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </motion.div>

        {/* Toggle Button for Mobile */}
        <motion.div
          animate={{ 
            opacity: isScrolled ? 0 : 1,
            height: isScrolled ? 0 : 'auto'
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden mt-4 w-full h-10 text-sm text-text-secondary hover:text-text-primary hover:bg-warm-beige/50"
          >
            <ChevronDown className={`h-4 w-4 mr-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            {isOpen ? "Detayları Gizle" : "Detayları Göster"}
          </Button>
        </motion.div>
      </div>
    </motion.header>
  );
}
