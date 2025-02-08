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
      paymentUrl: {
        type: String,
        required: false,
      },
      status: {
        type: String,
        default: "Pending",
      },
      paymentMethod: {
        type: String,
        required: false,
      },
      operatorId: {
        type: String,
        required: false,
      },
      paymentDate: {
        type: Date,
        required: false,
      },
      fundAvailabilityDate: {
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
