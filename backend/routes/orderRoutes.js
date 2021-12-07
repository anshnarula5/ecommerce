const express = require("express");

const {auth, admin} = require("../middleware/authMiddleware");
const {addOrderItem, getOrderById, payOrder, getMyOrders, getAllOrders, deliverOrder}= require("../controllers/order")
const router = express.Router();

router.post("/", auth, addOrderItem);
router.get("/", auth, admin, getAllOrders);
router.get("/myorders", auth, getMyOrders);
router.get("/:id", auth, getOrderById);
router.put("/:id/pay", auth, payOrder);
router.put("/:id/deliver", auth, admin, deliverOrder);

module.exports = router;

