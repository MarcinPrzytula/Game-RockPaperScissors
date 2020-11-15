const hands = [...document.querySelectorAll("div.select img")];
const buttonPlay = document.querySelector("button.play")

const scoreBoard = {
    numberOfGames: 0,
    numberOfWins: 0,
    numberOfLosses: 0,
    numberOfDraws: 0,
}

const game = {
    playerChoice: "",
    aiChoice: "",
}

//Wybór dłoni gracza
const handSelection = (e) => {
    game.playerChoice = e.target.dataset.option;
    hands.forEach((hand) => {
        hand.style.border = "";
        e.target.style.border = "4px solid red";
    })
}
hands.forEach((hand) => {
    hand.addEventListener("click", handSelection)
})

//Wybór dłoni komputera - losowy
const aiChoice = () => {
    return hands[(Math.floor(Math.random() * 3))].dataset.option;
}

// Sprawdzanie wyniku
const checkResult = (p, k) => {

    if (p === k) {
        return "draw";
    } else if ((p === "papier" && k === "kamień") || (p === "kamień" && k === "nożyczki") || (p === "nożyczki" && k === "papier")) {
        return "win";
    } else {
        return "loss";
    }
}
//Tablica wyników (lewa i prawa)
const scoreView = (player, ai, result) => {

    document.querySelector('[data-view="player"]').textContent = player;
    document.querySelector('[data-view="ai"]').textContent = ai;
    document.querySelector('[data-view="numberOfAllGames"]').textContent = ++scoreBoard.numberOfGames;
    if (result === "win") {
        document.querySelector('[data-view="winner"]').textContent = "Wygrałeś :)";
        document.querySelector('[data-view="winner"]').style.color = "green";
        document.querySelector('[data-view="numberOfWins"]').textContent = ++scoreBoard.numberOfWins;
    } else if (result === "draw") {
        document.querySelector('[data-view="winner"]').textContent = "Remis :|";
        document.querySelector('[data-view="winner"]').style.color = "orange";
        document.querySelector('[data-view="numberOfDraws"]').textContent = ++scoreBoard.numberOfDraws;
    } else {
        document.querySelector('[data-view="winner"]').textContent = "Przegrałeś :(";
        document.querySelector('[data-view="winner"]').style.color = "red";
        document.querySelector('[data-view="numberOfLosses"]').textContent = ++scoreBoard.numberOfLosses;
    }

};

const endGame = () => {
    game.playerChoice = "";
    game.aiChoice = "";
    hands.forEach((hand) => {
        hand.style.border = "";
    })

}

//Wciśnięcie przysiku Let'S Play!
const playGame = () => {

    if (game.playerChoice === "") {
        return alert("Wybierz dłoń!")
    }

    game.aiChoice = aiChoice();
    scoreView(game.playerChoice, game.aiChoice, checkResult(game.playerChoice, game.aiChoice));
    endGame()
}
buttonPlay.addEventListener("click", playGame);