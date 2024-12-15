import db from './db.js';

export const getThreadsFromDB = (callback) => {
    const query = `SELECT 
    t.*, 
    CASE 
        WHEN u.role = 'alumni' THEN 
            jsonb_build_object('name', ai.name, 'profile_image_path', ai.profile_image_path, 'role', u.role)
        WHEN u.role IN ('staff', 'student') THEN 
            jsonb_build_object('email', u.email, 'role', u.role)
    END AS created_by_details
FROM 
    threads t
JOIN 
    users u 
    ON t.created_by = u.id
LEFT JOIN 
    alumni_info ai 
    ON u.id = ai.user_id`;
    db.query(query, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results.rows); // Use `results.rows` for PostgreSQL
    });
};

export const addThreadToDB = (threadData, callback) => {
    const { title, content, imagePath, created_by } = threadData;
    const query = `
        INSERT INTO threads (thread_domain, thread_content, image_path, created_by) 
        VALUES ($1, $2, $3, $4)
        RETURNING *;  -- Optional: Returns the inserted row
    `;
    const values = [title, content, imagePath, created_by];

    db.query(query, values, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results.rows[0]); // Return the inserted row
    });
};

