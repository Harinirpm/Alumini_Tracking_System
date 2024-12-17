import db from "./db.js";

export const getNotificationsFromDB = (id, callback) => {
    const query = `SELECT 
    n.id,
    n.room_id,
    n.message_id,
    cm.message,
    CASE 
        WHEN cr.sender = $1 THEN cr.receiver
        WHEN cr.receiver = $1 THEN cr.sender
    END AS connected_user_id,
    n.created_at,
    u.role,
    CASE 
        WHEN u.role = 'alumni' THEN 
            jsonb_build_object('name', ai.name, 'profile_image_path', ai.profile_image_path)
        WHEN u.role IN ('staff', 'student') THEN 
            jsonb_build_object('email', u.email)
    END AS connected_details
FROM 
    notifications n
JOIN 
    connection_messages cm 
    ON n.message_id = cm.id
JOIN 
    connection_rooms cr 
    ON n.room_id = cr.id
JOIN 
    users u 
    ON u.id = (
        CASE 
            WHEN cr.sender = $1 THEN cr.receiver
            WHEN cr.receiver = $1 THEN cr.sender
        END
    )
LEFT JOIN 
    alumni_info ai  
    ON u.id = ai.user_id
WHERE 
    n.user_id = $1 
    AND n.is_read = FALSE
ORDER BY 
    n.created_at DESC;
`;

    db.query(query, [id],(err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results.rows); 
    });
};

export const setNotificationsInDB = (id, sender_id, callback) => {

    const getRoomQuery = `
        SELECT id 
        FROM connection_rooms 
        WHERE (receiver = $1 AND sender = $2);
    `;

    db.query(getRoomQuery, [id, sender_id], (err, results) => {
        if (err) {
            return callback(err);
        }

        if (results.rows.length === 0) {
            return callback(new Error('No connection room found for the given users.'));
        }

        const roomIds = results.rows.map(row => row.id);

        const updateNotificationsQuery = `
            UPDATE notifications
            SET is_read = TRUE
            WHERE room_id = ANY($1) AND is_read = FALSE;
        `;

        db.query(updateNotificationsQuery, [roomIds], (err, updateResults) => {
            if (err) {
                return callback(err);
            }
            callback(null, updateResults.rowCount);  
        });
    });
};
