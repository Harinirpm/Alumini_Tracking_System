import db from './db.js';

export const getAluminiListFromDB = (callback) => {
    const query = `
       SELECT 
    a.*, 
    u.email, 
    mr.title AS role_title, 
    ml.place AS location
FROM 
    alumni_info a
JOIN 
    users u ON u.id = a.user_id
LEFT JOIN 
    master_alumni_roles mr ON mr.id = a.role
LEFT JOIN 
    master_alumni_locations ml ON ml.id = a.location;

    `;
    db.query(query, callback);
};

export const createProfileToDB = (profileData, callback) => {
    console.log(profileData);
    const { user_id, name, imagePath, department, passedOutYear, role, company, description, yearsOfExperience, linkedin, phone } = profileData;
    const query = `
        INSERT INTO alumni_info 
        (user_id, name, profile_image_path, department, passed_out_year, role, company_name, job_description, years_of_experience, linkedin, phone_number) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    `;
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
        const query = `
            SELECT id 
            FROM users 
            WHERE email = $1
        `;
        db.query(query, [email], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results.rows[0]?.id);
        });
    });
};

export const getAluminiFromDB = (email) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT *   
            FROM alumni_info   
            JOIN users u ON u.id = alumni_info.user_id   
            WHERE u.email = $1 
        `;

        db.query(query, [email], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results.rows);
        });
    });
};


export const getAlumniRolesFromDB = (callback) => {
    const query = `
       SELECT * FROM master_alumni_roles
    `;
    db.query(query, callback);
};

export const getAlumniLocationsFromDB = (callback) => {
    const query = `
       SELECT * FROM master_alumni_locations`;
    db.query(query, callback);
};