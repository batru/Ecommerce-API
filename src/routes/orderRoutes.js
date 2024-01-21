import express from 'express';
const router = express.Router();

import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToDelivered,
  addAddress
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleWare.js';

router.route('/').post(protect, addOrderItems);
router.route('/mine').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);
router.route('/:id/address').post(protect, addAddress)

export default router;
