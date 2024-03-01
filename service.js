const cacheName = 'your-app-cache-v1';
const filesToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/OIG.jpeg',
    '/meow.mp3',
    '/meow.jpeg',
    '/animations.css',
    '/dark.js',
    '/darkmode.css',
    '/fade.js',
    '/faq.js',
    '/flex.css',
    '/manifest.json',
    '/responsive.css',
    '/todo.js',
    '/pwa.jpeg',
];

self.addEventListener('install', (e) => {
    console.log('Service Worker installed');
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('Caching files');
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('fetch', (e) => {
    console.log('Fetching:', e.request.url);
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});
