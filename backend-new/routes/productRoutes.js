const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");
const {
  addProduct,
  listProducts,
  removeProduct,
} = require("../controllers/productController");
const adminMiddleware = require("../middlewares/admin");

// Add a new product (only accessible by admin)
router.post("/add", upload.single("image"), addProduct);

// List all products
router.get("/", listProducts);

// Remove a product (only accessible by admin)
router.delete("/remove", adminMiddleware, removeProduct);

module.exports = router;
