const express = require('express')
const app = express()
const port = 3300

app.get('/', (req, res) => {
    res.send('<h1>Hello World! Node App</h1>')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})