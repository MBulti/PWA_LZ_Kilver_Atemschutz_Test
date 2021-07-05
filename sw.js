const staticCacheName = "site-static-v2"; // remember to update this if any file is changed
const dynamicCacheName = "site-dynamic-v2";
const assets = [
    "./",
    "./index.html",
    "./js/app.js",
    "./js/ui.js",
    "./js/db.js",
    "./js/materialize.min.js",
    "./css/styles.css",
    "./css/materialize.min.css",
    "./img/default.png",
];

// limit cache size
const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > size) {
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            }
        })
    })
};

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
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName && key !== dynamicCacheName)
                .map(key => caches.delete(key)))
        })
    )
});
// fetch event
self.addEventListener("fetch", event => {
    // dont cache google api data
    if (event.request.url.indexOf("firestore.googleapis.com") === -1) {
        event.respondWith(
            caches.match(event.request).then(cacheRes => {
                // cache first, network second
                return cacheRes || fetch(event.request).then(fetchRes => {
                    // store dynamic response in the new cache
                    return caches.open(dynamicCacheName).then(cache => {
                        cache.put(event.request.url, fetchRes.clone()); // we need to clone, otherwise it is already used ...
                        limitCacheSize(dynamicCacheName, 15);
                        return fetchRes;
                    })
                }); 
            })
        );
    }
});