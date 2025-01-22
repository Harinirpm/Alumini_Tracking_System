import express from 'express';
import { getThreads, addThread, uploadThreadImage, storeLike, getAllApprovedThreads, rejectThreads } from '../controllers/threadsController.js';
import { getAluminiList, getAlumini, getAlumniRoles, getAlumniLocations } from '../controllers/aluminiController.js';
import { getJobs, addJobOffer } from '../controllers/jobController.js';
import { checkConnection, createConnection, getConnections } from '../controllers/connectionController.js';
import { getNotifications, setNotifications } from '../controllers/notificationController.js';
import { addFlag, getAllFlags } from '../controllers/reportController.js';

const router = express.Router();

router.post('/report',addFlag);
router.get('/reports/:id',getAllFlags);
router.post('/threads/like/:thread_id/:user_id', storeLike)
router.put('/mark/notifications/:id/:sender_id', setNotifications);
router.get('/notifications/:id', getNotifications);
router.get('/threads/:id', getThreads);
router.get('/alumini/list', getAluminiList)
router.get('/jobs', getJobs)
router.post('/create/joboffer', addJobOffer)
router.post('/create/threads',uploadThreadImage, addThread)
router.get('/profile/:email', getAlumini)
router.get('/alumini/roles',getAlumniRoles);
router.get('/alumini/locations', getAlumniLocations)
router.get('/checkConnection/:email/:user_id', checkConnection)
router.put('/createConnection/:email/:user_id', createConnection)
router.get('/getConnections/:email', getConnections)


export default router;
