let DeepestFrame = window;

function getDeepestFrame() {
  let active = document.activeElement;
  while (active && active.tagName === "IFRAME" && active.contentDocument?.activeElement) {
    active = active.contentDocument.activeElement;
  }
  console.log("deepest frame returned!!!! ===============");
  return active?.ownerDocument?.defaultView || window;
}

function updateDeepestFrame() {
  const UpdatedFrame = getDeepestFrame();
  console.log("update deepest frame run&&&&&&&&&&&&&&***********");






    DeepestFrame.removeEventListener("keydown", handleKeypress);
    DeepestFrame.removeEventListener("keyup", handleKeypress);

    DeepestFrame = UpdatedFrame;

    DeepestFrame.addEventListener("keydown", handleKeypress);
    DeepestFrame.addEventListener("keyup", handleKeypress);
    DeepestFrame.addEventListener("blur", updateDeepestFrame, true);
    DeepestFrame.addEventListener("focus", updateDeepestFrame, true);
    
}
updateDeepestFrame() //idk why this makes it work but it does

//window.addEventListener("load", updateDeepestFrame, true);
//window.addEventListener("click", updateDeepestFrame, true);

window.addEventListener("focus", updateDeepestFrame, true);
window.addEventListener("blur", updateDeepestFrame, true);



let hideKeys = ["p", "l"];
let KeysPressed = {};


function handleKeypress(event) {
  console.log(" keypress workes");
  
  if (event.type === "keydown") {
    KeysPressed[event.key] = true;
    console.log(event.key)
  } else if (event.type === "keyup") {
    KeysPressed[event.key] = false;
  }
  const defaultDisplay = document.body.style.display
  if (KeysPressed[hideKeys[0]] && KeysPressed[hideKeys[1]]) {
    
    console.log(" hidekeys pressed");
    document.body.style.display = 'none'

  } else {
    document.body.style.display = defaultDisplay;
  }


}



