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

  // Efter att du har ökat spelarens poäng
  // Kolla om spelaren har nått poängtröskeln för att uppdatera highscore
  const highscoreUpdateThreshold = 1; // Ändra detta värde för att inkludera spelare med minst ett poäng
  if (playerScore >= highscoreUpdateThreshold) {
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

// Anropa updateHighscore-funktionen när spelaren når hög poäng
async function updateHighscore(playerName, playerScore) {
  const url = 'http://localhost:4000/newscore';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: playerName, score: playerScore }),
    });

    if (response.ok) {
      console.log('Highscore uppdaterad');
      // Observera att vi inte använder highscoreArray här
      // eftersom vi inte har den uppdaterade listan när vi anropar denna funktion
    } else {
      console.error('Kunde inte uppdatera highscore');
    }
  } catch (error) {
    console.error('Något gick fel:', error);
  }
}

// Ladda och visa highscore-listan när sidan laddas
async function getHighscore() {
  const url = 'http://localhost:4000/highscore';

  try {
    const response = await fetch(url);
    if (response.ok) {
      const highscore = await response.json();
      displayHighscore(highscore);
    } else {
      console.error('Kunde inte hämta highscore');
    }
  } catch (error) {
    console.error('Något gick fel:', error);
  }
}

// Funktion för att visa highscore-listan
function displayHighscore(highscoreArray) {
  const highscoreListElement = document.getElementById("highscore-list");

  // Rensa tidigare highscore-lista
  highscoreListElement.innerHTML = "";

  for (const highscore of highscoreArray) {
    const { name, score } = highscore;

    const p = document.createElement("p");
    p.innerText = `${name}: ${score}`;

    // Lägg till p-elementet i highscore-listan
    highscoreListElement.appendChild(p);
  }
}

  getHighscore();
