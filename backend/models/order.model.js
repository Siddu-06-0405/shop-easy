// models/order.model.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true },
    },
  ],
  shippingAddress: {
    address: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Failed"],
    default: "Pending",
  },
  status: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Completed"],
    default: "Pending",
  },
  totalAmount: Number,
  placedAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
