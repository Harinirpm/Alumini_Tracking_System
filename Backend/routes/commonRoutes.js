import express from 'express';
import { getThreads, addThread, uploadThreadImage } from '../controllers/threadsController.js';
import { getAluminiList, getAlumini, getAlumniRoles, getAlumniLocations } from '../controllers/aluminiController.js';
import { getJobs } from '../controllers/jobController.js';

const router = express.Router();

router.get('/threads', getThreads);
router.get('/alumini/list', getAluminiList)
router.get('/jobs', getJobs)
router.post('/create/threads',uploadThreadImage, addThread)
router.get('/profile/:email', getAlumini)
router.get('/alumini/roles',getAlumniRoles);
router.get('/alumini/locations', getAlumniLocations)

export default router;
