// install service worker
self.addEventListener('install', event => {
    console.log(event);
    console.log("installed");
});
// activate service worker
self.addEventListener('activate', event => {
    console.log("serviceworker is active");
});
// fetch event
self.addEventListener('fetch', event => {
    console.log('fetch event', event);
})