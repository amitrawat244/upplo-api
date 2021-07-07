var express = require('express');

var app = express();

const port = 3300

app.use(express.json());

let changeddate = 0;
app.get('/', (req, res) => {
    console.log("GET");
    res.send(`File Changed: ${changeddate}`)
})

app.get('/clear', (req, res) => {
    console.log("GET");
    changeddate = 0;
    res.send(`File Changed: ${changeddate}`)
})

app.post('/notification', (req, res) => {
    console.log(req.body);
    data = req.body;
    changeddate = Date(Date.now());
    res.send('ok')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})