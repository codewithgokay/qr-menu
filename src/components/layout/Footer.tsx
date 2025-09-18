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
      className="border-t bg-muted/50 mt-12"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Restaurant Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{restaurant.name}</h3>
            <p className="text-sm text-muted-foreground">
              {restaurant.description}
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">{restaurant.address}</p>
              <p className="text-muted-foreground">{restaurant.phone}</p>
              <p className="text-muted-foreground">{restaurant.email}</p>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Hours</h3>
            <div className="space-y-2 text-sm">
              {Object.entries(restaurant.operatingHours).map(([day, hours]) => (
                <div key={day} className="flex justify-between">
                  <span className="capitalize text-muted-foreground">
                    {day}
                  </span>
                  <span className="text-foreground">
                    {hours.isClosed ? 'Closed' : `${hours.open} - ${hours.close}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* QR Code Placeholder */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">QR Menu</h3>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center">
                <span className="text-xs text-muted-foreground text-center">
                  QR Code
                </span>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Scan to view this menu
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>&copy; 2024 {restaurant.name}. All rights reserved.</p>
          <p className="mt-1">Powered by QR Menu Technology</p>
        </div>
      </div>
    </motion.footer>
  );
}
