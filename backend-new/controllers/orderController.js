const orderModel = require("../models/Order");
const userModel = require("../models/User");
const { createPayment, verifyPayment } = require("../helpers/pay"); // Import the Stripe helper functions

// Create a new order with Fapshi payment integration
const createOrder = async (req, res) => {
  const { user, items, medium, amount, address, phone, message } = req.body;
  const deliveryAddress = address;
  const userId = user;

  try {
    const foundUser = await userModel.findById(userId);
    if (!foundUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const { name, email } = foundUser;

    console.log("Received order data:", {
      user,
      items,
      medium,
      name,
      email,
      amount,
      deliveryAddress,
      phone,
      userId,
      message,
    });

    // 1. Generate a unique transaction ID
    const externalId = `TX_${new Date().getTime()}`;

    // 2. Create payment using Fapshi
    const paymentResponse = await createPayment(
      amount,
      phone,
      medium,
      name,
      email,
      userId,
      externalId,
      message
    );



    // 3. Extract required payment data
    const { transId } = paymentResponse;

    console.log("Payment Response", paymentResponse)

    if(paymentResponse.statusCode === 400) {
      return res.status(500).json({
        success: false,
        message: paymentResponse.message || "An error occurred while creating the order.",
      });
    }

    // 4. Create a new order with proper payment data
    const newOrder = new orderModel({
      user,
      items,
      amount,
      deliveryAddress,
      paymentData: {
        transId: transId, // Save the transaction ID
        status: "PENDING", // Default payment status
      },
    });

    await newOrder.save();

    // 5. Return transaction ID to the frontend
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: newOrder,
      transactionId: transId,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: error.message || "An error occurred while creating the order.",
    });
    console.error("Error response sent:", error.message);
  }
};

// Verify Payment Status and Update Order Status using Fapshi
const verifyPaymentAndUpdateOrderStatus = async (req, res) => {
  const { transId } = req.params; // Get transactionId sent from the frontend

  const transactionId = transId
  console.log("Received transaction ID:", transactionId); // Log the transactionId to verify it's coming in

  try {
    // 1. Retrieve the payment status from Fapshi
    console.log("Retrieving payment status for transaction ID:", transactionId);
    const paymentStatus = await verifyPayment(transactionId);
    console.log("Payment status:", paymentStatus); // Log payment status

    // 2. Find the order by transactionId
    const order = await orderModel.findOne({
      "paymentData.transId": transactionId,
    });

    if (!order) {
      console.log("Order not found for transaction ID:", transactionId);
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    // 3. Check the payment status and update the order
    if (paymentStatus.status === "SUCCESSFUL") {
      // Payment succeeded, update order status
      console.log("Payment successful, updating order status...");
      order.paymentData.status = "SUCCESSFUL";
      order.paid = true; // Mark payment as completed
      await order.save();

      res.status(200).json({
        success: true,
        message: "Payment successful and order updated.",
        order,
      });
    } else {
      // Payment failed, update order status
      console.log("Payment failed, updating order status...");
      order.paymentData.status = paymentStatus.status;
      await order.save();

      res.status(200).json({
        success: true,
        message: "Payment not completed.",
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
  const { userId } = req.params;
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


// Get all orders (Admin/General)
const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find().populate("user", "name email");
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve orders.",
    });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    order.paymentData.status = status;

    if (status === "SUCCESSFUL") {
      order.paid = true;
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated successfully.",
      order,
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
  getAllOrders,
  updateOrderStatus,
};
