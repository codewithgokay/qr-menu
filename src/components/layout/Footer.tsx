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
      className="border-t border-republic-gold bg-republic-charcoal mt-16"
    >
      <div className="px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Restaurant Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white font-heading">{restaurant.name}</h3>
            <p className="text-gray-300">
              {restaurant.description}
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <p>{restaurant.address}</p>
            </div>

            {/* Social Media Links */}
            {restaurant.socialMedia?.instagram && (
              <div className="pt-2">
                <a
                  href={`https://instagram.com/${restaurant.socialMedia.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors p-3 rounded-lg hover:bg-white/10 group"
                  aria-label="Instagram'da takip edin"
                >
                  <Instagram className="h-7 w-7 flex-shrink-0 text-white group-hover:text-republic-gold transition-colors" />
                  <span className="text-sm font-medium group-hover:text-white transition-colors">
                    {restaurant.socialMedia.instagram}
                  </span>
                </a>
              </div>
            )}
          </div>

          {/* Operating Hours */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white font-heading">Çalışma Saatleri</h3>
            <div className="space-y-2 text-sm">
              {Object.entries(restaurant.operatingHours).map(([day, hours]) => (
                <div key={day} className="flex justify-between">
                  <span className="text-gray-400">
                    {day}
                  </span>
                  <span className="text-white font-medium">
                    {`${hours.open} - ${hours.close}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-republic-gold/30 text-center text-sm text-gray-500">
          <p>&copy; 2025 {restaurant.name}. Tüm hakları saklıdır.</p>
          <p className="mt-1">QR Menü Teknolojisi ile güçlendirilmiştir</p>
        </div>
      </div>
    </motion.footer>
  );
}
