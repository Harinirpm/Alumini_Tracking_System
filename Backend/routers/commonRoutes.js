import express from 'express';
import { getThreads, addThread } from '../controllers/threadsController.js';

const router = express.Router();

router.get('/threads', getThreads);
router.post('/create/threads', addThread)

export default router;
