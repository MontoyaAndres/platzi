/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */

// Precarga la app
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings;
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

// App shell
workbox.routing.registerNavigationRoute(
  workbox.precaching.getCacheKeyForURL("/index.html")
);

workbox.googleAnalytics.initialize();

// La API usa Stale White Revalidate para mayor velocidad
workbox.routing.registerRoute(
  new RegExp(/^https?:\/\/www.themealdb.com\/api\/.*/),
  new workbox.strategies.StaleWhileRevalidate()
);

// Last fuentes van con Cache First y vencen al mes
workbox.routing.registerRoute(
  new RegExp(/^https:\/\/fonts.(?:googleapis|gstatic).com\/(.*)/),
  new workbox.strategies.CacheFirst({
    cacheName: "google-fonts-cache",
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 30 * 24 * 60 * 60
      })
    ]
  })
);

// Todo lo demás usa Network First
workbox.routing.registerRoute(
  new RegExp(/^https?.*/),
  new workbox.strategies.NetworkFirst()
);
