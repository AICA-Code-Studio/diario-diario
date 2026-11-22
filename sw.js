const scope = new URL(self.registration.scope);
const prefix = "diario-diario:" + scope.pathname + ":";
const cacheName = prefix + "3";
const index = new URL("index.html", scope).href;
const files = ["index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png"].map((file) => new URL(file, scope).href);

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    await cache.addAll(files.map((file) => new Request(file, { cache: "reload" })));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) =>
    Promise.all(keys.filter((key) => key.startsWith(prefix) && key !== cacheName).map((key) => caches.delete(key)))
  ));
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== scope.origin || request.headers.has("Authorization")) return;
  if (request.mode === "navigate" && [scope.pathname, new URL(index).pathname].includes(url.pathname)) {
    event.respondWith((async () => {
      try {
        const response = await fetch(request, { cache: "reload" });
        if (response.ok) {
          const cache = await caches.open(cacheName);
          await cache.put(index, response.clone());
        }
        return response;
      } catch {
        return (await caches.open(cacheName)).match(index);
      }
    })());
  } else if (files.includes(url.href)) {
    event.respondWith((async () => (await (await caches.open(cacheName)).match(request)) || fetch(request))());
  }
});
