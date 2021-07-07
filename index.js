var express = require('express');

var app = express();

const port = 3300

app.use(express.json());

let data = {};
app.get('/', (req, res) => {
    console.log("GET");
    res.send(data)
})

app.post('/notification', (req, res) => {
    console.log(req.body);
    data = req.body;
    res.send('Post: Hello World! Node App')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})