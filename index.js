var express = require('express');

var app = express();

const port = 3300

app.use(express.json());

let cache = '';
app.get('/', (req, res) => {
    console.log("GET");
    const date = cache ? Date(cache) : '';
    res.send(`File Changed: ${date}`)
})

app.post('/notification', (req, res) => {
    console.log(req.body);
    data = req.body;
    cache = Date.now();
    res.send('ok')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})