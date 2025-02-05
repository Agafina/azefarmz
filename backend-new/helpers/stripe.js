const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Create Payment Intent
const createPaymentIntent = async (amount) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, 
      currency: "xaf",
    });

    return paymentIntent;
  } catch (error) {
    throw new Error("Error creating payment intent: " + error.message);
  }
};

// Verify Payment Intent
const verifyPaymentIntent = async (paymentIntentId) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    return paymentIntent;
  } catch (error) {
    throw new Error("Error verifying payment intent: " + error.message);
  }
};

module.exports = {
  createPaymentIntent,
  verifyPaymentIntent,
};
