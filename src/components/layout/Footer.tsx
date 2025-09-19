'use client';

import { Restaurant } from '@/lib/types';
import { motion } from 'framer-motion';

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Restaurant Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-text-primary font-heading">{restaurant.name}</h3>
            <p className="text-text-secondary">
              {restaurant.description}
            </p>
            <div className="space-y-2 text-sm text-text-secondary">
              <p>{restaurant.address}</p>
              <p>{restaurant.phone}</p>
              <p>{restaurant.email}</p>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-text-primary font-heading">Çalışma Saatleri</h3>
            <div className="space-y-2 text-sm">
              {Object.entries(restaurant.operatingHours).map(([day, hours]) => (
                <div key={day} className="flex justify-between">
                  <span className="capitalize text-text-secondary">
                    {day}
                  </span>
                  <span className="text-text-primary font-medium">
                    {hours.isClosed ? 'Kapalı' : `${hours.open} - ${hours.close}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* QR Code Placeholder */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-text-primary font-heading">QR Menü</h3>
            <div className="flex flex-col items-center space-y-3">
              <div className="w-24 h-24 bg-white rounded-2xl shadow-soft flex items-center justify-center">
                <span className="text-xs text-text-secondary text-center font-medium">
                  QR Kod
                </span>
              </div>
              <p className="text-sm text-text-secondary text-center">
                Bu menüyü görüntülemek için tarayın
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-warm-beige/50 text-center text-sm text-text-secondary">
          <p>&copy; 2024 {restaurant.name}. Tüm hakları saklıdır.</p>
          <p className="mt-1">QR Menü Teknolojisi ile güçlendirilmiştir</p>
        </div>
      </div>
    </motion.footer>
  );
}
