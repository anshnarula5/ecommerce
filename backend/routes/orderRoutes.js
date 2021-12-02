const express = require("express");

const auth = require("../middleware/authMiddleware");
const {addOrderItem, getOrderById}= require("../controllers/order")
const router = express.Router();

router.post("/", auth, addOrderItem);
router.get("/:id", auth, getOrderById);

module.exports = router;

