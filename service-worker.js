const CACHE_NAME = "gunnarson-cache-v1";

const urlsToCache = [
  "./",
  "./index.html",
  "./gunnarsonV2Alpha.html",
  "./manifest.json",
  "./assets/grass.jpg",
  "./assets/title_background.png",
  "./assets/title_song.mp3",
  "./assets/waternormals.jpg",
  "./assets/mountainrange.glb",
  // Spartan model
  "./assets/spartan_model/scene.gltf",
  "./assets/spartan_model/scene.bin",
  "./assets/spartan_model/textures/material_0_diffuse.jpeg",
  "./assets/spartan_model/textures/material_0_occlusion.png",
  "./assets/spartan_model/textures/material_0_specularGlossiness.png",
  "./assets/libs/three.min.js",
  "./assets/libs/rapier3d.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", event => {
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

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
