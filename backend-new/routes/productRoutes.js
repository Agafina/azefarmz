const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");
const {
  addProduct,
  listProducts,
  removeProduct,
} = require("../controllers/productController");
const adminMiddleware = require("../middlewares/admin");
const authMiddleware = require("../middlewares/auth");

// Add a new product (only accessible by admin)
router.post("/add", authMiddleware, adminMiddleware, upload.single("image"), addProduct);

// List all products
router.get("/", authMiddleware, listProducts);

// Remove a product (only accessible by admin)
router.delete("/remove", authMiddleware, adminMiddleware, removeProduct);

module.exports = router;
