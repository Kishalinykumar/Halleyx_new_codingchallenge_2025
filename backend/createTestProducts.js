// backend/createTestProducts.js
const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Product.deleteMany({}); // clear existing
    await Product.insertMany([
      {
        name: "Minimalist Sofa",
        price: 7500,
        category: "Living Room",
        stock: 10,
        description: "Elegant and cozy minimalist sofa",
        image: "assets/products/sofa1.jpg"
      },
      {
        name: "Wooden Coffee Table",
        price: 2999,
        category: "Living Room",
        stock: 15,
        description: "Natural wood table with storage shelf",
        image: "assets/products/table1.jpg"
      }
    ]);
    console.log("✅ Sample products inserted!");
    process.exit();
  })
  .catch(err => console.log("❌ DB Error:", err));
