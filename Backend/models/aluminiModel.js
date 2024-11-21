import db from './db.js'

export const getAluminiListFromDB = (callback) => {
    const query = 'SELECT * FROM alumini_info';
    db.query(query, callback);
};

export const createProfileToDB = (profileData, callback) => {
    console.log(profileData)
    const {user_id, name, imagePath, department, passedOutYear, role, company, description, yearsOfExperience, linkedin, phone } = profileData;
    const query = `INSERT INTO alumini_info (user_id, name, profile_image_path, department, passed_out_year, role, company_name, job_description, years_of_experience, linkedin, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;  
    const values = [user_id, name, imagePath, department, passedOutYear, role, company, description, yearsOfExperience, linkedin, phone];

    db.query(query, values, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};

export const getIdFromDb = (email) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT id FROM users WHERE email = ?`;
        
        db.query(query, [email], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results[0].id);
        });
    });
};

export const getAluminiFromDB = (email) => {
    console.log(email);
    return new Promise((resolve, reject) => {
        const query = `
            SELECT *   
            FROM alumini_info   
            JOIN users u ON u.id = alumini_info.user_id   
            WHERE u.email = ? 
        `;

        db.query(query, [email], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};;