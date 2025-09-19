'use client';

import { redirectToAdmin } from '@/lib/auth';
import { Button } from '@/components/ui/button';

export function AdminButton() {
  const handleAdminClick = () => {
    redirectToAdmin();
  };

  return (
    <Button
      onClick={handleAdminClick}
      className="fixed bottom-6 right-6 bg-sage hover:bg-sage/90 text-white rounded-full w-14 h-14 shadow-soft hover:shadow-elevated transition-all duration-300 z-50"
      title="Admin Paneli"
    >
      🔐
    </Button>
  );
}
