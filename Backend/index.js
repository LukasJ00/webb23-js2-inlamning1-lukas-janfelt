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

app.get('/movie', (req, res)=>{
    console.log('Get request received at /movies');

    const rawMovies = fs.readFileSync("./data/movies.json");
    const movieArray = JSON.parse(rawMovies);
    console.log(movieArray);

    res.send(movieArray);
})

app.listen(4000, () => { //Lyssna på port 3000
    console.log("Listening on port 4000 ...");
  });