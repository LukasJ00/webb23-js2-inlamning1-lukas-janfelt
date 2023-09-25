// const express = require("express"); //Importera biblioteket
// const app = express(); //Initiera servern

// app.use( express.json() );

// //Vid en GET request till endpoint ‘/’
// app.get('/', (request, response)=>{
//     console.log(request.body);
//     response.send('TEST'); //Ett response med text skickas tillbaka
// })

// app.post('/names', (req, res)=>{
//     console.log(req.body);
//     const names = req.body.names;
//     res.send('New name posted'+ JSON.stringify(req.body));

// })

// app.put('/calc', (requ, resp)=>{
//     console.log(requ.body.number);
//     const num = requ.body.number;
//     resp.send(num + ' times 10 equals to ' + (num*10));

// })


const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

// ... CORS- och GET-highscore-routen (som tidigare) ...

app.post('/highscore', (req, res) => {
  console.log('POST request received at /highscore');

  try {
    const { name, points } = req.body;
    const rawHighscore = fs.readFileSync("./data/highscore.json");
    const highscoreArray = JSON.parse(rawHighscore);

    // Lägg till spelarens namn och poäng i highscore-listan
    highscoreArray.push({ name, points });

    // Sortera highscore-listan efter poäng i fallande ordning
    highscoreArray.sort((a, b) => b.points - a.points);

    // Begränsa highscore-listan till de fem bästa
    const top5Highscore = highscoreArray.slice(0, 5);

    // Skriv den uppdaterade highscore-listan till filen
    fs.writeFileSync("./data/highscore.json", JSON.stringify(top5Highscore, null, 2));

    // Skicka tillbaka den uppdaterade highscore-listan som svar
    res.json(top5Highscore);
  } catch (error) {
    console.error('Error updating highscore:', error);
    res.status(500).json({ error: 'Could not update highscore' });
  }
});

app.listen(4000, () => { //Lyssna på port 4000
    console.log("Listening on port 4000 ...");
  });