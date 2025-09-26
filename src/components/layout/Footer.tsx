'use client';

import { Restaurant } from '@/lib/types';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

interface FooterProps {
  restaurant: Restaurant;
}

export function Footer({ restaurant }: FooterProps) {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="border-t border-warm-beige bg-gradient-to-b from-soft-gray to-warm-beige/30 mt-16"
    >
      <div className="px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Restaurant Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-text-primary font-heading">{restaurant.name}</h3>
            <p className="text-text-secondary">
              {restaurant.description}
            </p>
            <div className="space-y-2 text-sm text-text-secondary">
              <p>{restaurant.address}</p>
            </div>
            
            {/* Social Media Links */}
            {restaurant.socialMedia?.instagram && (
              <div className="pt-2">
                <a 
                  href={`https://instagram.com/${restaurant.socialMedia.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-text-secondary hover:text-sage transition-colors p-3 rounded-lg hover:bg-sage/10 group"
                  aria-label="Instagram'da takip edin"
                >
                  <Instagram className="h-7 w-7 flex-shrink-0" />
                  <span className="text-sm font-medium group-hover:text-sage transition-colors">
                    {restaurant.socialMedia.instagram}
                  </span>
                </a>
              </div>
            )}
          </div>

          {/* Operating Hours */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-text-primary font-heading">Çalışma Saatleri</h3>
            <div className="space-y-2 text-sm">
              {Object.entries(restaurant.operatingHours).map(([day, hours]) => (
                <div key={day} className="flex justify-between">
                  <span className="text-text-secondary">
                    {day}
                  </span>
                  <span className="text-text-primary font-medium">
                    {`${hours.open} - ${hours.close}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-warm-beige/50 text-center text-sm text-text-secondary">
          <p>&copy; 2025 {restaurant.name}. Tüm hakları saklıdır.</p>
          <p className="mt-1">QR Menü Teknolojisi ile güçlendirilmiştir</p>
        </div>
      </div>
    </motion.footer>
  );
}
