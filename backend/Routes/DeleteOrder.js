const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.delete('/deleteOrder', async (req, res) => {
  const { email, orderDate } = req.body;
  console.log(email)
  console.log(orderDate)
  try {
    const result = await User.updateOne(
      { email: email },
      { $pull: { "orderData.order_data": { Order_date: orderDate } } }
    );
    
    if (result.nModified > 0) {
      res.status(200).json({ message: "Order deleted successfully!" });
    } else {
      res.status(404).json({ message: "Order not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error });
  }
});

module.exports = router
