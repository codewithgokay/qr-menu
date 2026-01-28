'use client';

import { useState, useEffect } from 'react';
import { Restaurant } from '@/lib/types';
import { motion } from 'framer-motion';
import { ImageOptimized } from '@/components/common/ImageOptimized';
import Link from 'next/link';

interface HeaderProps {
  restaurant: Restaurant;
}

export function Header({ restaurant }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);


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
      className={`sticky top-0 z-50 w-full border-b border-republic-gold/50 bg-republic-green/95 backdrop-blur supports-[backdrop-filter]:bg-republic-green/90 transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''
        }`}
    >
      <div className="px-6 py-4">
        <div className="flex justify-start items-center">
          {/* Logo & Brand - Clickable */}
          <Link href="/" className="flex items-center space-x-4 group">
            <div className="relative flex-shrink-0 w-14 h-14 transition-all duration-300">
              <ImageOptimized
                src="https://res.cloudinary.com/dmudabrcn/image/upload/v1769272325/543799471_17989578092840121_1390771300469241938_n_dpnmkw.jpg"
                alt="Republic Logo"
                width={56}
                height={56}
                className="w-full h-full object-contain rounded-full border-2 border-republic-gold shadow-lg group-hover:scale-105 transition-transform"
                fallbackText="RP"
                priority={true}
                lazy={false}
              />
            </div>

            {/* Brand Name & Subtitle - Stacked for Authority */}
            <div className="flex flex-col justify-center">
              <h1 className="font-bold text-republic-gold tracking-tight font-heading leading-none text-2xl transition-all duration-300 group-hover:text-white">
                {restaurant.name}
              </h1>
              <span className="text-republic-gold/90 font-medium tracking-[0.2em] uppercase text-xs transition-all duration-300">
                Social House
              </span>
            </div>
          </Link>
        </div>

      </div>
    </motion.header>
  );
}
