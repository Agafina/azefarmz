const orderModel = require("../models/Order");
const {
  createPaymentIntent,
  verifyPaymentIntent,
} = require("../helpers/stripe"); // Import the Stripe helper functions

// Create a new order
const createOrder = async (req, res) => {
  console.log("Received headers:", req.headers); // Log the incoming data
  console.log("Received body:", req.body); // Log the incoming data
  const { user, items, amount, address } = req.body;
  const deliveryAddress = address
  console.log("Received order data:", { user, items, amount, deliveryAddress }); // Log the incoming data

  try {
    // 1. Create payment intent
    console.log("Creating payment intent with amount:", amount); // Log amount being used to create payment intent
    const paymentIntent = await createPaymentIntent(Math.round(amount * 100)); // Pass the amount for payment
    console.log("Payment intent created:", paymentIntent); // Log the created payment intent

    // 2. Create a new order and save the paymentIntentId
    const newOrder = new orderModel({
      user,
      items,
      amount,
      deliveryAddress,
      paymentIntentId: paymentIntent.id, // Save the paymentIntentId with the order
    });

    console.log("Saving new order:", newOrder); // Log the order being saved
    await newOrder.save();
    console.log("Order saved successfully:", newOrder); // Log after order is saved successfully

    // 3. Return the clientSecret and paymentIntentId to the frontend
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: newOrder,
      clientSecret: paymentIntent.client_secret, // Send the clientSecret for frontend payment confirmation
      paymentIntentId: paymentIntent.id, // Send the paymentIntentId for later verification
    });
    console.log("Response sent with order details and paymentIntentId"); // Log when response is sent to frontend
  } catch (error) {
    console.error("Error creating order:", error); // Log any error that occurs
    res.status(500).json({
      success: false,
      message: error.message || "An error occurred while creating the order.",
    });
    console.error("Error response sent:", error.message); // Log error message on failure
  }
};


// Verify Payment Status and Update Order Status
const verifyPaymentAndUpdateOrderStatus = async (req, res) => {
  const { paymentIntentId } = req.body; // Get paymentIntentId sent from the frontend

  try {
    // 1. Retrieve the payment intent status
    const paymentIntent = await verifyPaymentIntent(paymentIntentId); // Verify payment status

    // 2. Find the order by paymentIntentId
    const order = await orderModel.findOne({ paymentIntentId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    // 3. Check the payment status and update the order
    if (paymentIntent.status === "succeeded") {
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
