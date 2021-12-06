const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const loginController = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("sadad", errors.errors);
    res.status(400);
    errors.errors.forEach((error) => {
      throw new Error(error.msg);
    });
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("No user found");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid credentials");
  }
  const id = user._id;
  const token = jwt.sign({ id }, "secret", { expiresIn: 360000 });
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token,
  });
});

const registerController = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("sadad", errors.errors);
    res.status(400);
    errors.errors.forEach((error) => {
      throw new Error(error.msg);
    });
  }
  const { email, password, name } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    res.status(400);
    throw new Error("User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  user = await User.create({ email, password: hashedPassword, name });
  const id = user._id;
  const token = jwt.sign({ id }, "secret", { expiresIn: 360000 });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token,
  });
});

const getProfileController = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("No user found");
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
});



module.exports = { loginController, getProfileController, registerController, getAllUsers };
