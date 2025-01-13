import express from 'express';
import { loginUser, checkSession, logoutUser, verifyOTP } from '../controllers/userController.js';

const router = express.Router();

router.post('/login', loginUser);
router.get('/', checkSession);
router.get('/logout', logoutUser);
router.post('/verify-otp', verifyOTP)

export default router;
