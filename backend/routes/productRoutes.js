const express = require("express");
const { auth, admin } = require("../middleware/authMiddleware");
const {
  getAllProducts,
  getProductById,
  createProductReview,
  getTopProducts,
  deleteProduct,
} = require("../controllers/product.js");

const router = express.Router();

//fetch all products

router.get("/", getAllProducts);

//get product by id
router.get("/top", getTopProducts);
router.get("/:id", getProductById);
router.post("/:id/reviews", auth, createProductReview);
router.delete("/:id", auth, admin, deleteProduct);

module.exports = router;
