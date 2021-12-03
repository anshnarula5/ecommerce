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
 const getOrderById = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user", "name email")
   if (order) {
    res.json(order)
   } else {
     res.status(404)
     throw new Error("No order found")
  }
});
 const payOrder = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
   if (order) {
     order.isPaid = true
     order.paidAt = Date.now()
     order.paymentResult = {
       id: req.body.id,
       status : req.body.status,
       update_time : req.body.update_time,
       email_address : req.body.payer.email_address
     }
     const updatedOrder = await order.save()
     res.json(updatedOrder)
   } else {
     res.status(404)
     throw new Error("No order found")
  }
});

module.exports = {addOrderItem, getOrderById, payOrder}