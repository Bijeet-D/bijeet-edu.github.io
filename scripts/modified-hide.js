let keyForHide = ["p","l"]
let keysPressed = [];
    
document.addEventListener("keydown", (event) => {
    if (!keysPressed.includes(event.key)) {
    keysPressed.push(event.key);
    }
  
  // Check which key was pressed
  if (keysPressed.includes(keyForHide[0]) && keysPressed.includes(keyForHide[1])) {
    if (frame) {
    document.style.visibility = 'hidden';
    }
  } 
});

document.addEventListener("keyup", (event) => {
  if (keysPressed.includes(event.key)) {
    const indexOfKey = keysPressed.indexOf(event.key)
  keysPressed.splice(indexOfKey, 1)
    if (frame) {
      document.style.visibility = 'visible';
    }
    }

});
