// controllers/payment.controller.js
import { instance } from "../server.js";
import crypto from "crypto";
import { Payment } from "../models/payment.model.js";

// Create Razorpay order — used in checkout flow
export const checkout = async (req, res) => {
  try {
    const { amount, userId } = req.body;
    if (!amount || !userId) {
      return res.status(400).json({ success: false, message: "Amount and User ID are required" });
    }

    const options = {
      amount: Math.round(amount * 100),
      currency: "INR",
      notes: { userId: String(userId) },
      receipt: `receipt_${Date.now()}`,
    };

    const razorOrder = await instance.orders.create(options);
    return res.status(200).json({ success: true, razorOrder });
  } catch (error) {
    console.error("Checkout Error:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Payment verification route — Razorpay calls this after successful payment
export const paymentVerification = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid payment data" });
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    // Fetch order to get notes (userId)
    const razorpayOrder = await instance.orders.fetch(razorpay_order_id);
    const userId = razorpayOrder.notes?.userId;
    const amount = razorpayOrder.amount / 100;

    if (!userId) {
      return res.status(400).json({ success: false, message: "Missing userId in Razorpay order notes" });
    }

    await Payment.create({
      userId,
      amount,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    return res.status(200).json({ success: true, paymentId: razorpay_payment_id });
  } catch (error) {
    console.error("Payment Verification Error:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Optional: Verify payment status manually
export const verifyPaymentStatus = async (req, res) => {
  try {
    const { paymentId } = req.query;

    if (!paymentId) {
      return res.status(400).json({ success: false, message: "Missing payment ID" });
    }

    const payment = await instance.payments.fetch(paymentId);

    return res.status(200).json({
      success: true,
      verified: payment.status === "captured",
      payment,
    });
  } catch (error) {
    console.error("Error verifying Razorpay payment:", error);
    return res.status(500).json({ success: false, message: "Server error verifying payment" });
  }
};
