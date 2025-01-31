import express from 'express';
import { getAllApprovedThreads, rejectThreads } from '../controllers/threadsController.js';
import { getJobs, rejectJobs } from '../controllers/jobController.js';

const router = express.Router();

router.put('/rejectThread',rejectThreads)
router.get('/allThreads', getAllApprovedThreads);
router.get('/jobs', getJobs)
router.put('/rejectJob', rejectJobs)
export default router;