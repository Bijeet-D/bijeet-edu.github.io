let gameButtonIds = [];
let gameButtonText = [];
let searchbar = document.getElementById("SearchGamesInput");


//add id + text to arrays

document.querySelectorAll(".lesson-button").forEach(function(button) {
    let id = button.id;
    gameButtonIds.push(id);

    let div = button.querySelector("div");
    let buttonText = div.querySelector(".hover-text").textContent;
    gameButtonText.push(buttonText);
});

// change placeholder to indicate amount of games

searchbar.placeholder = "Search Games (" + gameButtonIds.length - 1 + ")"


function search() {
    let input = searchbar.value.toLowerCase();

    gameButtonText.forEach(function(gameName, i) {
        let gameLower = gameName.toLowerCase(); 
        let buttonId = gameButtonIds[i];
        let button = document.getElementById(buttonId);

        if (gameLower.includes(input)) {
            button.style.display = "inline-block";
        } else {
            button.style.display = "none";
        }
    });
}

