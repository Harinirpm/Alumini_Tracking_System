import {getAluminiListFromDB, getIdFromDb, createProfileToDB, getAluminiFromDB, getAlumniRolesFromDB, getAlumniLocationsFromDB} from '../models/aluminiModel.js'
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

export const uploadProfileImage = upload.single('image');

export const getAluminiList = (req, res) => {
    getAluminiListFromDB((err, results) => {
        if (err) {
            console.error('Error fetching list:', err);
            res.status(500).json({ error: 'Failed to fetch list from the database.' });
        } else {
            res.status(200).json( results );
        }
    });
};

export const createProfile = async (req, res) => {
    const { name, department, passedOutYear, role, company, description, yearsOfExperience, linkedin, phone, email } = req.body;

    const imagePath = req.file ? req.file.filename : null;

    const user_id = await getIdFromDb(email, (err, results) => {
        if(err){
            console.error('Error creating profile:', err);
            return res.status(500).json({ error: 'Failed to create profile to the database.' }); 
        }

        return results
    })

    const profileData = {user_id, name, imagePath, department, passedOutYear, role, company, description, yearsOfExperience, linkedin, phone };

    createProfileToDB(profileData, (err, results) => {
        if (err) {
            console.error('Error creating profile:', err);
            return res.status(500).json({ error: 'Failed to create profile to the database.' });
        }

        res.status(200).json({ message: 'Profile Created successfully!', threadId: results.insertId });
    });
};

export const getAlumini = async (req, res) => {
    const { email } = req.params;
    try {
        const results = await getAluminiFromDB(email); // Use await to handle the promise
        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching alumni:', error);
        res.status(500).json({ error: 'Failed to fetch alumni from the database.' });
    }
};

export const getAlumniRoles = (req, res) => {
    getAlumniRolesFromDB((err, results) => {
        if (err) {
            console.error('Error fetching list:', err);
            res.status(500).json({ error: 'Failed to fetch list from the database.' });
        } else {
            res.status(200).json( results.rows );
        }
    });
};

export const getAlumniLocations = (req, res) => {
    getAlumniLocationsFromDB((err, results) => {
        if (err) {
            console.error('Error fetching list:', err);
            res.status(500).json({ error: 'Failed to fetch list from the database.' });
        } else {
            res.status(200).json( results.rows );
        }
    });
};