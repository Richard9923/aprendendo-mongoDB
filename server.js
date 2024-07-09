
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

app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello from node API');
});

app.get('/api/products', async (req, res) => {
    try {
       const products = await Product.find({});
       res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.get('/api/product/:id', async(req, res) => {

    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.post('/api/products', async (req, res) => {
    // console.log(req.body);
    // res.send(req.body);
    try {
      const product = await Product.create(req.body);
      res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
})

// update a product

app.put('/api/product/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);

        if (!product) {
            return res.status(404).json({message: "Product not found"});
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(product);


    } catch (error) {
        req.status(500).json({message: error.message});
    }
})

app.delete('/api/product/id:', async (req, res) => {
    try {
        const {id} = req.params;

        const product = await Product.findByIdAndDelete(id);
        
        if (!product) {
            return res.status(404).json({message: "Product not found"});
        }
        res.status(200).json({message: "Product deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
    
})



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


