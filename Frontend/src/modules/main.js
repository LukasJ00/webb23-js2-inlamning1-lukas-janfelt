// grund värden vid omstart
let playerScore = 0;
let computerScore = 0;
let playerName = "";

// Hämta alla Html-element
const playerNameInput = document.getElementById("player-name");
const rockButton = document.getElementById("rockBtn");
const scissorsButton = document.getElementById("scissorsBtn");
const paperButton = document.getElementById("paperBtn");
const playerScoreDisplay = document.getElementById("playerScore");
const computerWins = document.getElementById("computerWins");

// namninput event
playerNameInput.addEventListener("input", (event) => {
  playerName = event.target.value;
});

// knappklick event
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

// regler
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

  // visa spelarens och datorns val
  document.getElementById("choices").innerText = `${playerName}: ${playerChoice} | Dator: ${computerChoice}`;

  // uppdatera poängen baserat på vinnare
  const winner = determineWinner(playerChoice, computerChoice);
  if (winner === "player") {
    playerScore++;
  } else if (winner === "computer") {
    computerScore++;
  }

  // visa poängen
  playerScoreDisplay.innerText = `${playerName} poäng: ${playerScore}`;

  // kolla om datorn vann
  if (computerScore >= 1) {
    showWinner("Dator");
    setTimeout(() => {
      restartGame();
    }, 3000); // 3 sek till omstart
    return;
  }
}

// visa vinnaren
function showWinner(winnerName) {
  computerWins.innerText = `${winnerName} vann 😢 försök igen`;
  displayHighscore(); // Uppdatera highscore-listan när en spelomgång är klar
}

// Funktion för att återställa spelet
function restartGame() {
  playerScore = 0;
  computerScore = 0;
  computerWins.innerText = ""; // Rensa meddelandet "Datorn vann"
  playerScoreDisplay.innerText = `${playerName} poäng: ${playerScore}`;
  document.getElementById("choices").innerText = "";
}

// Funktion som anropas när spelet är över och resultatet ska sparas i highscore-listan
async function gameIsOver() {
  // Anropa postHighscore för att spara resultatet i highscore-listan
  await postHighscore(playerName, playerScore);

  // Återställ spelet
  restartGame();
}

// Funktion för att spara resultatet i highscore-listan
async function postHighscore(playerName, playerScore) {
  const url = 'http://localhost:4000/highscore';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ playerName, playerScore }),
    });

    const highscoreList = await response.json();
    // Uppdatera din highscore-lista i din användargränssnitt om så behövs
  } catch (error) {
    console.error('Error posting highscore:', error);
  }
}

// Funktion för att hämta highscore-listan från servern
async function getHighscore() {
  const url = "http://localhost:4000";

  try {
    const response = await fetch(url);
    const highscoreList = await response.json();
    return highscoreList;
  } catch (error) {
    console.error("Error fetching highscore:", error);
    return [];
  }
}

// Funktion för att visa highscore-listan
async function displayHighscore() {
  const highscoreList = await getHighscore();
  const highscoreListContainer = document.getElementById("highscore-list");

  // Rensa befintliga highscore-listan
  highscoreListContainer.innerHTML = "";

  // Loopa igenom highscore-listan och skapa listelement för varje spelare
  highscoreList.forEach((player, index) => {
    const listItem = document.createElement("li");
    listItem.innerText = `${index + 1}. ${player.playerName}: ${player.playerScore}`;
    highscoreListContainer.appendChild(listItem);
  });
}

// Anropa displayHighscore när sidan laddas och efter att highscore har uppdaterats
displayHighscore();