const CACHE_NAME = 'nhie-v1.3';

const urlsToCache = [
    '/',
    '/?mode=standalone',
    '/index.html',
    "/questions.json",
    "/manifest.json",
    "/static/js/index.tsx",
    "/static/js/App.tsx",
    "/static/js/Game.tsx",
    "/static/js/GameModePicker.tsx",
    "/static/js/DownloadPage.tsx",
    "/static/js/shared.tsx",
    "/static/css/index.css",
    "/exploding_head.png",
    "/hot_pepper.png",
    "/joy.png",
    "/us.png",
    "/hu.png",
    "/screenshots/mobile_1.png",
    "/screenshots/mobile_2.png",
    "/screenshots/mobile_3.png",
    "/ios-add.svg",
    "/ios-share.svg",
    "/BebasTamFont.css",
    "/BebasTamBold.ttf",
    "/stuck_out_tongue_winking_eye.png",
    "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap",
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(async cache => {
                for(let url of urlsToCache) {
                    try {
                        await cache.add(url);
                    } catch (e) {
                        console.warn(`Failed to cache ${url}`, e);
                    }
                }
            })
    );
})

self.addEventListener("fetch", (event) => {
    console.log("Fetching via Service worker");
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                if (!response || response.status !== 200 || response.type !== "basic") {
                    return response;
                }

                const responseToCache = response.clone();
                caches.open(CACHE_NAME)
                    .then((cache) => {
                        cache.put(event.request, responseToCache);
                    });

                return response;
            })
            .catch(() => caches.match(event.request))
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