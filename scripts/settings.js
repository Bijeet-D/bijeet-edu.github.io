const autoAboutBlankCheckbox = document.getElementById("autoAboutBlankCheckbox")


autoAboutBlankCheckbox.addEventListener("change", function(){
  if (autoAboutBlankCheckbox.checked) {
    localStorage.setItem("auto_about:blank", true);
  } else {
    localStorage.setItem("auto_about:blank", false);
  }

});


  
  function downloadHTML() {
    const htmlForDownload = `
    
    <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Classroom</title>
<link rel="icon" href="https://i.postimg.cc/W4CjrzHc/image.png">
<style>
html, body {
margin: 0;
padding: 0;
height: 100vh;
width: 100vw;
overflow: hidden; /* prevents scrollbars */
}
iframe {
height: 100vh;
width: 100vw;
border: none; /* removes border */
}
</style>
</head>
<body>
<iframe src="https://bijeet-d.github.io/bijeet-edu.github.io/"></iframe>
</body>
<html>
`


const blob = new Blob([htmlForDownload], { type: "text/html" });
const url = URL.createObjectURL(blob);

const link = document.createElement("a");
link.href = url;
link.download = "bijeet-edu-download.html";
link.click();
URL.revokeObjectURL(url);

}
