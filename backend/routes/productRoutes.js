const express = require("express");
const {getAllProducts, getProductById} = require("../controllers/product.js");

const router = express.Router();

//fetch all products

router.get("/", getAllProducts);

//get product by id

router.get("/:id", getProductById);

module.exports = router