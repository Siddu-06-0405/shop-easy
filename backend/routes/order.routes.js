// backend/routes/order.routes.js
import express from 'express';
import {
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  placeOrder,
  getUserOrders
} from '../controllers/order.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

// Get all orders (for admin - no auth for assignment)
router.get('/', getAllOrders);

// Get single order by ID
router.get('/:id', getOrderById);

// Update order status
router.put('/:id/status', updateOrderStatus);

// Delete order (for cleanup)
router.delete('/:id', deleteOrder);
router.post("/", protectRoute, placeOrder);
router.get('/user/:id', protectRoute, getUserOrders);
export default router;
