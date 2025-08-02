// routes/customerRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET /api/customers/
router.get("/", async (req, res) => {
  try {
    const customers = await User.find({ role: "customer" });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch customers" });
  }
});

module.exports = router;
