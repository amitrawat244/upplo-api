import express from 'express';
import util from 'util';
import { fileQueue, processQueue } from './bmq.js';

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

app.post('/processjob', (req, res) => {
    processQueue();
    res.send('ok')
})

app.post('/notification', async (req, res) => {
    const fileId = req.headers['x-goog-channel-id'];
    console.log(`channel-id from header -> ${fileId}`);
    if (!fileId) {
        console.log('header missing - |x-goog-channel-id|');
        res.send('file not defined');
        return;
    }
    console.log('Adding job...');
    const result = fileQueue({ fileId });
    console.log(result);
    headers = req.headers;
    changeddate = Date(Date.now());
    res.send('ok')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})