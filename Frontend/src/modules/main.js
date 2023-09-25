// Grundvärden vid omstart
let playerScore = 0;
let computerScore = 0;
let playerName = "";

// Hämta alla HTML-element
const playerNameInput = document.getElementById("player-name");
const rockButton = document.getElementById("rockBtn");
const scissorsButton = document.getElementById("scissorsBtn");
const paperButton = document.getElementById("paperBtn");
const playerScoreDisplay = document.getElementById("playerScore");
const computerWins = document.getElementById("computerWins");
const highscoreListContainer = document.getElementById("highscore-list"); // Lägg till referens till highscore-listans container

// Namninput event
playerNameInput.addEventListener("input", (event) => {
  playerName = event.target.value;
});

// Knappklick event
rockButton.addEventListener("click", (event) => {
  event.preventDefault();
  playGame("sten");
});
scissorsButton.addEventListener("click", (event) => {
  event.preventDefault();
  playGame("sax");
});
paperButton.addEventListener("click", (event) => {
  event.preventDefault();
  playGame("påse");
});

// Regler
function determineWinner(playerChoice, computerChoice) {
  if (
    (playerChoice === "sten" && computerChoice === "sax") ||
    (playerChoice === "sax" && computerChoice === "påse") ||
    (playerChoice === "påse" && computerChoice === "sten")
  ) {
    return "player";
  } else if (
    (playerChoice === "sax" && computerChoice === "sten") ||
    (playerChoice === "påse" && computerChoice === "sax") ||
    (playerChoice === "sten" && computerChoice === "påse")
  ) {
    return "computer";
  } else {
    return "tie";
  }
}

function playGame(playerChoice) {
  const choices = ["sten", "sax", "påse"];
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];

  // Visa spelarens och datorns val
  document.getElementById("choices").innerText = `${playerName}: ${playerChoice} | Dator: ${computerChoice}`;

  // Uppdatera poängen baserat på vinnare
  const winner = determineWinner(playerChoice, computerChoice);
  if (winner === "player") {
    playerScore++;
  } else if (winner === "computer") {
    computerScore++;
  }

  // Visa poängen
  playerScoreDisplay.innerText = `${playerName} poäng: ${playerScore}`;

  // Kolla om datorn har vunnit
  if (computerScore >= 1) {
    showWinner("Dator");
  }
}

// Visa vinnaren
function showWinner(winnerName) {
  computerWins.innerText = `${winnerName} vann 😢 försök igen`;

  // Anropa funktionen för att hämta och visa highscore-listan
  getHighscore();
}

// Funktion för att posta highscore till servern
async function postHighscore(playerName, playerScore) {
  const url = "http://localhost:4000/highscore";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ playerName, score: playerScore }), // Skicka spelarens namn och poäng till servern
  });

  if (response.status === 200) {
    console.log("Highscore uppdaterad");
  } else {
    console.error("Något gick fel när highscore skulle uppdateras");
  }
}

// Funktion som anropas när spelet är över och resultatet ska sparas i highscore-listan
async function restartGame() {
  // Anropa postHighscore för att spara resultatet i highscore-listan
  await postHighscore(playerName, playerScore);

  playerScore = 0;
  computerScore = 0;
  computerWins.innerText = ""; // Rensa meddelandet "Datorn vann"
  playerScoreDisplay.innerText = `${playerName} poäng: ${playerScore}`;
  document.getElementById("choices").innerText = "";
}

// Funktion för att hämta och visa highscore-listan
async function getHighscore() {
  const url = "http://localhost:4000/highscore";

  const response = await fetch(url);
  const highscoreArray = await response.json();

  // Rensa highscore-listans container innan du fyller den med nya resultat
  highscoreListContainer.innerHTML = "";

  // Kolla om det finns några highscores att visa
  if (highscoreArray && highscoreArray.length > 0) {
    highscoreArray.forEach((highscore, index) => {
      const { name, score } = highscore;

      // Skapa ett li-element för varje highscore
      const listItem = document.createElement("li");
      listItem.innerText = `${index + 1}. ${name}: ${score}`;
      highscoreListContainer.appendChild(listItem);
    });
  } else {
    // Om det inte finns några highscores, visa ett meddelande
    const noHighscoreItem = document.createElement("li");
    noHighscoreItem.innerText = "Inga high scores tillgängliga.";
    highscoreListContainer.appendChild(noHighscoreItem);
  }
}

// Hämta highscore-listan när sidan laddas
getHighscore();