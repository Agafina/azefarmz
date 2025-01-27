const express = require("express");
const router = express.Router();
const {
  createOrder,
  verifyPaymentAndUpdateOrderStatus,
  getOrders,
  updateOrderStatus,
} = require("../controllers/orderController");
const authMiddleware = require("../middlewares/auth"); 
const adminMiddleware = require("../middlewares/admin");

// Create a new order
router.post("/create", authMiddleware, createOrder);

// Verify payment and update order status
router.post(
  "/verify-payment",
  authMiddleware,
  verifyPaymentAndUpdateOrderStatus
);

// Get all orders for a specific user
router.get("/:userId", authMiddleware, getOrders);

// Update the order status (only accessible by admin)
router.put("/update-status", adminMiddleware, updateOrderStatus);

module.exports = router;
