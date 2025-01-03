import { getThreadsFromDB, addThreadToDB } from '../models/threadsModel.js';
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
    getThreadsFromDB((err, results) => {
        if (err) {
            console.error('Error fetching threads:', err);
            res.status(500).json({ error: 'Failed to fetch threads from the database.' });
        } else {
            res.status(200).json( results );
        }
    });
};

export const addThread = (req, res) => {
    const { title, content } = req.body;

    const imagePath = req.file ? req.file.filename : null;

    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required.' });
    }

    const created_by = 1

    const threadData = { title, content, imagePath, created_by };

    addThreadToDB(threadData, (err, results) => {
        if (err) {
            console.error('Error adding thread:', err);
            return res.status(500).json({ error: 'Failed to add thread to the database.' });
        }

        res.status(200).json({ message: 'Thread posted successfully!', threadId: results.insertId });
    });
};
