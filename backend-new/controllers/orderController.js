const orderModel = require("../models/Order");
const { createPayment, verifyPayment } = require("../helpers/pay"); // Import the Stripe helper functions

// Create a new order with CinetPay payment integration
const createOrder = async (req, res) => {
  console.log("Received headers:", req.headers);
  console.log("Received body:", req.body);

  const { user, items, amount, address } = req.body;
  const deliveryAddress = address;
  console.log("Received order data:", { user, items, amount, deliveryAddress });

  try {
    // 1. Generate a unique transaction ID
    const transactionId = `TX_${new Date().getTime()}`;

    // 2. Create payment using CinetPay
    console.log("Creating payment with amount:", amount);
    const paymentResponse = await createPayment(amount, transactionId);
    console.log("Payment response:", paymentResponse);

    // 3. Extract required payment data
    const { payment_token, payment_url } = paymentResponse.data || {};

    // 4. Create a new order with proper payment data
    const newOrder = new orderModel({
      user,
      items,
      amount,
      deliveryAddress,
      paymentData: {
        paymentUrl: payment_url, // Save the payment URL
        paymentToken: payment_token, // Save the payment token
        operatorId: transactionId, // Save the transaction ID
        status: "Pending", // Default payment status
      },
    });

    console.log("Saving new order:", newOrder);
    await newOrder.save();
    console.log("Order saved successfully:", newOrder);

    // 5. Return the payment URL and token to the frontend
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: newOrder,
      paymentUrl: payment_url,
      paymentToken: payment_token,
      transactionId,
    });
    console.log("Response sent with order details and payment URL");
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: error.message || "An error occurred while creating the order.",
    });
    console.error("Error response sent:", error.message);
  }
};

// Verify Payment Status and Update Order Status using CinetPay
const verifyPaymentAndUpdateOrderStatus = async (req, res) => {
  const { transactionId } = req.body; // Get transactionId sent from the frontend

  try {
    // 1. Retrieve the payment status from CinetPay
    const paymentStatus = await verifyPayment(transactionId);
    console.log("Payment status:", paymentStatus); // Log payment status

    // 2. Find the order by transactionId
    const order = await orderModel.findOne({
      "paymentData.operator_id": transactionId,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    // 3. Check the payment status and update the order
    if (paymentStatus.status === "ACCEPTED") {
      // Payment succeeded, update order status
      order.status = "Paid";
      order.paid = true; // Mark payment as completed
      await order.save();

      res.status(200).json({
        success: true,
        message: "Payment successful and order updated.",
        order,
      });
    } else {
      // Payment failed, update order status
      order.status = "Failed";
      await order.save();

      res.status(200).json({
        success: false,
        message: "Payment failed.",
        order,
      });
    }
  } catch (error) {
    console.error("Error verifying payment status:", error);
    res.status(500).json({
      success: false,
      message: error.message || "An error occurred while verifying payment.",
    });
  }
};

// Get all orders for a user
const getOrders = async (req, res) => {
  const { userId } = req.params; // Get the user ID from the URL params
  try {
    const orders = await orderModel
      .find({ user: userId })
      .populate("items.product");
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve orders.",
    });
  }
};

// Update the order status
const updateOrderStatus = async (req, res) => {
  const { orderId, status } = req.body;
  try {
    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Order status updated.",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update order status.",
    });
  }
};

module.exports = {
  createOrder,
  verifyPaymentAndUpdateOrderStatus,
  getOrders,
  updateOrderStatus,
};
