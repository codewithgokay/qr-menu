'use client';

import { Suspense, lazy, ReactNode } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

// Simple lazy loading wrapper
function LazyWrapper({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <Suspense fallback={fallback || <LoadingSpinner />}>
      {children}
    </Suspense>
  );
}

// Lazy load heavy components
export const LazyAdminPanel = lazy(() => 
  import('@/components/admin/AdminPanel').then(module => ({ default: module.AdminPanel }))
);
export const LazyMenuItemForm = lazy(() => 
  import('@/components/admin/MenuItemForm').then(module => ({ default: module.MenuItemForm }))
);
export const LazyCategoryForm = lazy(() => 
  import('@/components/admin/CategoryForm').then(module => ({ default: module.CategoryForm }))
);

// Lazy load heavy UI components
export const LazyDialog = lazy(() => 
  import('@/components/ui/dialog').then(module => ({ default: module.Dialog }))
);
export const LazySheet = lazy(() => 
  import('@/components/ui/sheet').then(module => ({ default: module.Sheet }))
);

// Lazy load utility components
export const LazyVirtualScroll = lazy(() => 
  import('@/components/common/VirtualScroll').then(module => ({ default: module.VirtualScroll }))
);

// Lazy load heavy libraries
export const LazyFramerMotion = lazy(() => 
  import('framer-motion').then(module => ({ default: module.motion.div }))
);

// Preload critical components
export function preloadCriticalComponents() {
  if (typeof window === 'undefined') return;
  
  // Preload components that are likely to be used
  const criticalComponents = [
    () => import('@/components/admin/AdminPanel'),
    () => import('@/components/admin/MenuItemForm'),
    () => import('@/components/admin/CategoryForm'),
  ];
  
  // Preload after a short delay to not block initial load
  setTimeout(() => {
    criticalComponents.forEach(importFunc => {
      importFunc().catch(console.warn);
    });
  }, 2000);
}

// Route-based code splitting
export const LazyMenuPage = lazy(() => import('@/app/menu/page'));
export const LazyAdminPage = lazy(() => import('@/app/admin/page'));
export const LazyAboutPage = lazy(() => import('@/app/about/page'));

// Export the wrapper for custom usage
export { LazyWrapper };
