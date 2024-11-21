import express from 'express';
import { getThreads, addThread, uploadThreadImage } from '../controllers/threadsController.js';
import { getAluminiList, getAlumini } from '../controllers/aluminiController.js';
import { getJobs } from '../controllers/jobController.js';

const router = express.Router();

router.get('/threads', getThreads);
router.get('/alumini/list', getAluminiList)
router.get('/jobs', getJobs)
router.post('/create/threads',uploadThreadImage, addThread)
router.get('/profile/:email', getAlumini)

export default router;
