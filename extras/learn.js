let vLabel = document.querySelector(".version-label") || {textContent: "1"};
let version = vLabel.textContent
console.log(version)

version = parseFloat(version)

console.log(version)

if (version == 1 || (!version)) {


let divCode = `
    <div class="content">
        <h1>Update Oceanic-gms</h1>
        <p>Minor fixes + analytics tracking</p>
        <button id="download">Download New File</button>

    </div>
`

let div = document.createElement('div')
div.classList = "content"
div.innerHTML = `
<h1>Update Oceanic-gms</h1>
        <p>Minor fixes + analytics tracking</p>
        <button id="download">Download New File</button>
`

let style = document.createElement('style')

// BAD BUNNNNNYYYYY

style.innerHTML = `
body {


        }

         .content {
            position: fixed;
            z-index: 999999;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
            

            width: 50rem;
            height: 30rem;
            background-color: rgb(25, 59, 160);
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            color: aliceblue;
            font-size: larger;
            border-radius: 50px;
             box-shadow: 0px 0px 20px 5px black;
        }

        .content h1 {
            margin: 2px;
        }

        #download {
            width: 10rem;
            height: 3rem;
            background-color: rgb(51, 0, 255);
            color: rgb(217, 217, 217);
            display: flex;
            align-items: center;
            flex-direction: column;
            border-radius: 5px;
            border: none;
            font-size: 18px;
            cursor: pointer;
        }
`

    document.body.appendChild(div)
    document.body.appendChild(style);


        async function fetchCode() {
            let code = await (await fetch("https://raw.githubusercontent.com/Bijeet-D/Ocean-Learn/refs/heads/main/Ocean-Learn-Download.html")).text()
            return code
        }

        async function main() {
            const htmlForDownload = await fetchCode()

            document.querySelector("#download").addEventListener("click", () => {
           const blob = new Blob([htmlForDownload], { type: "text/html" });
            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = "oceanic-gms.html";
            link.click();
            URL.revokeObjectURL(url);
        });

        }
        



        main()

    }






document.querySelector("body > main > h3").innerHTML = 'Thanks to <a href="https://gn-math-t.github.io/">gn-math</a> for the games. All games are sourced from there.'

                    let observer = new MutationObserver((mutations) => {

                for (const mutation of mutations) {


                    try {

                        document.getElementById('I~woke~up~next~to~...-gm-card').remove()
                        document.getElementById('Five~Nights~at~Eps...-gm-card').remove()


                        document.getElementById('Soundboard-gm-card').addEventListener('click', () => {
                            alert("PLEASE DONT ABUSE THE SOUNDBOARD IN CLASS \n \n pls... it isn't funny")
                        })

24
                        observer.disconnect()
                    } catch(e) {}





                }

            })


observer.observe(document.body, {
  childList: true,
  subtree: true
})
