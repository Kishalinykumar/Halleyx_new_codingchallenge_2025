// controllers/orderController.js

const Order = require("../models/Order");

// Place new order
exports.createOrder = async (req, res) => {
  try {
    const { items, total, address } = req.body;

    if (!items || items.length === 0 || !address) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    const newOrder = new Order({
      user: req.user.id,
      items,
      total,
      address,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully" });

  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Get all orders (admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email");
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};
