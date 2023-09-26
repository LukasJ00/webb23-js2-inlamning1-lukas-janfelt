// Grundläggande variabler vid omstart
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
const choicesDisplay = document.getElementById("choices"); // Elementet för att visa valen

// Hantera namninput
playerNameInput.addEventListener("input", (event) => {
  playerName = event.target.value;
});

// Hantera knappklick
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

// Funktion för att avgöra vinnaren
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

// Funktion för att spela spelet
function playGame(playerChoice) {
  const choices = ["sten", "sax", "påse"];
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];

  // Visa spelarens och datorns val
  choicesDisplay.innerText = `${playerName}: ${playerChoice} | Dator: ${computerChoice}`;

  // Avgör vinnaren
  const winner = determineWinner(playerChoice, computerChoice);
  if (winner === "player") {
    playerScore++;
  } else if (winner === "computer") {
    computerScore++;
  }

  // Visa poängen
  playerScoreDisplay.innerText = `${playerName} poäng: ${playerScore}`;

  // Kolla om datorn vann
  if (computerScore >= 1) {
    showWinner("Dator");
  }

  // Kolla om spelaren har en hög poäng och bör uppdatera highscore-listan
  const highscoreUpdateThreshold = 5; // Justera tröskelvärdet efter dina preferenser
  if (playerScore > highscoreUpdateThreshold) {
    // Kontrollera att playerName och playerScore har värden innan du anropar updateHighscore
    if (playerName && playerScore) {
      updateHighscore(playerName, playerScore);
    } else {
      console.error("Ogiltigt namn eller poängvärde");
    }
  }
}

// Funktion för att visa vinnaren och starta om spelet efter 3 sekunder
function showWinner(winnerName) {
  computerWins.innerText = `${winnerName} vann 😢 försök igen`;

  // Återställ spelet efter 3 sekunder
  setTimeout(() => {
    resetGame();
  }, 3000); // 3000 millisekunder = 3 sekunder
}

// Funktion för att återställa spelet
function resetGame() {
  playerScore = 0;
  computerScore = 0;
  computerWins.innerText = "";
  playerScoreDisplay.innerText = `${playerName} poäng: ${playerScore}`;
  choicesDisplay.innerText = "";
}

async function updateHighscore(playerName, playerScore) {
  if (!playerName || !playerScore) {
    console.error("Ogiltigt namn eller poängvärde");
    return;
  }

  const url = 'http://localhost:4000/highscore';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ playerName, playerScore }),
    });

    if (response.status === 200) {
      console.log('Highscore uppdaterad');
      // Ladda om highscore-listan efter att den har uppdaterats
      loadHighscore();
    } else {
      console.error('Något gick fel när highscore skulle uppdateras. Statuskod:', response.status);
    }
  } catch (error) {
    console.error('Något gick fel:', error);
  }
}

// Funktion för att ladda in highscore-listan när sidan laddas
async function loadHighscore() {
  const url = 'http://localhost:4000/highscore';

  try {
    const response = await fetch(url);
    const highscore = await response.json();

    displayHighscore(highscore);
  } catch (error) {
    console.error('Något gick fel:', error);
  }
}

// Funktion för att visa highscore-listan i HTML
function displayHighscore(highscoreArray) {
  const highscoreListContainer = document.getElementById("highscore-list");
  highscoreListContainer.innerHTML = "";

  if (highscoreArray && highscoreArray.length > 0) {
    highscoreArray.forEach((highscore, index) => {
      const { playerRank, playerName, playerScore } = highscore;

      const listItem = document.createElement("li");
      listItem.innerText = `${playerRank}. ${playerName}: ${playerScore}`;
      highscoreListContainer.appendChild(listItem);
    });
  } else {
    const noHighscoreItem = document.createElement("li");
    noHighscoreItem.innerText = "Ingen highscore tillgänglig.";
    highscoreListContainer.appendChild(noHighscoreItem);
  }
}

// Ladda in highscore-listan när sidan laddas
loadHighscore();
updateHighscore(playerName, playerScore);
console.log('playerName:', playerName);
console.log('playerScore:', playerScore);