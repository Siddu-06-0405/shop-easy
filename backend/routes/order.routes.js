// backend/routes/order.routes.js
import express from 'express';
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder
} from '../controllers/order.controller.js';

const router = express.Router();

// Get all orders (for admin - no auth for assignment)
router.get('/', getAllOrders);

// Get single order by ID
router.get('/:id', getOrderById);

// Create a new order
router.post('/', createOrder);

// Update order status
router.put('/:id/status', updateOrderStatus);

// Delete order (for cleanup)
router.delete('/:id', deleteOrder);

export default router;
