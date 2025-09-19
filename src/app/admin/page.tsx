'use client';

import { useEffect, useState } from 'react';
import { isAuthenticated } from '@/lib/auth';
import { LoginForm } from '@/components/admin/LoginForm';
import { AdminPanel } from '@/components/admin/AdminPanel';
import { MenuItem, MenuCategory } from '@/lib/types';

export default function AdminPage() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const authenticated = isAuthenticated();
      setIsAuth(authenticated);
      setIsLoading(false);
    };

    checkAuth();

    // Listen for storage changes (logout from other tabs)
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLoginSuccess = () => {
    setIsAuth(true);
  };

  const handleMenuUpdate = (_items: MenuItem[]) => {
    // This will be handled by the context in the main app
    // The data is now managed by the database
  };

  const handleCategoryUpdate = (_categories: MenuCategory[]) => {
    // The data is now managed by the database
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary-cream flex items-center justify-center">
        <div className="text-text-primary text-xl font-heading">Yükleniyor...</div>
      </div>
    );
  }

  if (!isAuth) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <AdminPanel
      onMenuUpdate={handleMenuUpdate}
      onCategoryUpdate={handleCategoryUpdate}
    />
  );
}
