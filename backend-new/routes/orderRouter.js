const express = require("express");
const router = express.Router();
const {
  createOrder,
  verifyPaymentAndUpdateOrderStatus,
  getOrders,
} = require("../controllers/orderController");

// Create a new order
router.post("/create", createOrder);

// Verify payment and update order status
router.get(
  "/verify-payment/:transId",
  verifyPaymentAndUpdateOrderStatus
);

// Get all orders for a specific user
router.get("/:userId", getOrders);

module.exports = router;
