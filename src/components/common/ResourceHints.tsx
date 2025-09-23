'use client';

import { useEffect } from 'react';
import { cloudinaryPresets } from '@/lib/cloudinary';

interface ResourceHintsProps {
  menuItems?: Array<{ imagePublicId?: string; image?: string }>;
  categories?: Array<{ icon?: string }>;
  criticalImages?: string[];
}

export function ResourceHints({ 
  menuItems = [], 
  categories = [], 
  criticalImages = [] 
}: ResourceHintsProps) {
  useEffect(() => {
    // Preload critical resources
    preloadCriticalResources();
    
    // Preload menu images
    if (menuItems.length > 0) {
      preloadMenuImages(menuItems);
    }
    
    // Preload category icons
    if (categories.length > 0) {
      preloadCategoryIcons(categories);
    }
    
    // Preload additional critical images
    if (criticalImages.length > 0) {
      preloadImages(criticalImages);
    }
  }, [menuItems, categories, criticalImages]);

  return null; // This component doesn't render anything
}

// Preload critical resources
function preloadCriticalResources() {
  // Preload critical CSS
  preloadResource('/globals.css', 'style');
  
  // Preload critical fonts
  preloadResource('/fonts/inter.woff2', 'font');
  
  // Preload critical JavaScript
  preloadResource('/_next/static/chunks/webpack.js', 'script');
  preloadResource('/_next/static/chunks/main.js', 'script');
  
  // Preload API endpoints
  preloadResource('/api/menu-items', 'fetch');
  preloadResource('/api/categories', 'fetch');
}

// Preload menu images with different sizes
function preloadMenuImages(menuItems: Array<{ imagePublicId?: string; image?: string }>) {
  // Preload first 6 images (above the fold)
  const priorityItems = menuItems.slice(0, 6);
  
  priorityItems.forEach((item, index) => {
    if (item.imagePublicId) {
      // Preload thumbnail
      const thumbnailUrl = cloudinaryPresets.thumbnail(item.imagePublicId, 96, 96);
      preloadResource(thumbnailUrl, 'image');
      
      // Preload hero image for modals
      const heroUrl = cloudinaryPresets.hero(item.imagePublicId, 600, 400);
      preloadResource(heroUrl, 'image');
      
      // Preload retina version
      const retinaUrl = cloudinaryPresets.retina(item.imagePublicId, 96, 96);
      preloadResource(retinaUrl, 'image');
    } else if (item.image) {
      preloadResource(item.image, 'image');
    }
  });
  
  // Preload remaining images with lower priority
  const remainingItems = menuItems.slice(6);
  remainingItems.forEach((item, itemIndex) => {
    if (item.imagePublicId) {
      const thumbnailUrl = cloudinaryPresets.thumbnail(item.imagePublicId, 96, 96);
      // Use lower priority for remaining images
      setTimeout(() => {
        preloadResource(thumbnailUrl, 'image');
      }, itemIndex * 100); // Stagger the preloading
    } else if (item.image) {
      setTimeout(() => {
        preloadResource(item.image!, 'image');
      }, itemIndex * 100);
    }
  });
}

// Preload category icons
function preloadCategoryIcons(categories: Array<{ icon?: string }>) {
  categories.forEach((category) => {
    if (category.icon) {
      // Most category icons are emoji or simple text, no need to preload
      // But if they were images, we would preload them here
    }
  });
}

  // Preload additional images
function preloadImages(images: string[]) {
  images.forEach((imageUrl, index) => {
    setTimeout(() => {
      preloadResource(imageUrl, 'image');
    }, index * 50); // Stagger the preloading
  });
}

// Generic resource preloading function
function preloadResource(href: string, as: string, crossorigin?: string) {
  // Check if resource is already preloaded
  const existingLink = document.querySelector(`link[href="${href}"]`);
  if (existingLink) {
    return;
  }

  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  
  if (crossorigin) {
    link.crossOrigin = crossorigin;
  }
  
  // Add to head
  document.head.appendChild(link);
}

// Preconnect to external domains
export function preconnectToDomains() {
  const domains = [
    'https://res.cloudinary.com',
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
  ];
  
  domains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
}

// DNS prefetch for external domains
export function dnsPrefetchDomains() {
  const domains = [
    'https://res.cloudinary.com',
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
  ];
  
  domains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = domain;
    document.head.appendChild(link);
  });
}

// Preload critical routes
export function preloadCriticalRoutes() {
  const routes = [
    '/menu',
    '/admin',
    '/about'
  ];
  
  routes.forEach(route => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = route;
    document.head.appendChild(link);
  });
}

// Initialize all resource hints
export function initializeResourceHints() {
  if (typeof window === 'undefined') return;
  
  // DNS prefetch first
  dnsPrefetchDomains();
  
  // Then preconnect
  preconnectToDomains();
  
  // Preload critical routes
  preloadCriticalRoutes();
}
