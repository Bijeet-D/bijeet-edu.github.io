const frame = document.getElementById("sign-in")
  const frameOGZIndex = frame.style.zIndex
  let keyForHide = "Alt"

document.addEventListener("keydown", (event) => {
  // Check which key was pressed
  if (event.key === keyForHide) {
    frame.style.zIndex = -1
  } 
});

document.addEventListener("keyup", (event) => {
  if (event.key === keyForHide) {
    frame.style.zIndex = frameOGZIndex
  } 
});


