const express = require("express");
const Product = require("../models/product.model");
const router = express.Router();
const {getProducts} = require("../controllers/product.controller");
const {getProduct} = require("../controllers/product.controller");
const {createProduct} = require("../controllers/product.controller");
const {deleteProduct} = require("../controllers/product.controller");


router.get('/', getProducts);
router.get('/:id', getProduct);
router.get('/', createProduct);
router.get('/:id', deleteProduct);