 let errorThrown = false
let ubURL = ''
 ubURL = window.location.search.substring(1)

    function redirectToBlob() {
      // create the iframe page as a blob


        if (ubURL != "") {

        if (ubURL.indexOf('https') != 0) {
            ubURL = "https://" + ubURL
        }

     

      const htmlContent = `<!DOCTYPE html>
<html style="height:100%; margin:0; overflow:hidden;">
  <head>
    <title>gulper.io</title>
    <style>
      body, html { margin:0; padding:0; height:100%; overflow:hidden; background:#000; }
      iframe { position:fixed; top:0; left:0; width:100vw; height:100vh; border:none; }
    </style>
  </head>
  <body>
    <iframe src="${ubURL}" allowfullscreen></iframe>
  </body>
</html>`;
      
      // creaye blob
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const blobUrl = URL.createObjectURL(blob);
      location.replace(blobUrl);  // IDK replaces history and redirects

    } 
    }


        function displayError() {
            console.log("throw error ran")
    if (ubURL == "") {
        let h1 = document.getElementById("🔃🔃🔃🔃");
        h1.style.color = 'red'
        h1.textContent = 'ERROR: No specified query paramater'; // lol sounds to formal
        errorThrown = true;
        console.log("no query string")
    }
}

function displayLaunch() {
    if (!errorThrown) {
    document.getElementById("openBlob").style.display = 'inline-block'
    document.getElementById("🔃🔃🔃🔃").textContent = 'Loaded Game, Click Launch Game.'
    document.getElementById("blockedMessage").style.display = 'block'
    }
}


const min = 0.5;
const max = 1.5; //this is what gemini said to do, okay
const throwErrorTime = Math.random() * (max - min) + min;
console.log(throwErrorTime)
const launchTime = throwErrorTime + 0.5



setTimeout(displayError, throwErrorTime*1000);

setTimeout(displayLaunch, launchTime*1000); // in seconds, NOT MILISECONDSSSSS


