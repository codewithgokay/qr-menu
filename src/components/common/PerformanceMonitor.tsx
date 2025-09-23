'use client';

import { useEffect } from 'react';

export function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime);
        }
        if (entry.entryType === 'first-input') {
          const fidEntry = entry as PerformanceEntry & { processingStart: number };
          console.log('FID:', fidEntry.processingStart - fidEntry.startTime);
        }
        if (entry.entryType === 'layout-shift') {
          console.log('CLS:', (entry as PerformanceEntry & { value: number }).value);
        }
      }
    });

    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });

    // Monitor image loading performance
    const imageObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name.includes('cloudinary')) {
          console.log('Cloudinary image loaded:', entry.name, entry.duration);
        }
      }
    });

    imageObserver.observe({ entryTypes: ['resource'] });

    return () => {
      observer.disconnect();
      imageObserver.disconnect();
    };
  }, []);

  return null;
}
