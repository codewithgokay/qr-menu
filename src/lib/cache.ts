// Advanced caching system with TTL and LRU eviction
interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
  accessCount: number;
  lastAccessed: number;
}

interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
  maxSize?: number; // Maximum number of items
  maxMemory?: number; // Maximum memory usage in bytes
}

class AdvancedCache<T> {
  private cache = new Map<string, CacheItem<T>>();
  private accessOrder: string[] = [];
  private totalMemory = 0;
  private readonly maxSize: number;
  private readonly maxMemory: number;
  private readonly defaultTtl: number;

  constructor(options: CacheOptions = {}) {
    this.maxSize = options.maxSize || 1000;
    this.maxMemory = options.maxMemory || 50 * 1024 * 1024; // 50MB
    this.defaultTtl = options.ttl || 5 * 60 * 1000; // 5 minutes
  }

  set(key: string, data: T, ttl?: number): void {
    const now = Date.now();
    const itemTtl = ttl || this.defaultTtl;
    
    // Remove existing item if it exists
    if (this.cache.has(key)) {
      this.delete(key);
    }

    // Calculate memory usage (rough estimate)
    const memoryUsage = this.estimateMemoryUsage(data);
    
    // Check if we need to evict items
    this.evictIfNeeded(memoryUsage);

    // Add new item
    const item: CacheItem<T> = {
      data,
      timestamp: now,
      ttl: itemTtl,
      accessCount: 0,
      lastAccessed: now
    };

    this.cache.set(key, item);
    this.accessOrder.push(key);
    this.totalMemory += memoryUsage;
  }

  get(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }

    const now = Date.now();
    
    // Check if item has expired
    if (now - item.timestamp > item.ttl) {
      this.delete(key);
      return null;
    }

    // Update access statistics
    item.accessCount++;
    item.lastAccessed = now;
    
    // Move to end of access order (most recently used)
    this.moveToEnd(key);
    
    return item.data;
  }

  has(key: string): boolean {
    const item = this.cache.get(key);
    
    if (!item) {
      return false;
    }

    const now = Date.now();
    
    // Check if item has expired
    if (now - item.timestamp > item.ttl) {
      this.delete(key);
      return false;
    }

    return true;
  }

  delete(key: string): boolean {
    const item = this.cache.get(key);
    
    if (!item) {
      return false;
    }

    // Remove from cache
    this.cache.delete(key);
    
    // Remove from access order
    const index = this.accessOrder.indexOf(key);
    if (index > -1) {
      this.accessOrder.splice(index, 1);
    }

    // Update memory usage
    this.totalMemory -= this.estimateMemoryUsage(item.data);
    
    return true;
  }

  clear(): void {
    this.cache.clear();
    this.accessOrder = [];
    this.totalMemory = 0;
  }

  size(): number {
    return this.cache.size;
  }

  memoryUsage(): number {
    return this.totalMemory;
  }

  // Get cache statistics
  getStats() {
    const now = Date.now();
    const items = Array.from(this.cache.values());
    
    return {
      size: this.cache.size,
      memoryUsage: this.totalMemory,
      hitRate: this.calculateHitRate(),
      averageAge: this.calculateAverageAge(items, now),
      oldestItem: this.findOldestItem(items),
      mostAccessed: this.findMostAccessedItem(items)
    };
  }

  // Private methods
  private estimateMemoryUsage(data: T): number {
    // Rough estimation based on JSON string length
    try {
      return JSON.stringify(data).length * 2; // 2 bytes per character (UTF-16)
    } catch {
      return 1024; // Default 1KB if serialization fails
    }
  }

  private evictIfNeeded(newItemMemory: number): void {
    // Check size limit
    while (this.cache.size >= this.maxSize) {
      this.evictLRU();
    }

    // Check memory limit
    while (this.totalMemory + newItemMemory > this.maxMemory && this.cache.size > 0) {
      this.evictLRU();
    }
  }

  private evictLRU(): void {
    if (this.accessOrder.length === 0) return;

    const lruKey = this.accessOrder[0];
    this.delete(lruKey);
  }

  private moveToEnd(key: string): void {
    const index = this.accessOrder.indexOf(key);
    if (index > -1) {
      this.accessOrder.splice(index, 1);
      this.accessOrder.push(key);
    }
  }

  private calculateHitRate(): number {
    const totalAccesses = Array.from(this.cache.values())
      .reduce((sum, item) => sum + item.accessCount, 0);
    
    return totalAccesses > 0 ? totalAccesses / (totalAccesses + this.cache.size) : 0;
  }

  private calculateAverageAge(items: CacheItem<T>[], now: number): number {
    if (items.length === 0) return 0;
    
    const totalAge = items.reduce((sum, item) => sum + (now - item.timestamp), 0);
    return totalAge / items.length;
  }

  private findOldestItem(items: CacheItem<T>[]): string | null {
    if (items.length === 0) return null;
    
    let oldestKey = '';
    let oldestTime = Date.now();
    
    for (const [key, item] of this.cache.entries()) {
      if (item.timestamp < oldestTime) {
        oldestTime = item.timestamp;
        oldestKey = key;
      }
    }
    
    return oldestKey;
  }

  private findMostAccessedItem(items: CacheItem<T>[]): string | null {
    if (items.length === 0) return null;
    
    let mostAccessedKey = '';
    let maxAccesses = 0;
    
    for (const [key, item] of this.cache.entries()) {
      if (item.accessCount > maxAccesses) {
        maxAccesses = item.accessCount;
        mostAccessedKey = key;
      }
    }
    
    return mostAccessedKey;
  }
}

// Create global cache instances
export const menuCache = new AdvancedCache({
  ttl: 10 * 60 * 1000, // 10 minutes
  maxSize: 500,
  maxMemory: 25 * 1024 * 1024 // 25MB
});

export const imageCache = new AdvancedCache({
  ttl: 60 * 60 * 1000, // 1 hour
  maxSize: 1000,
  maxMemory: 50 * 1024 * 1024 // 50MB
});

export const apiCache = new AdvancedCache({
  ttl: 5 * 60 * 1000, // 5 minutes
  maxSize: 200,
  maxMemory: 10 * 1024 * 1024 // 10MB
});

// Cache utilities
export const cacheUtils = {
  // Preload critical data (non-blocking)
  async preloadMenuData() {
    try {
      // Use a timeout to prevent blocking
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 second timeout
      
      const response = await fetch('/api/menu-items', {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        const data = await response.json();
        menuCache.set('menu-items', data);
      }
    } catch (error) {
      console.warn('Failed to preload menu data:', error);
    }
  },

  // Clear expired items
  clearExpired() {
    const now = Date.now();
    for (const [key, item] of menuCache['cache'].entries()) {
      if (now - item.timestamp > item.ttl) {
        menuCache.delete(key);
      }
    }
  },

  // Get cache statistics
  getStats() {
    return {
      menu: menuCache.getStats(),
      image: imageCache.getStats(),
      api: apiCache.getStats()
    };
  },

  // Clear all caches
  clearAll() {
    menuCache.clear();
    imageCache.clear();
    apiCache.clear();
  }
};

// Auto-cleanup expired items every 5 minutes
if (typeof window !== 'undefined') {
  setInterval(() => {
    cacheUtils.clearExpired();
  }, 5 * 60 * 1000);
}
