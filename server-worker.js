const CACHE_NAME = "html-game-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./js/game.js",
  "./styles/style.css",
  "./assets/image.png",
  "./assets/spartan.glb",
  // Add more files as needed
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
