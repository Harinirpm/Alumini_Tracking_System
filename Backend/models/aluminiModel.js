import db from './db.js';

export const getAluminiListFromDB = (callback) => {
    const query = `
    SELECT 
      a.*, 
      u.email, 
      a.role AS role_title
    FROM 
      alumni_info a
    JOIN 
      users u ON u.id = a.user_id
    WHERE 
      a.verified = 1
  `;
  
    db.query(query, callback);
};

export const getAluminiProfileListFromDB = (callback) => {
    const query = `
    SELECT 
        a.*, 
        u.email, 
        a.role AS role_title
    FROM 
        alumni_info a
    JOIN 
        users u ON u.id = a.user_id
    WHERE 
        a.verified = 0 AND a.reason_for_rejection IS NULL;
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
        SELECT *, a.role as jobTitle   
        FROM alumni_info a  
        JOIN users u ON u.id = a.user_id   
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
                alumni_info.*
            
            FROM alumni_info
           
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

export const createAluminiProfileInDB = (profileData, callback) => {
    const {
      user_id,
      fullName,
      dob,
      gender,
      phone,
      degree,
      department,
      graduationYear,
      rollNo,
      jobTitle,
      companyName,
      industry,
      description,
      location,
      experience,
      linkedin,
      profileImagePath,
      certificatePath,
    } = profileData;
  
    const query = `
  INSERT INTO alumni_info 
  (user_id, name, date_of_birth, gender, phone_number, degree, department, passed_out_year, roll_no, role, 
  company_name, job_description, domain, years_of_experience, location, linkedin, profile_image_path, verification_document) 
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
`;

  
    const values = [
      user_id,
      fullName,
      dob,
      gender,
      phone,
      degree,
      department,
      graduationYear,
      rollNo,
      jobTitle,
      companyName,
      description,
      industry,
      experience,
      location,
      linkedin,
      profileImagePath,
      certificatePath,
    ];
  
    db.query(query, values, (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results);
    });
  };

  export const createUser = (userData, callback) => {
    const { email, password, role } = userData;
  
    const query = `
  INSERT INTO users (email, password, "role")
  VALUES ($1, $2, $3)
  RETURNING id
`;

db.query(query, [email, password, role], (err, results) => {
  if (err) {
    return callback(err);
  }
  callback(null, results.rows[0].id); // PostgreSQL stores the result in `rows`
});
  };
  
  export const approveAlumniInDB = (id) => {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE alumni_info
            SET verified = 1
            WHERE user_id = $1
        `;

        db.query(query, [id], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

export const rejectAlumniInDB = (id, reason) => {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE alumni_info
            SET verified = 0, reason_for_rejection = $1
            WHERE user_id = $2
        `;

        db.query(query, [reason, id], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};
