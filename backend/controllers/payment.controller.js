import { instance } from "../server.js"
import crypto from "crypto";
import { Payment } from "../models/payment.model.js";

export const checkout = async (req, res) => {
  try {
    const { amount, userId, serviceCharge, offlineCharge } = req.body;
    if (!amount || !userId) {
      return res.status(400).json({ success: false, message: "Amount and User ID are required" });
    }

    const totalAmount = Number(amount) * 100; // Convert to paise
    const offlineAmount = Number(offlineCharge) * 100; // Convert to paise
    const vendorShare = offlineAmount + 50; // offlineprice+50paise

    // console.log(totalAmount)
    // console.log(vendorShare)

    const options = {
      amount: totalAmount,
      currency: "INR",
      notes: { userId, amount: totalAmount }, // Attach the user ID in the notes
      transfers: [
        {
          account: process.env.RAZORPAY_VENDOR_ID,
          amount: vendorShare,
          currency: "INR",
          notes: { purpose: "Printing Service Payment", userId },
        },
      ],
    };

    const razorOrder = await instance.orders.create(options);
    // console.log("Razorpay Order Created:", razorOrder);

    res.status(200).json({ success: true, razorOrder });
  } catch (error) {
    console.error("Checkout Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const paymentVerification = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const { userId, amount } = req.query; // Extract userId from query params

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !userId) {
      return res.status(400).json({ success: false, message: "Invalid payment data" });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // Save to Database with userId
      await Payment.create({
        userId, // Store userId
        amount,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });
      // console.log("payment verified successfully")
      res.redirect(`http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`);
    } else {
      res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    console.error("Payment Verification Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// GET /api/payment/verify-payment-status?paymentId=xyz

export const verifyPaymentStatus = async (req, res) => {
  try {
    const { paymentId } = req.query;

    if (!paymentId) {
      return res.status(400).json({ success: false, message: "Missing payment ID" });
    }

    const payment = await instance.payments.fetch(paymentId); // fetches from Razorpay

    if (payment && payment.status === "captured") {
      return res.status(200).json({ success: true, verified: true, payment });
    } else {
      return res.status(200).json({ success: true, verified: false, payment });
    }
  } catch (error) {
    console.error("Error verifying Razorpay payment:", error);
    return res.status(500).json({ success: false, message: "Server error verifying payment" });
  }
};