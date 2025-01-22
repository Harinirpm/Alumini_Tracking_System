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


