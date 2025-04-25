import { getThreadsFromDB, addThreadToDB,storeLikeInDB, getAllThreadsFromDB, rejectThreadInDB } from '../models/threadsModel.js';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

export const uploadThreadImage = upload.single('image'); 

export const getThreads = (req, res) => {
    const {id} = req.params
    getThreadsFromDB(id, (err, results) => {
        if (err) {
            console.error('Error fetching threads:', err);
            res.status(500).json({ error: 'Failed to fetch threads from the database.' });
        } else {
            res.status(200).json( results );
        }
    });
};

export const addThread = (req, res) => {
    const { title, content, created_by } = req.body;

    const imagePath = req.file ? req.file.filename : null;

    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required.' });
    }


    const threadData = { title, content, imagePath, created_by };

    addThreadToDB(threadData, (err, results) => {
        if (err) {
            console.error('Error adding thread:', err);
            return res.status(500).json({ error: 'Failed to add thread to the database.' });
        }

        res.status(200).json({ message: 'Thread posted successfully!', threadId: results.insertId });
    });
};

export const storeLike = (req, res) => {
    const {thread_id, user_id} = req.params
    storeLikeInDB(thread_id,user_id,(err, results) => {
        if (err) {
            console.error('Error fetching threads:', err);
            res.status(500).json({ error: 'Failed to fetch threads from the database.' });
        } else {
            res.status(200).json( results );
        }
    });
};

export const getAllApprovedThreads = (req, res) => {
    getAllThreadsFromDB((err, results) => {
        if (err) {
            console.error('Error fetching threads:', err);
            res.status(500).json({ error: 'Failed to fetch threads from the database.' });
        } else {
            res.status(200).json( results );
        }
    });
};

export const rejectThreads = (req, res) => {
    const { id, reason, user_id } = req.body;

    if (!id || !reason) {
        return res.status(400).json({ error: 'Thread ID and reason are required.' });
    }

    rejectThreadInDB(id, reason, user_id, (err, results) => {
        if (err) {
            console.error('Error rejecting thread:', err);
            return res.status(500).json({ error: 'Failed to reject the thread in the database.' });
        }

        res.status(200).json({
            message: 'Thread rejected successfully.',
            thread: results,
        });
    });
};


