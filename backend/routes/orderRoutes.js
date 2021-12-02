const express = require("express");

const auth = require("../middleware/authMiddleware");
const {addOrderItem}= require("../controllers/order")
const router = express.Router();

router.post("/", auth, addOrderItem);

module.exports = router;
