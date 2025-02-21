import express from 'express';
import { getAllApprovedThreads, rejectThreads } from '../controllers/threadsController.js';
import { getJobs, rejectJobs } from '../controllers/jobController.js';
import { getAllFlagsOfAdmin, resolveFlag  } from '../controllers/reportController.js';

const router = express.Router();

router.put('/rejectThread',rejectThreads)
router.get('/allThreads', getAllApprovedThreads);
router.get('/jobs', getJobs)
router.put('/flags/review', resolveFlag)
router.get('/flags', getAllFlagsOfAdmin)
router.put('/rejectJob', rejectJobs)
export default router;