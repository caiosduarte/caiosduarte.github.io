
importScripts('/cache-polyfill.js');
// versionamento do cache
var CACHE_NAME = 'pontosgeo-v0';


// 1. instalação do service worker
self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open(CACHE_NAME).then(function(cache) {
     return cache.addAll([
       '/',
       '/index.html',
       '/bundle.js',
       '/style.css',
       '/manifest.json',
       '/img/icon.png',
       '/img/favicon.png'
     ]);
   })
 );
});

// 2. ativação do service worker
self.addEventListener('activate', function activator(event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys
        .filter(function (key) {
          return key.indexOf(CACHE_NAME) !== 0;
        })
        .map(function (key) {
          return caches.delete(key);
        })
      );
    })
  );
});

// 3. intercepta o que foi requisitado primeiro em cache  
self.addEventListener('fetch', function(event) {
  //console.log(event.request.url);

  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );  
 });
