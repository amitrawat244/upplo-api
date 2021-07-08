const express = require('express');
const util = require('util');

const app = express();

const port = 3300

app.use(express.json());

let headers = {};
let changeddate = 0;
app.get('/', (req, res) => {
    console.log("GET");
    res.send(`File Changed: ${changeddate}
        headers:
        ${util.inspect(headers, { depth: null })}`)
})

app.get('/clear', (req, res) => {
    console.log("GET");
    changeddate = 0;
    headers = {};
    res.send(`File Changed: ${changeddate}`)
})

app.post('/test', (req, res) => {
    console.log(req.headers);
    data = req.body;
    changeddate = Date(Date.now());
    res.send('ok')
})

app.post('/notification', (req, res) => {
    console.log(req.headers);
    headers = req.headers;
    data = req.body;
    changeddate = Date(Date.now());
    res.send('ok')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})