//wrong name for file, but if i change den see curly may bl 0 c   k


document.getElementById("submitz").addEventListener("click", function(){
  if ( localStorage.getItem("auto_about:blank") == true) {
let win = window.open("about:blank", "_blank");
                            win.document.write(`
                            <iframe id="frame" src="index2.html"></iframe>
                            <style>
                                html, body {
                                padding: 0px;
                                margin: 0px;
                                }
    
                                #frame {
                                padding: 0px;
                                margin: 0px;
                                width: 100%;
                                height: 100%;
                                border: none;
                                }
                            </style>
                            `);
  }
  
});

/*

*/




function faviconstuff() {
  
const faviconElement = document.getElementById("favicon");
const GCfavicon = "https://www.gstatic.com/classroom/ic_product_classroom_144.png"
const GDfavicon = "images/GDfavicon.png"
const GmailFaviconImg = "images/GmailFavicon.png"
const GDriveFavicon = "images/GoogleDriveFavicon.png"
//idk (idk how to make sections and to lazy to spam "=")
//websiteRedirectInputContainer.style.display = 'none';       
//kdi




//idk ======= ONLOAD STUFF

if (localStorage.getItem("favicon")) {
  const favicon = localStorage.getItem("favicon")
  
  if (favicon === "GoogleClassroom") { // google classroom
    googleClassroomFavicon()
  } else if (favicon === "GoogleDocs") {
    googleDocsFavicon()
  } else if (favicon === "Gmail") {
    GmailFavicon()
  } else if (favicon === "GoogleDrive") {
    googleDriveFavicon()
  } 




}



//kdi ===========





// INTERACTIVE STUFF JS


 
  //END OF INTERACTIVE JS STUFF







  function googleClassroomFavicon() {
    faviconElement.setAttribute("href", GCfavicon);
    document.title = "Home";
    localStorage.setItem("favicon", "GoogleClassroom");
  }

  function googleDocsFavicon() {
    faviconElement.setAttribute("href", GDfavicon);
    document.title = "Google Docs";
    localStorage.setItem("favicon", "GoogleDocs");
  }
  

  function GmailFavicon() {
    faviconElement.setAttribute("href", GmailFaviconImg);
    document.title = "Inbox";
    localStorage.setItem("favicon", "Gmail");
  }
  
  function googleDriveFavicon() {
    faviconElement.setAttribute("href", GDriveFavicon);
    document.title = "Home - Google Drive";
    localStorage.setItem("favicon", "GoogleDrive");
  }


}
