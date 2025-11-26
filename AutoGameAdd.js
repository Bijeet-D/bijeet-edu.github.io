
//This is probally the most confusing code ive written so far, lol, idk how async function/await works. BUt at least it work 
let timesRan = 0


async function is404(file) {
        console.log("checked if its 404")
    try {

    const res = await fetch(file)
  

    if (res.status == 404) {
        return true
    }


    let html = await res.text()

    if (html.includes("<title>Page not found · GitHub Pages</title>") && html.includes("If this is your site, make sure that the filename case matches the URL as well as any file permissions.")) {
            return true
     }

     if (html.includes("Cannot GET ")) {
        return true
     }

     return false;

    } catch (err) {
        return true
    }
}



async function CreateLessons() {
    console.log("createLesson Ran")
        if (timesRan == 0) {
for (let i = 59; i < 300; i++) {

    const IS404 = await is404("Lesson-" + i + ".html")
    
  if (IS404) {
    break
  } else if (!IS404) {

    const LessonFetch = await fetch("Lesson-" + i + ".html")
    const htmlOfLesson = await LessonFetch.text()
    const commmentBlock = htmlOfLesson.slice(htmlOfLesson.indexOf("<!--")+4, htmlOfLesson.indexOf("-->"))

    const name = commmentBlock.match(/!@#NAME:\s*(.*)/)[1].trim();
    const image = commmentBlock.match(/!@#IMAGE:\s*(.*)/)[1].trim();

    const fileOfLesson = "Lesson-" + i + ".html"

    createButton(name, image, fileOfLesson)

  }

    
}
        
timesRan = timesRan+1
        }    
}


function createButton(nameOfLesson, imageURL, file) {

    let outerDiv = document.createElement("div");
    let nameNoSpaces = nameOfLesson.replaceAll(' ', '-'); // NO SPACES IN IDDD
    outerDiv.id = nameNoSpaces + "-learning";
    outerDiv.classList = "lesson-button";
    outerDiv.onclick = () => gmButtonOnClick(file);

    outerDiv.innerHTML = 
    `
    <div>
        <img src="${imageURL}">
        <h1 class="hover-text">${nameOfLesson}</h1>
        </div>
        
    `;

    document.getElementById("lesson-button-container").appendChild(outerDiv);

    console.log("created button " + nameOfLesson)
}



// acually run function

CreateLessons()

