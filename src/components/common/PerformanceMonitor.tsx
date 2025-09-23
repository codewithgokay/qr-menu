'use client';

import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  fcp?: number; // First Contentful Paint
  ttfb?: number; // Time to First Byte
  fmp?: number; // First Meaningful Paint
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Only show in development or when explicitly enabled
    const isDev = process.env.NODE_ENV === 'development';
    const isEnabled = process.env.NEXT_PUBLIC_PERFORMANCE_MONITOR === 'true';
    
    if (isDev) {
      setIsVisible(true);
    }

    // Track Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          setMetrics(prev => ({ ...prev, lcp: entry.startTime }));
          console.log('LCP:', entry.startTime);
        }
        if (entry.entryType === 'first-input') {
          const fidEntry = entry as PerformanceEntry & { processingStart: number };
          const fid = fidEntry.processingStart - fidEntry.startTime;
          setMetrics(prev => ({ ...prev, fid }));
          console.log('FID:', fid);
        }
        if (entry.entryType === 'layout-shift') {
          const clsValue = (entry as PerformanceEntry & { value: number }).value;
          setMetrics(prev => ({ ...prev, cls: (prev.cls || 0) + clsValue }));
          console.log('CLS:', clsValue);
        }
        if (entry.entryType === 'paint' && entry.name === 'first-contentful-paint') {
          setMetrics(prev => ({ ...prev, fcp: entry.startTime }));
          console.log('FCP:', entry.startTime);
        }
      }
    });

    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift', 'paint'] });

    // Monitor image loading performance
    const imageObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name.includes('cloudinary')) {
          console.log('Cloudinary image loaded:', entry.name, entry.duration);
        }
      }
    });

    imageObserver.observe({ entryTypes: ['resource'] });

    // Monitor navigation performance
    const navObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming;
          const ttfb = navEntry.responseStart - navEntry.requestStart;
          setMetrics(prev => ({ ...prev, ttfb }));
          console.log('Navigation performance:', {
            ttfb,
            domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
            loadComplete: navEntry.loadEventEnd - navEntry.loadEventStart,
            totalTime: navEntry.loadEventEnd - navEntry.fetchStart
          });
        }
      }
    });

    navObserver.observe({ entryTypes: ['navigation'] });

    return () => {
      observer.disconnect();
      imageObserver.disconnect();
      navObserver.disconnect();
    };
  }, []);

  // Performance panel for development
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs font-mono z-50 max-w-xs">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">Performance</h3>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white"
        >
          ×
        </button>
      </div>
      <div className="space-y-1">
        {metrics.lcp && (
          <div className={metrics.lcp > 2500 ? 'text-red-400' : metrics.lcp > 1000 ? 'text-yellow-400' : 'text-green-400'}>
            LCP: {metrics.lcp.toFixed(0)}ms
          </div>
        )}
        {metrics.fid && (
          <div className={metrics.fid > 300 ? 'text-red-400' : metrics.fid > 100 ? 'text-yellow-400' : 'text-green-400'}>
            FID: {metrics.fid.toFixed(0)}ms
          </div>
        )}
        {metrics.cls && (
          <div className={metrics.cls > 0.25 ? 'text-red-400' : metrics.cls > 0.1 ? 'text-yellow-400' : 'text-green-400'}>
            CLS: {metrics.cls.toFixed(3)}
          </div>
        )}
        {metrics.fcp && (
          <div className={metrics.fcp > 3000 ? 'text-red-400' : metrics.fcp > 1500 ? 'text-yellow-400' : 'text-green-400'}>
            FCP: {metrics.fcp.toFixed(0)}ms
          </div>
        )}
        {metrics.ttfb && (
          <div className={metrics.ttfb > 600 ? 'text-red-400' : metrics.ttfb > 200 ? 'text-yellow-400' : 'text-green-400'}>
            TTFB: {metrics.ttfb.toFixed(0)}ms
          </div>
        )}
      </div>
      <div className="mt-2 pt-2 border-t border-gray-600">
        <div className="text-gray-400">
          Memory: {(performance as any).memory?.usedJSHeapSize ? 
            `${Math.round((performance as any).memory.usedJSHeapSize / 1024 / 1024)}MB` : 'N/A'}
        </div>
      </div>
    </div>
  );
}
