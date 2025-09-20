'use client';

import { useEffect, useState } from 'react';
import { isAuthenticated, isAdminAccessRequested } from '@/lib/auth';
import { LoginForm } from '@/components/admin/LoginForm';
import { AdminPanel } from '@/components/admin/AdminPanel';

export default function AdminPage() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasAdminAccess, setHasAdminAccess] = useState(false);

  useEffect(() => {
    // Check if admin access is requested via secure URL
    const checkAdminAccess = () => {
      const hasAccess = isAdminAccessRequested();
      setHasAdminAccess(hasAccess);
      
      if (!hasAccess) {
        // Redirect to admin access page if no secure access
        window.location.href = '/admin-access';
        return;
      }
    };

    // Check authentication status
    const checkAuth = () => {
      const authenticated = isAuthenticated();
      setIsAuth(authenticated);
      setIsLoading(false);
    };

    checkAdminAccess();
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

  const handleMenuUpdate = () => {
    // This will be handled by the context in the main app
    // The data is now managed by the database
  };

  const handleCategoryUpdate = () => {
    // The data is now managed by the database
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary-cream flex items-center justify-center">
        <div className="text-text-primary text-xl font-heading">Yükleniyor...</div>
      </div>
    );
  }

  if (!hasAdminAccess) {
    return (
      <div className="min-h-screen bg-primary-cream flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl font-heading mb-4">
            Yetkisiz Erişim
          </div>
          <p className="text-text-secondary mb-4">
            Admin paneline erişim için güvenli URL gereklidir.
          </p>
          <button
            onClick={() => window.location.href = '/admin-access'}
            className="bg-sage hover:bg-sage/90 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            Admin Erişim Sayfası
          </button>
        </div>
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
