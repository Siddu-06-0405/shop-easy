import express from "express";
import { checkout, paymentVerification, verifyPaymentStatus } from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/checkout",checkout);

router.post("/payment-verification",paymentVerification);

// ✅ NEW ROUTE to verify payment
router.get("/verify-payment-status", verifyPaymentStatus);
export default router;