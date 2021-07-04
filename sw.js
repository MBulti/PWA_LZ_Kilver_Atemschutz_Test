const staticCacheName = "site-static";
const assets = [
    "./",
    "./index.html",
    "./js/app.js",
    "./js/ui.js",
    "./js/materialize.min.js",
    "./css/styles.css",
    "./css/materialize.min.css",
    "./img/default.png",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2"
];

// install service worker
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log("caching assets");
            cache.addAll(assets);
        })
    );
});
// activate service worker
self.addEventListener("activate", event => {
    console.log("serviceworker is active");
});
// fetch event
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(cacheRes => {
            return cacheRes || fetch(event.request); // cache first, network second
        })
    );
});