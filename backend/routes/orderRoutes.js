const express = require("express");

const auth = require("../middleware/authMiddleware");
const {addOrderItem, getOrderById, payOrder}= require("../controllers/order")
const router = express.Router();

router.post("/", auth, addOrderItem);
router.get("/:id", auth, getOrderById);
router.put("/:id/pay", auth, payOrder);

module.exports = router;

