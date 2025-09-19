'use client';

import { logout, redirectToCustomer } from '@/lib/auth';
import { Button } from '@/components/ui/button';

export function AdminHeader() {
  const handleLogout = () => {
    logout();
    redirectToCustomer();
  };

  const handleBackToMenu = () => {
    redirectToCustomer();
  };

  return (
    <header className="bg-white shadow-soft border-b border-warm-beige sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-text-primary font-heading">Admin Paneli</h1>
            <span className="text-text-secondary text-sm">Bella Vista Restoran</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              onClick={handleBackToMenu}
              variant="outline"
              className="bg-soft-gray border-warm-beige text-text-primary hover:bg-warm-beige hover:text-text-primary"
            >
              Menüyü Görüntüle
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="bg-red-50 border-red-200 text-red-600 hover:bg-red-100 hover:text-red-700"
            >
              Çıkış Yap
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
