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
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex items-center space-x-2 sm:space-x-4 min-w-0">
            <h1 className="text-lg sm:text-2xl font-bold text-text-primary font-heading truncate">Admin Paneli</h1>
            <span className="text-text-secondary text-xs sm:text-sm hidden sm:inline">Dükkan</span>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button
              onClick={handleBackToMenu}
              variant="outline"
              size="sm"
              className="bg-soft-gray border-warm-beige text-text-primary hover:bg-warm-beige hover:text-text-primary text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2"
            >
              <span className="hidden sm:inline">Menüyü Görüntüle</span>
              <span className="sm:hidden">Menü</span>
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="bg-red-50 border-red-200 text-red-600 hover:bg-red-100 hover:text-red-700 text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2"
            >
              <span className="hidden sm:inline">Çıkış Yap</span>
              <span className="sm:hidden">Çıkış</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
