/** @type {ServiceWorkerGlobalScope} */
self.addEventListener("fetch", (event) => {
    const request = event.request;

    const oldUrl = request.url;
    let newUrl = oldUrl;
    let newUrlLiteral = new URL(newUrl);

    let shouldChangeUrl = false;

    if ((newUrlLiteral.hostname) == "cdn.jsdelivr.net") {
        newUrlLiteral.hostname = "fastly.jsdelivr.net";
        shouldChangeUrl = true;
    }

    if ((newUrlLiteral.pathname.startsWith("/gh/gn-math/")) && newUrlLiteral.hostname.endsWith("jsdelivr.net")) {
        newUrlLiteral.pathname = newUrlLiteral.pathname.replace("/gh/gn-math/", "/gh/freebuisness/")
        shouldChangeUrl = true;
    }

    if (shouldChangeUrl) {
        
    const newRequest = new Request(newUrlLiteral.href, request);
    
    event.respondWith(

    fetch(newRequest)

    );
    }

});
