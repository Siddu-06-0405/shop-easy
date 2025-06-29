import express from "express";
import {
  getCart,
  addToCart,
  removeFromCart,
  clearCart
} from "../controllers/cart.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", protectRoute, getCart);
router.post("/add", protectRoute, addToCart);
router.post("/remove", protectRoute, removeFromCart);
router.post("/clear", protectRoute, clearCart); // ✅ add this route

export default router;
