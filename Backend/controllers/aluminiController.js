import {getAluminiListFromDB,getDetailsFromDB, getIdFromDb, createProfileToDB, getAluminiFromDB, getAlumniRolesFromDB, getAlumniLocationsFromDB, getLocationIdFromDb, updateProfileInDB} from '../models/aluminiModel.js'
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
    const { name, department, passedOutYear, role, company, description, yearsOfExperience, linkedin, phone, location, email } = req.body;

    const imagePath = req.file ? req.file.filename : null;

    const user_id = await getIdFromDb(email, (err, results) => {
        if(err){
            console.error('Error creating profile:', err);
            return res.status(500).json({ error: 'Failed to create profile to the database.' }); 
        }

        return results
    })

    const locationID = await getLocationIdFromDb(location, (err, results) => {
        if(err){
            console.error('Unable to find the location:', err);
            return res.status(500).json({error: 'Failed to fond the laction ID'});
        }
        return results
    })

    const profileData = {user_id, name, imagePath, department, passedOutYear, role, company, description, yearsOfExperience, linkedin, phone, locationID };

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

export const getDetails = (req, res) => {
    const { id } = req.params; // Extract id from request parameters
    getDetailsFromDB(id, (err, results) => {
        if (err) {
            console.error('Error fetching details:', err);
            res.status(500).json({ error: 'Failed to fetch details from the database.' });
        } else {
            if (results.rows.length === 0) {
                res.status(404).json({ message: 'No details found for the given ID.' });
            } else {
                res.status(200).json(results.rows[0]); // Return the first row of the result
            }
        }
    });
};

export const updateProfile = (req, res) => {
    const { id } = req.params; // Extract ID from URL parameters
    const { name, image, department, passedOutYear, role, company, description, yearsOfExperience, linkedin, phone, location, email } = req.body;
    const profileImage = req.file ? req.file.path : image; 

    const updatedProfile = {
        name,
        profile_image_path: profileImage,
        department,
        passed_out_year: passedOutYear,
        role,
        company_name: company,
        job_description: description,
        years_of_experience: yearsOfExperience,
        linkedin,
        phone_number: phone,
        location,
    };

    // Call the model function to update the profile in the database
    updateProfileInDB(id, updatedProfile, (err, result) => {
        if (err) {
            console.error('Error updating profile:', err);
            return res.status(500).json({ error: 'Failed to update profile.' });
        }

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Profile not found.' });
        }

        res.status(200).json({ message: 'Profile updated successfully!' });
    });
};

