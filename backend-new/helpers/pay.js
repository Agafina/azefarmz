const FAPSHI = require("./fapshi");
require("dotenv").config();

// Create Payment using Fapshi's directPay
const createPayment = async (
  amount,
  phone,
  medium,
  name,
  email,
  userId,
  externalId,
  message
) => {
  try {
    const paymentData = {
      amount,
      phone,
      medium,
      name,
      email,
      userId,
      externalId,
      message,
    };
    const paymentResponse = await FAPSHI.directPay(paymentData);
    return paymentResponse;
  } catch (error) {
    throw new Error("Error creating payment: " + error.message);
  }
};

// Verify Payment using Fapshi's paymentStatus
const verifyPayment = async (transactionId) => {
  try {
    const verificationResponse = await FAPSHI.paymentStatus(transactionId);
    return verificationResponse;
  } catch (error) {
    throw new Error("Error verifying payment: " + error.message);
  }
};

module.exports = {
  createPayment,
  verifyPayment,
};
