'use client';

import { ComponentType, Suspense, lazy, ReactNode } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

// Higher-order component for lazy loading
export function withLazyLoading<T extends object>(
  importFunc: () => Promise<{ default: ComponentType<T> }>,
  fallback?: ReactNode
) {
  const LazyComponent = lazy(importFunc);
  
  return function LazyWrapper(props: T) {
    return (
      <Suspense fallback={fallback || <LoadingSpinner />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

// Lazy load heavy components
export const LazyAdminPanel = withLazyLoading(
  () => import('@/components/admin/AdminPanel'),
  <div className="flex items-center justify-center p-8">
    <LoadingSpinner />
  </div>
);

export const LazyMenuItemForm = withLazyLoading(
  () => import('@/components/admin/MenuItemForm'),
  <div className="flex items-center justify-center p-8">
    <LoadingSpinner />
  </div>
);

export const LazyCategoryForm = withLazyLoading(
  () => import('@/components/admin/CategoryForm'),
  <div className="flex items-center justify-center p-8">
    <LoadingSpinner />
  </div>
);

// Lazy load heavy UI components
export const LazyDialog = withLazyLoading(
  () => import('@/components/ui/dialog'),
  <div className="flex items-center justify-center p-4">
    <LoadingSpinner />
  </div>
);

export const LazySheet = withLazyLoading(
  () => import('@/components/ui/sheet'),
  <div className="flex items-center justify-center p-4">
    <LoadingSpinner />
  </div>
);

// Lazy load utility components
export const LazyVirtualScroll = withLazyLoading(
  () => import('@/components/common/VirtualScroll'),
  <div className="flex items-center justify-center p-4">
    <LoadingSpinner />
  </div>
);

// Lazy load heavy libraries
export const LazyFramerMotion = withLazyLoading(
  () => import('framer-motion').then(module => ({ default: module.motion.div })),
  <div className="animate-pulse bg-gray-200 rounded" />
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
export const LazyMenuPage = withLazyLoading(
  () => import('@/app/menu/page'),
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSpinner />
  </div>
);

export const LazyAdminPage = withLazyLoading(
  () => import('@/app/admin/page'),
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSpinner />
  </div>
);

export const LazyAboutPage = withLazyLoading(
  () => import('@/app/about/page'),
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSpinner />
  </div>
);
