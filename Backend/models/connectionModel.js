import db from './db.js';

export const checkConnectionFromDB = (email, user_id, callback) => {
    const query = `
    SELECT 
        c.id AS connection_id,
        c.connected_at 
    FROM users u 
    JOIN connections c 
    ON (u.id = c.user1_id AND c.user2_id = $2) 
    OR (u.id = c.user2_id AND c.user1_id = $2)
    WHERE u.email = $1
`;

    db.query(query, [email, user_id], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results.rows); 
    });
};

export const createConnectionInDB = (email, user_id, callback) => {
    const query = `
INSERT INTO connections (user1_id, user2_id, connected_at)
VALUES ($2, (SELECT id FROM users WHERE email = $1), CURRENT_TIMESTAMP);
`;

    db.query(query, [email, user_id], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results); 
    });
};

export const getConnectionsFromDB = (email, callback) => {
    const query = `
   SELECT 
    u2.email AS connected_email, 
    CASE 
        WHEN u2.role = 'alumni' THEN 
            jsonb_build_object('name', ai.name, 'profile_image_path', ai.profile_image_path)
        WHEN u2.role IN ('staff', 'student') THEN 
            jsonb_build_object('email', u2.email)
    END AS connected_details
FROM 
    users u1
JOIN 
    connections c 
    ON (u1.id = c.user1_id AND u1.id != c.user2_id) 
    OR (u1.id = c.user2_id AND u1.id != c.user1_id)
JOIN 
    users u2 
    ON (u1.id = c.user1_id AND u2.id = c.user2_id) 
    OR (u1.id = c.user2_id AND u2.id = c.user1_id)
LEFT JOIN 
    alumni_info ai 
    ON u2.id = ai.user_id
WHERE 
    u1.email = $1;

    `;

    db.query(query, [email], (err, results) => {
        if(err) return callback(err);
        callback(null, results); 
    })
}
