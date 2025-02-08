const orderModel = require("../models/Order");
const userModel = require("../models/User");
const { createPayment, verifyPayment } = require("../helpers/pay"); // Import the Stripe helper functions

// Create a new order with Fapshi payment integration
const createOrder = async (req, res) => {
  console.log("Received headers:", req.headers);
  console.log("Received body:", req.body);

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
    console.log("Creating payment with amount:", amount);
    const paymentResponse = await createPayment(amount, phone, medium, name, email, userId, externalId, message);
    console.log("Payment response:", paymentResponse);

    // 3. Extract required payment data
    const { transId } = paymentResponse;

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

    console.log("Saving new order:", newOrder);
    await newOrder.save();
    console.log("Order saved successfully:", newOrder);

    // 5. Return transaction ID to the frontend
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: newOrder,
      transactionId: transId,
    });
    console.log("Response sent with order details and transaction ID");
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
  const { transactionId } = req.body; // Get transactionId sent from the frontend

  try {
    // 1. Retrieve the payment status from Fapshi
    const paymentStatus = await verifyPayment(transactionId);
    console.log("Payment status:", paymentStatus); // Log payment status

    // 2. Find the order by transactionId
    const order = await orderModel.findOne({
      "paymentData.transId": transactionId,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    // 3. Check the payment status and update the order
    if (paymentStatus.status === "SUCCESSFUL") {
      // Payment succeeded, update order status
      order.status = "SUCCESSFUL";
      order.paid = true; // Mark payment as completed
      await order.save();

      res.status(200).json({
        success: true,
        message: "Payment successful and order updated.",
        order,
      });
    } else {
      // Payment failed, update order status
      order.status = paymentStatus.status;
      await order.save();

      res.status(200).json({
        success: false,
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

module.exports = {
  createOrder,
  verifyPaymentAndUpdateOrderStatus,
  getOrders,
};
