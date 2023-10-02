const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const port = 4000;

app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

function getHighscores() {
    const rawData = fs.readFileSync(path.join(__dirname, 'data', 'highscore.json'));
    const highscores = JSON.parse(rawData);
    highscores.sort((a, b) => b.score - a.score);
    return highscores;
}

function saveHighscores(highscores) {
    const jsonData = JSON.stringify(highscores);
    fs.writeFileSync(path.join(__dirname, 'data', 'highscore.json'), jsonData);
}


app.get('/highscore', (req, res) => {
    const highscores = getHighscores();
    res.send(highscores);
});


app.post('/highscore', (req, res) => {
    const { name, score } = req.body;
    const highscores = getHighscores();

   
    highscores.push({ name, score });

    highscores.sort((a, b) => b.score - a.score);

    highscores.splice(5);

    saveHighscores(highscores);

    res.json({ highscores });
});


app.listen(port, () => {
    console.log(`Running server ${port}`);
});