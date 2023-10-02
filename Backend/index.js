const express = require("express");
const fs = require("fs");


const app = express();
const port = 4000;

app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Läs highscores från JSON-fil
function getHighscores() {
  try {
      const rawData = fs.readFileSync("./data/highscore.json");
      const highscores = JSON.parse(rawData);
      highscores.sort((a, b) => b.score - a.score);
      return highscores;
  } catch (error) {
      console.error("Kunde inte ladda highscore-listan från filen:", error);
      return [];
  }
}

// Spara highscores till JSON-fil
function saveHighscores(highscores) {
  try {
      fs.writeFileSync("./data/highscore.json", JSON.stringify(highscores));
  } catch (error) {
      console.error("Gick inte att spara", error);
  }
}

// Hämta highscore-listan
app.get('/highscore', (req, res) => {
  const highscores = getHighscores();
  res.send(highscores);
});


// Lägg till nytt highscore-objekt
app.post('/newscore', (req, res) => {
  const { name, score } = req.body;
  const highscores = getHighscores();
  highscores.push({ name, score });
  highscores.sort((a, b) => b.score - a.score);
  highscores.splice(5);
  saveHighscores(highscores);
  res.json({ highscores });
});

app.listen(port, () => {
    console.log(`Running server on ${port}`);
});