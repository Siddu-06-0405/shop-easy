// backend/routes/order.routes.js
import express from 'express';
import {
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  placeOrder,
  getUserOrders,
  getTotalOrders,
  getTotalRevenue,
  getRecentOrders
} from '../controllers/order.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

// Get all orders (for admin - no auth)
router.get('/', getAllOrders);

// Get single order by ID
router.get('/:id', getOrderById);

//Get total orders and revenue
router.get('/o/total-orders', getTotalOrders);
router.get('/o/total-revenue', getTotalRevenue);
router.get('/o/recent-orders', getRecentOrders);


// Update order status
router.put('/:id/status', updateOrderStatus);

// Delete order (for cleanup)
router.delete('/:id', deleteOrder);
router.post("/", protectRoute, placeOrder);
router.get('/user/:id', protectRoute, getUserOrders);
export default router;
