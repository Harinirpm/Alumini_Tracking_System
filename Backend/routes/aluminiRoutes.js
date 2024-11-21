import express from 'express';
import { uploadProfileImage, createProfile } from '../controllers/aluminiController.js';

const router = express.Router();

router.post('/create/profile', uploadProfileImage, createProfile);

export default router;
