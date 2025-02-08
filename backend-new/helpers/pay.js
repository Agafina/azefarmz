const CINETPAY = require("./cinetpay");
require("dotenv").config();

const cinetpay = new CINETPAY(
  process.env.CINETPAY_API_KEY,
  Number(process.env.CINETPAY_SITE_ID),
  process.env.CINETPAY_NOTIFY_URL
);

// Create Payment
const createPayment = async (
  amount,
  transactionId
) => {
  try {
    const paymentResponse = await cinetpay.pay(
      amount,
      transactionId
    );
    return paymentResponse;
  } catch (error) {
    throw new Error("Error creating payment: " + error.message);
  }
};

// Verify Payment
const verifyPayment = async (transactionId) => {
  try {
    const verificationResponse = await cinetpay.checkPayStatus(transactionId);
    return verificationResponse.data;
  } catch (error) {
    throw new Error("Error verifying payment: " + error.message);
  }
};

module.exports = {
  createPayment,
  verifyPayment,
};
