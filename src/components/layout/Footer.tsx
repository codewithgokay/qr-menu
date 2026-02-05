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
      className="border-t border-gray-200 bg-republic-cream mt-16"
    >
      <div className="px-6 py-12">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-10">

          {/* Brand Header */}
          <div className="flex flex-col items-center space-y-2">
            <h2 className="text-3xl font-bold text-republic-charcoal font-heading tracking-tight">{restaurant.name}</h2>
            <span className="text-republic-green font-medium tracking-[0.3em] uppercase text-xs">SOCIAL HOUSE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-2xl">
            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-republic-charcoal font-heading">İletişim</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p className="font-medium">{restaurant.address}</p>
                {restaurant.phone && <p>{restaurant.phone}</p>}
              </div>

              {/* Social Media Links */}
              {restaurant.socialMedia?.instagram && (
                <div className="pt-2 flex justify-center">
                  <a
                    href={`https://instagram.com/${restaurant.socialMedia.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-600 hover:text-republic-green transition-colors p-2 rounded-lg hover:bg-gray-100 group"
                    aria-label="Instagram'da takip edin"
                  >
                    <Instagram className="h-6 w-6 text-republic-charcoal group-hover:text-republic-green transition-colors" />
                    <span className="text-sm font-medium">
                      {restaurant.socialMedia.instagram}
                    </span>
                  </a>
                </div>
              )}
            </div>

            {/* Operating Hours */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-republic-charcoal font-heading">Çalışma Saatleri</h3>
              <div className="space-y-2 text-sm">
                {Object.entries(restaurant.operatingHours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between border-b border-gray-100 pb-1 last:border-0 last:pb-0">
                    <span className="text-gray-500 font-medium">
                      {day}
                    </span>
                    <span className="text-republic-charcoal font-semibold">
                      {`${hours.open} - ${hours.close}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full pt-8 border-t border-gray-200 text-center text-xs text-gray-400">
            <p>&copy; 2025 {restaurant.name}. Tüm hakları saklıdır.</p>
            <p className="mt-1">QR Menü Teknolojisi ile güçlendirilmiştir</p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
