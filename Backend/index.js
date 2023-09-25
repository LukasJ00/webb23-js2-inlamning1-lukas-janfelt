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

