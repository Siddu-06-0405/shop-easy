import express from 'express';
import { addToWishlist, getWishlist, removeFromWishlist } from '../controllers/wishlist.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.get('/', protectRoute, getWishlist);
router.post('/', protectRoute, addToWishlist);
router.delete('/:productId', protectRoute, removeFromWishlist);

export default router;
