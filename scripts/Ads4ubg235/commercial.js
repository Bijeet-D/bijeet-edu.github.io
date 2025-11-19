(function() {
    const HOST_EXCLUDEs= [
        // "unblockedgames66.gitlab.io",
        // "unblockedgames67.gitlab.io",
        // "unblockedgames6969.gitlab.io",
        // "classroom6x.gitlab.io",
        // "unblockedgames76.gitlab.io",
        // "unblockedgames77.gitlab.io",
        // "unblockedgames911.gitlab.io",
        // "classroommanagement.gitlab.io",
        "ubg66.gitlab.io",
        "ubg67.gitlab.io",
        "ubg6969.gitlab.io",
        "ubg76.gitlab.io",
        "ubg77.gitlab.io",
        "ubg911.gitlab.io",

        "gameswtf.gitlab.io",
        "ubgmom.gitlab.io",
        "class6x.gitlab.io",
        "cmug.gitlab.io",
        "unblockedgamess3.gitlab.io",

        "ubg98.github.io",
        "ubg44.github.io",
        "ubg89.github.io",
        "ubg17.github.io",

        "gamecloner.wp235.workers.dev",
    ];

    const parent_location= document.referrer;
    console.log("parent_location", parent_location);
    for (let i=0; i< HOST_EXCLUDEs.length; i++) {
        if (parent_location.indexOf(`https://${HOST_EXCLUDEs[i]}/`)> -1) {
            console.log("ubg235.commerical SKIPDOMAIN", parent_location);
            return false;
        }
    }

    window.safeWindowOpen = function(url, target, features) {
        const iframe = document.createElement("iframe");
        iframe.style.display = "none";
        document.body.appendChild(iframe);

        const safeOpen = iframe.contentWindow.open.bind(window);
        document.body.removeChild(iframe);

        return safeOpen(url, target, features);
    };

    async function getCountryCode() {
        const res = await fetch("https://ipwho.is/");
        const data = await res.json();
        return data.country_code; // e.g. "US"
    }

    getCountryCode().then((country)=> {
        // console.log("country", country);
        if (["US", "GB", "AU"].includes(country)) {
            console.log("ubg235.commercial.ADS", country);
            // window.safeWindowOpen("https://unblockedgamess3.gitlab.io/", "unblockedgamess3");
            // window.safeWindowOpen("https://cmug.gitlab.io/", "cmug");
            // window.safeWindowOpen("https://ubgw.gitlab.io/", "ubgw");
            // window.safeWindowOpen("https://ubgmom.gitlab.io/", "ubgmom");
            // window.safeWindowOpen("https://gameswtf.gitlab.io/", "gameswtf");
            //window.safeWindowOpen("https://geometrygames.gitlab.io/", "geometrygames");

        } else {
            console.log("ubg235.commercial SKIP Country", country);
        }
    });
    // window.safeWindowOpen("https://www.games235.com/", "games235");
})();

console.log("ubg235.commercial");
