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
    const { user_id, name, imagePath, department, passedOutYear, role, company, description, yearsOfExperience, linkedin, phone, locationID } = profileData;
    const query = `
        INSERT INTO alumni_info 
        (user_id, name, profile_image_path, department, passed_out_year, role, company_name, job_description, years_of_experience, linkedin, phone_number, location) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    `;
    const values = [user_id, name, imagePath, department, passedOutYear, role, company, description, yearsOfExperience, linkedin, phone, locationID];

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

export const getLocationIdFromDb = (location) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT id 
            FROM master_alumni_locations 
            WHERE place = $1
        `;
        db.query(query, [location], (error, results) => {
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



export const getDetailsFromDB = (id, callback) => {
    const query = `
                  SELECT 
                alumni_info.*, 
                mr.title, 
                ml.place
            FROM alumni_info
            LEFT JOIN master_alumni_roles mr ON mr.id =  alumni_info.role
            LEFT JOIN master_alumni_locations ml ON ml.id =  alumni_info.location
            WHERE  alumni_info.user_id = $1
        
    `;
   const values = [id]; // Pass the ID as a parameter
    db.query(query, values, (err, results) => {
        if (err) {
            return callback(err); // Return the error to the callback
        }
        callback(null, results); // Return the results to the callback
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

export const updateProfileInDB = (id, updatedProfile, callback) => {
    const query = `
       UPDATE alumni_info
SET
    name = $1,
    profile_image_path = $2,
    department = $3,
    passed_out_year = $4,
    role = $5,
    company_name = $6,
    job_description = $7,
    years_of_experience = $8,
    linkedin = $9,
    phone_number = $10,
    location = $11
WHERE user_id = $12
RETURNING *;

    `;

    const values = [
        updatedProfile.name,
        updatedProfile.profile_image_path,
        updatedProfile.department,
        updatedProfile.passed_out_year,
        updatedProfile.role,
        updatedProfile.company_name,
        updatedProfile.job_description,
        updatedProfile.years_of_experience,
        updatedProfile.linkedin,
        updatedProfile.phone_number,
        updatedProfile.location,
        id
    ];

    db.query(query, values, (err, result) => {
        if (err) {
            return callback(err, null);
        }

        callback(null, result); // Returning the result from the query (if needed)
    });
};

export const getNameFromDB = (id, callback) => {
    const query = `
        SELECT name,profile_image_path
        FROM alumni_info
        WHERE user_id = $1
    `;
   const values = [id]; // Pass the ID as a parameter
    db.query(query, values, (err, results) => {
        if (err) {
            return callback(err); // Return the error to the callback
        }
        callback(null, results); // Return the results to the callback
    });
};