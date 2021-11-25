const express = require("express");
const Product = require("../models/Product.js")
const asyncHandler = require("express-async-handler")

const router = express.Router();

//fetch all products

router.get("/", asyncHandler(async(req, res) => {
    const products = await Product.find({})
    res.json(products)
}));

//get product by id

router.get("/:id", asyncHandler(async(req, res) => {
    const {id }= req.params
    const product = await Product.findById(id)
    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error("Product not found")
    }
}));

module.exports = router