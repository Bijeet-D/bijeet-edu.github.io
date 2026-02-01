//wrong name for file, but if i change den see curly may bl 0 c   k



/*

*/
if (!localStorage.getItem("newFavFormatYet")) {
  localStorage.setItem("newFavFormatYet", true)
  localStorage.setItem("favicon", "Microwave Miracles | Easy Microwave recipes")
}


function openFrame(fav, ttl) {
  console.log(fav)
  console.log(ttl)
  
    document.head.innerHTML = ''
    document.body.innerHTML = `
    <iframe src="devconsole.html"></iframe>
    <link rel="stylesheet" href="styles.css">
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
    `

    let pageFavicon = document.createElement('link')
    pageFavicon.rel = "icon"
    pageFavicon.id = "favicon"
    pageFavicon.type = "image/png"
    pageFavicon.href = fav

    document.head.appendChild(pageFavicon)

//============

    document.title = ttl
}


function submitEmail(event) {
    
event.preventDefault()

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

    
    let emailInput = document.getElementById("email").value;
    
    if (emailInput == "admin@bijeet-edu.com" || emailInput == "admin@microwavemiracles.net" || emailInput == "admin@microwave-miracles.com") {

        let favicon = localStorage.getItem("favicon")
        let title = localStorage.getItem("pageTitle")

        openFrame(favicon, title);
        
    }

}




