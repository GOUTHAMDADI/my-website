/* ==========================================
   GAME HUB
========================================== */


/* ==========================================
   MAIN ELEMENTS
========================================== */

const exploreBtn =
    document.getElementById("exploreBtn");

const randomBtn =
    document.getElementById("randomBtn");

const playNowBtn =
    document.getElementById("playNowBtn");

const searchInput =
    document.getElementById("searchInput");

const categoryFilter =
    document.getElementById("categoryFilter");

const noGames =
    document.getElementById("noGames");


/* ==========================================
   MODAL
========================================== */

const modal =
    document.getElementById("gameModal");

const closeModal =
    document.getElementById("closeModal");

const gameHome =
    document.getElementById("gameHome");

const startGameBtn =
    document.getElementById("startGameBtn");

const modalTitle =
    document.getElementById("modalTitle");

const modalDescription =
    document.getElementById("modalDescription");

const modalIcon =
    document.getElementById("modalIcon");


const neoLightsGame =
    document.getElementById("neoLightsGame");

const memoryGame =
    document.getElementById("memoryGame");

const tapGame =
    document.getElementById("tapGame");


/* ==========================================
   GAME DATA
========================================== */

const games = {

    "neo-lights": {

        title: "Neo Lights",

        icon: "⚡",

        description:
            "Click the glowing light as quickly as possible!"

    },


    "memory": {

        title: "Memory Flip",

        icon: "🧠",

        description:
            "Find all matching pairs."

    },


    "quick-tap": {

        title: "Quick Tap",

        icon: "👆",

        description:
            "Tap as many times as possible in 10 seconds."

    }

};


let currentGame = null;


/* ==========================================
   OPEN GAME
========================================== */

function openGame(gameName) {

    if (!games[gameName]) {

        console.error(
            "Game not found:",
            gameName
        );

        return;
    }


    currentGame = gameName;


    const game =
        games[gameName];


    modalTitle.textContent =
        game.title;

    modalIcon.textContent =
        game.icon;

    modalDescription.textContent =
        game.description;


    gameHome.style.display =
        "block";


    neoLightsGame.style.display =
        "none";

    memoryGame.style.display =
        "none";

    tapGame.style.display =
        "none";


    modal.classList.add("show");

}


/* ==========================================
   CLOSE GAME
========================================== */

function closeGame() {

    modal.classList.remove("show");

    stopAllGames();

    currentGame = null;

}


/* ==========================================
   CLOSE BUTTON
========================================== */

closeModal.addEventListener(
    "click",
    closeGame
);


/* ==========================================
   CLICK OUTSIDE MODAL
========================================== */

modal.addEventListener(
    "click",
    function(event) {

        if (event.target === modal) {

            closeGame();

        }

    }
);


/* ==========================================
   ESCAPE KEY
========================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeGame();

        }

    }
);


/* ==========================================
   GAME CARD BUTTONS
========================================== */

document
    .querySelectorAll(".play-game")
    .forEach(function(button) {

        button.addEventListener(
            "click",
            function() {

                openGame(
                    this.dataset.game
                );

            }
        );

    });


/* ==========================================
   START GAME
========================================== */

startGameBtn.addEventListener(
    "click",
    function() {

        gameHome.style.display =
            "none";


        if (
            currentGame ===
            "neo-lights"
        ) {

            startNeoLights();

        }


        else if (
            currentGame ===
            "memory"
        ) {

            startMemoryGame();

        }


        else if (
            currentGame ===
            "quick-tap"
        ) {

            startTapGame();

        }

    }
);


/* ==========================================
   SEARCH
========================================== */

function filterGames() {

    const search =
        searchInput.value
            .toLowerCase()
            .trim();


    const category =
        categoryFilter.value;


    const cards =
        document.querySelectorAll(
            ".game-card"
        );


    let visibleGames = 0;


    cards.forEach(
        function(card) {

            const name =
                card.dataset.name
                    .toLowerCase();


            const cardCategory =
                card.dataset.category;


            const matchesSearch =
                name.includes(search);


            const matchesCategory =
                category === "all" ||
                cardCategory === category;


            if (
                matchesSearch &&
                matchesCategory
            ) {

                card.style.display =
                    "block";

                visibleGames++;

            }

            else {

                card.style.display =
                    "none";

            }

        }
    );


    if (visibleGames === 0) {

        noGames.style.display =
            "block";

    }

    else {

        noGames.style.display =
            "none";

    }

}


searchInput.addEventListener(
    "input",
    filterGames
);


categoryFilter.addEventListener(
    "change",
    filterGames
);


/* ==========================================
   EXPLORE
========================================== */

function scrollToGames() {

    document
        .getElementById("games")
        .scrollIntoView({
            behavior: "smooth"
        });

}


exploreBtn.addEventListener(
    "click",
    scrollToGames
);


playNowBtn.addEventListener(
    "click",
    scrollToGames
);


/* ==========================================
   RANDOM GAME
========================================== */

randomBtn.addEventListener(
    "click",
    function() {

        const gameNames =
            Object.keys(games);


        const randomIndex =
            Math.floor(
                Math.random() *
                gameNames.length
            );


        openGame(
            gameNames[randomIndex]
        );

    }
);


/* ==========================================
   NEO LIGHTS
========================================== */

const neoBoard =
    document.getElementById(
        "neoBoard"
    );


const neoScore =
    document.getElementById(
        "neoScore"
    );


const neoTime =
    document.getElementById(
        "neoTime"
    );


const neoMessage =
    document.getElementById(
        "neoMessage"
    );


let neoScoreValue = 0;

let neoTimeValue = 30;

let neoActive = -1;

let neoTimer = null;

let neoLightTimer = null;

let neoRunning = false;


/* CREATE BOARD */

function createNeoBoard() {

    neoBoard.innerHTML = "";


    for (
        let i = 0;
        i < 16;
        i++
    ) {

        const light =
            document.createElement(
                "div"
            );


        light.classList.add(
            "neo-light"
        );


        light.dataset.index =
            i;


        light.addEventListener(
            "click",
            function() {

                if (!neoRunning) {

                    return;

                }


                if (
                    Number(
                        this.dataset.index
                    ) === neoActive
                ) {

                    neoScoreValue += 10;


                    neoScore.textContent =
                        neoScoreValue;


                    this.classList.remove(
                        "active"
                    );


                    neoMessage.textContent =
                        "🔥 NICE!";


                    activateNeoLight();

                }

                else {

                    neoScoreValue =
                        Math.max(
                            0,
                            neoScoreValue - 5
                        );


                    neoScore.textContent =
                        neoScoreValue;


                    neoMessage.textContent =
                        "❌ Wrong light!";

                }

            }
        );


        neoBoard.appendChild(
            light
        );

    }

}


/* ACTIVATE LIGHT */

function activateNeoLight() {

    if (!neoRunning) {

        return;

    }


    const lights =
        document.querySelectorAll(
            ".neo-light"
        );


    lights.forEach(
        function(light) {

            light.classList.remove(
                "active"
            );

        }
    );


    neoActive =
        Math.floor(
            Math.random() *
            lights.length
        );


    lights[
        neoActive
    ].classList.add(
        "active"
    );


    clearTimeout(
        neoLightTimer
    );


    neoLightTimer =
        setTimeout(
            function() {

                if (neoRunning) {

                    lights[
                        neoActive
                    ].classList.remove(
                        "active"
                    );


                    activateNeoLight();

                }

            },
            850
        );

}


/* START NEO LIGHTS */

function startNeoLights() {

    neoLightsGame.style.display =
        "block";


    neoScoreValue = 0;

    neoTimeValue = 30;


    neoScore.textContent =
        "0";

    neoTime.textContent =
        "30";


    neoMessage.textContent =
        "Click the glowing light!";


    neoRunning = true;


    createNeoBoard();

    activateNeoLight();


    clearInterval(
        neoTimer
    );


    neoTimer =
        setInterval(
            function() {

                neoTimeValue--;


                neoTime.textContent =
                    neoTimeValue;


                if (
                    neoTimeValue <= 0
                ) {

                    endNeoLights();

                }

            },
            1000
        );

}


/* END NEO LIGHTS */

function endNeoLights() {

    neoRunning = false;


    clearInterval(
        neoTimer
    );


    clearTimeout(
        neoLightTimer
    );


    document
        .querySelectorAll(
            ".neo-light"
        )
        .forEach(
            function(light) {

                light.classList.remove(
                    "active"
                );

            }
        );


    neoMessage.textContent =
        "🎮 GAME OVER! Score: " +
        neoScoreValue;

}


/* ==========================================
   MEMORY FLIP
========================================== */

const memoryBoard =
    document.getElementById(
        "memoryBoard"
    );


const memoryMoves =
    document.getElementById(
        "memoryMoves"
    );


const memorySymbols = [

    "🍎",
    "🍌",
    "🍒",
    "🍇",
    "🍉",
    "🥝",

    "🍎",
    "🍌",
    "🍒",
    "🍇",
    "🍉",
    "🥝"

];


let memoryFirst = null;

let memorySecond = null;

let memoryLocked = false;

let memoryMoveCount = 0;


/* START MEMORY */

function startMemoryGame() {

    memoryGame.style.display =
        "block";


    memoryBoard.innerHTML =
        "";


    memoryFirst = null;

    memorySecond = null;

    memoryLocked = false;

    memoryMoveCount = 0;


    memoryMoves.textContent =
        "0";


    const shuffled =
        [...memorySymbols]
            .sort(
                () =>
                    Math.random() -
                    0.5
            );


    shuffled.forEach(
        function(symbol) {

            const card =
                document.createElement(
                    "div"
                );


            card.classList.add(
                "memory-card"
            );


            card.dataset.symbol =
                symbol;


            card.textContent =
                "?";


            card.addEventListener(
                "click",
                function() {

                    flipMemoryCard(
                        this
                    );

                }
            );


            memoryBoard.appendChild(
                card
            );

        }
    );

}


/* FLIP CARD */

function flipMemoryCard(card) {

    if (
        memoryLocked ||
        card === memoryFirst ||
        card.classList.contains(
            "flipped"
        )
    ) {

        return;

    }


    card.classList.add(
        "flipped"
    );


    card.textContent =
        card.dataset.symbol;


    if (!memoryFirst) {

        memoryFirst =
            card;

        return;

    }


    memorySecond =
        card;


    memoryMoveCount++;


    memoryMoves.textContent =
        memoryMoveCount;


    if (
        memoryFirst.dataset.symbol ===
        memorySecond.dataset.symbol
    ) {

        memoryFirst = null;

        memorySecond = null;

        checkMemoryWin();

    }

    else {

        memoryLocked = true;


        setTimeout(
            function() {

                memoryFirst.classList.remove(
                    "flipped"
                );


                memorySecond.classList.remove(
                    "flipped"
                );


                memoryFirst.textContent =
                    "?";


                memorySecond.textContent =
                    "?";


                memoryFirst = null;

                memorySecond = null;

                memoryLocked = false;

            },
            700
        );

    }

}


/* MEMORY WIN */

function checkMemoryWin() {

    const cards =
        document.querySelectorAll(
            ".memory-card"
        );


    const flipped =
        document.querySelectorAll(
            ".memory-card.flipped"
        );


    if (
        cards.length ===
        flipped.length
    ) {

        setTimeout(
            function() {

                alert(
                    "🎉 You won Memory Flip in " +
                    memoryMoveCount +
                    " moves!"
                );

            },
            200
        );

    }

}


/* ==========================================
   QUICK TAP
========================================== */

const tapButton =
    document.getElementById(
        "tapButton"
    );


const tapScore =
    document.getElementById(
        "tapScore"
    );


const tapTime =
    document.getElementById(
        "tapTime"
    );


let tapScoreValue = 0;

let tapTimeValue = 10;

let tapTimer = null;

let tapRunning = false;


/* START TAP */

function startTapGame() {

    tapGame.style.display =
        "block";


    tapScoreValue = 0;

    tapTimeValue = 10;


    tapScore.textContent =
        "0";


    tapTime.textContent =
        "10";


    tapRunning = true;


    clearInterval(
        tapTimer
    );


    tapTimer =
        setInterval(
            function() {

                tapTimeValue--;


                tapTime.textContent =
                    tapTimeValue;


                if (
                    tapTimeValue <= 0
                ) {

                    endTapGame();

                }

            },
            1000
        );

}


/* TAP BUTTON */

tapButton.addEventListener(
    "click",
    function() {

        if (!tapRunning) {

            return;

        }


        tapScoreValue++;


        tapScore.textContent =
            tapScoreValue;

    }
);


/* END TAP */

function endTapGame() {

    tapRunning = false;


    clearInterval(
        tapTimer
    );


    tapTime.textContent =
        "0";


    alert(
        "🔥 TIME UP!\n\n" +
        "Your score: " +
        tapScoreValue
    );

}


/* ==========================================
   STOP ALL GAMES
========================================== */

function stopAllGames() {

    neoRunning = false;


    clearInterval(
        neoTimer
    );


    clearTimeout(
        neoLightTimer
    );


    tapRunning = false;


    clearInterval(
        tapTimer
    );

}


/* ==========================================
   DONE
========================================== */

console.log(
    "🎮 Game Hub loaded successfully!"
);
