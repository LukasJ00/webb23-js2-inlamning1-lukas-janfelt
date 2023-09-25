const express = require("express");
const fs = require("fs");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

// Sökväg till JSON-filen med highscore-listan
const highscoreFilePath = "./data/highscore.json";

app.get("/highscore", (req, res) => {
  console.log("Get request received at /highscore");
  const rawHighscore = fs.readFileSync(highscoreFilePath);
  const highscoreArray = JSON.parse(rawHighscore);
  console.log(highscoreArray);
  res.send(highscoreArray);
});

app.post("/highscore", (req, res) => {
  const newHighscore = req.body; // Förväntar sig att frontend skickar spelarens namn och poäng
  const rawHighscore = fs.readFileSync(highscoreFilePath);
  let highscoreArray = JSON.parse(rawHighscore);

  // Lägg till det nya poäng-objektet i listan
  highscoreArray.push(newHighscore);

  // Sortera listan i fallande ordning baserat på poängen
  highscoreArray.sort((a, b) => b.score - a.score);

  // Begränsa listan till de högsta 5 poängen
  highscoreArray = highscoreArray.slice(0, 5);

  // Spara den uppdaterade highscore-listan tillbaka i JSON-filen
  fs.writeFileSync(highscoreFilePath, JSON.stringify(highscoreArray, null, 2));

  res.status(200).send({ message: "Highscore uppdaterad" });
});

app.listen(4000, () => {
  console.log("Listening on port 4000 ...");
});

