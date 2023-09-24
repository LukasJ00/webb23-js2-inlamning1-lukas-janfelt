const express = require("express"); //Importera biblioteket
const app = express(); //Initiera servern

app.use( express.json() );

app.listen(4000, () => { //Lyssna på port 3000
  console.log("Listening on port 4000 ...");
});


//Vid en GET request till endpoint ‘/’
app.get('/', (request, response)=>{
    console.log(request.body);
    response.send('TEST'); //Ett response med text skickas tillbaka
})

app.post('/names', (req, res)=>{
    console.log(req.body);
    const names = req.body.names;
    res.send('New name posted'+ JSON.stringify(req.body));

})

app.put('/calc', (requ, resp)=>{
    console.log(requ.body.number);
    const num = requ.body.number;
    resp.send(num + ' times 10 equals to ' + (num*10));

})