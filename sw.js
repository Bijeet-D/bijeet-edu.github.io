/** @type {ServiceWorkerGlobalScope} */

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  let shouldChange = false;

  if (url.hostname === "cdn.jsdelivr.net") {
    url.hostname = "fastly.jsdelivr.net";
    shouldChange = true;
  }

  if (url.hostname.endsWith("jsdelivr.net") && url.pathname.startsWith("/gh/gn-math/")) {
    url.pathname = url.pathname.replace("/gh/gn-math/", "/gh/freebuisness/");
    shouldChange = true;
  }

  if (shouldChange) {
    event.respondWith(
      fetch(new Request(url.href, event.request))
    );
  }
});
