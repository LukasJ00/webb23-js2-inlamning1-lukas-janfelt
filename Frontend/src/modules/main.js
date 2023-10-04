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
const choicesDisplay = document.getElementById("choices"); 
const highscoreList = document.getElementById('highscore-list');

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
async function playGame(playerChoice) {
  const choices = ["sten", "sax", "påse"];
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];

   // Visa spelarens och datorns val
   choicesDisplay.innerText = `${playerName}: ${playerChoice} | Dator: ${computerChoice}`;

  // Avgör vinnaren
  const winner = determineWinner(playerChoice, computerChoice);
  if (winner === "player") {
    playerScore++;
    // Visa poängen
    playerScoreDisplay.innerText = `${playerName} poäng: ${playerScore}`;
  } else if (winner === "computer") {
    computerScore++;
    
  }
  // Kolla om datorn vann
  if (computerScore >= 1) {
    showWinner("Dator");

  }
}

// Funktion för att visa vinnaren och starta om spelet efter 3 sekunder
async function showWinner(winnerName) {
  computerWins.innerText = `${winnerName} vann 😢 försök igen`;
  setTimeout(() => {
    postPlayerData(playerName, playerScore);
    resetGame();
    computerWins.innerText = "";
  }, 3000); 
 
}

// Funktion för att återställa spelet
function resetGame() {
  playerScore = 0;
  computerScore = 0;
  computerWins.innerText = "";
  playerScoreDisplay.innerText = `${playerName} poäng: ${playerScore}`;
  choicesDisplay.innerText = "";
}

/// Anropa updateHighscore-funktionen när spelet är klart
async function postPlayerData(playerName, playerScore) {
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
      await updateHighscoreList(); // Uppdatera highscore-listan efter att poängen har sparats
    } else {
      console.error('Kunde inte uppdatera highscore');
    }
  } catch (error) {
    console.error('Något gick fel:', error);
  }
}

// Ladda och visa highscore-listan när sidan laddas
async function updateHighscoreList() {
 
  try {
    const highscores = await getHighscores();
    displayScoreList(highscores);
} catch (error) {
    console.error('Ett fel uppstod:', error);
}
}

// Additional code for displaying highscore list
async function getHighscores() {
  try {
      const response = await fetch('http://localhost:4000/highscore');
      if (response.ok) {
          const highscores = await response.json();
          return highscores;
      } else {
          console.error('Fel vid hämtning av highscore-lista');
          return [];
      }
  } catch (error) {
      console.error('Ett fel uppstod:', error);
      return [];
  }
}

// Hämta highscore-listan
window.addEventListener('load', async () => {
  const highscores = await getHighscores();
  displayScoreList(highscores);
});

// Visa highscore-listan 
function displayScoreList(scoreArray) {
  highscoreList.innerHTML = ''; 
  for (const scores of scoreArray) {
      const { name, score } = scores; 
      const li = document.createElement("li");
      li.innerText = `${name}: ${score}`; 
      highscoreList.appendChild(li);
  }
}