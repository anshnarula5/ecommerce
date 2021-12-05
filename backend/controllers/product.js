const Product = require("../models/Product.js");

const asyncHandler = require("express-async-handler");

const getAllProducts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const category = req.query.category;
  const sort = req.query.sort;
  console.log(sort);
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const count = await Product.countDocuments({ ...keyword });
  if (category) {
    if (sort === "rlh" || "rhl") {
      const products = await Product.find({ category })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort({ rating: sort === "rlh" ? 1 : -1 });
      res.json({ products, page, pages: Math.ceil(count / pageSize) });
    } else if (sort === "plh" || "phl") {
      const products = await Product.find({ category })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort({ rating: sort === "rlh" ? 1 : -1 });
      res.json({ products, page, pages: Math.ceil(count / pageSize) });
    }
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  } else {
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort();
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  }
});
const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(4);
  res.json(products);
});
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const { id } = req.params;
  const product = await Product.findById(id);
  if (product) {
    const reviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );
    if (reviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    } else {
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };
      product.reviews.unshift(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;
      await product.save();
      res.status(201).json(review);
    }
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

module.exports = {
  getAllProducts,
  getProductById,
  createProductReview,
  getTopProducts,
};
