import express from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';
import { checkAdminAccess } from '../middleware/admin.middleware.js';
import {
  getFlags,
  getTotalBalances,
  getTopUsers,
  softDeleteUser,
  softDeleteTransaction
} from '../controllers/admin.controller.js';

const router = express.Router();

router.use(verifyToken, checkAdminAccess); // Admin-only middleware for all below routes

router.get('/fraud', getFlags);
router.get('/sum', getTotalBalances);
router.get('/topUsers', getTopUsers);
router.patch('/user/:id/delete', softDeleteUser);
router.patch('/transaction/:id/delete', softDeleteTransaction);

export default router;
