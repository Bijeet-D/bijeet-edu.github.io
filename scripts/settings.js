console.log("ewuhifhwieuhifue")


const autoAboutBlankCheckbox = document.getElementById("autoAboutBlankCheckbox")


autoAboutBlankCheckbox.addEventListener("change", function(){
  console.log("hi")
  if (autoAboutBlankCheckbox.checked) {
    localStorage.setItem("auto_about:blank", true);
  } else {
    localStorage.setItem("auto_about:blank", false);
  }

});

if (localStorage.getItem("auto_about:blank") == true) {
  autoAboutBlankCheckbox.checked = true
}

  
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
<iframe src="${window.location.origin}"></iframe>
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




function googleClassroomFavicon() {
    localStorage.setItem("favicon", "https://www.gstatic.com/classroom/ic_product_classroom_144.png");
    localStorage.setItem("pageTitle", "Home")

    console.log(localStorage.getItem("favicon"))
    console.log(localStorage.getItem("pageTitle"))
  }

  function googleDocsFavicon() {
    localStorage.setItem("favicon", "images/GDfavicon.png");
    localStorage.setItem("pageTitle", "Google Docs")


    console.log(localStorage.getItem("favicon"))
    console.log(localStorage.getItem("pageTitle"))
  }
  

  function GmailFavicon() {
    localStorage.setItem("favicon", "images/GmailFavicon.png");
    localStorage.setItem("pageTitle", "Inbox")


    console.log(localStorage.getItem("favicon"))
    console.log(localStorage.getItem("pageTitle"))
  }
  
  function googleDriveFavicon() {
    localStorage.setItem("favicon", "");
    localStorage.setItem("pageTitle", "Home - Google Drive")


    console.log(localStorage.getItem("favicon"))
    console.log(localStorage.getItem("pageTitle"))
  }