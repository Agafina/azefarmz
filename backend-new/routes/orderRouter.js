const express = require("express");
const router = express.Router();
const {
  createOrder,
  verifyPaymentAndUpdateOrderStatus,
  getOrders,
} = require("../controllers/orderController");
const authMiddleware = require("../middlewares/auth"); 

// Create a new order
router.post("/create", createOrder);

// Verify payment and update order status
router.get(
  "/verify-payment/:transId",
  verifyPaymentAndUpdateOrderStatus
);

// Get all orders for a specific user
router.get("/:userId", getOrders);

// Update the order status (only accessible by admin)
//router.put("/update-status", authMiddleware, adminMiddleware, updateOrderStatus);

module.exports = router;
