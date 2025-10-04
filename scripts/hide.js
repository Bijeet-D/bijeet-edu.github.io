let hideKeys = ["p", l]

let map = {};  // keys pressed object

onkeydown = onkeyup = function(e) {
  e = e || event; // fallback for old browsers idk whose acually gonna be on one but who cares
  map[e.key] = (e.type === "keydown"); 
  /* insert conditional here */
};


if (map[hideKeys[0]] && map[hideKeys[1]]) {
  document.body.style.visibility = 'hidden'; // hide the whole body
} else {
  document.body.style.visibility = 'visible'; // show it again
}

