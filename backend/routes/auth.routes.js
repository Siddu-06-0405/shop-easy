import express from 'express';
import { registerUser, loginUser, getUserProfile, getTotalUsers, getAllCustomers } from '../controllers/auth.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getUserProfile);
router.get('/total-users', getTotalUsers);
router.get('/all-customers', getAllCustomers);

export default router;
