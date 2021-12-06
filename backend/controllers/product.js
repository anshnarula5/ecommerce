const Product = require("../models/Product.js");

const asyncHandler = require("express-async-handler");

const getAllProducts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const category = req.query.category || "";
  const sort = req.query.sort || "";
  const range = req.query.range || "1,1000";
  const keyword =
    req.query.keyword || ""
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
  const count = await Product.countDocuments({ ...keyword });
  if (category) {
    if (sort === "plh") {
      const products = await Product.find({
        category,
        price: { $gt: range.split(",")[0], $lt: range.split(",")[1] },
      })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort({ price: 1 });
      res.json({ products, page, pages: Math.ceil(count / pageSize) });
    } else if (sort === "phl") {
      const products = await Product.find({
        category,
        price: { $gt: range.split(",")[0], $lt: range.split(",")[1] },
      })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort({ price: -1 });
      res.json({ products, page, pages: Math.ceil(count / pageSize) });
    } else if (sort === "rlh") {
      const products = await Product.find({
        category,
        price: { $gt: range.split(",")[0], $lt: range.split(",")[1] },
      })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort({ rating: 1 });
      res.json({ products, page, pages: Math.ceil(count / pageSize) });
    } else if (sort === "rhl") {
      const products = await Product.find({
        category,
        price: { $gt: range.split(",")[0], $lt: range.split(",")[1] },
      })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort({ rating: -1 });
      res.json({ products, page, pages: Math.ceil(count / pageSize) });
    } else {
      const products = await Product.find({
        category,
        price: { $gt: range.split(",")[0], $lt: range.split(",")[1] },
      })
        .limit(pageSize)
        .skip(pageSize * (page - 1));
      res.json({ products, page, pages: Math.ceil(count / pageSize) });
    }
  } else {
    if (sort === "plh") {
      const products = await Product.find({
        ...keyword,
        price: { $gt: range.split(",")[0], $lt: range.split(",")[1] },
      })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort({ price: 1 });
      res.json({ products, page, pages: Math.ceil(count / pageSize) });
    } else if (sort === "phl") {
      const products = await Product.find({
        ...keyword,
        price: { $gt: range.split(",")[0], $lt: range.split(",")[1] },
      })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort({ price: -1 });
      res.json({ products, page, pages: Math.ceil(count / pageSize) });
    } else if (sort === "rlh") {
      const products = await Product.find({
        ...keyword,
        price: { $gt: range.split(",")[0], $lt: range.split(",")[1] },
      })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort({ rating: 1 });
      res.json({ products, page, pages: Math.ceil(count / pageSize) });
    } else if (sort === "rhl") {
      const products = await Product.find({
        ...keyword,
        price: { $gt: range.split(",")[0], $lt: range.split(",")[1] },
      })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort({ rating: -1 });
      res.json({ products, page, pages: Math.ceil(count / pageSize) });
    } else {
      const products = await Product.find({
        ...keyword,
        price: { $gt: range.split(",")[0], $lt: range.split(",")[1] },
      })
        .limit(pageSize)
        .skip(pageSize * (page - 1));
      res.json({ products, page, pages: Math.ceil(count / pageSize) });
    }
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
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    user : req.user._id,
    name: "sample",
    price: 10,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
    brand: "sample brand",
    category: "sample car",
    numReviews: 2,
    countInStock: 2,
    description: "sadsad as da",
  }); 
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name ?? product.name;
    product.price = price ?? product.price;
    product.description = description ?? product.description;
    product.image = image ?? product.image;
    product.brand = brand ?? product.brand;
    product.category = category ?? product.category ;
    product.countInStock = countInStock ?? product.countInStock;
    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("No product found");
  }
});

module.exports = {
  getAllProducts,
  getProductById,
  createProductReview,
  getTopProducts,
  deleteProduct,
  createProduct,
  updateProduct
};
