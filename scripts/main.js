//wrong name for file, but if i change den see curly may bl 0 c   k



/*

*/





function submitEmail() {

//auto about:blank
    if ( localStorage.getItem("auto_about:blank") == true) {
let win = window.open("about:blank", "_blank");
                            win.document.write(`
                            <iframe id="frame" src="devconsole.html"></iframe>
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

//end==============

  
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
    
    let emailInput = document.getElementById("email").value;
    
    if (emailInput == "admin@bijeet-edu.com" || emailInput == "admin@microwavemiracles.net" || emailInput == "admin@microwave-miracles.com") {

        document.head.innerHTML = `<link id="favicon" rel="icon" type="image/png" href="">`
        document.body.innerHTML = `

                <link rel="stylesheet" href="styles.css">
                <link id="favicon" rel="icon" href="">
                <iframe src="devconsole.html"></iframe>
                <style>

                html, body {
                    margin: 0px;
                    padding: 0px;
                }
                
                iframe {
                    margin: 0px;
                    padding: 0px;
                    height: 100vh;
                    width: 100vw;
                    border: 0px;
                }
                
                </style>

                <script>

  const favicon = localStorage.getItem("favicon");
const GCfavicon = "https://www.gstatic.com/classroom/ic_product_classroom_144.png";
const GDfavicon = "images/GDfavicon.png";
const GmailFaviconImg = "images/GmailFavicon.png";
const GDriveFavicon = "images/GoogleDriveFavicon.png";
let faviconElement = document.getElementById("favicon");

                
                if (localStorage.getItem("favicon")) {
                

  
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
                
                </script>
        
        `
        
    }

}





