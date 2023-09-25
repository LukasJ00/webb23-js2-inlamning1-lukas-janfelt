const express = require("express"); //Importerar express från mode_modules
const fs = require("fs");

const app = express();
app.use(express.json()); //tala om att vi ska hantera data i json-format
app.use(function (req, res, next) {
  //Tillåt requests från alla origins
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get('/highscore', (req, res)=>{
    console.log('Get request received at /highscore');

    const rawHighscore = fs.readFileSync("./data/highscore.json");
    const highscoreArray = JSON.parse(rawHighscore);
    console.log(highscoreArray);

    res.send(highscoreArray);
})

app.listen(4000, () => {
  console.log("Listening on port 4000 ...");
});














// const express = require("express");
// const fs = require("fs");
// const cors = require("cors"); // Lägg till Cors-paketet

// const app = express();
// app.use(express.json());

// // Konfigurera CORS för att tillåta begäranden från din frontend-domän
// app.use(cors({
//   origin: '*' // Kan användas av alla domäneer
// }));

// app.get('/', (req, res) => {
//   console.log('Get request received at /');

//   const rawHighscore = fs.readFileSync("./data/highscore.json");
//   const highscoreArray = JSON.parse(rawHighscore);
//   console.log(highscoreArray);

//   res.json(highscoreArray);
// });

// app.post('/highscore', (req, res) => {
//   console.log('POST request received at /highscore');
//   const { playerName, playerScore } = req.body;

//   const highscoreArray = readHighscore();

//   // Lägg till spelarens namn och poäng i highscore-listan
//   highscoreArray.push({ playerName, playerScore });

//   // Sortera highscore-listan efter poäng i fallande ordning
//   highscoreArray.sort((a, b) => b.playerScore - a.playerScore);

//   // Begränsa highscore-listan till de fem bästa
//   const top5Highscore = highscoreArray.slice(0, 5);

//   // Skriv den uppdaterade highscore-listan till filen
//   writeHighscore(top5Highscore);

//   // Skicka tillbaka den uppdaterade highscore-listan som svar
//   res.json(top5Highscore);
// });

// const port = process.env.PORT || 4000;
// app.listen(port, () => {
//   console.log(`Listening on port ${port} ...`);
// });