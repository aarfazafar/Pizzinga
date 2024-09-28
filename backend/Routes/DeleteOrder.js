const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

router.delete('/deleteOrder', async (req, res) => {
  const { email} = req.body;
  console.log(email)
  // console.log(orderDate)
  try {
    await Order.deleteOne(
      { email: email }
      // { order_date: orderDate },


      // { $pull: { "orderData.order_data": { Order_date: orderDate } } }
    ).then(() => {
      res.json({ success: true });
    }).catch(()=> {
      res.status(404).json({ message: "Order not found!" });
    })
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error });
  }
});

module.exports = router
