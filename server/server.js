const path = require('path')
const express = require('express');
const app = express()
const publicPath = path.join(__dirname, '..', 'public')
const port = process.env.PORT || 3000 //if the port exists, default to 3000 if not

app.use(express.static(publicPath))

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'))
})

app.listen(port, () => {
    console.log('server is up')
})