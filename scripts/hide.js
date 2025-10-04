let hideKeys = ["p", "l"]

let KeysPressed = {};  // keys pressed object

onkeydown = onkeyup = function(e) {
  e = e || event; // fallback for old browsers idk whose acually gonna be on windows 95 on internet explorer and be here but who cares cuz it was in the stack overflow code from like 5 years ago and im too lazy to remove it even though it takes longet to type this 
  KeysPressed[e.key] = (e.type === "keydown"); 

  if (KeysPressed[hideKeys[0]] && KeysPressed[hideKeys[1]]) {
  document.body.style.visibility = 'hidden'; // hide the whole body
} else {
  document.body.style.visibility = 'visible'; // show it again
}

  
};




