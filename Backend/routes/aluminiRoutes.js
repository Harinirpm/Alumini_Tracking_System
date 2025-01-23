import express from 'express';
import { uploadProfileImage, createProfile, getDetails, updateProfile, getName, createAluminiProfile, approveAlumni, getAluminiProfileList, rejectAlumni } from '../controllers/aluminiController.js';

const router = express.Router();

router.post('/createProfile', createAluminiProfile)
router.get('/name/:id', getName);
router.post('/create/profile', uploadProfileImage, createProfile);
router.get("/profile/:id", getDetails)
router.put('/update/profile/:id',uploadProfileImage , updateProfile)
router.post("/approve/:id/:email", approveAlumni);
router.get('/profilelist', getAluminiProfileList)
router.post('/reject/:id/:email', rejectAlumni);

export default router;
