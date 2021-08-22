const CACHES = {
  static: "static",
  dynamic: "dynamic",
  demand: "demand",
};

const STATIC_FILES = [
  "/",
  "/index.html",
  "/src/App.js",
  "/src/index.scss",
  "/src/views/home/Home.js",
  "/src/views/offline/Offline.js",
  "https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css", // caching external data from a  cdn
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHES.static).then((cache) => cache.addAll(STATIC_FILES))
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          //remove old caches
          // if (key !== "static-v2" && key !== "dynamic") {
          //   console.log(`--- removeing old cache ----> `, key);
          //   return caches.delete(key);
          // }
        })
      )
    )
  );

  return self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  const localUrl = "https://localhost:3000/";
  const shouldFetchFromNetwork = e.request.url.indexOf(localUrl) === -1;

  if (shouldFetchFromNetwork) {
    e.respondWith(
      caches.open(CACHES.dynamic).then((dynamicCache) =>
        fetch(e.request).then((networkResponse) => {
          dynamicCache.put(e.request, networkResponse.clone());
          return networkResponse;
        })
      )
    );
  } else {
    e.respondWith(
      caches.match(e.request).then((cacheResponse) => {
        if (cacheResponse) {
          return cacheResponse; //  returns data from the local cache
        } else {
          //  fetch data from the network (and cache it)
          return fetch(e.request)
            .then((res) =>
              caches.open(CACHES.dynamic).then((cache) => {
                cache.put(e.request.url, res.clone());
                return res;
              })
            )
            .catch((err) => {
              return caches
                .open(CACHES.static)
                .then((cache) => cache.match("/offline.html"));
            });
        }
      })
    );
  }
});
