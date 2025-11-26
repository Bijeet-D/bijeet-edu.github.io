async function main() {
        await CreateLessons(); // waits for all buttons to be created


    
    let gameButtonIds = [];
    let gameButtonText = [];
    let searchbar = document.getElementById("SearchGamesInput");


    // add id + text to arrays
    document.querySelectorAll(".lesson-button").forEach(function(button) {
        let id = button.id;
        gameButtonIds.push(id);

        let div = button.querySelector("div");
        let buttonText = div.querySelector(".hover-text").textContent;
        gameButtonText.push(buttonText);
    });

    // change placeholder
    searchbar.placeholder = "Search Games (" + (gameButtonIds.length - 1) + ")";

    // local search function
    function search() {
        let input = searchbar.value.toLowerCase();

        gameButtonText.forEach(function(gameName, i) {
            let gameLower = gameName.toLowerCase();
            let buttonId = gameButtonIds[i];
            let button = document.getElementById(buttonId);

            button.style.display = gameLower.includes(input)
                ? "inline-block"
                : "none";
        });
    }

    // make search available globally
    window.search = search;
}

main();
