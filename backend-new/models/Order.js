const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
    },
    deliveryAddress: {
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String,
    },
    paymentData: {
      status: {
        type: String,
        default: "Pending",
      },
      medium: {
        type: String,
        required: false,
      },
      transId: {
        type: String,
        required: false,
      },
      dateInitiated: {
        type: Date,
        required: false,
      },
    },
    paid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
