import db from './db.js';

export const getThreadsFromDB = (callback) => {
    const query = 'SELECT * FROM threads';
    db.query(query, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results.rows); // Use `results.rows` for PostgreSQL
    });
};

export const addThreadToDB = (threadData, callback) => {
    console.log(threadData);
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
