const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let highscoreArray = [];

app.use(function (req, res, next) {
  // Tillåt requests från alla origins
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Läs in highscore-listan när servern startar
try {
  const rawHighscore = fs.readFileSync("./data/highscore.json");
  highscoreArray = JSON.parse(rawHighscore);
} catch (error) {
  console.error("Kunde inte ladda highscore-listan från filen:", error);
}

app.get('/highscore', (req, res) => {
  console.log('Get request received at /highscore');
  console.log(highscoreArray);

  res.send(highscoreArray);
})

app.post('/newscore', (req, res) => {
  console.log('Post request received at /newscore');

  const newHighscore = req.body; // Här förväntar vi oss att klienten skickar { name: 'spelarensNamn', score: 'spelarensPoäng' }

  // Kolla om spelaren redan finns i highscore-listan
  const playerIndex = highscoreArray.findIndex((entry) => entry.name === newHighscore.name);

  if (playerIndex !== -1) {
    // Spelaren finns redan i listan, uppdatera poängen om den nya poängen är högre
    if (newHighscore.score > highscoreArray[playerIndex].score) {
      highscoreArray[playerIndex].score = newHighscore.score;
    }
  } else {
    // Lägg till den nya highscoren i listan om spelaren inte finns där
    highscoreArray.push(newHighscore);
  }

  // Sortera highscore-listan i fallande ordning efter poäng
  highscoreArray.sort((a, b) => b.score - a.score);

  // Begränsa highscore-listan till de bästa 5 resultaten
  highscoreArray.splice(5);

  // Spara den uppdaterade highscore-listan till filen
  fs.writeFileSync('./data/highscore.json', JSON.stringify(highscoreArray));

  res.send('Highscore uppdaterad');
});

app.listen(4000, () => {
  console.log("Listening on port 4000 ...");
});