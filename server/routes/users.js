import express from 'express';
import {
  getProfile,
  updateProfile,
  deleteAccount,
  getUsers,
  getUser,
  updateUser,
  deleteUser
} from '../controllers/userController.js';
import { protect, authorize } from '../middleware/auth.js';
import { 
  validate,
  updateProfileSchema
} from '../middleware/validation.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// User profile routes
router.route('/profile')
  .get(getProfile)
  .put(validate(updateProfileSchema), updateProfile)
  .delete(deleteAccount);

// Admin only routes
router.use(authorize('admin'));

router.route('/')
  .get(getUsers);

router.route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

export default router;
