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
const computerWins= document.getElementById("computerWins");

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

   //regler
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
  }}

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
      } 
      , 3000);  // 3 sek till omstart
      return
    }
  
  }

    //visa vinnaren
    function showWinner(winnerName) {
      computerWins.innerText = `${winnerName} vann 😢 försök igen`;
    }

    

    function restartGame() {
      playerScore = 0;
      computerScore = 0;
      computerWins.innerText = ""; // Clear the "Datorn vann" message
      playerScoreDisplay.innerText = `${playerName} poäng: ${playerScore}`;
      document.getElementById("choices").innerText = "";
    }

    async function sendHighscore(playerName, playerScore) {
      const url = 'http://localhost:4000/highscore';
    
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: playerName, points: playerScore }),
        });
        const updatedHighscore = await response.json();
    
        // Uppdatera highscore-listan på webbsidan
        displayHighscore(updatedHighscore);
      } catch (error) {
        console.error('Error sending highscore:', error);
      }
    }
    
    // Anropa sendHighscore() med spelarens namn och poäng när spelet är klart
    sendHighscore(playerName, playerScore);