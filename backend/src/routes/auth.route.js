import express from 'express';
import * as authController from './../controllers/auth.controller.js';
import { protectRoute } from './../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', protectRoute, authController.logout);

export default router;
