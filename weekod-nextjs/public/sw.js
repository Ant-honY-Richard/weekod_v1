/*
  Weekod Service Worker
  - Never cache HTML documents (prevents stale/blank pages after deploy)
  - Cache-first for Next.js build assets (_next/static)
  - Stale-while-revalidate for same-origin images and fonts
  - Aggressive cleanup of old caches and immediate activation
*/

const SW_VERSION = 'v1-2025-08-29';
const ASSET_CACHE = `assets-${SW_VERSION}`;

self.addEventListener('install', (event) => {
  // Activate new SW immediately
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      try {
        const keys = await caches.keys();
        // Delete all caches except current asset cache
        await Promise.all(
          keys
            .filter((key) => key !== ASSET_CACHE)
            .map((key) => caches.delete(key))
        );
      } catch (e) {
        // noop
      }
      await self.clients.claim();
    })()
  );
});

function isHTMLRequest(request) {
  if (request.mode === 'navigate') return true;
  const accept = request.headers.get('accept') || '';
  return accept.includes('text/html');
}

function isBuildAsset(url) {
  return (
    url.pathname.startsWith('/_next/static/') ||
    /\.(?:js|css)$/.test(url.pathname)
  );
}

function isStaticMedia(url) {
  return /\.(?:png|jpg|jpeg|gif|webp|avif|svg|ico|woff2?|ttf|eot)$/.test(url.pathname);
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin requests
  if (url.origin !== self.location.origin) return;

  // Never cache HTML; always go to network to avoid serving stale pages
  if (isHTMLRequest(request)) {
    event.respondWith(
      fetch(new Request(request, { cache: 'no-store' })).catch(() => {
        // If offline and no network, try to serve a minimal fallback (logo only) or a 503
        return new Response('Offline', { status: 503, statusText: 'Offline' });
      })
    );
    return;
  }

  // Cache-first for build assets (_next/static, js, css)
  if (isBuildAsset(url)) {
    event.respondWith(
      caches.open(ASSET_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        if (cached) {
          // Revalidate in background
          fetch(request).then((resp) => {
            if (resp && resp.ok) cache.put(request, resp.clone());
          }).catch(() => {});
          return cached;
        }
        const resp = await fetch(request);
        if (resp && resp.ok) cache.put(request, resp.clone());
        return resp;
      })
    );
    return;
  }

  // Stale-while-revalidate for images and fonts
  if (isStaticMedia(url)) {
    event.respondWith(
      caches.open(ASSET_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        const network = fetch(request)
          .then((resp) => {
            if (resp && resp.ok) cache.put(request, resp.clone());
            return resp;
          })
          .catch(() => undefined);
        return cached || network || fetch(request);
      })
    );
    return;
  }

  // Default: passthrough
  // Let the browser handle its own caching for other requests
});

// Allow the page to trigger immediate activation of a waiting SW
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
