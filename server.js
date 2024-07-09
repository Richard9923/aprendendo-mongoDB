
require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const { Admin } = require('mongodb');
const Product = require('./models/product.model');
const PORT = process.env.PORT || 3000;
const password = process.env.password;
const user = process.env.user;


const app = express();
// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// routes
app.use("/api/products", productRoute);

app.get('/', (req, res) => {
    res.send('Hello from node API');
});



mongoose.connect(`mongodb+srv://${user}:${password}@backenddb.dgjbbik.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB`)
.then(() => {
    console.log("Connected to database!");
    app.listen(PORT, () => {
        console.log(`The server is running on PORT: ${PORT}`)
    });
})
.catch(() => {
    console.log("Connection failed")
})


