// backend/routes/cartRoutes.js

const express = require('express');
const router = express.Router();
const { addToCart } = require('../controllers/cartController');

router.post('/add', addToCart);  // Make sure this matches

module.exports = router;
