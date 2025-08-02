// routes/orderRoutes.js

const express = require("express");
const router = express.Router();
const { createOrder, getAllOrders } = require("../controllers/orderController");

// Route for placing a new order
router.post("/", createOrder);

// Route for getting all orders (admin use)
router.get("/", getAllOrders);

module.exports = router;
