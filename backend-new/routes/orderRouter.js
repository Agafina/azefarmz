const express = require("express");
const router = express.Router();
const {
  createOrder,
  verifyPaymentAndUpdateOrderStatus,
  getOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

// Create a new order
router.post("/create", createOrder);

// Verify payment and update order status
router.get("/verify-payment/:transId", verifyPaymentAndUpdateOrderStatus);

// Get all orders for a specific user
router.get("/user/:userId", getOrders);

// Get all orders (Admin/General)
router.get("/all", getAllOrders);

// Update order status
router.put("/update-status/:orderId", updateOrderStatus);

module.exports = router;
