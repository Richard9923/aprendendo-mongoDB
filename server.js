
require('dotenv').config()
const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3000;

const app = express();

app.listen(PORT, () => {
    console.log(`The server is running on PORT: ${PORT}`)
})

app.get('/', (req, res) => {
    res.send('Hello from node API');
})
