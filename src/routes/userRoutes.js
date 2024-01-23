import express from 'express';
import { protect, admin } from '../middleware/authMiddleWare.js';
const router = express.Router();

import {
  getUsers,
  getUserById,
  loginUser,
  logoutUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  updateUser,
  confirmUser
} from '../controllers/userController.js';

router.route('/').post(registerUser).get(protect, admin, getUsers);
router
  .route('/:id')
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);
router
  .route('/me/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/confirmation/:token', confirmUser)

export default router;
