// Service Worker for QR Menu - Advanced Caching Strategy
const CACHE_NAME = 'qr-menu-v1.0.0';
const STATIC_CACHE = 'qr-menu-static-v1.0.0';
const DYNAMIC_CACHE = 'qr-menu-dynamic-v1.0.0';
const IMAGE_CACHE = 'qr-menu-images-v1.0.0';

// Cache strategies
const CACHE_STRATEGIES = {
  // Static assets - cache first
  STATIC: ['/manifest.json', '/favicon.ico'],
  // API responses - network first with fallback
  API: ['/api/menu-items', '/api/categories'],
  // Images - cache first with long TTL
  IMAGES: [/res\.cloudinary\.com/],
  // Pages - network first
  PAGES: ['/menu', '/admin', '/about']
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(CACHE_STRATEGIES.STATIC);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && 
              cacheName !== STATIC_CACHE && 
              cacheName !== DYNAMIC_CACHE && 
              cacheName !== IMAGE_CACHE) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle different types of requests
  if (isImageRequest(url)) {
    event.respondWith(handleImageRequest(request));
  } else if (isApiRequest(url)) {
    event.respondWith(handleApiRequest(request));
  } else if (isPageRequest(url)) {
    event.respondWith(handlePageRequest(request));
  } else {
    event.respondWith(handleStaticRequest(request));
  }
});

// Check if request is for an image
function isImageRequest(url) {
  return CACHE_STRATEGIES.IMAGES.some(pattern => 
    pattern instanceof RegExp ? pattern.test(url.href) : url.href.includes(pattern)
  );
}

// Check if request is for API
function isApiRequest(url) {
  return CACHE_STRATEGIES.API.some(apiPath => url.pathname.includes(apiPath));
}

// Check if request is for a page
function isPageRequest(url) {
  return CACHE_STRATEGIES.PAGES.some(page => url.pathname === page);
}

// Handle image requests - cache first with long TTL
async function handleImageRequest(request) {
  const cache = await caches.open(IMAGE_CACHE);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    // Return cached version immediately
    return cachedResponse;
  }

  try {
    // Try to fetch from network
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      // Cache the response for future use
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Image fetch failed:', error);
    // Return a placeholder image or fallback
    return new Response(
      '<svg width="96" height="96" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg"><rect width="96" height="96" fill="#f3f4f6"/><text x="48" y="48" text-anchor="middle" dy=".3em" fill="#9ca3af" font-family="Arial, sans-serif" font-size="12">🍽️</text></svg>',
      { headers: { 'Content-Type': 'image/svg+xml' } }
    );
  }
}

// Handle API requests - network first with cache fallback
async function handleApiRequest(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  
  try {
    // Try network first
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      // Cache successful responses
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('API fetch failed, trying cache:', error);
    // Fall back to cache
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return a fallback response
    return new Response(
      JSON.stringify({ error: 'Network unavailable', offline: true }),
      { 
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Handle page requests - network first with cache fallback
async function handlePageRequest(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  
  try {
    // Try network first
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      // Cache successful responses
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Page fetch failed, trying cache:', error);
    // Fall back to cache
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page
    return new Response(
      '<!DOCTYPE html><html><head><title>Offline - QR Menu</title></head><body><h1>You are offline</h1><p>Please check your internet connection and try again.</p></body></html>',
      { 
        status: 200,
        headers: { 'Content-Type': 'text/html' }
      }
    );
  }
}

// Handle static requests - cache first
async function handleStaticRequest(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Static resource fetch failed:', error);
    throw error;
  }
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'menu-update') {
    event.waitUntil(syncMenuUpdates());
  }
});

// Sync menu updates when back online
async function syncMenuUpdates() {
  try {
    // Get pending updates from IndexedDB
    const pendingUpdates = await getPendingUpdates();
    
    for (const update of pendingUpdates) {
      try {
        await fetch(update.url, {
          method: update.method,
          headers: update.headers,
          body: update.body
        });
        
        // Remove from pending updates
        await removePendingUpdate(update.id);
      } catch (error) {
        console.log('Failed to sync update:', error);
      }
    }
  } catch (error) {
    console.log('Background sync failed:', error);
  }
}

// Helper functions for IndexedDB operations
async function getPendingUpdates() {
  // Implementation would use IndexedDB to store pending updates
  return [];
}

async function removePendingUpdate(id) {
  // Implementation would remove update from IndexedDB
}

// Push notifications for menu updates
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      tag: 'menu-update',
      actions: [
        {
          action: 'view',
          title: 'View Menu'
        },
        {
          action: 'dismiss',
          title: 'Dismiss'
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/menu')
    );
  }
});
