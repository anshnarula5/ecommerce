const expressAsyncHandler = require("express-async-handler");
const Order = require("../models/Order");

 const addOrderItem = expressAsyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const newOrder = new Order({
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      user : req.user._id
    });
    const createdOrder = await newOrder.save()
    res.status(201).json(createdOrder)
  }
});

module.exports = {addOrderItem}