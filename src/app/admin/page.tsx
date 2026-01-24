'use client';

import { AdminPanel } from '@/components/admin/AdminPanel';

export default function AdminPage() {
  // Authentication is now handled by Middleware and HTTP-only cookies
  // If we reached this page, we are authenticated.

  const handleMenuUpdate = () => {
    // Data managed by database + SWR/ISR revalidation
    // Could manually trigger revalidation here if needed
  };

  const handleCategoryUpdate = () => {
    // handled by db
  };

  return (
    <AdminPanel
      onMenuUpdate={handleMenuUpdate}
      onCategoryUpdate={handleCategoryUpdate}
    />
  );
}
