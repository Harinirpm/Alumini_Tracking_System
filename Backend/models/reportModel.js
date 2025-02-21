import db from './db.js';

export const addFlagToDB = (flagData, callback) => {
    const query = `
        INSERT INTO flags (
            user_id,
            title,
            reason
        ) VALUES ($1, $2, $3) RETURNING id;
    `;
    const values = [
        flagData.user_id,
        flagData.title,
        flagData.reason,
    ];

    db.query(query, values, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results.rows[0].id); // Return the newly created flag ID
    });
};

export const getAllFlagsFromDB = (id, callback) => {
    const query = `
        SELECT id, user_id, title, reason, resolved, comments
        FROM flags WHERE user_id = $1;
    `;

    db.query(query, [id], (err, results) => { 
        if (err) {
            return callback(err);
        }
        callback(null, results.rows); 
    });
};


export const getAllThreadsFromDB = (callback) => {  
    const query = `  
   SELECT   
    t.*,   
    CASE   
        WHEN u.role = 'alumni' THEN   
            jsonb_build_object('name', ai.name, 'profile_image_path', ai.profile_image_path, 'role', u.role, 'id', ai.user_id)  
        WHEN u.role IN ('staff', 'student') THEN   
            jsonb_build_object('email', u.email, 'role', u.role)  
    END AS created_by_details  
FROM   
    threads t  
JOIN   
    users u ON t.created_by = u.id  
LEFT JOIN   
    alumni_info ai ON u.id = ai.user_id  
WHERE   
    t.approved = 1
ORDER BY   
    t.created_at DESC;

    `;  
    
    db.query(query, (err, results) => {  
        if (err) {  
            return callback(err);  
        }  
        callback(null, results.rows); 
    });  
}; 

export const getFlagsFromDB = (callback) => {  
    const query = `  
   SELECT   
    t.*,   
    CASE   
        WHEN u.role = 'alumni' THEN   
            jsonb_build_object('name', ai.name, 'profile_image_path', ai.profile_image_path, 'role', u.role, 'id', ai.user_id)  
        WHEN u.role IN ('staff', 'student') THEN   
            jsonb_build_object('email', u.email, 'role', u.role)  
    END AS created_by_details  
FROM   
    flags t  
JOIN   
    users u ON t.user_id = u.id  
LEFT JOIN   
    alumni_info ai ON u.id = ai.user_id  
WHERE   
    t.resolved = false


    `;  
    
    db.query(query, (err, results) => {  
        if (err) {  
            return callback(err);  
        }  
        callback(null, results.rows); 
    });  
};

export const resolveFlagInDB = (id, comment, callback) => {
    const query = `
        UPDATE flags
        SET resolved = true, comments = $2
        WHERE id = $1
        RETURNING *; -- Returns the updated flag
    `;
    const values = [id, comment];

    db.query(query, values, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results.rows[0]); // Return the updated flag
    });
};
