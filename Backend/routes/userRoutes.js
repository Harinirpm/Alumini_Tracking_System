import express from 'express';
import { loginUser, checkSession, logoutUser, verifyOTP, getOtp, verifyAluminiOTP } from '../controllers/userController.js';

const router = express.Router();

router.post('/login', loginUser);
router.get('/', checkSession);
router.get('/logout', logoutUser);
router.post('/verify-otp', verifyOTP)
router.post('/get-otp', getOtp)
router.post('/verify-alumini-otp', verifyAluminiOTP)

export default router;
