import express from 'express';
import { uploadProfileImage, createProfile, getDetails, updateProfile } from '../controllers/aluminiController.js';

const router = express.Router();

router.post('/create/profile', uploadProfileImage, createProfile);
router.get("/profile/:id", getDetails)
router.put('/update/profile/:id',uploadProfileImage , updateProfile)

export default router;
