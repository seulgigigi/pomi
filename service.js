const cacheName = 'pomi-timer-cache-v1';
const filesToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/OIG.jpeg',
    '/meow.mp3',
    '/meow.jpeg',
    '/animations.css',
    '/darkmode.css',
    '/fade.js',
    '/flex.css',
    '/manifest.json',
    '/responsive.css',
    '/todo.js',
    '/pwa.jpeg',
];

// Install the service worker
self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open(cacheName)
        .then((cache) => {
          // Cache the files
          return cache.addAll(filesToCache);
        })
    );
});

// Activate the service worker
self.addEventListener('activate', (event) => {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.filter((name) => {
            return name !== cacheName;
          }).map((name) => {
            return caches.delete(name);
          })
        );
      })
    );
});

// Fetch event listener
self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          // Cache hit - return response
          if (response) {
            return response;
          }

          // Clone the request
          const fetchRequest = event.request.clone();

          // Make the network request
          return fetch(fetchRequest).then((response) => {
            // Check if valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            // Cache the response
            caches.open(cacheName)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          });
        })
    );
});
