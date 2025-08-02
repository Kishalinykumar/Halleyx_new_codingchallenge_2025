const User = require('../models/User');

// Get all customers (role: 'customer')
const getAllCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: 'customer' }).select('-password');
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch customers", error });
  }
};

module.exports = { getAllCustomers };
