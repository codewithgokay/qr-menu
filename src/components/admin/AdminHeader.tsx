'use client';

import { logout, redirectToCustomer } from '@/lib/auth';
import { Button } from '@/components/ui/button';

interface AdminHeaderProps {
  onLogout?: () => void;
}

export function AdminHeader({ onLogout }: AdminHeaderProps) {
  const handleLogout = () => {
    logout();
    redirectToCustomer();
    onLogout?.();
  };

  const handleBackToMenu = () => {
    redirectToCustomer();
  };

  return (
    <header className="bg-white shadow-soft border-b border-warm-beige sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex items-center space-x-2 sm:space-x-4 min-w-0">
            <h1 className="text-lg sm:text-2xl font-bold text-text-primary font-heading leading-tight">Admin Paneli</h1>
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
            {/* Logout Button */}
            <Button
              onClick={onLogout}
              variant="outline"
              size="sm"
              className="bg-white/10 hover:bg-white/20 border-white/20 text-white"
            >
              Çıkış Yap
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
