const CACHE_NAME = 'nhai-v1';

const urlsToCache = [
    '/',
    '/index.html',
    "/questions.json",
    "/static/js/index.tsx",
    "/static/js/App.tsx",
    "/static/js/Game.tsx",
    "/static/js/GameModePicker.tsx",
    "/static/js/shared.tsx",
    "/static/css/index.css",
    "/exploding_head.png",
    "/hot_pepper.png",
    "/joy.png",
    "/us.png",
    "/hu.png",
    "/BebasTamFont.css",
    "/BebasTamBold.ttf",
    "/stuck_out_tongue_winking_eye.png",
    "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap",
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
})

self.addEventListener("fetch", (event) => {
    console.log("Fetching via Service worker");
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});

// Activate event
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});